import { render, screen } from "@testing-library/react";
import ProductCard from "@/components/product/ProductCard";

jest.mock("@/hooks/useCart", () => ({
  useCart: () => ({
    addToCart: jest.fn(),
    updateQuantity: jest.fn(),
    removeFromCart: jest.fn(),
    itemCount: 0,
    cartItems: [],
  }),
}));

jest.mock("@/hooks/useWishlist", () => ({
  useWishlist: () => ({
    toggleWishlist: jest.fn(),
    isInWishlist: () => false,
  }),
}));

jest.mock("swiper/react", () => ({
  Swiper: ({ children }: { children: React.ReactNode }) => <div data-testid="swiper">{children}</div>,
  SwiperSlide: ({ children }: { children: React.ReactNode }) => <div data-testid="swiper-slide">{children}</div>,
}));
jest.mock("swiper/modules", () => ({}));

const productMock = {
  id: "1",
  title: "محصول تستی",
  name: "محصول تستی",
  price: 100000,
  images: ["/test.png"],
  category: "دسته تست",
  rating: 4.5,
  reviewCount: 10,
  discount: 10,
  countInStock: 5,
  categoryPath: [],
};

describe("ProductCard", () => {
  it("renders product title and price", () => {
    render(<ProductCard product={productMock as any} />);
    expect(screen.getByText("محصول تستی")).toBeInTheDocument();
    expect(screen.getByText(/100,000|100٬000/)).toBeInTheDocument();
  });
});
