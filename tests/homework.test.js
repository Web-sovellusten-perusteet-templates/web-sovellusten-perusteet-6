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

describe('DOM-kamerakatalogi', () => {
  it('rakentaa peruskäyttöliittymän ja näyttää kaikki kamerat alussa', () => {
    const root = app();

    expect(root.querySelector('h1')?.textContent).toMatch(/kamerakatalogi/i);
    expect(root.querySelector('[data-testid="search-input"]')).toBeTruthy();
    expect(root.querySelector('[data-testid="sensor-filter"]')).toBeTruthy();
    expect(root.querySelector('[data-testid="sort-select"]')).toBeTruthy();
    expect(root.querySelector('[data-testid="favorites-only"]')).toBeTruthy();
    expect(visibleCards()).toHaveLength(cameras.length);
    expect(root.querySelector('[data-testid="camera-count"]')?.textContent).toContain(String(cameras.length));
  });

  it('hakukenttä suodattaa kamerat mallin tai valmistajan mukaan', () => {
    app();
    const search = document.querySelector('[data-testid="search-input"]');

    search.value = 'Canon';
    search.dispatchEvent(new Event('input', { bubbles: true }));

    const texts = visibleCards().map(card => card.textContent);
    expect(texts).toHaveLength(2);
    expect(texts.every(text => text.includes('Canon'))).toBe(true);
    expect(document.querySelector('[data-testid="camera-count"]')?.textContent).toContain('2');
  });

  it('sensorisuodatin näyttää vain valitun sensorikoon kamerat', () => {
    app();
    const filter = document.querySelector('[data-testid="sensor-filter"]');

    filter.value = 'MFT';
    filter.dispatchEvent(new Event('change', { bubbles: true }));

    expect(visibleCards()).toHaveLength(2);
    expect(visibleCards().every(card => card.textContent.includes('MFT'))).toBe(true);
  });

  it('järjestää kamerat hinnan mukaan laskevasti', () => {
    app();
    const sort = document.querySelector('[data-testid="sort-select"]');

    sort.value = 'price-desc';
    sort.dispatchEvent(new Event('change', { bubbles: true }));

    expect(visibleCards()[0].textContent).toContain('Sony');
    expect(visibleCards()[0].textContent).toContain('2499');
  });

  it('suosikkipainike vaihtaa tilaa, tekstiä, laskuria ja localStorage-arvoa', () => {
    app();
    const firstButton = document.querySelector('[data-testid="favorite-button"][data-id="cam-1"]');

    firstButton.click();

    expect(firstButton.textContent).toMatch(/suosikki|favourited|favorite/i);
    expect(document.querySelector('[data-testid="favorite-count"]')?.textContent).toContain('1');
    expect(JSON.parse(localStorage.getItem('w3-dom-favorites'))).toContain('cam-1');

    firstButton.click();

    expect(document.querySelector('[data-testid="favorite-count"]')?.textContent).toContain('0');
    expect(JSON.parse(localStorage.getItem('w3-dom-favorites'))).not.toContain('cam-1');
  });

  it('näytä vain suosikit -valinta näyttää vain suosikkikamerat', () => {
    app();
    document.querySelector('[data-testid="favorite-button"][data-id="cam-1"]').click();
    document.querySelector('[data-testid="favorite-button"][data-id="cam-3"]').click();

    const checkbox = document.querySelector('[data-testid="favorites-only"]');
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change', { bubbles: true }));

    expect(visibleCards()).toHaveLength(2);
    expect(visibleCards().map(card => card.dataset.id).sort()).toEqual(['cam-1', 'cam-3']);
  });

  it('palauttaa tallennetun sensorin, järjestyksen, haun ja suosikit localStoragesta', () => {
    localStorage.setItem('w3-dom-sensor', 'APS-C');
    localStorage.setItem('w3-dom-sort', 'year-desc');
    localStorage.setItem('w3-dom-search', 'Fujifilm');
    localStorage.setItem('w3-dom-favorites', JSON.stringify(['cam-4']));

    app();

    expect(document.querySelector('[data-testid="sensor-filter"]').value).toBe('APS-C');
    expect(document.querySelector('[data-testid="sort-select"]').value).toBe('year-desc');
    expect(document.querySelector('[data-testid="search-input"]').value).toBe('Fujifilm');
    expect(visibleCards()).toHaveLength(2);
    expect(document.querySelector('[data-testid="favorite-count"]')?.textContent).toContain('1');
  });
});
