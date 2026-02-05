import React, { useState, useEffect } from 'react';
import { AppState } from './types';
import ValentineCard from './components/ValentineCard';
import SuccessView from './components/SuccessView';
import FloatingHearts from './components/FloatingHearts';

// Helper to determine state from hash
const getAppStateFromHash = (): AppState => {
  const hash = window.location.hash.replace('#', '').toLowerCase();
  return hash === 'yes' ? AppState.ACCEPTED : AppState.ASKING;
};

const App: React.FC = () => {
  // Initialize state based on current URL hash
  const [appState, setAppState] = useState<AppState>(getAppStateFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      setAppState(getAppStateFromHash());
    };

    // Listen for hash changes (back/forward button support)
    window.addEventListener('hashchange', handleHashChange);
    
    // Cleanup
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleYes = () => {
    // Navigate via hash updates. The event listener will update the state.
    window.location.hash = 'yes';
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