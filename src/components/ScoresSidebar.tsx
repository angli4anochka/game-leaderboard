import React from 'react';
import { useAppSelector } from '../store';
import { 
  selectWeeklyScores, 
  selectTermScores, 
  selectWeeklyWinner, 
  selectTermWinner,
  selectCurrentWeek,
  selectCurrentTerm,
  selectTerms
} from '../store/selectors';

const ScoresSidebar: React.FC = () => {
  const weeklyScores = useAppSelector(selectWeeklyScores);
  const termScores = useAppSelector(selectTermScores);
  const weeklyWinner = useAppSelector(selectWeeklyWinner);
  const termWinner = useAppSelector(selectTermWinner);
  const currentWeek = useAppSelector(selectCurrentWeek);
  const currentTerm = useAppSelector(selectCurrentTerm);
  const terms = useAppSelector(selectTerms);

  const currentTermName = terms.find(t => t.id === currentTerm)?.name || currentTerm;

  const getScoreColor = (points: number): string => {
    if (points > 0) return 'text-green-600';
    if (points < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getScoreBadge = (points: number): string => {
    if (points > 0) return 'bg-green-100 text-green-800';
    if (points < 0) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getMedalEmoji = (index: number): string => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return `${index + 1}.`;
    }
  };

  return (
    <div className="w-80 bg-white shadow-lg border-l border-gray-200 overflow-y-auto">
      <div className="p-4 space-y-6">
        
        {/* Итоги недели */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-bold text-gray-900">📊 Итоги недели</h3>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              {currentWeek}
            </span>
          </div>

          {/* Победитель недели */}
          {weeklyWinner && weeklyWinner.length > 0 && (
            <div className="mb-4 p-3 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-lg border border-yellow-300">
              <div className="text-sm font-medium text-yellow-800 mb-2">
                🏆 Лидер{weeklyWinner.length > 1 ? 'ы' : ''} недели:
              </div>
              {weeklyWinner.map((winner) => (
                <div key={winner.studentId} className="flex items-center justify-between">
                  <span className="font-bold text-yellow-900">{winner.studentName}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${getScoreBadge(winner.points)}`}>
                    {winner.points > 0 ? `+${winner.points}` : winner.points} оч.
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Рейтинг недели */}
          <div className="space-y-2">
            {weeklyScores.map((score, index) => (
              <div 
                key={score.studentId}
                className={`flex items-center justify-between p-2 rounded-md transition-colors ${
                  index < 3 ? 'bg-gray-50 border border-gray-200' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium w-6">
                    {getMedalEmoji(index)}
                  </span>
                  <span className="font-medium text-gray-900">{score.studentName}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${getScoreBadge(score.points)}`}>
                  {score.points > 0 ? `+${score.points}` : score.points} оч.
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Разделитель */}
        <div className="border-t border-gray-200"></div>

        {/* Итоги четверти */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-bold text-gray-900">📈 Итоги четверти</h3>
            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
              {currentTermName}
            </span>
          </div>

          {/* Победитель четверти */}
          {termWinner && termWinner.length > 0 && (
            <div className="mb-4 p-3 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg border border-purple-300">
              <div className="text-sm font-medium text-purple-800 mb-2">
                👑 Лидер{termWinner.length > 1 ? 'ы' : ''} четверти:
              </div>
              {termWinner.map((winner) => (
                <div key={winner.studentId} className="flex items-center justify-between">
                  <span className="font-bold text-purple-900">{winner.studentName}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${getScoreBadge(winner.points)}`}>
                    {winner.points > 0 ? `+${winner.points}` : winner.points} оч.
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Рейтинг четверти */}
          <div className="space-y-2">
            {termScores.map((score, index) => (
              <div 
                key={score.studentId}
                className={`flex items-center justify-between p-2 rounded-md transition-colors ${
                  index < 3 ? 'bg-gray-50 border border-gray-200' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium w-6">
                    {getMedalEmoji(index)}
                  </span>
                  <span className="font-medium text-gray-900">{score.studentName}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${getScoreBadge(score.points)}`}>
                  {score.points > 0 ? `+${score.points}` : score.points} оч.
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Информация о правилах */}
        <div className="mt-6 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm font-medium text-gray-700 mb-2">📋 Правила подсчета:</div>
          <div className="text-xs text-gray-600 space-y-1">
            <div>• Оценка 5 → +5 очков</div>
            <div>• Оценка 4 → +4 очка</div>
            <div>• Оценка 3 → 0 очков</div>
            <div>• Оценка 2 → −2 очка</div>
            <div className="mt-2 text-gray-500">
              Максимум 3 оценки в ячейке
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoresSidebar;