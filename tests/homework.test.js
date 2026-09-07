import { describe, it, expect } from 'vitest';
import { initializeApp } from '../src/app.js';
import { cameras } from '../src/data/cameras.js';

function app() {
  const root = document.querySelector('#app');
  initializeApp(root, cameras);
  return root;
}

function visibleCards() {
  return [...document.querySelectorAll('[data-testid="camera-card"]')];
}

function search(term) {
  const input = document.querySelector('[data-testid="search-input"]');
  input.value = term;
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

function favoriteButton(id) {
  return document.querySelector(`[data-testid="favorite-button"][data-id="${id}"]`);
}

describe('DOM-kamerakatalogi', () => {
  it('rakentaa peruskäyttöliittymän ja näyttää kaikki kamerat alussa', () => {
    const root = app();

    expect(root.querySelector('h1')?.textContent).toMatch(/kamerakatalogi/i);
    expect(root.querySelector('[data-testid="search-input"]')).toBeTruthy();
    expect(root.querySelector('[data-testid="camera-list"]')).toBeTruthy();
    expect(visibleCards()).toHaveLength(cameras.length);
  });

  it('näyttää kortilla kameran tiedot ja suosikkipainikkeen', () => {
    app();
    const card = document.querySelector('[data-testid="camera-card"][data-id="cam-1"]');

    expect(card).toBeTruthy();
    expect(card.textContent).toContain('Canon');
    expect(card.textContent).toContain('EOS R50');
    expect(card.textContent).toContain('APS-C');
    expect(card.textContent).toContain('799');
    expect(card.textContent).toContain('2023');
    expect(card.querySelector('[data-testid="favorite-button"]')).toBeTruthy();
  });

  it('antaa jokaiselle kortille ja painikkeelle oman data-id-arvon', () => {
    app();

    const cardIds = visibleCards().map(card => card.dataset.id);
    const buttonIds = [...document.querySelectorAll('[data-testid="favorite-button"]')].map(button => button.dataset.id);

    expect(cardIds).toEqual(cameras.map(camera => camera.id));
    expect(buttonIds).toEqual(cameras.map(camera => camera.id));
  });

  it('hakukenttä suodattaa kamerat valmistajan mukaan', () => {
    app();

    search('Canon');

    const texts = visibleCards().map(card => card.textContent);
    expect(texts).toHaveLength(2);
    expect(texts.every(text => text.includes('Canon'))).toBe(true);
  });

  it('hakukenttä suodattaa kamerat mallin mukaan isoista kirjaimista välittämättä', () => {
    app();

    search('x-t5');

    expect(visibleCards()).toHaveLength(1);
    expect(visibleCards()[0].dataset.id).toBe('cam-8');

    search('');

    expect(visibleCards()).toHaveLength(cameras.length);
  });

  it('suosikkipainike vaihtaa tilaa ja tallentaa suosikit localStorageen', () => {
    app();
    const button = favoriteButton('cam-1');

    expect(button.classList.contains('is-favorite')).toBe(false);

    button.click();

    expect(favoriteButton('cam-1').classList.contains('is-favorite')).toBe(true);
    expect(JSON.parse(localStorage.getItem('w3-dom-favorites'))).toContain('cam-1');

    favoriteButton('cam-1').click();

    expect(favoriteButton('cam-1').classList.contains('is-favorite')).toBe(false);
    expect(JSON.parse(localStorage.getItem('w3-dom-favorites'))).not.toContain('cam-1');
  });

  it('suosikin tila säilyy, kun hakusana muuttuu', () => {
    app();
    favoriteButton('cam-1').click();

    search('Canon');
    expect(favoriteButton('cam-1').classList.contains('is-favorite')).toBe(true);
    expect(favoriteButton('cam-7').classList.contains('is-favorite')).toBe(false);

    search('');
    expect(favoriteButton('cam-1').classList.contains('is-favorite')).toBe(true);
  });

  it('palauttaa tallennetut suosikit localStoragesta alustuksen yhteydessä', () => {
    localStorage.setItem('w3-dom-favorites', JSON.stringify(['cam-3', 'cam-4']));

    app();

    expect(favoriteButton('cam-3').classList.contains('is-favorite')).toBe(true);
    expect(favoriteButton('cam-4').classList.contains('is-favorite')).toBe(true);
    expect(favoriteButton('cam-1').classList.contains('is-favorite')).toBe(false);
  });
});
