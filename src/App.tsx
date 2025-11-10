import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { AdminModule } from './modules/admin/AdminModule';
import { ProfessionalModule } from './modules/professional/ProfessionalModule';
import { ClientModule } from './modules/client/ClientModule';

function AppContent() {
  const { user, loading, error } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Erro</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <p className="text-sm text-gray-500">Por favor, verifique sua conexão e tente recarregar a página.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
          >
            Recarregar
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return showRegister ? (
      <Register onLoginClick={() => setShowRegister(false)} />
    ) : (
      <Login onRegisterClick={() => setShowRegister(true)} />
    );
  }

  switch (user.role) {
    case 'admin':
      return <AdminModule />;
    case 'professional':
      return <ProfessionalModule />;
    case 'client':
      return <ClientModule />;
    default:
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <p className="text-gray-600">Tipo de usuário inválido</p>
        </div>
      );
  }
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
