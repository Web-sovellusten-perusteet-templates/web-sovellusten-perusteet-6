# W3 DOM-kotitehtävä: Kamerakatalogi

Tässä tehtävässä rakennat pienen kamerakatalogin pelkällä JavaScriptin DOM-ohjelmoinnilla. HTML-tiedostossa on valmiina vain `div#app`; sinun tehtäväsi on luoda käyttöliittymä JavaScriptillä.

## Oppimistavoitteet

Harjoituksen jälkeen osaat:

- luoda DOM-elementtejä `document.createElement`-funktiolla
- valita ja päivittää elementtejä `querySelector`- ja `textContent`-ominaisuuksilla
- käyttää `classList`-, `dataset`- ja `addEventListener`-ominaisuuksia
- toteuttaa suodatuksen ja järjestämisen JavaScript-taulukon perusteella
- käyttää event delegation -mallia dynaamisesti luotujen painikkeiden kanssa
- tallentaa pienen määrän käyttöliittymätilaa `localStorageen`

## Tehtävä

Toteuta tiedostoon `src/app.js` funktio:

```js
export function initializeApp(root = document.querySelector('#app'), cameraData = cameras) {
  // toteutus
}
```

Funktion pitää rakentaa koko sovellus annetun `root`-elementin sisään. Kameradata löytyy tiedostosta `src/data/cameras.js`.

## Pakollinen käyttöliittymä

Testit etsivät seuraavia elementtejä. Käytä täsmälleen näitä `data-testid`-arvoja.

| Elementti | Vaatimus |
| --- | --- |
| `h1` | Sisältää sanan `Kamerakatalogi` |
| `[data-testid="search-input"]` | Hakukenttä, joka suodattaa valmistajan tai mallin mukaan |
| `[data-testid="sensor-filter"]` | `select`, jossa vaihtoehdot `all`, `Full Frame`, `APS-C`, `MFT` |
| `[data-testid="sort-select"]` | `select`, jossa vaihtoehdot `price-asc`, `price-desc`, `year-desc` |
| `[data-testid="favorites-only"]` | Checkbox: näytä vain suosikit |
| `[data-testid="camera-count"]` | Näyttää näkyvien kameroiden määrän |
| `[data-testid="favorite-count"]` | Näyttää suosikkien määrän |
| `[data-testid="camera-list"]` | Lista tai section, jonka sisällä kamerakortit ovat |
| `[data-testid="camera-card"]` | Yksi kamerakortti; lisää myös `data-id="kameran-id"` |
| `[data-testid="favorite-button"]` | Suosikkipainike; lisää myös `data-id="kameran-id"` |

## Toiminnalliset vaatimukset

1. Alussa kaikki kamerat näkyvät.
2. Hakukenttä suodattaa kamerat valmistajan tai mallin mukaan.
3. Sensorisuodatin näyttää vain valitun sensorikoon kamerat.
4. Järjestäminen toimii vähintään arvoilla:
   - `price-asc`: halvin ensin
   - `price-desc`: kallein ensin
   - `year-desc`: uusin ensin
5. Suosikkipainike lisää tai poistaa kameran suosikeista.
6. Suosikin tila säilyy, vaikka suodatin tai järjestys muuttuu.
7. `Näytä vain suosikit` näyttää vain suosikkikamerat.
8. Seuraavat arvot tallennetaan `localStorageen` ja palautetaan sivun alustuksessa:
   - `w3-dom-sensor`
   - `w3-dom-sort`
   - `w3-dom-search`
   - `w3-dom-favorites`

## Suositeltu toteutusjärjestys

1. Luo otsikko, kontrollit, laskurit ja tyhjä korttilista.
2. Tee `createCameraCard(camera)`-funktio, joka palauttaa yhden `article`-elementin.
3. Tee `render()`-funktio, joka laskee näkyvät kamerat ja rakentaa korttilistan uudelleen.
4. Lisää tapahtumankuuntelijat hakukentälle, suodattimelle ja järjestykselle.
5. Lisää suosikit event delegation -mallilla: yksi `click`-kuuntelija korttilistalle.
6. Lisää `localStorage`-tallennus ja palautus.

## Testien ajaminen

Asenna riippuvuudet ja aja testit:

```bash
npm install
npm test
```

Käynnistä sovellus selaimeen:

```bash
npm run dev
```

## Palautus

Palauta tehtävä opettajan ohjeistaman Classroom50-/GitHub-linkin kautta. Älä muokkaa `tests`-kansiota tai `.github/workflows`-kansiota.
