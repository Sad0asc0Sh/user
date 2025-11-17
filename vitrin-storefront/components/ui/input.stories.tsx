
import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@/components/ui/Input";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "password", "email", "number"],
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "متن خود را وارد کنید...",
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    placeholder: "این ورودی غیرفعال است",
  },
};

export const Password: Story = {
    args: {
      type: "password",
      placeholder: "رمز عبور",
    },
  };
  
export const WithError: Story = {
    args: {
      ...Default.args,
      className: "border-destructive focus-visible:ring-destructive",
      placeholder: "ورودی با خطا",
    },
    decorators: [
        (Story) => (
          <div>
            <Story />
            <p className="mt-2 text-sm text-destructive">این فیلد الزامی است.</p>
          </div>
        ),
      ],
  };
