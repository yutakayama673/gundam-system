import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/authController';

export function useAuth() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  async function login(employeeId, password) {
    try {
      const result = await loginUser(employeeId, password);
      setUser(result);
      alert(`ようこそ、${result.name}さん`);
      navigate('/home');
      return result;
    } catch (error) {
      alert('IDまたはパスワードを確認してください。');
      throw error;
    }
  }

  return { user, login };
}
