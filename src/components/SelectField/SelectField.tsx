import "./SelectField.css"

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
}

const SelectField: React.FC<SelectFieldProps> = ({ label, options, ...props }) => {
  return (
    <div>
      <label className="label">{label}</label>
      <select
        className="select-field"
        {...props}
      >
        {options.map(e => <option>{e}</option>)}
      </select>
    </div>
  );
};

export default SelectField;
