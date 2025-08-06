import "../../styles/component/register/FileInput.css";

export default function FileInput({ label, name, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input type="file" name={name} accept=".png" onChange={onChange} />
    </div>
  );
}
