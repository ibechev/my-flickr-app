import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "redhooks";
import { fetchImagesAction } from "../app/actions/index";
import {
  START_FETCHING_MORE,
  FETCHING_MORE_COMPLETE,
  FETCH_IMAGES_ERROR
} from "./actions/types";

import SearchBoxContainer from "./components/searchBox/SearchBoxContainer";
import ImageGallery from "./components/imageGallery/ImageGallery";

const App = ({ isFetchingMore, noMorePages, images, fetchImagesAction }) => {
  useEffect(() => {
    window.addEventListener("scroll", detectScrollEnd, false);

    return function clearEventListener() {
      window.removeEventListener("scroll", detectScrollEnd, false);
    };
  });

  const detectScrollEnd = () => {
    const galleryH = document.getElementById("image-gallery").clientHeight;
    const searchBoxH = document.getElementById("search-box").clientHeight;
    const offsetFetchTrigger = galleryH + searchBoxH - window.innerHeight;

    if (
      window.pageYOffset > offsetFetchTrigger &&
      !isFetchingMore &&
      !noMorePages &&
      !!images.length
    ) {
      window.removeEventListener("scroll", detectScrollEnd, false);
      fetchImagesAction({
        type: START_FETCHING_MORE,
        meta: {
          success: FETCHING_MORE_COMPLETE,
          error: FETCH_IMAGES_ERROR
        }
      });
    }
  };

  return (
    <div className="main-container">
      <SearchBoxContainer />
      <ImageGallery />
    </div>
  );
};

const mapStateToProps = ({ isFetchingMore, noMorePages, images }) => ({
  isFetchingMore,
  noMorePages,
  images
});

App.propTypes = {
  isFetchingMore: PropTypes.bool.isRequired,
  fetchImagesAction: PropTypes.func.isRequired,
  noMorePages: PropTypes.bool.isRequired,
  images: PropTypes.array
};

export default connect(
  mapStateToProps,
  { fetchImagesAction }
)(App);
