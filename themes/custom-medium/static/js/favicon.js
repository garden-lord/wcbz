console.log("Hello!");

let image = [
  ["/images/smalldogs/dog1.png", 300],
  ["/images/smalldogs/dog2.png", 300],
  ["/images/smalldogs/dog3.png", 300],
  ["/images/smalldogs/dog4.png", 300],
  ["/images/smalldogs/dog5.png", 300],
  ["/images/smalldogs/dog6.png", 600],
];

let i = -1;
let favicon = null;

function nextImage() {
  i += 1;

  if (i >= image.length) {
    i = 0;
  }

  favicon.href = image[i][0];
  setTimeout(nextImage, image[i][1]);
}

document.addEventListener("DOMContentLoaded", () => {
  favicon = document.querySelector("link[rel=icon]");
  setTimeout(nextImage, image[0][1]);
});
