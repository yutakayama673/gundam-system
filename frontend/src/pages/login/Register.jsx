import { useRegisterForm } from "../../hooks/login/useRegisterForm";

export default function Register() {
  const { formData, handleChange, submitForm } = useRegisterForm(
    (msg) => {
      alert(msg);
      setTimeout(() => {
        window.parent.postMessage({ type: "registerCompleted" }, "*");
      }, 1500);
    },
    (errMsg) => alert(errMsg)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <div className="container" style={containerStyle}>
      <h1 style={titleStyle}>新規登録</h1>
      <form id="register-form" onSubmit={handleSubmit}>
        <div className="form-group" style={formGroupStyle}>
          <label htmlFor="userId" style={labelStyle}>社員ID</label>
          <input type="text" id="userId" name="userId"
            value={formData.userId} onChange={handleChange} style={inputStyle} />
        </div>

        <div className="form-group" style={formGroupStyle}>
          <label htmlFor="name" style={labelStyle}>名前</label>
          <input type="text" id="name" name="name"
            value={formData.name} onChange={handleChange} style={inputStyle} />
        </div>

        <div className="form-group" style={formGroupStyle}>
          <label htmlFor="password" style={labelStyle}>パスワード</label>
          <input type="password" id="password" name="password"
            value={formData.password} onChange={handleChange} style={inputStyle} />
        </div>

        <div className="form-group" style={formGroupStyle}>
          <label htmlFor="email" style={labelStyle}>メールアドレス</label>
          <input type="text" id="email" name="email"
            value={formData.email} onChange={handleChange} style={inputStyle} />
        </div>

        <div className="button-group" style={buttonGroupStyle}>
          <button type="submit" style={buttonStyle}>登録</button>
        </div>
      </form>
    </div>
  );
}

const containerStyle = {
  maxWidth: "450px",
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
