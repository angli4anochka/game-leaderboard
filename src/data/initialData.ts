import { Student, Subject, Term, WeekId, TermId } from '../types';

export const students: Student[] = [
  { id: 's1', name: 'Ира' },
  { id: 's2', name: 'Максим' },
  { id: 's3', name: 'Лена' },
  { id: 's4', name: 'Глеб' },
  { id: 's5', name: 'Софья' },
  { id: 's6', name: 'Артём' },
];

export const subjects: Subject[] = [
  { id: 'math', name: 'Математика' },
  { id: 'rus', name: 'Русский язык' },
  { id: 'eng', name: 'Английский' },
  { id: 'sci', name: 'Окружающий мир' },
];

export interface WeekInfo {
  id: WeekId;
  label: string;
  dateRange: string;
}

export const weeksInfo: WeekInfo[] = [
  { id: 'W1', label: '1-7 сентября', dateRange: '01.09.2023 - 07.09.2023' },
  { id: 'W2', label: '8-14 сентября', dateRange: '08.09.2023 - 14.09.2023' },
  { id: 'W3', label: '15-21 сентября', dateRange: '15.09.2023 - 21.09.2023' },
  { id: 'W4', label: '22-28 сентября', dateRange: '22.09.2023 - 28.09.2023' },
  { id: 'W5', label: '29 сент - 5 окт', dateRange: '29.09.2023 - 05.10.2023' },
  { id: 'W6', label: '6-12 октября', dateRange: '06.10.2023 - 12.10.2023' },
  { id: 'W7', label: '13-19 октября', dateRange: '13.10.2023 - 19.10.2023' },
  { id: 'W8', label: '20-26 октября', dateRange: '20.10.2023 - 26.10.2023' },
];

export const weeks: WeekId[] = weeksInfo.map(w => w.id);

export const terms: Term[] = [
  { 
    id: 'Q1-2023', 
    name: 'I четверть 2023',
    weeks: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'] 
  }
];

export const defaultWeek: WeekId = 'W1';
export const defaultTerm: TermId = 'Q1-2023';

export const getWeekLabel = (weekId: WeekId): string => {
  const week = weeksInfo.find(w => w.id === weekId);
  return week ? week.label : weekId;
};