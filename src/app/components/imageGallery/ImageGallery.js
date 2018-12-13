import React from "react";
import PropTypes from "prop-types";
import ImageCard from "../imageCard/ImageCard";

const ImageGallery = ({ images }) => {
  return (
    <section id="image-gallery" className="image-gallery">
      <ul className="images-container">
        {images.map((image, i) => (
          <ImageCard key={i} {...image} />
        ))}
      </ul>
    </section>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      thumbnail: PropTypes.string.isRequired,
      flickrUrl: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
      owner: PropTypes.string.isRequired,
      taken: PropTypes.string.isRequired
    })
  ).isRequired
};

export default ImageGallery;
