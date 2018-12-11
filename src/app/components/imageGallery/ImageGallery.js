import React, { Component } from "react";
import PropTypes from "prop-types";

class ImageGallery extends Component {
  render() {
    const { images } = this.props;

    return (
      <section id="image-gallery" className="image-gallery">
        <ul className="images-container">
          {images.map((image, i) => (
            <img src={image.thumbnail} alt={image.title} key={i} />
          ))}
        </ul>
      </section>
    );
  }
}

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
