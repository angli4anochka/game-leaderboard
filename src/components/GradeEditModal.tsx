import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { upsertCell } from '../store/slices/gameSlice';
import { selectCell } from '../store/selectors';
import { StudentId, SubjectId, WeekId, cellPoints } from '../types';

interface GradeEditModalProps {
  studentId: StudentId;
  studentName: string;
  subjectId: SubjectId;
  subjectName: string;
  weekId: WeekId;
  isOpen: boolean;
  onClose: () => void;
}

const VALID_GRADES = [2, 3, 4, 5];
const MAX_GRADES = 3;

const GradeEditModal: React.FC<GradeEditModalProps> = ({
  studentId,
  studentName,
  subjectId,
  subjectName,
  weekId,
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const cell = useAppSelector(state => selectCell(state, studentId, subjectId, weekId));
  const [tempGrades, setTempGrades] = useState<number[]>([]);

  useEffect(() => {
    setTempGrades(cell?.grades || []);
  }, [cell, isOpen]);

  useEffect(() => {
    // Block body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddGrade = (grade: number) => {
    if (tempGrades.length < MAX_GRADES) {
      setTempGrades([...tempGrades, grade]);
    }
  };

  const handleRemoveGrade = (index: number) => {
    setTempGrades(tempGrades.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    dispatch(upsertCell({ studentId, subjectId, weekId, grades: tempGrades }));
    onClose();
  };

  const points = cellPoints(tempGrades);

  const getGradeColor = (grade: number): string => {
    switch (grade) {
      case 5: return 'bg-gradient-to-br from-green-400 to-green-500 text-white shadow-lg hover:shadow-xl';
      case 4: return 'bg-gradient-to-br from-blue-400 to-blue-500 text-white shadow-lg hover:shadow-xl';
      case 3: return 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-white shadow-lg hover:shadow-xl';
      case 2: return 'bg-gradient-to-br from-red-400 to-red-500 text-white shadow-lg hover:shadow-xl';
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

  const modalContent = (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div 
          className="bg-white rounded-3xl shadow-2xl p-8 max-w-xl w-full transform scale-100 animate-bounce-in relative"
          onClick={(e) => e.stopPropagation()}
          style={{ maxHeight: '90vh', overflowY: 'auto' }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors text-3xl font-bold hover:rotate-90 transform transition-transform"
          >
            ✕
          </button>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              ✏️ Редактирование оценок
            </h2>
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-3">
                <span className="text-gray-600 font-medium">Ученик:</span>
                <span className="text-xl font-bold text-gray-800">{studentName}</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <span className="text-gray-600 font-medium">Предмет:</span>
                <span className="text-xl font-bold text-gray-800">{subjectName}</span>
              </div>
            </div>
          </div>

          {/* Current grades */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
              Текущие оценки ({tempGrades.length}/{MAX_GRADES}):
            </h3>
            <div className="flex flex-wrap gap-4 justify-center min-h-[80px] p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-100">
              {tempGrades.length > 0 ? (
                tempGrades.map((grade, index) => (
                  <div
                    key={index}
                    className={`relative inline-flex items-center justify-center w-16 h-16 rounded-2xl text-2xl font-bold ${getGradeColor(grade)} transform hover:scale-110 transition-all cursor-pointer group`}
                    onClick={() => handleRemoveGrade(index)}
                    title="Кликни чтобы удалить"
                  >
                    <span className="absolute -top-2 -right-2 text-sm">{getGradeEmoji(grade)}</span>
                    {grade}
                    <span className="absolute -bottom-3 text-xs opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white px-2 py-1 rounded-full">Удалить</span>
                  </div>
                ))
              ) : (
                <div className="text-gray-400 text-center w-full py-4">
                  <span className="text-4xl">📝</span>
                  <p className="text-lg mt-2">Нет оценок</p>
                  <p className="text-sm mt-1">Выберите оценку ниже</p>
                </div>
              )}
            </div>
            
            {/* Points display */}
            {tempGrades.length > 0 && (
              <div className="mt-4 text-center">
                <span className={`inline-block px-6 py-3 rounded-full text-xl font-bold ${
                  points > 0 ? 'bg-green-100 text-green-600' :
                  points < 0 ? 'bg-red-100 text-red-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {points > 0 ? `+${points}` : points} очков
                </span>
              </div>
            )}
          </div>

          {/* Add grade buttons */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
              {tempGrades.length < MAX_GRADES ? '🎯 Выберите оценку:' : '🎈 Максимум оценок достигнут!'}
            </h3>
            {tempGrades.length < MAX_GRADES ? (
              <div className="flex justify-center gap-4">
                {VALID_GRADES.map((grade) => (
                  <button
                    key={grade}
                    onClick={() => handleAddGrade(grade)}
                    className={`relative w-20 h-20 rounded-2xl text-3xl font-bold transition-all transform hover:scale-125 hover:rotate-6 ${getGradeColor(grade)}`}
                  >
                    <span className="absolute -top-2 -right-2 text-lg">{getGradeEmoji(grade)}</span>
                    {grade}
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center text-orange-600 bg-orange-100 rounded-xl p-4 font-medium">
                Удалите существующую оценку, чтобы добавить новую
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-4 bg-gray-200 text-gray-700 font-semibold text-lg rounded-xl hover:bg-gray-300 transition-colors"
            >
              Отмена
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
            >
              💾 Сохранить
            </button>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes bounce-in {
          0% {
            transform: scale(0.9);
            opacity: 0;
          }
          50% {
            transform: scale(1.02);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.3s ease-out;
        }
      `}</style>
    </>
  );

  // Use React Portal to render modal at the root level
  return ReactDOM.createPortal(
    modalContent,
    document.body
  );
};

export default GradeEditModal;