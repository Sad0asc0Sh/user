import { formatPrice, calculateDiscountPrice, cn } from "@/lib/utils";

describe("utils", () => {
  test("formatPrice formats number with locale", () => {
    const formatted = formatPrice(123456);
    expect(formatted).toMatch(/123[,٬]456/);
  });

  test("calculateDiscountPrice applies percentage and rounds", () => {
    expect(calculateDiscountPrice(100000, 20)).toBe(80000);
    expect(calculateDiscountPrice(100000, 0)).toBe(100000);
    expect(calculateDiscountPrice(0, 50)).toBe(0);
  });

  test("cn merges class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });
});
