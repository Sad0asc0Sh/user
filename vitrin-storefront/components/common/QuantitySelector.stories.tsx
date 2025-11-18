import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { QuantitySelector } from "./QuantitySelector";

const meta: Meta<typeof QuantitySelector> = {
  title: "Common/QuantitySelector",
  component: QuantitySelector,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "number", min: 1, max: 100 },
      description: "تعداد فعلی محصول",
    },
    maxStock: {
      control: { type: "number", min: 1, max: 100 },
      description: "حداکثر موجودی محصول",
    },
    onChange: {
      action: "changed",
      description: "تابع callback برای تغییر تعداد",
    },
  },
};

export default meta;
type Story = StoryObj<typeof QuantitySelector>;

// Story with controlled state
const QuantitySelectorWithState = (args: any) => {
  const [quantity, setQuantity] = useState(args.value);

  return (
    <div className="p-8 bg-slate-50 rounded-xl">
      <div className="mb-4 text-center">
        <p className="text-sm text-text-secondary mb-2">
          تعداد انتخاب شده: <span className="font-bold text-text-primary">{quantity}</span>
        </p>
        <p className="text-xs text-text-secondary">
          موجودی: {args.maxStock} عدد
        </p>
      </div>
      <QuantitySelector
        {...args}
        value={quantity}
        onChange={(newValue) => {
          setQuantity(newValue);
          args.onChange?.(newValue);
        }}
      />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <QuantitySelectorWithState {...args} />,
  args: {
    value: 1,
    maxStock: 10,
  },
};

export const WithHighStock: Story = {
  render: (args) => <QuantitySelectorWithState {...args} />,
  args: {
    value: 5,
    maxStock: 100,
  },
};

export const LowStock: Story = {
  render: (args) => <QuantitySelectorWithState {...args} />,
  args: {
    value: 3,
    maxStock: 5,
  },
};

export const AtMinimum: Story = {
  render: (args) => <QuantitySelectorWithState {...args} />,
  args: {
    value: 1,
    maxStock: 10,
  },
};

export const AtMaximum: Story = {
  render: (args) => <QuantitySelectorWithState {...args} />,
  args: {
    value: 10,
    maxStock: 10,
  },
};

export const SingleItemStock: Story = {
  render: (args) => <QuantitySelectorWithState {...args} />,
  args: {
    value: 1,
    maxStock: 1,
  },
};
