import { useState } from "react";
import { registerUser } from '../api/Controller'  

export default function Register() {
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    password: "",
    email: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { userId, name, password, email } = formData;

    if (!userId || !name || !password || !email) {
      alert("すべての項目を入力してください。");
      return;
    }

    if (!/^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/.test(email)) {
      alert("メールアドレスの形式が正しくありません");
      return;
    }

    const confirmed = window.confirm("この情報で更新しますか？");
    if (!confirmed) return;

    try {
	  const result = await registerUser(userId, name, password, email)
	 
	  alert(result.message || "登録完了！");
	  
	  setTimeout(() => {
        window.parent.postMessage({ type: "registerCompleted" }, "*");
      }, 1500);
	  
	  } catch (error) {
		
      console.error('登録失敗:', error)
      alert(result.message || "登録失敗")
      
      }
  };

  return (
    <div className="container" style={containerStyle}>
      <h1 style={titleStyle}>新規登録</h1>
      <form id="register-form" onSubmit={handleSubmit}>
        <div className="form-group" style={formGroupStyle}>
          <label htmlFor="userId" style={labelStyle}>社員ID</label>
          <input type="text" id="userId" name="userId" value={formData.userId} onChange={handleChange} style={inputStyle} />
        </div>

        <div className="form-group" style={formGroupStyle}>
          <label htmlFor="name" style={labelStyle}>名前</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} style={inputStyle} />
        </div>

        <div className="form-group" style={formGroupStyle}>
          <label htmlFor="password" style={labelStyle}>パスワード</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} style={inputStyle} />
        </div>

        <div className="form-group" style={formGroupStyle}>
          <label htmlFor="email" style={labelStyle}>メールアドレス</label>
          <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle} />
        </div>

        <div className="button-group" style={buttonGroupStyle}>
          <button type="submit" style={buttonStyle}>登録</button>
        </div>
      </form>
    </div>
  );
}

const containerStyle = {
  maxWidth: "600px",
  margin: "auto",
  background: "#101010",
  border: "4px solid #333",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 0 15px #0ff",
  color: "#00ffff",
  fontFamily: "Meiryo, sans-serif",
  marginTop: "40px"
};

const titleStyle = {
  textAlign: "center",
  fontSize: "24px",
  marginBottom: "30px",
  borderBottom: "2px solid #0ff",
  paddingBottom: "10px"
};

const formGroupStyle = {
  marginBottom: "20px"
};

const labelStyle = {
  display: "block",
  fontWeight: "bold",
  marginBottom: "6px",
  color: "#00ffff"
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  background: "#2d2d2d",
  border: "1px solid #666",
  color: "#fff",
  fontSize: "14px"
};

const buttonGroupStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px"
};

const buttonStyle = {
  background: "#aa0000",
  color: "#fff",
  fontWeight: "bold",
  border: "none",
  padding: "10px 20px",
  borderRadius: "4px",
  fontSize: "14px",
  cursor: "pointer"
};
