import React, { useEffect } from 'react';
import './App.css';
import StringCalculator from './components/StringCalculator';

function App() {
  return (
    <div data-testid="app-component" className="text-center">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className='text-2xl pb-6 font-bold'>String Calculator Application</div>
        <StringCalculator/>
      </div>
    </div>
  );
}

export default App;
