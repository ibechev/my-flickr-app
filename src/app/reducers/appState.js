import {
  START_SEARCH,
  SEARCH_COMPLETE,
  START_FETCHING_MORE,
  FETCHING_MORE_COMPLETE,
  ADD_TAG,
  ADD_TAGS,
  REMOVE_TAG,
  REMOVE_ALL_TAGS,
  CLEAR_IMAGES,
  RESET_STATE
} from "../actions/types";
import { initialAppState } from "../config/initialAppState";

const appStateReducerFunctions = {
  [START_SEARCH]: state => ({
    ...state,
    searching: true
  }),
  [SEARCH_COMPLETE]: (state, payload) => ({
    ...state,
    searching: false,
    noResults: !payload.images.length,
    noMorePages: payload.pages === 1,
    images: payload.images
  }),
  [START_FETCHING_MORE]: state => ({
    ...state,
    isFetchingMore: true,
    page: state.page + 1
  }),
  [FETCHING_MORE_COMPLETE]: (state, payload) => ({
    ...state,
    isFetchingMore: false,
    noMorePages: state.page === payload.pages,
    images: [...state.images, ...payload.images]
  }),
  [ADD_TAG]: (state, payload) => ({
    ...state,
    tags: [...state.tags, payload],
    inputError: null,
    page: 1
  }),
  [ADD_TAGS]: (state, payload) => ({
    ...state,
    tags: [...state.tags, ...payload],
    inputError: null,
    page: 1
  }),
  [REMOVE_TAG]: (state, payload) => {
    const { tags } = state;
    const reduceTags = (_, i) => {
      /**
       * If @payload is of type Number, remove the current
       * indexed tag, otherwise remove the last tag
       */
      return typeof payload === "number"
        ? i !== payload
        : i !== tags.length - 1;
    };

    const newTags = tags.filter(reduceTags);

    return {
      ...state,
      tags: newTags,
      page: 1
    };
  },
  [REMOVE_ALL_TAGS]: state => ({
    ...state,
    tags: [],
    images: [],
    page: 1
  }),
  [CLEAR_IMAGES]: state => ({
    ...state,
    images: []
  }),
  [RESET_STATE]: () => ({ ...initialAppState })
};

export const appState = (state = {}, { type, payload }) => {
  return appStateReducerFunctions[type]
    ? appStateReducerFunctions[type](state, payload)
    : state;
};
