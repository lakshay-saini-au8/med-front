import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./index.css";
const Footer = () => {
  const loginUser = useSelector((state) => state.loginUser);
  const { userInfo } = loginUser;
  return (
    <Container fluid className="m-0  p-4 bg-secondary text-white">
      <Row>
        <Col lg={3} className="d-flex flex-column p-3 ">
          <h3 className="footer-brand font-weight-bolder pr-1">
            <i className="fas fa-heartbeat mr-2"></i>
            DoctoHub
          </h3>
          <h6>
            Discover the best doctors, clinic & buy medicines at few clicks.
          </h6>
          <h5>
            <small>
              <i className="fab fa-facebook-f mr-4"></i>
            </small>
            <small>
              <i className="fab fa-instagram mr-4"></i>
            </small>
          </h5>
        </Col>
        <Col lg={3} className="d-flex flex-column p-3 ">
          <h5>For Patients</h5>
          <Link to="/doctors" className="footer-nav-link text-white my-1">
            <i className="fas fa-angle-double-right footer-nav-link-icon"></i>
            <p className="d-inline footer-nav-link-p">Search Doctor</p>
          </Link>
          <Link to="/medicines" className="footer-nav-link text-white my-1">
            <i className="fas fa-angle-double-right footer-nav-link-icon"></i>
            <p className="d-inline footer-nav-link-p">Medicines</p>
          </Link>
          {!userInfo ? (
            <>
              <Link to="/login" className="footer-nav-link text-white my-1">
                <i className="fas fa-angle-double-right footer-nav-link-icon"></i>
                <p className="d-inline footer-nav-link-p">Login</p>
              </Link>
              <Link
                to="/register/patient"
                className="footer-nav-link text-white my-1"
              >
                <i className="fas fa-angle-double-right footer-nav-link-icon"></i>
                <p className="d-inline footer-nav-link-p">Register</p>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard/index"
                className="footer-nav-link text-white my-1"
              >
                <i className="fas fa-angle-double-right footer-nav-link-icon"></i>
                <p className="d-inline footer-nav-link-p">Patient Dashboard</p>
              </Link>
            </>
          )}
        </Col>
        <Col lg={3} className="d-flex flex-column p-3 ">
          <h5>For Doctors</h5>

          <Link to="/medicines" className="footer-nav-link text-white my-1">
            <i className="fas fa-angle-double-right footer-nav-link-icon"></i>
            <p className="d-inline footer-nav-link-p">Medicines</p>
          </Link>
          {!userInfo ? (
            <>
              <Link to="/login" className="footer-nav-link text-white my-1">
                <i className="fas fa-angle-double-right footer-nav-link-icon"></i>
                <p className="d-inline footer-nav-link-p">Login</p>
              </Link>
              <Link
                to="/register/doctor"
                className="footer-nav-link text-white my-1"
              >
                <i className="fas fa-angle-double-right footer-nav-link-icon"></i>
                <p className="d-inline footer-nav-link-p">Register</p>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard/index"
                className="footer-nav-link text-white my-1"
              >
                <i className="fas fa-angle-double-right footer-nav-link-icon"></i>
                <p className="d-inline footer-nav-link-p">Appointments</p>
              </Link>
              <Link
                to="/dashboard/index"
                className="footer-nav-link text-white my-1"
              >
                <i className="fas fa-angle-double-right footer-nav-link-icon"></i>
                <p className="d-inline footer-nav-link-p">Doctor Dashboard</p>
              </Link>
            </>
          )}
        </Col>
        <Col lg={3} className="d-flex flex-column py-3">
          <h5>Contact Us</h5>
          <h6>
            <div className="d-flex justify-content-flex-start">
              <div>
                <i className="fas fa-map-marker-alt text-left mr-2 mt-1"></i>
              </div>
              <div>
                <p>
                  DoctoHub , 127.0.0.1 , Solid State Drive ,Windows OS , 134560
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-flex-start">
              <div>
                <i className="fas fa-phone-alt text-left mr-2 "></i>
              </div>
              <div>
                <p>+91-99999-99999</p>
              </div>
            </div>
            <div className="d-flex justify-content-flex-start">
              <div>
                <i className="fas fa-envelope text-left mr-2 "></i>
              </div>
              <div>
                <p>doctohub@doctohub.in</p>
              </div>
            </div>
          </h6>
        </Col>
      </Row>
      <Row className="footer-bottom text-center pt-3">
        <h6 className="w-100">© 2020 DoctoHub. All rights reserved.</h6>
      </Row>
    </Container>
  );
};

export default Footer;
