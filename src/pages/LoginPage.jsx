import { useState } from 'react';
import apiClient from '@/api.js';
import { useAuth } from '../context/AuthContext';

const loginPageStyle = { /* Styling for centering */
  display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh',
};
const formContainerStyle = { /* Form styling */
  width: '100%', maxWidth: '400px', padding: '2rem', background: 'white',
  borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
};
const inputStyle = { width: '100%', padding: '0.8rem', marginBottom: '1rem', border: '1px solid var(--border-color)', borderRadius: '4px' };
const buttonStyle = { width: '100%', padding: '0.8rem', border: 'none', borderRadius: '4px', background: 'var(--accent-color)', color: 'white', fontSize: '1rem', cursor: 'pointer' };

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Note: We are using the same login endpoint
      const response = await apiClient.post('/users/login', {
        email,
        password,
      });
      login(response.data.token);
    } catch (err) {
      setError('فشل تسجيل الدخول. تأكد من بياناتك أو صلاحياتك.');
    }
  };

  return (
    <div style={loginPageStyle}>
      <div style={formContainerStyle}>
        <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>لوحة تحكم المهندس</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          <button type="submit" style={buttonStyle}>دخول</button>
        </form>
      </div>
    </div>
  );
}
export default LoginPage;