import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CellGrade, StudentId, SubjectId, WeekId, TermId } from '../../types';
import { students, subjects, weeks, terms, defaultWeek, defaultTerm } from '../../data/initialData';

interface CellsMap {
  [key: string]: CellGrade;
}

interface GameState {
  students: typeof students;
  subjects: typeof subjects;
  weeks: WeekId[];
  terms: typeof terms;
  cells: CellsMap;
  currentWeek: WeekId;
  currentTerm: TermId;
}

// Загрузка из localStorage
const loadFromStorage = (): Partial<GameState> => {
  try {
    const saved = localStorage.getItem('gameState');
    if (saved) {
      const data = JSON.parse(saved);
      
      // Миграция со старого формата если нужно
      if (Array.isArray(data.cells)) {
        const cellsMap: CellsMap = {};
        data.cells.forEach((cell: CellGrade) => {
          const key = `${cell.studentId}-${cell.subjectId}-${cell.weekId}`;
          cellsMap[key] = cell;
        });
        return {
          cells: cellsMap,
          currentWeek: data.currentWeek || defaultWeek,
          currentTerm: data.currentTerm || defaultTerm
        };
      }
      
      return {
        cells: data.cells || {},
        currentWeek: data.currentWeek || defaultWeek,
        currentTerm: data.currentTerm || defaultTerm
      };
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error);
  }
  return {
    cells: {},
    currentWeek: defaultWeek,
    currentTerm: defaultTerm
  };
};

// Сохранение в localStorage
const saveToStorage = (state: GameState) => {
  try {
    const data = {
      cells: state.cells,
      currentWeek: state.currentWeek,
      currentTerm: state.currentTerm
    };
    localStorage.setItem('gameState', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const loadedData = loadFromStorage();

const initialState: GameState = {
  students,
  subjects,
  weeks,
  terms,
  cells: loadedData.cells || {},
  currentWeek: loadedData.currentWeek || defaultWeek,
  currentTerm: loadedData.currentTerm || defaultTerm,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    // Обновление/добавление оценок в ячейку
    upsertCell: (state, action: PayloadAction<{
      studentId: StudentId;
      subjectId: SubjectId;
      weekId: WeekId;
      grades: number[];
    }>) => {
      const { studentId, subjectId, weekId, grades } = action.payload;
      const key = `${studentId}-${subjectId}-${weekId}`;
      
      state.cells[key] = {
        studentId,
        subjectId,
        weekId,
        grades
      };

      // Сохраняем в localStorage
      saveToStorage(state);
    },

    // Очистка всех оценок за неделю
    clearWeek: (state, action: PayloadAction<{ weekId: WeekId }>) => {
      const keysToDelete = Object.keys(state.cells).filter(key => 
        key.endsWith(`-${action.payload.weekId}`)
      );
      
      keysToDelete.forEach(key => {
        delete state.cells[key];
      });
      
      saveToStorage(state);
    },

    // Изменение текущей недели
    setCurrentWeek: (state, action: PayloadAction<WeekId>) => {
      state.currentWeek = action.payload;
      saveToStorage(state);
    },

    // Изменение текущего периода
    setCurrentTerm: (state, action: PayloadAction<TermId>) => {
      state.currentTerm = action.payload;
      saveToStorage(state);
    },

    // Удаление конкретной оценки из ячейки
    removeGradeFromCell: (state, action: PayloadAction<{
      studentId: StudentId;
      subjectId: SubjectId;
      weekId: WeekId;
      gradeIndex: number;
    }>) => {
      const { studentId, subjectId, weekId, gradeIndex } = action.payload;
      const key = `${studentId}-${subjectId}-${weekId}`;
      const cell = state.cells[key];
      
      if (cell && cell.grades[gradeIndex] !== undefined) {
        cell.grades.splice(gradeIndex, 1);
        
        // Если оценок не осталось, удаляем ячейку
        if (cell.grades.length === 0) {
          delete state.cells[key];
        }
        
        saveToStorage(state);
      }
    },
  },
});

export const { 
  upsertCell, 
  clearWeek, 
  setCurrentWeek, 
  setCurrentTerm,
  removeGradeFromCell 
} = gameSlice.actions;

export default gameSlice.reducer;