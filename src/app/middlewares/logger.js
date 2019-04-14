export const logger = ({ getState }) => {
  return next => action => {
    // eslint-disable-next-line
    DEVELOPMENT && console.log("dispatching", action);
    let val = next(action);
    // eslint-disable-next-line
    DEVELOPMENT && console.log("state", getState());
    return val;
  };
};
