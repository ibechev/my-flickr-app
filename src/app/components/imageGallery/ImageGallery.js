import React from "react";
import { useStore } from "redhooks";
import PropTypes from "prop-types";
import ImageCard from "../imageCard/ImageCard";

const ImageGallery = () => {
  const {
    state: { searching, noResults, noMorePages, images }
  } = useStore();

  return (
    <section id="image-gallery" className="image-gallery">
      {searching && (
        <span className="spinner-main">
          <i className="fas fa-spinner fa-spin" />
        </span>
      )}

      {!!images && !!images.length && !searching && (
        <ul className="images-container">
          {images.map((image, i) => (
            <ImageCard key={i + image.title + image.taken} {...image} />
          ))}
        </ul>
      )}

      {!!images.length && !searching && !noMorePages && !noResults && (
        <span className="spinner-scroll">
          <i className="fas fa-spinner fa-spin" />
        </span>
      )}

      {!images.length && !searching && !noResults && (
        <div className="images-placeholder">
          <i className="fas fa-images " />
          <h1>Search images on Flickr</h1>
        </div>
      )}

      {noResults && !searching && (
        <div className="no-results-placeholder">
          <i className="fas fa-frown" />
          <h1>Oops, nothing found.</h1>
        </div>
      )}
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
  )
};

export default ImageGallery;
