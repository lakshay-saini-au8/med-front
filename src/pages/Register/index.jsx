import { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_REGISTER_RESET } from "../../redux/actionTypes";
import { register as userRegister } from "../../redux/actions/authActions";
const Register = () => {
  const { register, errors, getValues, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const registerUser = useSelector((state) => state.registerUser);
  const { loading, success, error } = registerUser;
  const loginUser = useSelector((state) => state.loginUser);
  const { loading: loginLoader, userInfo, error: loginError } = loginUser;
  useEffect(() => {
    if (success) {
      dispatch({ type: USER_REGISTER_RESET });
    }
    return () => {
      if (error) {
        dispatch({ type: USER_REGISTER_RESET });
      }
    };
  }, [success, dispatch, error]);
  useEffect(() => {
    if (userInfo) {
      history.push("/dashboard/profile");
    }
  }, [dispatch, userInfo, history, loginError]);
  const onSubmit = (data) => {
    dispatch(userRegister(data.name, data.email, data.password));
  };
  return (
    <Container className="mt-5" fluid>
      <Row className="justify-content-center  align-items-center">
        <Col className=" col-10 col-sm-6 col-md-4 p-4 border rounded ">
          {error && (
            <Alert variant={"danger"} className="text-center">
              {error}
            </Alert>
          )}
          {loading ? (
            <Spinner animation="border" variant="primary" className="m-auto" />
          ) : null}
          {loginLoader ? (
            <>
              <Spinner
                animation="border"
                variant="primary"
                className="m-auto"
              />{" "}
              Loging you{" "}
            </>
          ) : null}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                ref={register({
                  required: "true",
                  minLength: 1,
                })}
              />
              {errors.name && (
                <p style={{ color: "red", paddingTop: "4px" }}>
                  Name is required
                </p>
              )}
            </Form.Group>
            <Form.Group controlId="email">
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

            <Form.Group controlId="password">
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
            <Form.Group controlId="confirm">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="confirm"
                placeholder="Confirm Password"
                ref={register({
                  required: true,
                  minLength: 8,
                  validate: {
                    matchesPreviousPassword: (value) => {
                      const { password } = getValues();
                      return password === value || "Passwords should match!";
                    },
                  },
                })}
              />
              {errors.confirm && (
                <p style={{ color: "red", paddingTop: "4px" }}>
                  Password should match!
                </p>
              )}
            </Form.Group>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
          <Row className="p-3">
            Already have an account?{" "}
            <Link className="text-decoration-none" to="/login">
              Login Here
            </Link>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
