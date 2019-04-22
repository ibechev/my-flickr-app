import React from "react";
import { useStore } from "redhooks";
import PropTypes from "prop-types";
import ImageCard from "../imageCard/ImageCard";
import LoadingInfinitive from "./components/loadingInfinitive/LoadingInfinitive";

const ImageGallery = () => {
  const {
    state: { searching, images, isFetchingMore }
  } = useStore();

  return (
    <section id="image-gallery" className="image-gallery">
      {!!images && !!images.length && !searching && (
        <ul className="images-container">
          {images.map((image, i) => (
            <ImageCard key={i + image.title + image.taken} {...image} />
          ))}
        </ul>
      )}

      {isFetchingMore && <LoadingInfinitive />}
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
