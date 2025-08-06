import "../../styles/component/register/InputField.css";

export default function InputField({ label, name, value, onChange, required = false }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input type="text" name={name} value={value} onChange={onChange} required={required} />
    </div>
  );
}