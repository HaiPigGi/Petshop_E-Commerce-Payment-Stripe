import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Carousel } from "react-bootstrap";
import bg1 from "../public/product 1.jpg";
import bg2 from "../public/product 2.jpg";
import bg3 from "../public/product 3.jpg";
import bg4 from "../public/logo3.jpg";

// Import CSS for product slider
import "../style/style.css";

// Component for each product item in the slider
const ProductItem = ({ imgSrc }) => {
  return (
    <div align="center" className="product-item">
      <img
        src={imgSrc}
        alt=""
        style={{ width: "100%", height: "40%", border: "2px solid black" }}
      />
    </div>
  );
};

// HomeSlider component
const HomeSlider = () => {
  // Sample data for products
  const products = [
    {
      id: 1,
      imgSrc: bg1,
    },
    {
      id: 2,
      imgSrc: bg2,
    },
    {
      id: 3,
      imgSrc: bg3,
    },
  ];

  // Settings for the product slider
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1, // Menampilkan tiga gambar pada tampilan awal slider
  slidesToScroll: 1, // Menggeser satu gambar setiap kali slider digeser
  autoplay: true,
  autoplaySpeed: 3000,
};


  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <div className="home-slider-title">
            <h2>Your pet our services</h2>
            <p>
              Before your home pet, be sure you’re ready to take care of it
              properly.
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div class="text-right">
            <div className="home-slider-image">
              <img src={bg4} alt="Slider" className="rounded img-fluid" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 " style={{
        fontFamily:'roboto serif',
        fontWeight:'600',
      }}>
        <h1>Product</h1>
      </div>

      <div className="home-slider">
        <Slider {...sliderSettings}>
          {/* Map each product item to a ProductItem component */}
          {products.map((product) => (
            <ProductItem key={product.id} imgSrc={product.imgSrc} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HomeSlider;
