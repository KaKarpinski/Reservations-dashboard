import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./SelectField.css";

interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
  errorMessage?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  errorMessage,
  ...props
}) => {
  return (
    <div>
      <label className="label">{label}</label>
      <select className="select-field" {...props}>
        {options.map((e) => (
          <option>{e}</option>
        ))}
      </select>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
};

export default SelectField;
