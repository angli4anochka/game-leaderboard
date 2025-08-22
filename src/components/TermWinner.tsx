import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../store';
import { selectStudents, selectSubjects, selectTerms, selectCurrentTerm } from '../store/selectors';
import { cellPoints } from '../types';

const TermWinner: React.FC = () => {
  const students = useAppSelector(selectStudents);
  const subjects = useAppSelector(selectSubjects);
  const terms = useAppSelector(selectTerms);
  const currentTermId = useAppSelector(selectCurrentTerm);
  const cells = useAppSelector(state => state.game.cells);
  const [showWinner, setShowWinner] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [lastCalculatedTerm, setLastCalculatedTerm] = useState<string | null>(null);

  const currentTerm = terms.find(t => t.id === currentTermId);

  // Сбрасываем показ победителя при смене четверти
  useEffect(() => {
    if (lastCalculatedTerm !== currentTermId) {
      setShowWinner(false);
      setIsCalculating(false);
    }
  }, [currentTermId, lastCalculatedTerm]);

  const calculateWinner = () => {
    setIsCalculating(true);
    setLastCalculatedTerm(currentTermId);
    
    // Симуляция расчета для эффекта
    setTimeout(() => {
      setIsCalculating(false);
      setShowWinner(true);
    }, 2000);
  };

  const termData = React.useMemo(() => {
    if (!currentTerm) return { winner: null, allScores: [], hasAnyScores: false, weeklyBreakdown: {} };

    // Подсчитываем очки за каждую неделю четверти
    const weeklyBreakdown: Record<string, Record<string, number>> = {};
    const totalScores = students.map(student => {
      let totalPoints = 0;
      const studentWeeklyPoints: Record<string, number> = {};

      currentTerm.weeks.forEach(weekId => {
        let weekPoints = 0;
        subjects.forEach(subject => {
          const cellKey = `${student.id}-${subject.id}-${weekId}`;
          const cell = cells[cellKey];
          if (cell) {
            weekPoints += cellPoints(cell.grades);
          }
        });
        studentWeeklyPoints[weekId] = weekPoints;
        totalPoints += weekPoints;
      });

      weeklyBreakdown[student.id] = studentWeeklyPoints;

      return {
        student,
        points: totalPoints,
        weeklyPoints: studentWeeklyPoints
      };
    });

    totalScores.sort((a, b) => b.points - a.points);
    
    const hasAnyScores = totalScores.some(s => s.points !== 0);
    const winner = totalScores[0];
    
    return {
      winner: hasAnyScores ? winner : null,
      allScores: totalScores,
      hasTie: totalScores.filter(s => s.points === winner?.points).length > 1,
      hasAnyScores,
      weeklyBreakdown
    };
  }, [students, subjects, currentTerm, cells]);

  const getStudentAvatar = (name: string): string => {
    const avatars: Record<string, string> = {
      'Ира': '👧',
      'Максим': '👦',
      'Лена': '👧',
      'Глеб': '👦',
      'Софья': '👧',
      'Артём': '👦'
    };
    return avatars[name] || '🧑';
  };

  const getRankEmoji = (rank: number): string => {
    switch(rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '🎯';
    }
  };

  const getWeekLabel = (weekId: string): string => {
    const weekLabels: Record<string, string> = {
      'W1': '1-7 сент',
      'W2': '8-14 сент',
      'W3': '15-21 сент',
      'W4': '22-28 сент',
      'W5': '29 сент-5 окт',
      'W6': '6-12 окт',
      'W7': '13-19 окт',
      'W8': '20-26 окт'
    };
    return weekLabels[weekId] || weekId;
  };

  if (!currentTerm) {
    return (
      <div className="mt-8 mb-8 text-center text-gray-500">
        Четверть не выбрана
      </div>
    );
  }

  return (
    <div className="mt-8 mb-8">
      {/* Кнопка для определения победителя четверти */}
      {!showWinner && (
        <div className="flex justify-center">
          <button
            onClick={calculateWinner}
            disabled={isCalculating}
            className={`
              relative px-8 py-4 rounded-2xl font-bold text-lg text-white
              transform transition-all duration-300 hover:scale-105
              ${isCalculating 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 shadow-2xl hover:shadow-3xl'
              }
            `}
          >
            {isCalculating ? (
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <span>Подсчитываем итоги четверти...</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏅</span>
                <span>Определить победителя четверти!</span>
                <span className="text-2xl">🎊</span>
              </div>
            )}
            
            {/* Animated glow effect */}
            {!isCalculating && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 blur-xl opacity-50 animate-pulse"></div>
            )}
          </button>
        </div>
      )}

      {/* Результаты */}
      {showWinner && termData.hasAnyScores && (
        <div className="space-y-6">
          {/* Победитель четверти */}
          <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-indigo-100 rounded-2xl p-8 shadow-xl border-4 border-purple-300">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800 mb-4">
                🎉 Победитель {currentTerm.name}! 🎉
              </div>
              
              <div className="flex justify-center items-center gap-4 mb-4">
                <div className="text-6xl animate-bounce">
                  {getStudentAvatar(termData.winner.student.name)}
                </div>
                <div>
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                    {termData.winner.student.name}
                  </div>
                  <div className="text-2xl text-gray-700 mt-2">
                    {termData.winner.points > 0 ? '+' : ''}{termData.winner.points} очков за четверть
                  </div>
                </div>
                <div className="text-6xl animate-pulse">
                  🏅
                </div>
              </div>

              {termData.hasTie && (
                <div className="text-orange-600 text-lg font-semibold mt-4">
                  ⚡ Ничья с другими участниками!
                </div>
              )}
            </div>
          </div>

          {/* Таблица всех результатов с разбивкой по неделям */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              📊 Итоговый рейтинг четверти
            </h3>
            
            {/* Заголовок таблицы */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left">Место</th>
                    <th className="p-3 text-left">Ученик</th>
                    {currentTerm.weeks.map(weekId => (
                      <th key={weekId} className="p-2 text-center text-xs">
                        {getWeekLabel(weekId)}
                      </th>
                    ))}
                    <th className="p-3 text-center font-bold">Итого</th>
                  </tr>
                </thead>
                <tbody>
                  {termData.allScores.map((score, index) => (
                    <tr 
                      key={score.student.id}
                      className={`
                        border-t
                        ${index === 0 ? 'bg-yellow-50' :
                          index === 1 ? 'bg-gray-50' :
                          index === 2 ? 'bg-orange-50' :
                          'bg-white'
                        }
                        transform transition-all hover:scale-101 hover:shadow-md
                      `}
                      style={{ 
                        animationDelay: `${index * 0.1}s`,
                        animation: 'slideIn 0.5s ease-out forwards'
                      }}
                    >
                      <td className="p-3">
                        <div className="text-2xl">
                          {getRankEmoji(index + 1)}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="text-2xl">
                            {getStudentAvatar(score.student.name)}
                          </div>
                          <div className="font-bold">
                            {score.student.name}
                          </div>
                        </div>
                      </td>
                      {currentTerm.weeks.map(weekId => (
                        <td key={weekId} className="p-2 text-center">
                          <span className={`
                            inline-block px-2 py-1 rounded text-sm font-medium
                            ${score.weeklyPoints[weekId] > 0 ? 'bg-green-100 text-green-700' :
                              score.weeklyPoints[weekId] < 0 ? 'bg-red-100 text-red-700' :
                              'bg-gray-100 text-gray-500'
                            }
                          `}>
                            {score.weeklyPoints[weekId] > 0 ? '+' : ''}{score.weeklyPoints[weekId]}
                          </span>
                        </td>
                      ))}
                      <td className="p-3 text-center">
                        <div className={`
                          text-xl font-bold px-3 py-2 rounded-full inline-block
                          ${score.points > 0 ? 'bg-green-100 text-green-600' :
                            score.points < 0 ? 'bg-red-100 text-red-600' :
                            'bg-gray-100 text-gray-600'
                          }
                        `}>
                          {score.points > 0 ? '+' : ''}{score.points}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Статистика */}
            <div className="mt-6 grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {termData.allScores.filter(s => s.points > 0).length}
                </div>
                <div className="text-sm text-gray-600">С положительным балансом</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {currentTerm.weeks.length}
                </div>
                <div className="text-sm text-gray-600">Недель в четверти</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {termData.allScores.reduce((sum, s) => sum + s.points, 0)}
                </div>
                <div className="text-sm text-gray-600">Всего очков</div>
              </div>
            </div>
          </div>

          {/* Кнопка сброса */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowWinner(false)}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-colors"
            >
              Скрыть результаты
            </button>
          </div>
        </div>
      )}

      {/* Если нет данных */}
      {showWinner && !termData.hasAnyScores && (
        <div className="bg-orange-50 border-2 border-orange-300 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-4">😅</div>
          <div className="text-xl font-semibold text-orange-800">
            Пока нет оценок за эту четверть!
          </div>
          <div className="text-gray-600 mt-2">
            Добавьте оценки в режиме редактирования
          </div>
          <button
            onClick={() => setShowWinner(false)}
            className="mt-4 px-6 py-2 bg-orange-200 hover:bg-orange-300 text-orange-800 font-semibold rounded-xl transition-colors"
          >
            Понятно
          </button>
        </div>
      )}

      {/* Animation styles */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default TermWinner;