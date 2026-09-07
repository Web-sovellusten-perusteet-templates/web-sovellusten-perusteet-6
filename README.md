# W3 DOM-kotitehtävä: Kamerakatalogi

Tässä tehtävässä rakennat pienen kamerakatalogin pelkällä JavaScriptin DOM-ohjelmoinnilla. HTML-tiedostossa on valmiina vain `div#app`; sinun tehtäväsi on luoda käyttöliittymä JavaScriptillä.

Tehtävän laajuus on noin 1–2 tuntia.

## Oppimistavoitteet

Harjoituksen jälkeen osaat:

- luoda DOM-elementtejä `document.createElement`-funktiolla
- valita ja päivittää elementtejä `querySelector`- ja `textContent`-ominaisuuksilla
- käyttää `classList`-, `dataset`- ja `addEventListener`-ominaisuuksia
- toteuttaa suodatuksen JavaScript-taulukon perusteella
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
| `[data-testid="camera-list"]` | Elementti, jonka sisällä kamerakortit ovat |
| `[data-testid="camera-card"]` | Yksi kamerakortti; lisää myös `data-id="kameran-id"` |
| `[data-testid="favorite-button"]` | Suosikkipainike kortin sisällä; lisää myös `data-id="kameran-id"` |

## Esimerkkirakenne

Kun sovellus on rakennettu, `div#app`:n sisällön pitäisi näyttää suunnilleen tältä. Tätä HTML:ää **ei kirjoiteta käsin** `index.html`-tiedostoon, vaan JavaScript luo sen `document.createElement`-funktiolla.

```html
<div id="app">
  <h1>Kamerakatalogi</h1>

  <div class="controls">
    <label for="search">Hae kameraa</label>
    <input id="search" type="search" data-testid="search-input" placeholder="Esim. Canon tai X-T5" />
  </div>

  <div class="camera-list" data-testid="camera-list">
    <article class="camera-card" data-testid="camera-card" data-id="cam-1">
      <h2>Canon EOS R50</h2>
      <p>Kenno: APS-C</p>
      <p>Hinta: 799 €</p>
      <p>Vuosi: 2023</p>
      <button type="button" class="favorite-button" data-testid="favorite-button" data-id="cam-1">
        ☆ Suosikki
      </button>
    </article>

    <article class="camera-card" data-testid="camera-card" data-id="cam-2">
      <h2>Nikon Z5</h2>
      <p>Kenno: Full Frame</p>
      <p>Hinta: 1399 €</p>
      <p>Vuosi: 2020</p>
      <button type="button" class="favorite-button is-favorite" data-testid="favorite-button" data-id="cam-2">
        ★ Suosikki
      </button>
    </article>

    <!-- ...loput kamerat samalla rakenteella... -->
  </div>
</div>
```

Huomaa esimerkissä kaksi asiaa:

- Jokainen kortti ja painike tuntee oman kameransa `data-id`-attribuutin kautta. Tämän avulla saat selville, mitä kameraa klikattiin.
- Suosikiksi merkityn kameran painikkeella on ylimääräinen luokka `is-favorite`. Valmiissa `src/styles.css`-tiedostossa on tälle luokalle jo tyyli.

## Toiminnalliset vaatimukset

1. Alussa kaikki kamerat näkyvät. Kortilla näytetään valmistaja, malli, kennokoko, hinta ja vuosi.
2. Hakukenttä suodattaa kamerat valmistajan tai mallin mukaan. Haun pitää toimia isoista ja pienistä kirjaimista välittämättä.
3. Suosikkipainike lisää kameran suosikkeihin tai poistaa sen sieltä. Suosikiksi merkityn kameran painikkeella on luokka `is-favorite`.
4. Suosikin tila säilyy, vaikka hakusana muuttuu ja lista rakennetaan uudelleen.
5. Suosikit tallennetaan `localStorageen` avaimella `w3-dom-favorites` JSON-taulukkona kameroiden id-arvoja, esimerkiksi `["cam-1","cam-3"]`. Tallennetut suosikit palautetaan, kun sovellus alustetaan uudelleen.

## Suositeltu toteutusjärjestys

1. Luo otsikko, hakukenttä ja tyhjä korttilista.
2. Tee `createCameraCard(camera)`-funktio, joka palauttaa yhden `article`-elementin.
3. Tee `render()`-funktio, joka laskee hakusanaan sopivat kamerat ja rakentaa korttilistan uudelleen.
4. Lisää hakukentälle `input`-tapahtumankuuntelija, joka päivittää hakusanan ja kutsuu `render()`-funktiota.
5. Lisää suosikit event delegation -mallilla: yksi `click`-kuuntelija korttilistalle, josta tunnistat painetun painikkeen `dataset.id`-arvon avulla.
6. Lisää `localStorage`-tallennus ja palautus.

## Vinkkejä

- Pidä sovelluksen tila yhdessä paikassa: hakusana merkkijonona ja suosikit esimerkiksi `Set`- tai taulukkorakenteena. Kutsu `render()`-funktiota aina, kun tila muuttuu.
- `localStorage` tallentaa vain merkkijonoja. Käytä `JSON.stringify`- ja `JSON.parse`-funktioita.
- Event delegation: kuuntele klikkauksia korttilistalla ja tarkista `event.target.dataset.testid` tai `event.target.closest('[data-testid="favorite-button"]')`.
- Kun rakennat listan uudelleen, tyhjennä se ensin esimerkiksi `list.replaceChildren()`-kutsulla.

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
