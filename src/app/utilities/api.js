/* eslint-disable no-console */
const API_KEY = "6aacdfc2ae7edfa681a9bf5c55efd555";
const IMAGES_PER_PAGE = 20;

const getImagesBasicInfo = async ({ page, tagsArray }) => {
  const tagsString = tagsArray.join("%2C");
  const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&tags=${tagsString}&per_page=${IMAGES_PER_PAGE}&page=${page}&format=json&nojsoncallback=1`;

  return await fetch(url)
    .then(response => response.json())
    .catch(error => console.warn(error));
};

const buildImageObject = async ({ farm, id, secret, server, title }) => {
  const urlInfo = `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${API_KEY}&photo_id=${id}&secret=${secret}&format=json&nojsoncallback=1`;
  const thumbnail = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_n.jpg`;
  let flickrUrl = "";

  const {
    stat,
    photo: {
      owner: { username: owner },
      tags: { tag: tags },
      dates: { taken },
      urls: { url: urlArray }
    }
  } = await fetch(urlInfo)
    .then(response => response)
    .then(result => result.json());

  urlArray.forEach(url => {
    if (url.type === "photopage") flickrUrl = url._content;
  });

  if (stat !== "ok") {
    throw "Could't fetch photo details";
  } else {
    return {
      title,
      owner,
      tags: tags.map(tag => tag._content),
      taken,
      flickrUrl,
      thumbnail
    };
  }
};

export const getImages = async params => {
  const basicData = await getImagesBasicInfo(params).then(result => result);
  const { pages, photo } = basicData.photos;
  let promisesArray;

  try {
    if (basicData.stat === "ok") {
      promisesArray = await photo.map(image => {
        return buildImageObject(image).then(res => res);
      });
    } else throw "There was a problem with Flickr api";
  } catch (error) {
    console.warn(error);
  }

  return {
    images: await Promise.all(promisesArray),
    pages
  };
};
