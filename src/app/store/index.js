import { createStore } from "redhooks";
import { appState } from "../reducers/appState";
import { initialAppState } from "../config/initialAppState";
import { logger } from "../middlewares/logger";
import thunk from "redux-thunk";

const opt = {
  preloadedState: {
    ...initialAppState
  },
  middlewares: [logger, thunk]
};

export const store = createStore(appState, opt);
