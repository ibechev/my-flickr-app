import React, { Component } from "react";
import PropTypes from "prop-types";
import ImageCard from "../imageCard/ImageCard";

class ImageGallery extends Component {
  constructor(props) {
    super(props);

    this.resizeGridItem = this.resizeGridItem.bind(this);
    this.resizeAllGridItems = this.resizeAllGridItems.bind(this);
  }

  componentDidUpdate() {
    this.resizeAllGridItems();
  }

  resizeGridItem(item) {
    const grid = document.getElementsByClassName("images-container")[0];
    const rowHeight = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
    );
    const rowGap = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
    );
    const rowSpan = Math.ceil(
      (item.querySelector(".image").getBoundingClientRect().height + rowGap) /
        (rowHeight + rowGap)
    );
    item.style.gridRowEnd = "span " + rowSpan;
  }

  resizeAllGridItems() {
    const allItems = document.getElementsByClassName("item");
    for (let x = 0; x < allItems.length; x++) {
      this.esizeGridItem(allItems[x]);
    }
  }

  render() {
    const { images } = this.props;

    return (
      <section id="image-gallery" className="image-gallery">
        <ul className="images-container">
          {images.map((image, i) => (
            <ImageCard key={i} {...image} />
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
