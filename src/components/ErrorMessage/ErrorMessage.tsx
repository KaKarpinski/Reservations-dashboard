import "./ErrorMessage.css"

interface ErrorMessageProps {
  children: React.ReactNode;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ children }) => {
  return (
    <p className="error-message">
      {children}
    </p>
  )
}

export default ErrorMessage;