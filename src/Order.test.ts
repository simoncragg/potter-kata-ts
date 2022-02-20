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

  it(`should return ${singleBookPriceInPence} given one item`, () => {
    order.addItem({ sku: "1" });
    expect(order.totalPence).toBe(singleBookPriceInPence);
  });
});
