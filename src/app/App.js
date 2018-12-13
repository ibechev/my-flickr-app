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
      noResults: false,
      images: [],
      tags: []
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll, false);
  }

  async search(tagsArray) {
    this.setState(prevState => {
      return {
        ...prevState,
        loading: true
      };
    });

    const { images, pages } = await getImages({ page: 1, tagsArray }).then(
      res => res
    );

    if (!images.length) {
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        noResults: true
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        noResults: false,
        noMorePages: pages === prevState.pages,
        images,
        tags: tagsArray
      }));
    }
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
    const offsetFetchTrigger = galleryH + searchBoxH - window.innerHeight;
    const { fetchingMore, noMorePages, images } = this.state;

    if (
      window.pageYOffset > offsetFetchTrigger &&
      !fetchingMore &&
      !noMorePages &&
      images.length
    ) {
      this.fetchMore();
    }
  }

  render() {
    const { images, loading, errors, noResults, noMorePages } = this.state;

    return (
      <div className="main-container">
        <SearchBox search={this.search} errors={errors} />
        {!loading && !noResults && <ImageGallery images={images} />}
        {loading && (
          <span className="spinner-main">
            <i className="fas fa-spinner fa-spin" />
          </span>
        )}
        {images.length && !loading && !noMorePages && !noResults ? (
          <span className="spinner-scroll">
            <i className="fas fa-spinner fa-spin" />
          </span>
        ) : (
          ""
        )}
        {!images.length && !loading && !noResults && (
          <div className="images-placeholder">
            <i className="fas fa-images " />
            <h1>Search images on Fkickr</h1>
          </div>
        )}
        {noResults && !loading && (
          <div className="no-results-placeholder">
            <i className="fas fa-frown" />
            <h1>Oops, nothing found.</h1>
          </div>
        )}
      </div>
    );
  }
}

export default App;

// sdwdadsdqw - no results

// daskpda aposida;oisd more - 3 results
