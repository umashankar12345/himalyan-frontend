import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

function Crousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require("../../assets/images/himalya.jpg")}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First Journal Caption</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require("../../assets/images/himalya3.jpg")}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First Journal Caption</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require("../../assets/images/himalya2.jpg")}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First Journal Caption</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Crousel;
