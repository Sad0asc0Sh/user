# QuantitySelector Component

کامپوننت QuantitySelector یک کامپوننت قابل استفاده مجدد برای انتخاب تعداد محصول است.

## مسیر
```
components/common/QuantitySelector.tsx
```

## استفاده

### Import

```tsx
import { QuantitySelector } from "@/components/common/QuantitySelector"
```

### مثال پایه

```tsx
function ProductCard() {
  const [quantity, setQuantity] = useState(1)
  const maxStock = 10

  return (
    <QuantitySelector
      value={quantity}
      onChange={setQuantity}
      maxStock={maxStock}
    />
  )
}
```

### مثال کامل (با افزودن به سبد خرید)

```tsx
function AddToCartSection() {
  const [quantity, setQuantity] = useState(1)
  const product = {
    stock: 15,
    price: 1_000_000
  }

  const handleAddToCart = () => {
    console.log(`Adding ${quantity} items`)
    // API call here
  }

  return (
    <div>
      <QuantitySelector
        value={quantity}
        onChange={setQuantity}
        maxStock={product.stock}
      />
      <Button onClick={handleAddToCart}>
        افزودن به سبد خرید
      </Button>
    </div>
  )
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value` | `number` | ✅ | تعداد فعلی محصول |
| `onChange` | `(newValue: number) => void` | ✅ | تابع callback برای تغییر تعداد |
| `maxStock` | `number` | ✅ | حداکثر موجودی محصول |
| `className` | `string` | ❌ | کلاس CSS اضافی |

## ویژگی‌ها

### ✅ محدودیت‌های تعداد
- حداقل: 1 (دکمه کاهش غیرفعال می‌شود)
- حداکثر: `maxStock` (دکمه افزایش غیرفعال می‌شود)

### ✅ دسترس‌پذیری (A11y)
- دکمه‌ها دارای `aria-label` مناسب
- Input دارای `aria-label` با مقدار فعلی
- Group دارای `role="group"` و `aria-label`

### ✅ تست‌پذیری
- Container: `data-testid="quantity-selector"`
- دکمه افزایش: `data-testid="quantity-increase"`
- دکمه کاهش: `data-testid="quantity-decrease"`

## طراحی

### چیدمان (RTL)
```
[+] [Input] [-]
```

- دکمه افزایش (+) در سمت راست
- Input نمایش تعداد در مرکز (readOnly)
- دکمه کاهش (-) در سمت چپ

### استایل
- هماهنگ با دیزاین سیستم سفید/مدرن
- دکمه‌ها: `variant="outline"`, اندازه 9x9
- Input: عرض 16 (4rem), متن وسط‌چین

## نمونه‌های استفاده در Storybook

برای مشاهده نمونه‌های مختلف:
```bash
npm run storybook
```

سپس به `Common/QuantitySelector` بروید.

### Stories موجود:
- **Default**: حالت پیش‌فرض با موجودی 10
- **WithHighStock**: موجودی بالا (100 عدد)
- **LowStock**: موجودی کم (5 عدد)
- **AtMinimum**: در حداقل (1 عدد)
- **AtMaximum**: در حداکثر موجودی
- **SingleItemStock**: تنها 1 عدد موجود

## تست

### Unit Tests (مثال)

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { QuantitySelector } from './QuantitySelector'

describe('QuantitySelector', () => {
  it('should increase quantity on plus button click', () => {
    const onChange = jest.fn()
    render(
      <QuantitySelector
        value={1}
        onChange={onChange}
        maxStock={10}
      />
    )

    const increaseBtn = screen.getByTestId('quantity-increase')
    fireEvent.click(increaseBtn)

    expect(onChange).toHaveBeenCalledWith(2)
  })

  it('should disable decrease button at minimum', () => {
    render(
      <QuantitySelector
        value={1}
        onChange={jest.fn()}
        maxStock={10}
      />
    )

    const decreaseBtn = screen.getByTestId('quantity-decrease')
    expect(decreaseBtn).toBeDisabled()
  })

  it('should disable increase button at maximum', () => {
    render(
      <QuantitySelector
        value={10}
        onChange={jest.fn()}
        maxStock={10}
      />
    )

    const increaseBtn = screen.getByTestId('quantity-increase')
    expect(increaseBtn).toBeDisabled()
  })
})
```

## یادداشت‌ها

- Input به صورت `readOnly` است و کاربر نمی‌تواند مستقیماً عدد تایپ کند
- تغییر تعداد فقط از طریق دکمه‌ها امکان‌پذیر است
- کامپوننت به صورت کامل کنترل‌شده (Controlled) است
- برای استفاده در فرم‌ها، می‌توانید از `onChange` برای به‌روزرسانی state استفاده کنید
