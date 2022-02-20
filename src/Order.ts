import { singleBookPriceInPence } from "./Constants";

export class Order {
  private qtyBySku = new Map<string, number>();

  addItem(item: Item) {
    let qty = this.qtyBySku.get(item.sku) || 0;
    this.qtyBySku.set(item.sku, qty + 1);
  }

  get totalPence(): number {
    let total = 0;
    const remainingQtyBySku = new Map(this.qtyBySku);

    while (this.getNumberOfItems(remainingQtyBySku) > 0) {
      const numDistinctItems = remainingQtyBySku.size;
      const discount = this.getDiscount(numDistinctItems);
      if (numDistinctItems > 1) {
        total += numDistinctItems * singleBookPriceInPence * (1 - discount);
      } else {
        total += singleBookPriceInPence;
      }

      this.removeOneOfEachSku(remainingQtyBySku);
    }

    return total;
  }

  private getNumberOfItems(qtyBySku: Map<string, number>): number {
    return Array.from(qtyBySku.values()).reduce((acc, curr) => acc + curr, 0);
  }

  private getDiscount(numberOfDistinctItems: number): number {
    switch (numberOfDistinctItems) {
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

  removeOneOfEachSku(remainingQtyBySku: Map<string, number>) {
    for (let sku of remainingQtyBySku.keys()) {
      const qty = remainingQtyBySku.get(sku)!;
      if (qty === 1) {
        remainingQtyBySku.delete(sku);
      } else {
        remainingQtyBySku.set(sku, qty - 1);
      }
    }
  }
}
