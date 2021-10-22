let cards = document.querySelectorAll(".card");
let imgNames = [
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

let imgFacesNames = [
  "chimp",
  "deer",
  // "eagle",
  "fox",
  "orangutan",
  "panda",
  "raccoon",
  // "rhino",
  "hedgehog",
  // "kangaroo",
  "lion",
  "lizard",
  "monkey",
  "octopus",
  "shark",
  "tiger",
  "unicorn",
  "wulf",
  // "zebra",
  "bird",
  "buffalo",
  "butterfly",
  "cat",
  "flamingo",
  // "mouse",
  // "parrot",
  "peacock",
  "ram",
  "hare",
  "owl",
  "pumbaa",
];

let colors = [
  "rgb(255 205 205)",
  "rgb(255 239 205)",
  "rgb(255 252 205)",
  "rgb(214 255 205)",
  "rgb(205 255 226)",
  "rgb(205 247 255)",
  "rgb(205 228 255)",
  "rgb(209 205 255)",
  "rgb(239 205 255)",
  "rgb(255 205 241)",
];
let wins = 0;

let moves = 0;

document.addEventListener("DOMContentLoaded", () => {
  secundomer(0, 0);
  loadFrontImg();
  loadImg();
});

function loadFrontImg() {
  let imgBackElements = document.querySelectorAll(".back-img");
  imgBackElements.forEach((el) => {
    randomNum = Math.floor(Math.random() * imgBackElements.length);
    el.style.backgroundImage = `url(img/${imgFacesNames[randomNum]}.png)`;
  });
}

// Загружаем по две одиннаковые картинки
function loadImg() {
  // Выбираем все картинки
  let imgElements = document.querySelectorAll(".card img");
  let imgWrapper = document.querySelectorAll(".card .img-wrapper");
  // Создаем список из рандомно выбранных чисел от 0 до ПОЛОВИНЫ длины списка imgNames и заполняем его
  let arrNumImg = [];
  let arrNumCol = [];
  for (let i = 0; i < imgElements.length / 2; i++) {
    let randomNumImg = Math.floor(Math.random() * imgNames.length);
    let randomNumColors = Math.floor(Math.random() * colors.length);
    arrNumImg[i] = randomNumImg;
    arrNumCol[i] = randomNumColors;
  }
  // Удавиваем этот список
  // Сейчас в этом списке нужное количество рандомно выбранных в правильном диапозоне чисел с парами, но его левая половина равна правой
  arrNumImg = [...arrNumImg, ...arrNumImg];
  arrNumCol = [...arrNumCol, ...arrNumCol];

  // Перемешиваем левую и правую часть списка
  let arrImg = [];
  let arrCol = [];
  for (let i = 0; i < imgElements.length; i++) {
    let randomNum = Math.floor(Math.random() * arrNumImg.length);
    arrImg[i] = arrNumImg[randomNum];
    arrCol[i] = arrNumCol[randomNum];
    arrNumImg.splice(randomNum, 1);
    arrNumCol.splice(randomNum, 1);
  }
  // Вставляем каринки по этому списку
  imgElements.forEach((el, i) => {
    el.setAttribute("src", `img/${imgNames[arrImg[i]]}.png`);
  });
  // Вставляем цвета на фон
  imgWrapper.forEach((el, i) => {
    el.style.backgroundColor = colors[arrCol[i]];
  });
}

cards.forEach((card) => {
  card.addEventListener("click", () => {
    if (
      document.querySelector(".wrapper").className.split(" ").indexOf("win") !==
      -1
    ) {
      document.querySelector(".wrapper").classList.remove("win");
      // Мешаю картинки и цвета фона под ними
      loadImg();
      // Обнуляю ходы
      moves = 0;
      cards.forEach((el) => {
        el.setAttribute("data-active", "");
      });
    }
    if (!card.getAttribute("data-active")) {
      // Если у элемента нет класса 'active', то добавляю один ход
      if (card.className.split(" ").indexOf("active") === -1) moves++;
      // Добавляю карточке класс 'active'
      card.classList.add("active");
      updateMoves();
      checkWin();
    }
  });
});

function checkWin() {
  let arr = document.querySelectorAll(".card.active");
  if (arr.length >= 2) {
    if (
      arr[0].querySelector("img").getAttribute("src") ===
        arr[1].querySelector("img").getAttribute("src") &&
      arr[0].querySelector(".img-wrapper").style.backgroundColor ===
        arr[1].querySelector(".img-wrapper").style.backgroundColor
    ) {
      // Правильный ход
      for (let i = 0; i < 2; i++) {
        arr[i].dataset.active = "active";
        arr[i].classList.remove("active");
      }
      let cardsWin = document.querySelectorAll(".card[data-active = active]");
      if (cardsWin.length === cards.length) {
        // Победа
        wins++;
        updateScore();
        document.querySelector(".wrapper").classList.add("win");
        console.log("победа");
      }
    } else {
      // Не правильный ход
      setTimeout(() => {
        for (let i = 0; i < 2; i++) {
          arr[i].classList.remove("active");
        }
      }, 1000);
    }
  }
}

function updateScore() {
  let winElement = document.querySelector("[data-info = wins]");
  winElement.innerHTML = wins;
}

function updateMoves() {
  let movesElement = document.querySelector("[data-info = moves]");
  movesElement.innerHTML = moves;
}

function secundomer(curentMinutes, curentSeconds) {
  let minEl = document.querySelector("[data-info = minutes]");
  let secEl = document.querySelector("[data-info = seconds]");
  let minutes = curentMinutes;
  let seconds = curentSeconds;
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
