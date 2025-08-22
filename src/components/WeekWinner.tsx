import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../store';
import { selectStudents, selectSubjects, selectCurrentWeek } from '../store/selectors';
import { cellPoints } from '../types';

const WeekWinner: React.FC = () => {
  const students = useAppSelector(selectStudents);
  const subjects = useAppSelector(selectSubjects);
  const currentWeek = useAppSelector(selectCurrentWeek);
  const cells = useAppSelector(state => state.game.cells);
  const [showWinner, setShowWinner] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [lastCalculatedWeek, setLastCalculatedWeek] = useState<string | null>(null);

  // Сбрасываем показ победителя при смене недели
  useEffect(() => {
    if (lastCalculatedWeek !== currentWeek) {
      setShowWinner(false);
      setIsCalculating(false);
    }
  }, [currentWeek, lastCalculatedWeek]);

  const calculateWinner = () => {
    setIsCalculating(true);
    setLastCalculatedWeek(currentWeek);
    
    // Симуляция расчета для эффекта
    setTimeout(() => {
      setIsCalculating(false);
      setShowWinner(true);
    }, 1500);
  };

  const winnerData = React.useMemo(() => {
    const scores = students.map(student => ({
      student,
      points: subjects.reduce((total, subject) => {
        const cellKey = `${student.id}-${subject.id}-${currentWeek}`;
        const cell = cells[cellKey];
        const cellPointsValue = cell ? cellPoints(cell.grades) : 0;
        
        // Debug log
        if (cell && cell.grades.length > 0) {
          console.log(`Found grades for ${student.name} in ${subject.name}:`, cell.grades, 'Points:', cellPointsValue);
        }
        
        return total + cellPointsValue;
      }, 0)
    }));

    console.log('Current week:', currentWeek);
    console.log('All cells keys:', Object.keys(cells));
    console.log('Scores calculated:', scores);

    scores.sort((a, b) => b.points - a.points);
    
    // Проверяем, есть ли хотя бы у кого-то очки
    const hasAnyScores = scores.some(s => s.points !== 0);
    const winner = scores[0];
    
    return {
      winner: hasAnyScores ? winner : null,
      allScores: scores,
      hasTie: scores.filter(s => s.points === winner?.points).length > 1,
      hasAnyScores
    };
  }, [students, subjects, currentWeek, cells]);

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

  return (
    <div className="mt-8 mb-8">
      {/* Кнопка для определения победителя */}
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
                : 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 shadow-2xl hover:shadow-3xl'
              }
            `}
          >
            {isCalculating ? (
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <span>Подсчитываем очки...</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏆</span>
                <span>Определить победителя недели!</span>
                <span className="text-2xl">🎉</span>
              </div>
            )}
            
            {/* Animated glow effect */}
            {!isCalculating && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 blur-xl opacity-50 animate-pulse"></div>
            )}
          </button>
        </div>
      )}

      {/* Результаты */}
      {showWinner && winnerData.hasAnyScores && (
        <div className="space-y-6">
          {/* Победитель */}
          <div className="bg-gradient-to-r from-yellow-100 via-yellow-50 to-yellow-100 rounded-2xl p-8 shadow-xl border-4 border-yellow-300">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800 mb-4">
                🎊 Победитель недели! 🎊
              </div>
              
              <div className="flex justify-center items-center gap-4 mb-4">
                <div className="text-6xl animate-bounce">
                  {getStudentAvatar(winnerData.winner.student.name)}
                </div>
                <div>
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-red-600">
                    {winnerData.winner.student.name}
                  </div>
                  <div className="text-2xl text-gray-700 mt-2">
                    {winnerData.winner.points > 0 ? '+' : ''}{winnerData.winner.points} очков
                  </div>
                </div>
                <div className="text-6xl animate-pulse">
                  🏆
                </div>
              </div>

              {winnerData.hasTie && (
                <div className="text-orange-600 text-lg font-semibold mt-4">
                  ⚡ Ничья с другими участниками!
                </div>
              )}
            </div>
          </div>

          {/* Таблица всех результатов */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              📊 Рейтинг всех учеников
            </h3>
            
            <div className="space-y-3">
              {winnerData.allScores.map((score, index) => (
                <div 
                  key={score.student.id}
                  className={`
                    flex items-center justify-between p-4 rounded-xl
                    ${index === 0 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300' :
                      index === 1 ? 'bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-300' :
                      index === 2 ? 'bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-300' :
                      'bg-gray-50 border border-gray-200'
                    }
                    transform transition-all hover:scale-102 hover:shadow-md
                  `}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    animation: 'slideIn 0.5s ease-out forwards'
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">
                      {getRankEmoji(index + 1)}
                    </div>
                    <div className="text-3xl">
                      {getStudentAvatar(score.student.name)}
                    </div>
                    <div>
                      <div className="font-bold text-lg">
                        {score.student.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {index + 1} место
                      </div>
                    </div>
                  </div>
                  
                  <div className={`
                    text-2xl font-bold px-4 py-2 rounded-full
                    ${score.points > 0 ? 'bg-green-100 text-green-600' :
                      score.points < 0 ? 'bg-red-100 text-red-600' :
                      'bg-gray-100 text-gray-600'
                    }
                  `}>
                    {score.points > 0 ? '+' : ''}{score.points}
                  </div>
                </div>
              ))}
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
      {showWinner && !winnerData.hasAnyScores && (
        <div className="bg-orange-50 border-2 border-orange-300 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-4">😅</div>
          <div className="text-xl font-semibold text-orange-800">
            Пока нет оценок за эту неделю!
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

export default WeekWinner;