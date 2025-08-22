import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Header from './components/Header';
import GradeTable from './components/GradeTable';
import GradeTableView from './components/GradeTableView';
import WeekWinner from './components/WeekWinner';
import TermWinner from './components/TermWinner';
import DebugInfo from './components/DebugInfo';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'view' | 'edit'>('view');

  return (
    <Provider store={store}>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Хедер с навигацией */}
        <Header currentPage={currentPage} onPageChange={setCurrentPage} />
        
        {/* Основной контент */}
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 p-4 overflow-auto">
            <div className="max-w-full">
              {currentPage === 'view' ? (
                <>
                  <GradeTableView />
                  <WeekWinner />
                  <TermWinner />
                </>
              ) : (
                <>
                  <GradeTable />
                  <WeekWinner />
                  <TermWinner />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default App;