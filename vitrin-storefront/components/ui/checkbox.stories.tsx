
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "@/components/ui/checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const DisabledUnchecked: Story = {
    args: {
      disabled: true,
    },
  };

export const DisabledChecked: Story = {
    args: {
      checked: true,
      disabled: true,
    },
  };

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2 space-x-reverse">
      <Checkbox id="terms" {...args} />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        مرا به خاطر بسپار
      </label>
    </div>
  ),
};
