module.exports = class Selector {
  constructor() {
    this.selectorParts = {
      element: '',
      id: '',
      classes: [],
      attributes: [],
      pseudoClasses: [],
      pseudoElement: '',
    };

    this.order = 0;
  }

  checkOrder(currentOrder) {
    if (currentOrder < this.order) {
      throw new Error(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
      );
    }
    this.order = currentOrder;
  }

  element(value) {
    this.checkOrder(1);
    if (this.selectorParts.element) {
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector'
      );
    }
    this.selectorParts.element = `${value}`;
    return this;
  }

  id(value) {
    this.checkOrder(2);
    if (this.selectorParts.id) {
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector'
      );
    }
    this.selectorParts.id = `#${value}`;
    return this;
  }

  class(value) {
    this.checkOrder(3);
    this.selectorParts.classes.push(`.${value}`);
    return this;
  }

  attr(value) {
    this.checkOrder(4);
    this.selectorParts.attributes.push(`[${value}]`);
    return this;
  }

  pseudoClass(value) {
    this.checkOrder(5);
    this.selectorParts.pseudoClasses.push(`:${value}`);
    return this;
  }

  pseudoElement(value) {
    this.checkOrder(6);
    if (this.selectorParts.pseudoElement) {
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector'
      );
    }
    this.selectorParts.pseudoElement = `::${value}`;
    return this;
  }

  stringify() {
    return (
      this.selectorParts.element +
      this.selectorParts.id +
      this.selectorParts.classes.join('') +
      this.selectorParts.attributes.join('') +
      this.selectorParts.pseudoClasses.join('') +
      this.selectorParts.pseudoElement
    );
  }
};
