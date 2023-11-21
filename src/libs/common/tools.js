export const GetImg = (src) => {
  return new Promise((resolve) => {
    let img = new Image();
    img.src = src;
    img.onload = () => {
      resolve(img);
    };
  });
};
