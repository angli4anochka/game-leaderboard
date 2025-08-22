import React, { useState } from 'react';
import { useAppSelector } from '../store';
import { selectCell, selectStudents, selectSubjects } from '../store/selectors';
import { StudentId, SubjectId, WeekId, cellPoints } from '../types';
import GradeEditModal from './GradeEditModal';

interface GradeCellProps {
  studentId: StudentId;
  subjectId: SubjectId;
  weekId: WeekId;
}

const GradeCell: React.FC<GradeCellProps> = ({ studentId, subjectId, weekId }) => {
  const cell = useAppSelector(state => selectCell(state, studentId, subjectId, weekId));
  const students = useAppSelector(selectStudents);
  const subjects = useAppSelector(selectSubjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const grades = cell?.grades || [];
  const points = cellPoints(grades);
  
  const student = students.find(s => s.id === studentId);
  const subject = subjects.find(s => s.id === subjectId);

  const getGradeColor = (grade: number): string => {
    switch (grade) {
      case 5: return 'bg-gradient-to-br from-green-400 to-green-500 text-white shadow-md';
      case 4: return 'bg-gradient-to-br from-blue-400 to-blue-500 text-white shadow-md';
      case 3: return 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-white shadow-md';
      case 2: return 'bg-gradient-to-br from-red-400 to-red-500 text-white shadow-md';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const getGradeEmoji = (grade: number): string => {
    switch (grade) {
      case 5: return '⭐';
      case 4: return '👍';
      case 3: return '👌';
      case 2: return '💪';
      default: return '';
    }
  };

  const getPointsColor = (points: number): string => {
    if (points > 0) return 'text-green-600 font-bold';
    if (points < 0) return 'text-red-600 font-bold';
    return 'text-gray-600';
  };

  return (
    <>
      <div 
        className="min-h-20 p-3 bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-400 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Отображение текущих оценок */}
        <div className="flex flex-wrap gap-2 mb-2 justify-center">
          {grades.length > 0 ? (
            grades.map((grade, index) => (
              <div
                key={index}
                className={`relative inline-flex items-center justify-center w-10 h-10 rounded-full text-lg font-bold ${getGradeColor(grade)} transform hover:scale-110 transition-transform`}
              >
                <span className="absolute -top-1 -right-1 text-xs">{getGradeEmoji(grade)}</span>
                {grade}
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-sm flex flex-col items-center">
              <span className="text-2xl mb-1">📝</span>
              <span>Кликни!</span>
            </div>
          )}
        </div>
        
        {/* Отображение очков */}
        {grades.length > 0 && (
          <div className={`text-sm text-center ${getPointsColor(points)}`}>
            <span className="inline-block bg-white/80 rounded-full px-2 py-1">
              {points > 0 ? `+${points}` : points} оч.
            </span>
          </div>
        )}
      </div>

      {/* Modal for editing grades */}
      <GradeEditModal
        studentId={studentId}
        studentName={student?.name || ''}
        subjectId={subjectId}
        subjectName={subject?.name || ''}
        weekId={weekId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default GradeCell;