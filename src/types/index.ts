// Основные типы системы
export type StudentId = string;
export type SubjectId = string;
export type WeekId = string;      // формата 'W1', 'W2', 'W3' ...
export type TermId = string;      // четверть/период: 'Q1-2025' и т.п.

// Базовые сущности
export interface Student {
  id: StudentId;
  name: string;
}

export interface Subject {
  id: SubjectId;
  name: string;
}

export interface Term {
  id: TermId;
  name: string;
  weeks: WeekId[];
}

// Оценки за конкретный предмет-ученик-неделю
export interface CellGrade {
  studentId: StudentId;
  subjectId: SubjectId;
  weekId: WeekId;
  grades: number[]; // 1..3 оценки (каждая ∈ {2,3,4,5})
}

// Итоги (кеш/агрегация)
export interface WeeklyScore {
  studentId: StudentId;
  weekId: WeekId;
  points: number;
}

export interface TermScore {
  studentId: StudentId;
  termId: TermId;
  points: number;
}

// Состояние UI
export interface UIState {
  currentWeek: WeekId;
  currentTerm: TermId;
}

// Корневое состояние Redux
export interface RootState {
  students: Student[];
  subjects: Subject[];
  weeks: WeekId[];
  terms: Term[];
  cells: CellGrade[];
  ui: UIState;
}

// Правила подсчёта очков
export const SCORE_MAP: Record<number, number> = {
  5: 5,
  4: 4,
  3: 0,
  2: -2
};

// Функции подсчёта очков
export function cellPoints(grades: number[]): number {
  return grades.slice(0, 3).reduce((sum, grade) => sum + (SCORE_MAP[grade] ?? 0), 0);
}

export function weeklyStudentPoints(
  studentId: StudentId, 
  weekId: WeekId, 
  cells: CellGrade[]
): number {
  return cells
    .filter(c => c.studentId === studentId && c.weekId === weekId)
    .reduce((sum, c) => sum + cellPoints(c.grades), 0);
}

export function termStudentPoints(
  studentId: StudentId, 
  termWeeks: WeekId[], 
  cells: CellGrade[]
): number {
  return termWeeks.reduce((sum, weekId) => 
    sum + weeklyStudentPoints(studentId, weekId, cells), 0
  );
}