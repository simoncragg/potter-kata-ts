import { singleBookPriceInPence } from "./Constants";
import { Order } from "./Order";

describe("Order", () => {
  let order: Order;

  beforeEach(() => {
    order = new Order();
  });

  it("should return 0 given no items", () => {
    expect(order.totalPence).toBe(0);
  });

  it.each([
    [800, 1],
    [1600, 2],
    [2400, 3],
    [3200, 4],
    [4000, 5],
  ])(
    "should return %p given %p item(s) with the same sku",
    (expectedTotalPence: number, qty: number) => {
      for (let i = 1; i <= qty; i++) {
        order.addItem({ sku: "1" });
      }
      expect(order.totalPence).toBe(expectedTotalPence);
    }
  );

  it("should apply a 5% discount for 2 different items", () => {
    order.addItem({ sku: "1" });
    order.addItem({ sku: "2" });
    expect(order.totalPence).toBe(2 * singleBookPriceInPence * 0.95);
  });

  it("should apply a 10% discount for 3 different items", () => {
    order.addItem({ sku: "1" });
    order.addItem({ sku: "2" });
    order.addItem({ sku: "3" });
    expect(order.totalPence).toBe(3 * singleBookPriceInPence * 0.9);
  });

  it("should apply a 20% discount for 4 different items", () => {
    order.addItem({ sku: "1" });
    order.addItem({ sku: "2" });
    order.addItem({ sku: "3" });
    order.addItem({ sku: "4" });
    expect(order.totalPence).toBe(4 * singleBookPriceInPence * 0.8);
  });
});
