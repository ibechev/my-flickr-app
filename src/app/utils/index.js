export const queryStringFromTags = tagsList =>
  `?${tagsList.map(tag => tag).join("&")}`;

export const formatDate = date => {
  return date
    .split(" ")[0]
    .split("-")
    .reverse()
    .join("-");
};

export const formatTitle = title => {
  let cutIndex;
  if (
    title.endsWith(".jpg") ||
    title.endsWith(".png") ||
    title.endsWith(".gif")
  ) {
    cutIndex = 4;
  } else if (title.endsWith(".jpeg")) {
    cutIndex = 5;
  } else cutIndex = 0;

  return title.slice(0, title.length - cutIndex);
};

export const encodeURITags = tags => tags.map(tag => encodeURIComponent(tag));
