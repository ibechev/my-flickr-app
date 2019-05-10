import React from "react";
import PropTypes from "prop-types";
import { formatTitle, formatDate } from "../../../app/utils";

const ImageCard = ({ title, owner, tags, taken, flickrUrl, thumbnail }) => {
  return (
    <li className="image-card">
      <div className="header">
        <div className="header-info">
          <h6>{title ? formatTitle(title) : "Unnamed"}</h6>
          <p>{`by: ${owner}`}</p>
          <p>{`taken on: ${formatDate(taken)}`}</p>
        </div>

        <div className="flickr-link">
          <a href={flickrUrl} target="_blanc" title="See on Flickr">
            <i className="fab fa-flickr" />
          </a>
        </div>
      </div>

      <div className="image-wrapper">
        <img src={thumbnail} alt={title} />
      </div>

      <div className="footer">
        <div className="tag-label">
          <i className="fas fa-tags" />
          <h6>Tags</h6>
        </div>
        <ul className="tags">
          {tags.map((tag, i) => (
            <li key={i} className="listed-tag">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

ImageCard.propTypes = {
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  taken: PropTypes.string.isRequired,
  flickrUrl: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired
};

export default ImageCard;
