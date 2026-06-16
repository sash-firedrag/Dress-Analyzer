import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Auth from './components/Auth';
import ThemeSelector from './components/ThemeSelector';
import AICombinator from './components/AICombinator';
import { Sparkles, LogOut } from 'lucide-react';
import { auth } from './services/firebase';

function MainApp() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Auth />;
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>
          <Sparkles className="icon-pulse" /> StyleAI
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span className="hide-on-mobile">
            {currentUser.email}
          </span>
          <button 
            className="btn-primary" 
            style={{ padding: '0.5rem 1rem', background: 'rgba(239, 68, 68, 0.8)' }}
            onClick={() => auth.signOut()}
            title="Log Out"
          >
            <LogOut size={18} />
            <span className="hide-on-mobile">Logout</span>
          </button>
        </div>
      </header>

      <div style={{ marginBottom: '2rem' }}>
        <ThemeSelector />
      </div>

      <main>
        <AICombinator />
      </main>
      
      <footer style={{ textAlign: 'center', marginTop: '4rem', padding: '2rem', color: 'var(--text-muted)' }}>
        <p>StyleAI Combinator &copy; 2026. Designed with React & Vite.</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </ThemeProvider>
  );
}
