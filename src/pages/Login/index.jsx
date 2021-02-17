import { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ErrorMessage from "../../components/Reuseable/ErrorMessage";
import { login, logout } from "../../redux/actions/authActions";
const Login = () => {
  const { register, handleSubmit, errors, reset } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const loginUser = useSelector((state) => state.loginUser);
  const { loading, userInfo, error } = loginUser;
  const onSubmit = (data) => {
    dispatch(login(data.email, data.password));
    reset();
  };
  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
    return () => {
      if (error) {
        dispatch(logout());
      }
    };
  }, [userInfo, history, error, dispatch]);
  return (
    <Container className="mt-5" fluid>
      <Row className="justify-content-center  align-items-center">
        <Col className=" col-10 col-sm-6 col-md-4 p-4 border rounded ">
          {error && <ErrorMessage error={error} />}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                ref={register({
                  required: true,
                })}
              />
              {errors.email && (
                <p style={{ color: "red", paddingTop: "4px" }}>
                  Email is required
                </p>
              )}
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                ref={register({
                  required: true,
                  minLength: 8,
                })}
              />
              {errors.password && (
                <p style={{ color: "red", paddingTop: "4px" }}>
                  Password is required and length greater than 8
                </p>
              )}
            </Form.Group>

            {loading ? (
              <Button variant="primary">
                <strong className="text-white font-weight-bolder px-4">
                  <Spinner animation="border" />
                </strong>
              </Button>
            ) : (
              <Button variant="primary" type="submit">
                Login
              </Button>
            )}
          </Form>
          <Row className="p-3">
            New user?{" "}
            <Link className="text-decoration-none" to="/register">
              Register Here
            </Link>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
