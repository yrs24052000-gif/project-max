import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardHome } from './pages/DashboardHome';
import { ActiveQuotes } from './pages/ActiveQuotes';
import { ColdQuotes } from './pages/ColdQuotes';
import { Meetings } from './pages/Meetings';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { SignIn } from './pages/SignIn';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardHome onNavigate={setCurrentPage} />;
      case 'active-quotes':
        return <ActiveQuotes />;
      case 'cold-quotes':
        return <ColdQuotes />;
      case 'meetings':
        return <Meetings />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <DashboardHome onNavigate={setCurrentPage} />;
    }
  };

  if (!isAuthenticated) {
    return (
      <ThemeProvider>
        <SignIn onSignIn={handleSignIn} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex">
          <Sidebar
            currentPage={currentPage}
            onNavigate={setCurrentPage}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          <main className="flex-1 p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {renderPage()}
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
