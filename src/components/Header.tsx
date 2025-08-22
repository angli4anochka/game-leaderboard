import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { setCurrentWeek, setCurrentTerm } from '../store/slices/gameSlice';
import { selectWeeks, selectTerms, selectCurrentWeek, selectCurrentTerm } from '../store/selectors';
import { weeksInfo, getWeekLabel } from '../data/initialData';

interface HeaderProps {
  currentPage: 'view' | 'edit';
  onPageChange: (page: 'view' | 'edit') => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange }) => {
  const dispatch = useAppDispatch();
  const weeks = useAppSelector(selectWeeks);
  const terms = useAppSelector(selectTerms);
  const currentWeek = useAppSelector(selectCurrentWeek);
  const currentTerm = useAppSelector(selectCurrentTerm);

  return (
    <div className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          {/* Заголовок по центру */}
          <h1 className="text-2xl font-bold text-gray-900 text-center">
            🏆 Таблица успеваемости класса
          </h1>
          
          {/* Навигация */}
          <div className="flex justify-between items-center">
            {/* Селекторы недели и четверти слева */}
            <div className="flex gap-4 items-center">
              {/* Выбор недели */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Неделя:</label>
                <select
                  value={currentWeek}
                  onChange={(e) => dispatch(setCurrentWeek(e.target.value))}
                  className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  {weeksInfo.map((week) => (
                    <option key={week.id} value={week.id}>
                      {week.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Выбор четверти */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Четверть:</label>
                <select
                  value={currentTerm}
                  onChange={(e) => dispatch(setCurrentTerm(e.target.value))}
                  className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  {terms.map((term) => (
                    <option key={term.id} value={term.id}>
                      {term.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Кнопки переключения страниц справа */}
            <div className="flex gap-2">
              <button
                onClick={() => onPageChange('view')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentPage === 'view' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                📊 Просмотр оценок
              </button>
              <button
                onClick={() => onPageChange('edit')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentPage === 'edit' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                ✏️ Редактировать
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;