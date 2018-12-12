import React, { Component } from "react";
import SearchBox from "./components/searchBox/SearchBox";
import ImageGallery from "./components/imageGallery/ImageGallery";

import { getImages } from "./utilities/api";

class App extends Component {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this);
    this.fetchMore = this.fetchMore.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    this.state = {
      page: 1,
      loading: false,
      fetchingMore: false,
      noMorePages: false,
      images: [],
      tags: []
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll, false);
  }

  async search(tagsArray) {
    this.setState(prevState => {
      return {
        ...prevState,
        loading: true
      };
    });

    const { images } = await getImages({ page: 1, tagsArray }).then(res => res);

    this.setState(prevState => {
      return {
        ...prevState,
        loading: false,
        images,
        tags: tagsArray
      };
    });
  }

  async fetchMore() {
    this.setState(prevState => ({
      ...prevState,
      fetchingMore: true,
      page: prevState.page + 1
    }));

    const { page, tags } = this.state;
    const { images, pages } = await getImages({
      page,
      tagsArray: tags
    }).then(res => res);

    this.setState(prevState => ({
      ...prevState,
      fetchingMore: false,
      images: [...prevState.images, ...images],
      noMorePages: page === pages
    }));
  }

  handleScroll() {
    const galleryH = document.getElementById("image-gallery").clientHeight;
    const searchBoxH = document.getElementById("search-box").clientHeight;
    const offsetTrigger = galleryH + searchBoxH - window.innerHeight;
    const { fetchingMore, noMorePages } = this.state;

    if (window.pageYOffset > offsetTrigger && !fetchingMore && !noMorePages) {
      this.fetchMore();
    }
  }

  render() {
    const { images, loading } = this.state;

    return (
      <div className="main-container">
        <SearchBox search={this.search} />
        {!loading && <ImageGallery images={images} />}
        {loading && (
          <span className="spinner-main">
            <i className="fas fa-spinner fa-spin" />
          </span>
        )}
        {images.length && !loading ? (
          <span className="spinner-scroll">
            <i className="fas fa-spinner fa-spin" />
          </span>
        ) : (
          ""
        )}
        {!images.length && !loading && (
          <i className="fas fa-images images-placeholder" />
        )}
      </div>
    );
  }
}

export default App;
