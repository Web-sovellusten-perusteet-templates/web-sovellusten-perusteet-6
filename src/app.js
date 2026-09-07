import { cameras } from './data/cameras.js';
import './styles.css';

// TODO: Toteuta tehtävä README.md:n ohjeiden mukaan.
// Vinkki: pidä sovelluksen tila yhdessä objektissa ja kutsu render()-funktiota aina, kun tila muuttuu.

export function initializeApp(root = document.querySelector('#app'), cameraData = cameras) {
  if (!root) {
    throw new Error('Root-elementtiä ei löydy');
  }

  root.innerHTML = '';
  // Luo käyttöliittymä tähän.
}

if (typeof document !== 'undefined') {
  const root = document.querySelector('#app');
  if (root) {
    initializeApp(root, cameras);
  }
}
