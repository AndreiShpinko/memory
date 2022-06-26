const imgNames = [
  "chimp",
  "deer",
  "eagle",
  "fox",
  "orangutan",
  "panda",
  "raccoon",
  "rhino",
  "hedgehog",
  "kangaroo",
  "lion",
  "lizard",
  "monkey",
  "octopus",
  "shark",
  "tiger",
  "unicorn",
  "wulf",
  "zebra",
  "bird",
  "buffalo",
  "butterfly",
  "cat",
  "flamingo",
  "mouse",
  "parrot",
  "peacock",
  "ram",
  "hare",
  "owl",
  "pumbaa",
];

const colors = [
  "rgb(255 205 205)",
  "rgb(255 239 205)",
  "rgb(255 252 205)",
  "rgb(214 255 205)",
  "rgb(205 255 226)",
  "rgb(205 247 255)",
  "rgb(205 228 255)",
  "rgb(209 205 255)",
  "rgb(239 205 255)",
  "rgb(255 205 218)",
];

const winsCounter = document.querySelector("[data-info = wins]");
const movesCounter = document.querySelector("[data-info = moves]");

function getRandom(till) {
  return Math.floor(Math.random() * till);
}

// set random color on .cards
function setRanWrapColor() {
  document.querySelector(".cards").style.backgroundColor =
    colors[getRandom(colors.length)];
}

// set game again after win
function setGameAgain() {
  guessedCardsAmount = 0;
  document.querySelectorAll(".card").forEach((el) => {
    el.dataset.status = "closed";
  });

  setTimeout(() => loadImg(), 400);
}

// load all imgs on card backs, i used it only on start
function loadBackImgs() {
  const imgBackElements = document.querySelectorAll(".card__back");

  imgBackElements.forEach((el) => {
    el.style.backgroundImage = `url(img/${
      imgNames[getRandom(imgBackElements.length)]
    }.png)`;
  });
}

// load all imgs and colors on card front sides
function loadImg() {
  let randomArr = [];
  for (let i = 0; i < 16; i++) randomArr.push(i);
  randomArr = randomArr.sort(() => Math.random() - 0.5);

  let imgElements = document.querySelectorAll(".card img");
  let imgWrappers = document.querySelectorAll(".card .img-wrapper");

  for (let i = 0; i < imgElements.length; i += 2) {
    const randomImgName = imgNames[getRandom(imgNames.length)];
    const randomColor = colors[getRandom(colors.length)];

    imgElements[randomArr[i]].src = `./img/${randomImgName}.png`;
    imgElements[randomArr[i + 1]].src = `./img/${randomImgName}.png`;

    imgWrappers[randomArr[i]].style.backgroundColor = randomColor;
    imgWrappers[randomArr[i + 1]].style.backgroundColor = randomColor;
  }
}

// check cards are equally or not
function checkCardEqually(el1, el2) {
  if (
    el1.querySelector("img").getAttribute("src") ===
      el2.querySelector("img").getAttribute("src") &&
    el1.querySelector(".img-wrapper").style.backgroundColor ===
      el2.querySelector(".img-wrapper").style.backgroundColor
  ) {
    return true;
  }
  return false;
}

// start secundomer
function secundomer() {
  let minEl = document.querySelector("[data-info = minutes]");
  let secEl = document.querySelector("[data-info = seconds]");
  let minutes = 0;
  let seconds = 0;
  setInterval(() => {
    if (seconds === 59) {
      seconds = -1;
      minutes++;
      minEl.innerHTML = minutes < 10 ? "0" + minutes : minutes;
    }
    seconds++;
    secEl.innerHTML = seconds < 10 ? "0" + seconds : seconds;
  }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  secundomer();
  loadBackImgs();
  loadImg();
  setRanWrapColor();
});

let clickedCards = [];
let guessedCardsAmount = 0;

document.querySelector(".cards").addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return false;

  if (guessedCardsAmount === 16) {
    setGameAgain();
    winsCounter.innerHTML = +winsCounter.innerHTML + 1;
  } else if (card.dataset.status === "closed") {
    card.dataset.status = "open";
    clickedCards.push(card);

    if (clickedCards.length === 2) {
      movesCounter.innerHTML = +movesCounter.innerHTML + 1;
      setRanWrapColor();
      if (checkCardEqually(...clickedCards)) {
        clickedCards[0].dataset.status = "guessed";
        clickedCards[1].dataset.status = "guessed";
        guessedCardsAmount += 2;
      } else {
        const clickedCardsCopy = [...clickedCards];
        setTimeout(() => {
          clickedCardsCopy[0].dataset.status = "closed";
          clickedCardsCopy[1].dataset.status = "closed";
        }, 1000);
      }

      clickedCards.length = 0;
    }
  } else {
    card.classList.add("red");
    setTimeout(() => {
      card.classList.remove("red");
    }, 1500);
  }
});
