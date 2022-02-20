import { Order } from "./Order";

describe("Order", () => {
  it("should return 0 given no items", () => {
    const order = new Order();
    expect(order.totalPence).toBe(0);
  });
});
