import './css/styles.css';
import pokemonCardTpl from './tamplates/pokemon-card.hbs';
import API from './api-serves';
import getRefs from './refs';

const refs = getRefs();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const searchQuery = form.elements.query.value;

  API.fetchPokemon(searchQuery)
    .then(renderPokemonCard)
    .catch(onFetchError)
    .finally(() => form.reset());
}

function renderPokemonCard(pokemon) {
  const markup = pokemonCardTpl(pokemon);
  refs.cardContainer.innerHTML = markup;
}

function onFetchError(error) {
  console.log(error);
  alert('Упс, что-то пошло не так и мы не нашли вашего покемона!');
}
