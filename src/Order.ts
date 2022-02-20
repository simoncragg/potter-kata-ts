import { singleBookPriceInPence } from "./Constants";

export class Order {
  private items = Array<Item>();

  addItem(item: Item) {
    this.items.push(item);
  }
  get totalPence(): number {
    return (
      this.numberOfDistinctItems *
        singleBookPriceInPence *
        (1 - this.discount) +
      (this.items.length - this.numberOfDistinctItems) * singleBookPriceInPence
    );
  }

  private get numberOfDistinctItems(): number {
    return this.items
      .map((item) => item.sku)
      .filter((item, i, self) => self.indexOf(item) === i).length;
  }

  private get discount(): number {
    switch (this.numberOfDistinctItems) {
      case 2:
        return 0.05;
      case 3:
        return 0.1;
      case 4:
        return 0.2;
      case 5:
        return 0.25;
      default:
        return 0;
    }
  }
}
