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
  emailSignUp();
});

// email sign up
function emailSignUp() {
  const activateBtn = document.getElementById("signup-activate");
  const container = document.getElementById("signup");
  if (!activateBtn) {
    return;
  }
  activateBtn.onclick = () => {
    if (container.children.length > 0) {
      return;
    }
    const iframe = document.createElement("iframe");
    iframe.setAttribute(
      "src",
      "https://tally.so/embed/nPLgdn?alignLeft=1&transparentBackground=1"
    );
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", 220);
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("marginheight", "0");
    iframe.setAttribute("marginheight", "0");
    iframe.setAttribute("title", "Email Sign Up");
    iframe.onload = () => {
      activateBtn.hidden = true;
      window.scrollTo(0,document.body.scrollHeight);
    }
    container.appendChild(iframe);
  };

  const removeIframe = (e) => {
    const data = JSON.parse(e.data);
    if (data.event === "Tally.FormSubmitted") {
      setTimeout(() => {
        container.innerHTML = "";
      }, 500);
    }
  };

  window.onmessage = (e) => {
    try {
      removeIframe(e);
    } catch (err) {}
  };

  //   <iframe
  //   src=
  //   width="100%"
  //   height="200"
  //   frameborder="0"
  //   marginheight="0"
  //   marginwidth="0"
  //   title="Email Sign Up"
  // >
  // </iframe>
}
