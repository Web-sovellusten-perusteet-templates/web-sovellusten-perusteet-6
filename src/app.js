import { cameras } from './data/cameras.js';
import './styles.css';

// TODO: Toteuta tehtävä README.md:n ohjeiden mukaan.
// Vinkki: pidä sovelluksen tila yhdessä objektissa ja kutsu render()-funktiota aina, kun tila muuttuu.

const FAVORITES_KEY = 'w3-dom-favorites';

export function initializeApp(root = document.querySelector('#app'), cameraData = cameras) {
  if (!root) {
    throw new Error('Root-elementtiä ei löydy');
  }

  root.innerHTML = '';

  const state = {
    search: '',
    favorites: loadFavorites()
  };

  // 1. Luo otsikko, hakukenttä ja tyhjä korttilista ja lisää ne root-elementtiin.
  //    Muista data-testid-arvot: "search-input" ja "camera-list".

  // 4. Lisää hakukentälle input-kuuntelija, joka päivittää state.search-arvon
  //    ja kutsuu render()-funktiota.

  // 5. Lisää korttilistalle yksi click-kuuntelija (event delegation), joka
  //    tunnistaa painetun suosikkipainikkeen ja kutsuu toggleFavorite-funktiota.

  render();

  function render() {
    // 3. Suodata cameraData state.search-arvon perusteella (valmistaja tai malli,
    //    kirjainkoosta välittämättä) ja rakenna korttilista uudelleen.
  }

  function createCameraCard(camera) {
    // 2. Luo ja palauta yksi article-elementti, joka sisältää kameran tiedot
    //    ja suosikkipainikkeen. Muista data-testid- ja data-id-attribuutit sekä
    //    is-favorite-luokka suosikeille.
  }

  function toggleFavorite(id) {
    // 6. Lisää tai poista id state.favorites-listalta, tallenna suosikit
    //    localStorageen ja päivitä näkymä.
  }
}

function loadFavorites() {
  // 6. Lue suosikit localStoragesta. Palauta tyhjä taulukko, jos tallennettua
  //    arvoa ei ole tai se ei ole kelvollista JSONia.
  return [];
}

if (typeof document !== 'undefined') {
  const root = document.querySelector('#app');
  if (root) {
    initializeApp(root, cameras);
  }
}
