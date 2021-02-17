import { Spinner } from "react-bootstrap";

const Loader = ({ w, h }) => {
  return (
    <div
      style={{
        display: " flex",
        justifyContent: " center",
        alignItems: " center",
        height: "100%",
        width: "100%",
      }}
    >
      <Spinner
        animation="border"
        style={{ width: `${w || 8}rem`, height: `${h || 8}rem` }}
        color="primary"
      />
    </div>
  );
};

export default Loader;
