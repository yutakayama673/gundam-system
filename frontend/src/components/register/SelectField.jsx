import "../../styles/component/register/SelectField.css";

export default function SelectField({ label, name, value, onChange, options = [] }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select name={name} value={value} onChange={onChange} required>
        <option value="">-- 選択してください --</option>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </div>
  );
}
