import { singleBookPriceInPence } from "./Constants";

export class Order {
  private item: Item | null = null;

  addItem(item: Item) {
    this.item = item;
  }
  get totalPence(): number {
    return this.item ? singleBookPriceInPence : 0;
  }
}
