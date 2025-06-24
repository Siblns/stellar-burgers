import * as user from '../fixtures/login.json';
import * as auth from '../fixtures/auth.json';
import * as order from '../fixtures/order.json';

describe('Check loading ingredients', () => {
  before(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000/');
  });

  it('Check add ingredients', () => {
    cy.request('/api/ingredients');
    const bun = cy.get(':nth-child(2) > :nth-child(1) > .common_button');
    const main = cy.get(':nth-child(4) > :nth-child(8) > .common_button');
    const sauce = cy.get(':nth-child(6) > .common_button');

    bun.click();
    main.click();
    sauce.click();

    const burgerCunstructor = {
      constructorBunTop: cy.get(
        '.constructor-element_pos_top > .constructor-element__row > .constructor-element__text'
      ),
      constructorMain: cy.contains('Мини-салат Экзо-Плантаго'),
      constructorSauce: cy.contains('Соус фирменный Space Sauce'),
      constructorBunBottom: cy.get(
        '.constructor-element_pos_bottom > .constructor-element__row > .constructor-element__text'
      )
    };

    burgerCunstructor.constructorBunTop.contains(
      'Краторная булка N-200i (верх)'
    );
    burgerCunstructor.constructorMain.contains('Мини-салат Экзо-Плантаго');
    burgerCunstructor.constructorSauce.contains('Соус фирменный Space Sauce');
    burgerCunstructor.constructorBunBottom.contains(
      'Краторная булка N-200i (низ)'
    );
  });
});

describe('Check modal', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000/');
  });

  it('open modal', () => {
    const ingredient = cy.contains('Мини-салат Экзо-Плантаго');

    ingredient.click();

    const modal = cy.get('#modals > div:first-child');
    const header = modal.get('div:first-child > h3');

    header.contains('Мини-салат Экзо-Плантаго');
  });

  it('close modal on button "close"', () => {
    const ingredient = cy.get(':nth-child(4) > :nth-child(8)');

    ingredient.click();

    const modal = cy.get('#modals > div:first-child').as('modal');
    const button = modal.get('div:first-child > button > svg');

    button.click();

    cy.get('modal').should('not.exist');
  });

  it('close modal on button overlay', () => {
    const ingredient = cy.get(':nth-child(4) > :nth-child(5)');

    ingredient.click();

    const modal = cy.get('#modals > div:first-child').as('modal');
    const overlay = modal.get('#modals > div:nth-child(2)');

    overlay.click({ force: true });

    cy.get('modal').should('not.exist');
  });
});

describe('Check create order', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'login.json' });
    cy.setCookie('accessToken', auth.accessToken);
    localStorage.setItem('refreshToken', auth.refreshToken);
    cy.intercept('GET', 'api/auth/tokens', {
      fixture: 'auth.json'
    });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
    cy.visit('http://localhost:4000/');
  });

  it('', () => {
    const bun = cy.get(':nth-child(2) > :nth-child(1) > .common_button');
    const main = cy.get(':nth-child(4) > :nth-child(8) > .common_button');
    const sauce = cy.get(':nth-child(6) > .common_button');

    bun.click();
    main.click();
    sauce.click();

    const orderButton = cy.get(
      '#root > div > main > div > section:nth-child(2) > div > button'
    );

    orderButton.click();

    const orderModal = cy.get('#modals > div:first-child');
    const orderNumber = orderModal.get('div:nth-child(2) > h2');

    orderNumber.contains(order.order.number);

    const button = orderModal.get(
      'div:first-child > div:first-child > button > svg'
    );

    button.click();

    cy.get('modal').should('not.exist');

    const burgerCunstructor = {
      constructorBunTop: cy.get('div > section:nth-child(2) > div'),
      constructoMainIngredient: cy.get('div > section:nth-child(2) > ul > div'),
      constructorBunBottom: cy.get(
        'div > section:nth-child(2) > div:nth-child(3)'
      )
    };

    burgerCunstructor.constructorBunTop.contains('Выберите булки');
    burgerCunstructor.constructoMainIngredient.contains('Выберите начинку');
    burgerCunstructor.constructorBunBottom.contains('Выберите булки');
  });

  afterEach(() => {
    cy.clearAllCookies();
    localStorage.removeItem('refreshToken');
  });
});
