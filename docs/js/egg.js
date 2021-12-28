const egg = `
<div class="recipe">
<style>
    .recipe {
        max-width: 600px;
        margin: 0 auto;
        margin-bottom: 40px;
        padding: 30px;
        background: #f5f5f5;
        border: 2px solid black;
        border-radius: 5px;
    }

    .recipe h1 {
        text-align: center;
    }

    .recipe .nums {
        list-style-type: decimal;
    }

    .recipe table {
        margin: 0 auto;
        background: white;
        text-align: center;
        font-size: 0.9em;
    }

    .recipe table td {
        padding: 5px;
        padding-right: 20px;
        padding-left: 20px;
        border: 1px solid black;
    }
</style>
<h1>Secret Scrambled Egg Recipe</h1>
<div>
    <table>
        <tr>
            <td>
                Prep Time
            </td>
            <td>
                Cook Time
            </td>
            <td>
                Serves
            </td>
        </tr>
        <tr>
            <td>
                ~1 min
            </td>
            <td>
                ~5 min
            </td>
            <td>
                idk
            </td>
        </tr>
    </table>
</div>
<h2>Ingredients</h2>
<ul>
    <li>2+ eggs</li>
    <li>Some small cubes of cold butter</li>
    <li>A fork</li>
    <li>1 bowl</li>
    <li>Stove</li>
    <li>Hands</li>
    <li>Salt</li>
    <li>Pepper</li>
    <li>(optional) Spinach / shredded cheese / misc. fixins'</li>
</ul>
<h2>Instructions</h2>
<ul class="nums">
    <li>(optional) Prep the spinch by chopping it into small shards</li>
    <li>Crack the eggs into the bowl, preferably with only one hand</li>
    <li>Add a healthy amount of salt and pepper to the bowl</li>
    <li>Vigorously whisk the eggs with the fork in a spinning motion with the axis of rotation about the length of the fork</li>
    <li>Heat up a <b>small(!)</b> pan to medium, throw some olive oil in there too</li>
    <li>Add the butter cubes to the egg bowl</li>
    <li>Confidently pour the eggs into the pan</li>
    <li>Stir!</li>
    <li>Stir!</li>
    <li>Stir!</li>
    <li>Don't stop stirring the eggs the entire time! Don't just stir either! Scrape eggs off the bottom of the pan before they have a chance to get stuck. No one piece of egg should stay in the same place for more than a second.</li>
    <li>(optional) Once the eggs start to form up a bit add the spinach</li>
    <li>The eggs will retain a good amount of heat and continue cooking even after you take them out of the pan, so take them out when they look about 80% done (firm but watery)</li>
    <li>(optional) Top with cheese</li>
    <li>Chow down!</li>
</ul>
</div>
`;

function span(text) {
  let span = document.createElement("span");
  span.innerText = text;
  return span;
}

let clicked = 0;
function a(text, goal, done) {
  let a = document.createElement("a");
  a.innerText = text;
  a.style["cursor"] = "pointer";
  let alreadyClicked = false;
  a.onclick = () => {
    if (!alreadyClicked) {
      clicked += 1;
      alreadyClicked = true;
    }
    if (clicked === goal) {
      done();
    }
    a.style["font-weight"] = "bold";
    a.style["font-size"] = "2em";
    a.style["background-color"] = "red";
  };
  return a;
}

function done() {
  console.log("Showing...");
  document.querySelector("div.main-content").innerHTML = egg;
}

document.addEventListener("DOMContentLoaded", () => {
  const post = document.querySelector("div.article-post");
  const p = post.querySelector("p");

  let data = p.childNodes[0];
  let text = data.textContent;
  let after = p.childNodes[1];
  p.removeChild(data);

  let letters = ["m", "e", "o", "w"];
  let indices = [];
  let last = 0;
  for (const letter of letters) {
    const idx = text.indexOf(letter, last);
    indices.push([last, idx]);
    last = idx;
  }
  let parts = [];
  let idxI = null;
  let lastI = null;
  let mod = 0;
  for (let i = 0; i < indices.length; i++) {
    [lastI, idxI] = indices[i];
    let nextI = null;
    if (i + 1 < indices.length) {
      nextI = indices[i + 1][1];
    }

    parts.push(span(text.slice(lastI + mod, idxI)));
    parts.push(a(letters[i], letters.length, done));
    mod = 1;
  }
  parts.push(span(text.slice(idxI + 1)));

  for (const newNode of parts) {
    p.insertBefore(newNode, after);
  }
});
