import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface User {
  userId: number;
  role: string;
}

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/me');
        setUser(response.data.user);
      } catch (err) {
        setError('Failed to fetch user data. Please try logging in again.');
        localStorage.removeItem('authToken');
        delete axios.defaults.headers.common['Authorization'];
        navigate('/login');
      }
    };

    const token = localStorage.getItem('authToken');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        fetchUser();
    } else {
        navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/login');
  };

  if (error) {
    return <div style={styles.container}><p style={styles.error}>{error}</p></div>;
  }

  if (!user) {
    return <div style={styles.container}><p>Loading...</p></div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Dashboard</h1>
        <button onClick={handleLogout} style={styles.button}>Logout</button>
      </div>
      <div style={styles.content}>
        <p>Welcome! You are logged in as a user with ID: {user.userId} and Role: {user.role}.</p>
      </div>
    </div>
  );
};

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
    error: {
        color: '#DC2626',
        textAlign: 'center',
        padding: '24px',
    }
};

export default DashboardPage;
