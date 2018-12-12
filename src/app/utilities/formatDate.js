export const formatDate = date => {
  return date
    .split(" ")[0]
    .split("-")
    .reverse()
    .join("-");
};
