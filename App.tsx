import React, { useState } from 'react';
import { AppState } from './types';
import ValentineCard from './components/ValentineCard';
import SuccessView from './components/SuccessView';
import FloatingHearts from './components/FloatingHearts';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.ASKING);

  const handleYes = () => {
    setAppState(AppState.ACCEPTED);
  };

  return (
    <div className="relative min-h-screen w-full bg-hearts bg-pink-100 flex items-center justify-center p-4">
      {/* Background Animation */}
      <FloatingHearts />

      {/* Main Content */}
      <div className="z-10 w-full flex justify-center">
        {appState === AppState.ASKING ? (
          <ValentineCard onYes={handleYes} />
        ) : (
          <SuccessView />
        )}
      </div>
      
      {/* Footer */}
      <div className="fixed bottom-2 right-4 text-pink-300 text-xs z-0 pointer-events-none opacity-50">
        Made with Love & React
      </div>
    </div>
  );
};

export default App;
