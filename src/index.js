import './css/styles.css';
import { fetchCountries } from './api-serves';
import getRefs from './refs';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const DEBOUNCE_DELAY = 300;
let name = '';
const refs = getRefs();
// 0 start refs

// const refs = {
//   inputCountry: document.querySelector('#search-box'),
//   countryList: document.querySelector('.country-list'),
//   countryInfoContainer: document.querySelector('.country-info'),
// };

refs.inputCountry.addEventListener(
  'input',
  debounce(onInputChancge, DEBOUNCE_DELAY)
);

//1 input
function onInputChancge() {
  name = String(refs.inputCountry.value).trim();
  if (name !== '') {
    fetchCountries(name)
      .then(makeInterface)
      .catch(error => {
        console.log('my error: ', error);
        Notify.failure(
          'Can`t found this country, but don`t worry, try again ;)',
          {
            position: 'center-top',
            timeout: 3000,
            fontSize: '18px',
          }
        );
      });
  }
}

//2
function makeInterface(listOfCountr) {
  refs.countryInfoContainer.classList.add('is-hidden');
  clearTable();
  clearCountry();
  if (listOfCountr.length > 10) {
    console.log('info');
    return Notify.info('All is good, go on... I need more latters', {
      position: 'center-top',
      timeout: 2000,
      //   width: '355px',
      fontSize: '18px',
    });
  } else if (listOfCountr.length === 1) {
    refs.countryInfoContainer.innerHTML = makeCountryMarkup(listOfCountr[0]);
  } else if (listOfCountr.length === 0) {
    clearTable();
  } else {
    refs.countryList.innerHTML = makeTable(listOfCountr);
  }
}

//3
function makeCountryMarkup({ name, capital, population, flags, languages }) {
  refs.countryInfoContainer.classList.remove('is-hidden');
  return ` <h3 class="country"><img src="${flags.png}" alt="flag" width=30px> ${
    name.official
  }</h3>
    <p class="info">Capital: ${capital}</p>
    <p class="info">Population: ${population}</p>
    <p class="info">Languages: ${Object.values(languages)}</p>`;
}

function clearCountry() {
  refs.countryInfoContainer.innerHTML = '';
}

//4
function makeTable(data) {
  return data
    .map(({ name, flags }) => {
      return `<li><img src="${flags.png}" alt="flag" width=30px> ${name.official}</li>`;
    })
    .join('');
}

function clearTable() {
  refs.countryList.innerHTML = '';
}

////
