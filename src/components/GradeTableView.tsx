import React from 'react';
import { useAppSelector } from '../store';
import { selectStudents, selectSubjects, selectCurrentWeek } from '../store/selectors';
import GradeCellView from './GradeCellView';

const GradeTableView: React.FC = () => {
  const students = useAppSelector(selectStudents);
  const subjects = useAppSelector(selectSubjects);
  const currentWeek = useAppSelector(selectCurrentWeek);

  const getSubjectEmoji = (subjectId: string): string => {
    const emojis: Record<string, string> = {
      'math': '🔢',
      'rus': '📝',
      'eng': '🌍',
      'sci': '🌱'
    };
    return emojis[subjectId] || '📚';
  };

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

  const getStudentColor = (index: number): string => {
    const colors = [
      'from-pink-400 to-pink-500',
      'from-blue-400 to-blue-500',
      'from-purple-400 to-purple-500',
      'from-green-400 to-green-500',
      'from-yellow-400 to-yellow-500',
      'from-red-400 to-red-500'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl shadow-xl">
      <div className="overflow-auto bg-white/90 backdrop-blur rounded-xl shadow-inner">
        <table className="w-full border-collapse">
          {/* Заголовок с именами учеников */}
          <thead>
            <tr>
              <th className="sticky left-0 bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 text-left font-bold rounded-tl-xl">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📚</span>
                  <span className="text-lg">Предметы</span>
                </div>
              </th>
              {students.map((student, index) => (
                <th 
                  key={student.id} 
                  className={`p-4 text-center font-bold text-white bg-gradient-to-r ${getStudentColor(index)}`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-3xl drop-shadow-md">
                      {getStudentAvatar(student.name)}
                    </div>
                    <div className="text-sm font-bold drop-shadow">
                      {student.name}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          {/* Тело таблицы с предметами и ячейками оценок */}
          <tbody>
            {subjects.map((subject, subjectIndex) => (
              <tr 
                key={subject.id}
                className={`border-t-2 border-white ${
                  subjectIndex % 2 === 0 
                    ? 'bg-gradient-to-r from-yellow-50 to-orange-50' 
                    : 'bg-gradient-to-r from-green-50 to-blue-50'
                }`}
              >
                {/* Название предмета */}
                <td className="sticky left-0 p-4 font-bold bg-white/95 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getSubjectEmoji(subject.id)}</span>
                    <div>
                      <div className="text-gray-800 font-bold">{subject.name}</div>
                      <div className="text-xs text-gray-500">Предмет</div>
                    </div>
                  </div>
                </td>
                
                {/* Ячейки с оценками для каждого ученика */}
                {students.map((student) => (
                  <td 
                    key={`${student.id}-${subject.id}`}
                    className="p-3 border-l-2 border-white"
                  >
                    <div className="transform hover:scale-105 transition-transform">
                      <GradeCellView
                        studentId={student.id}
                        subjectId={subject.id}
                        weekId={currentWeek}
                      />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GradeTableView;