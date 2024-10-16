// src/components/ProductCard.js
import React from 'react';
import Slider from 'react-slick';
import './ProductCard.css'; // Custom styles for the product card
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';


const ProductCard = ({ product }) => {
    const { name, price, description, images, _id } = product;

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1, adaptiveHeight: true, // Adjust height based on content

    };

    return (
        <div className="product-card">
            <div className="image-slider">
                <Slider {...sliderSettings}>
                    {images.map((image, index) => (
                        <div key={index}>
                            <img src={image} alt={name} className="product-image" />
                        </div>
                    ))}
                </Slider>
            </div>
            <div className="product-info">
                <h3 className="product-name">{name}</h3>
                <p className="product-price">${price}</p>
                <p className="product-description">{description}</p>
                <Link to={_id }>
                    <button className="edit-button">Edit</button>
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
