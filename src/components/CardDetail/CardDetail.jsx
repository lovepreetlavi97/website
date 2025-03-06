import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import "./CardDetail.css";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const product = {
  id: 4,
  name: "Silver Pendant",
  price: "$250",
  images: [
    require("../../assets/images/qwerty.jpg"),
    require("../../assets/images/qwerty.jpg"),
    require("../../assets/images/qwerty.jpg"),

  ],
  description: "A sleek silver pendant with an elegant design. Perfect for any occasion.",
};

const NextArrow = ({ onClick }) => (
  <div className="arrow next" onClick={onClick}>
    <FaChevronRight size={24} />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="arrow prev" onClick={onClick}>
    <FaChevronLeft size={24} />
  </div>
);

const CardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!product) {
    return <h2>Product not found</h2>;
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <NextArrow />, 
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="card-details">
     <button className="back-button" onClick={() => navigate(-1)}>
  <i className="fas fa-arrow-left" style={{ marginRight: '8px' }}></i>
  Back to Collection
</button>

      <div className="details-container">
        <div className="image-slider-container">
          <Slider {...sliderSettings} className="slider-full">
            {product.images.map((img, index) => (
              <div key={index} className="slide-item">
                <img src={img} alt={product.name} className="details-image" />
              </div>
            ))}
          </Slider>
        </div>
        <div className="details-content">
          <h2 className="details-title">{product.name}</h2>
          <Stack spacing={1} className="rating-container">
            <Rating
              name="half-rating-read"
              defaultValue={4.5}
              precision={0.5}
              readOnly
              sx={{ color: "#D4AF37" }}
            />
          </Stack>
          <p className="details-description">{product.description}</p>
          <span className="details-price">{product.price}</span>
          <button className="buy-button">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
