
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg", "icon"],
    },
    asChild: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    variant: "default",
    size: "default",
    children: "دکمه پیش‌فرض",
  },
};

export const Secondary: Story = {
  args: {
    ...Default.args,
    variant: "secondary",
    children: "دکمه ثانویه",
  },
};

export const Destructive: Story = {
  args: {
    ...Default.args,
    variant: "destructive",
    children: "دکمه تخریبی",
  },
};

export const Outline: Story = {
  args: {
    ...Default.args,
    variant: "outline",
    children: "دکمه حاشیه‌دار",
  },
};

export const Ghost: Story = {
  args: {
    ...Default.args,
    variant: "ghost",
    children: "دکمه روحی",
  },
};

export const Link: Story = {
  args: {
    ...Default.args,
    variant: "link",
    children: "دکمه لینکی",
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    children: "دکمه غیرفعال",
  },
};

export const WithIcon: Story = {
  args: {
    ...Default.args,
    children: (
      <>
        <Plus className="ml-2 h-4 w-4" />
        <span>دکمه با آیکون</span>
      </>
    ),
  },
};

export const IconOnly: Story = {
    args: {
      variant: "outline",
      size: "icon",
      children: <Plus className="h-4 w-4" />,
    },
  };
