import { singleBookPriceInPence } from "./Constants";

export class Order {
  private items = Array<Item>();

  addItem(item: Item) {
    this.items.push(item);
  }
  get totalPence(): number {
    return this.items.length * singleBookPriceInPence * (1 - this.discount);
  }

  private get discount(): number {
    const distinctItems = this.items
      .map((item) => item.sku)
      .filter((item, i, self) => self.indexOf(item) === i);

    switch (distinctItems.length) {
      case 2:
        return 0.05;
      case 3:
        return 0.1;
      case 4:
        return 0.2;
      default:
        return 0;
    }
  }
}
