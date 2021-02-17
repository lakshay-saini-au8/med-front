import { Alert } from "react-bootstrap";

const ErrorMessage = ({ error }) => {
  return (
    <Alert variant="danger" className="w-100">
      {error}
    </Alert>
  );
};

export default ErrorMessage;
