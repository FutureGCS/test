import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabase';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (!user) {
    // This should theoretically not happen due to ProtectedRoute, but as a fallback
    return <div style={styles.container}><p>Loading user...</p></div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Dashboard</h1>
        <button onClick={handleLogout} style={styles.button}>Logout</button>
      </div>
      <div style={styles.content}>
        <p>Welcome! You are logged in as {user.email}.</p>
      </div>
    </div>
  );
};

// Styles based on the provided style guide
const styles: { [key: string]: React.CSSProperties } = {
    container: {
        height: '100vh',
        backgroundColor: '#F8FAFC',
        fontFamily: 'Inter, sans-serif',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px',
        backgroundColor: 'white',
        borderBottom: '1px solid #E2E8F0',
    },
    title: {
        fontSize: '24px',
        color: '#1E293B',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#475569', // Secondary color
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
    },
    content: {
        padding: '24px',
    },
};

export default DashboardPage;
