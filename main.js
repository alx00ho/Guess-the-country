const geoURL = "https://restcountries.com/v3.1/all?fields=name";
const countryHints = document.getElementById("country-hints");
const answer = document.getElementById("country-answer");
const answerBtn = document.getElementById("check-answer");

answerBtn.addEventListener("click", handleAnswerBtn);

let numCountries = 0;
let countryName = "";

async function countryInfo() {
  try {
    await axios({
      url: geoURL,
      method: "GET",
    })
      .then((response) => handleCountryName(response.data))
      .catch((err) => console.log(err));
  } catch (e) {
    console.log(e);
  }
}

const handleCountryName = async function (data) {
  numCountries = data.length;

  const rand = getRandomInt();
  // console.log(rand);
  countryName = data[rand].name.common;
  // console.log(randomCountry);

  const countryURL = `https://restcountries.com/v3.1/name/${countryName}?fields=capital,continents,flag,currencies,landlocked,population`;

  const getCountryData = await axios({
    url: countryURL,
    method: "GET",
  })
    .then((response) => handleCountryData(response.data))
    .catch((err) => console.log(err));
  // countryHints.textContent += countryName;
};

const handleCountryData = function (data) {
  // console.log(data[0].flag);
  countryHints.textContent += data[0].flag;
};

function handleAnswerBtn() {
  //   console.log(answer.value);
  //   console.log(countryName);
  console.log(answer.value === countryName);
}

const getRandomInt = function () {
  return Math.floor(Math.random() * numCountries);
};

// const countryNames = async function () {
//   const res = await fetch(geoURL);
//   const data = await res.json();

//   console.log(data);
// };

countryInfo();
// countryNames();
