import * as user from '../fixtures/login.json';
import * as auth from '../fixtures/auth.json';
import * as order from '../fixtures/order.json';

const testUrl = '/';
const modalFirst = '#modals > div:first-child';
const nameBun = 'Краторная булка N-200i';
const nameMain = 'Мини-салат Экзо-Плантаго';
const nameSauce = 'Соус фирменный Space Sauce';
const elementBeginFind = ':nth-child(2)';
const elementBun = ':nth-child(2) > :nth-child(1) > .common_button';
const elementMain = ':nth-child(4) > :nth-child(8) > .common_button';
const elementSauce = ':nth-child(6) > .common_button';

describe('Check loading ingredients', () => {
  before(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit(testUrl);
  });

  it('Check add ingredients', () => {
    cy.request('/api/ingredients');
    cy.get(elementBun).as('bun');
    cy.get(elementMain).as('main');
    cy.get(elementSauce).as('sauce');

    cy.get('@bun').click();
    cy.get('@main').click();
    cy.get('@sauce').click();

    const burgerCunstructor = {
      constructorBunTop: cy.get(
        '.constructor-element_pos_top > .constructor-element__row > .constructor-element__text'
      ),
      constructorMain: cy.contains(nameMain),
      constructorSauce: cy.contains(nameSauce),
      constructorBunBottom: cy.get(
        '.constructor-element_pos_bottom > .constructor-element__row > .constructor-element__text'
      )
    };

    burgerCunstructor.constructorBunTop.contains(nameBun + ' (верх)');
    burgerCunstructor.constructorMain.contains(nameMain);
    burgerCunstructor.constructorSauce.contains(nameSauce);
    burgerCunstructor.constructorBunBottom.contains(nameBun + ' (низ)');
  });
});

describe('Check modal', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit(testUrl);
  });

  it('open modal', () => {
    cy.contains(nameMain).as('ingredient');
    cy.get('@ingredient').click();

    cy.get(modalFirst).as('modal');
    cy.get('@modal').should('be.visible');

    cy.get('@modal').find('h3').as('modalHeader');
    cy.get('@modalHeader').should('contain.text', nameMain);
  });

  it('close modal on button "close"', () => {
    cy.get(':nth-child(4) > :nth-child(8)').as('ingredient');
    cy.get('@ingredient').click();

    cy.get(modalFirst).as('modal');
    cy.get('@modal').find('div:first-child > button > svg').as('firstButton');

    cy.get('@firstButton').click();
    cy.get('modal').should('not.exist');
  });

  it('close modal on button overlay', () => {
    cy.get(':nth-child(4) > :nth-child(5)').as('ingredient');
    cy.get('@ingredient').click();

    cy.get('#modals > div:first-child').as('modal');
    cy.get('@modal').should('be.visible');

    cy.get('#modals > ' + elementBeginFind, { timeout: 5000 }).as('overlay');

    cy.get('@overlay').click({ force: true });
    cy.get('@modal').should('not.exist');
  });
});

describe('Check create order', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'login.json' }).as(
      'getUser'
    );
    cy.setCookie('accessToken', auth.accessToken);
    localStorage.setItem('refreshToken', auth.refreshToken);
    cy.intercept('GET', 'api/auth/tokens', {
      fixture: 'auth.json'
    });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );
    cy.visit(testUrl);
  });

  it('', () => {
    cy.get(elementBun).as('bun');
    cy.get(elementMain).as('main');
    cy.get(elementSauce).as('sauce');

    cy.get('@bun').click();
    cy.get('@main').click();
    cy.get('@sauce').click();

    cy.get('#root > div > main > div > section:nth-child(2) > div > button').as(
      'orderButton'
    );

    cy.get('@orderButton').click();

    const orderModal = cy.get(modalFirst).as('orderModal');
    const orderNumber = orderModal.get(elementBeginFind + ' > h2');

    orderNumber.contains(order.order.number);

    orderModal
      .get('div:first-child > div:first-child > button > svg')
      .as('button');
    cy.get('@button').click();

    cy.get('modal').should('not.exist');
    const divConstructor = 'div > section' + elementBeginFind;
    const burgerCunstructor = {
      constructorBunTop: cy.get(divConstructor + ' > div'),
      constructoMainIngredient: cy.get(divConstructor + ' > ul > div'),
      constructorBunBottom: cy.get(divConstructor + ' > div:nth-child(3)')
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
