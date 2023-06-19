//China = 49;

const geoURL = "https://restcountries.com/v3.1/all?fields=name,flags";
const countryHints = document.getElementById("country-hints");
const answer = document.getElementById("answer");
const answerBtn = document.getElementById("check-answer");
const playBtn = document.getElementById("play-btn");
const guessContainer = document.getElementById("guess-container");
const guessContainerItems = document.querySelectorAll(".guess-container-item");
const initialPage = document.getElementById("initial-page");
const nextCountryBtn = document.getElementById("next-country-btn");
const idkBtn = document.getElementById("idk-btn");

answerBtn.addEventListener("click", handleAnswerBtn);
playBtn.addEventListener("click", handlePlayBtn);
nextCountryBtn.addEventListener("click", handleNextCountryBtn);
idkBtn.addEventListener("click", handleIdkBtn);

let numCountries = 0;
let countryName = "";
let countriesData = {};

let randIndexArr = [];
const searched = [];
let currIndex = 0;

function handlePlayBtn() {
  initialPage.classList.remove("show");
  initialPage.classList.add("hide");

  guessContainerItems.forEach((item) => item.classList.remove("hide"));
  guessContainerItems.forEach((item) => item.classList.add("show"));

  handleCountryName(countriesData);
}

async function handleNextCountryBtn() {
  answer.classList.add("show");
  answerBtn.classList.add("show");

  handleCountryName(countriesData);
  currIndex++;

  if (currIndex >= numCountries) {
    countryHints.textContent = "Well Done, that was all of the countries!";
  }

  countryHints.classList.remove("idk");
  countryHints.classList.remove("correct");
}

function handleIdkBtn() {
  countryHints.classList.add("idk");

  answer.classList.remove("show");
  answer.classList.add("hide");
  answerBtn.classList.remove("show");
  answerBtn.classList.add("hide");

  countryHints.textContent = countryName;
}

async function countryInfo() {
  try {
    await axios({
      url: geoURL,
      method: "GET",
    }).then((response) => {
      countriesData = response.data;
      numCountries = countriesData.length;
      getRandomArray();
    });
  } catch (e) {
    console.log(e);
  }
}

const handleCountryName = async function (data) {
  countryName = data[currIndex].name.common;

  searched.push(countriesData[currIndex]);

  const countryURL = `https://restcountries.com/v3.1/name/${countryName}?fields=capital,continents,flag,currencies,landlocked,population`;

  const getCountryData = await axios({
    url: countryURL,
    method: "GET",
  })
    .then((response) => handleCountryData(response.data[0]))
    .catch((err) => console.log(err));
};

const handleCountryData = function (data) {
  countryHints.textContent = data.flag;
};

function handleAnswerBtn() {
  console.log(countryName);

  if (
    countryName.localeCompare(answer.value, undefined, {
      sensitivity: "accent",
    }) === 0
  ) {
    countryHints.classList.add("correct");
    countryHints.textContent = "Correct!";
  }
  answer.value = "";
}

function getRandomArray() {
  randIndexArr = [...Array(numCountries).keys()];
  shuffle(randIndexArr);
}

function shuffle(arr) {
  let i = arr.length,
    j = 0,
    temp;

  while (i--) {
    j = Math.floor(Math.random() * (i + 1));

    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  return arr;
}

countryInfo();
