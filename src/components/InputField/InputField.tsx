import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./InputField.css";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  errorMessage,
  ...props
}) => {
  return (
    <div>
      <label>{label}</label>
      <input className="input-field" {...props} />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
};

export default InputField;
