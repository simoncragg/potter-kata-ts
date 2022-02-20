import { singleBookPriceInPence } from "./Constants";

export class Order {
  private items = Array<Item>();

  addItem(item: Item) {
    this.items.push(item);
  }
  get totalPence(): number {
    return this.items.length * singleBookPriceInPence;
  }
}
