import { render, screen } from "@testing-library/react";
import CartSummary from "@/components/cart/CartSummary";

describe("CartSummary", () => {
  it("shows final price and savings", () => {
    render(
      <CartSummary
        totalPrice={90000}
        totalOriginalPrice={100000}
        shipping={0}
        finalPrice={85000}
        discount={5000}
      />
    );

    expect(screen.getByText(/85,000|85٬000/)).toBeInTheDocument();
    expect(screen.getByText(/5,000|5٬000/)).toBeInTheDocument(); // coupon discount
  });
});
