import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';
import { StudentId, SubjectId, WeekId, cellPoints } from '../types';

// Базовые селекторы
export const selectStudents = (state: RootState) => state.game.students;
export const selectSubjects = (state: RootState) => state.game.subjects;
export const selectWeeks = (state: RootState) => state.game.weeks;
export const selectTerms = (state: RootState) => state.game.terms;
export const selectCells = (state: RootState) => state.game.cells;
export const selectCurrentWeek = (state: RootState) => state.game.currentWeek;
export const selectCurrentTerm = (state: RootState) => state.game.currentTerm;

// Селектор для получения конкретной ячейки
export const selectCell = (
  state: RootState, 
  studentId: StudentId, 
  subjectId: SubjectId, 
  weekId: WeekId
) => {
  const key = `${studentId}-${subjectId}-${weekId}`;
  return state.game.cells[key];
};