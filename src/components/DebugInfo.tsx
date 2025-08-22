import React from 'react';
import { useAppSelector } from '../store';

const DebugInfo: React.FC = () => {
  const cells = useAppSelector(state => state.game.cells);
  const currentWeek = useAppSelector(state => state.game.currentWeek);
  
  // Подсчитаем количество оценок для текущей недели
  const currentWeekCells = Object.keys(cells).filter(key => key.endsWith(`-${currentWeek}`));
  const totalGrades = currentWeekCells.reduce((total, key) => {
    const cell = cells[key];
    return total + (cell?.grades?.length || 0);
  }, 0);

  // Найдем все недели с данными
  const weeksWithData = new Set<string>();
  Object.keys(cells).forEach(key => {
    const parts = key.split('-');
    if (parts.length >= 3) {
      weeksWithData.add(parts[2]);
    }
  });

  return (
    <div className="fixed bottom-4 right-4 bg-white border-2 border-gray-300 rounded-lg shadow-lg p-4 max-w-xs z-50">
      <h3 className="font-bold text-sm mb-2">🐛 Debug Info</h3>
      <div className="text-xs space-y-1">
        <div>Текущая неделя: <span className="font-mono bg-gray-100 px-1">{currentWeek}</span></div>
        <div>Всего ячеек: {Object.keys(cells).length}</div>
        <div>Ячеек для текущей недели: {currentWeekCells.length}</div>
        <div>Оценок на текущей неделе: {totalGrades}</div>
        <div>Недели с данными: {Array.from(weeksWithData).join(', ') || 'нет'}</div>
      </div>
      {currentWeekCells.length > 0 && (
        <details className="mt-2">
          <summary className="cursor-pointer text-xs text-blue-600">Показать ячейки</summary>
          <div className="mt-1 text-xs max-h-40 overflow-y-auto">
            {currentWeekCells.map(key => (
              <div key={key} className="font-mono bg-gray-50 p-1 mb-1">
                {key}: {JSON.stringify(cells[key].grades)}
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
};

export default DebugInfo;