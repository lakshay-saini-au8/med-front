import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { defaultCategory } from "./utils";
import { Col, Row, Button } from "react-bootstrap";

import "./index.css";
import { getAllProducts } from "../../../utils/api";
const Filter = ({ setProducts, setLoading, setError }) => {
  const { search } = useLocation();
  const [category, setCategory] = useState(`${search.slice(3) || ""}`);
  const [priceRange, setPriceRange] = useState("");
  const changeCategory = (e) => {
    let optionName = e.target
      .closest(".custom-option")
      .getAttribute("optionname");
    if (optionName === category) {
      setCategory("");
    } else {
      setCategory(optionName);
    }
  };

  const changePriceRange = (e) => {
    let optionName = e.target
      .closest(".custom-option")
      .getAttribute("optionname");
    if (optionName === priceRange) {
      setPriceRange("");
    } else {
      setPriceRange(optionName);
    }
  };

  const handleSearch = (e) => {
    let filters = {};
    if (priceRange !== "") {
      filters["priceRange"] = priceRange;
    }
    if (category !== "") {
      filters["category"] = category;
    }
    setLoading(true);
    getAllProducts(filters).then((res) => {
      const { data, message } = res;
      if (data) {
        setProducts(data);
      }
      if (message) {
        setError(message);
      }
      setLoading(false);
    });
  };

  return (
    <Col lg={3} className="rounded filter-container">
      <Row className="m-3 bg-white p-3">
        <h5>Search Filters</h5>
      </Row>

      <Row className="m-3 bg-white p-3">
        <Col className="px-0">
          <h6>Price</h6>
          <div
            className="custom-option disable-select"
            optionname="descending"
            onClick={changePriceRange}
          >
            <div className="mr-2 check-box">
              {priceRange === "descending" ? (
                <i className="fas fa-check"></i>
              ) : (
                <></>
              )}
            </div>
            <div className="text-muted">High-To-Low</div>
          </div>
          <div
            className="custom-option disable-select"
            optionname="ascending"
            onClick={changePriceRange}
          >
            <div className="mr-2 check-box">
              {priceRange === "ascending" ? (
                <i className="fas fa-check"></i>
              ) : (
                <></>
              )}
            </div>
            <div className="text-muted">Low-To-High</div>
          </div>
        </Col>
      </Row>

      <Row className="m-3 bg-white p-3">
        <Col className="px-0">
          <h6>Categories</h6>
          {defaultCategory.map((spec, index) => {
            return (
              <div
                className="custom-option disable-select"
                optionname={`${spec}`}
                onClick={changeCategory}
                key={index}
              >
                <div className="mr-2 check-box">
                  {category === spec ? <i className="fas fa-check"></i> : <></>}
                </div>
                <div className="text-muted">
                  {spec[0].toUpperCase() + spec.slice(1)}
                </div>
              </div>
            );
          })}
        </Col>
      </Row>
      <Row className="m-3 p-3 bg-white">
        <Button
          type={"button"}
          size="lg"
          className="w-100 text-white font-weight-bold search-filter-button"
          onClick={handleSearch}
        >
          Apply Filters
        </Button>
      </Row>
    </Col>
  );
};

export default Filter;
