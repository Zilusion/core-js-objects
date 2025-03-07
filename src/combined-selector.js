module.exports = class CombinedSelectors {
  constructor(selector1, combinator, selector2) {
    this.selector1 = selector1;
    this.combinator = combinator;
    this.selector2 = selector2;
  }

  stringify() {
    return `${this.selector1.stringify()} ${
      this.combinator
    } ${this.selector2.stringify()}`;
  }
};
