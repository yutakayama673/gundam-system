import { useState } from 'react';
import { useAuth } from '../../hooks/login/useAuth';
import RegisterModal from '../../components/close/RegisterModal';
import "../../styles/Login.css";

export default function Login() {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const { login } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    // エラーハンドリングとナビゲーションはuseAuth内にあるため
    // ここではシンプルに呼び出すだけ
    await login(employeeId, password);
  };

  return (
    <div className="login-container-login">
      <div className="login-title">MOBILE SUITS MANAGEMENT SYSTEM</div>

      <form onSubmit={onSubmit} className="login-form-grid">
        <div className="form-image-section">
          <img src="/gundam-system/png/anaheimLogo.png" alt="アナハイムロゴ" />
        </div>

        <div className="form-input-section">
          <label htmlFor="employeeId">YOUR ID</label>
          <input
            type="text"
            id="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          />

          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="auth-button-container">
            <button className="login-button" type="submit">LOGIN</button>
            <div className="fix-register-button">
              <button
                type="button"
                className="register-login-button"
                onClick={() => setShowRegister(true)}
              >
                REGIST
              </button>
            </div>
          </div>
        </div>
      </form>

      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </div>
  );
}
