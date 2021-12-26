const images = [
  {
    path: "/images/smalldogs/dog1.png",
    wait_ms: 300,
    data: null,
  },
  {
    path: "/images/smalldogs/dog2.png",
    wait_ms: 300,
    data: null,
  },
  {
    path: "/images/smalldogs/dog3.png",
    wait_ms: 300,
    data: null,
  },
  {
    path: "/images/smalldogs/dog4.png",
    wait_ms: 300,
    data: null,
  },
  {
    path: "/images/smalldogs/dog5.png",
    wait_ms: 300,
    data: null,
  },
  {
    path: "/images/smalldogs/dog6.png",
    wait_ms: 600,
    data: null,
  },
];

let i = -1;
let favicon = null;

function nextImage() {
  i += 1;

  if (i >= images.length) {
    i = 0;
  }

  favicon.href = images[i].data;
  setTimeout(nextImage, images[i].wait_ms);
}

function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

async function main() {
  let coros = images.map(async (x) => {
    const response = await fetch(x.path);
    const data = await response.blob();
    x.data = await blobToBase64(data);
  });

  await Promise.all(coros);

  setTimeout(nextImage, images[0].wait_ms);
}

document.addEventListener("DOMContentLoaded", () => {
  favicon = document.querySelector("link[rel=icon]");
  main();
});
