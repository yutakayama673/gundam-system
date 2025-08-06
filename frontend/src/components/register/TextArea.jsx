import "../../styles/component/register/TextArea.css";
export default function TextArea({ label, name, value, onChange, rows = 5 }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea name={name} value={value} onChange={onChange} rows={rows} />
    </div>
  );
}