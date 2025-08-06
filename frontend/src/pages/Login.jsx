import { useState } from 'react'
import "../styles/Login.css";
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../api/Controller'  
import Register from "./Register";

function Login() {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false); // ← 必須
  const navigate = useNavigate();
  
  const closeRegisterModal = () => setShowRegister(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser(employeeId, password);
      alert(`ようこそ、${result.name}さん`);
      navigate('/home');
    } catch (error) {
      console.error('ログイン失敗:', error);
      alert('IDまたはパスワードを確認してください。');
    }
  };
  
  const onRegist = () => {
    setShowRegister(true); // モーダル表示に切り替え
  };

  return (
    <div className="login-container-login">
      <div className="login-title">MOBILE SUITS MANAGEMENT SYSTEM</div>
      <form onSubmit={handleLogin} className="login-form-grid">
  		{/* 左側：画像 */}
  		<div className="form-image-section">
    		<img src="/gundam-system/png/anaheimLogo.png" alt="アナハイムロゴ" />
  		</div>

  		{/* 右側：フォーム入力欄 */}
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
        		<button className="register-login-button" type="button" onClick={onRegist}>REGIST</button>
      			</div>
    		</div>
  		</div>
	</form>

      {/* Register Modal */}
      {showRegister && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={closeRegisterModal}>× 閉じる</button>
            <Register onComplete={closeRegisterModal} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
