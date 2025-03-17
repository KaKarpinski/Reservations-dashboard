import "./InputField.css";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement>{
  label: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, ...props}) => {
  return (
    <div>
      <label>{label}</label>
      <input className="input-field" {...props} />
    </div>
  );
};

export default InputField;
