import type { Meta, StoryObj } from "@storybook/react-vite";
import { BellIcon } from "lucide-react";

import { Toggle } from "./toggle";
import { twSize, twVariant } from "./toggle.styles";

const variantOptions = Object.keys(twVariant) as Array<keyof typeof twVariant>;
const sizeOptions = Object.keys(twSize) as Array<keyof typeof twSize>;

/*===== Meta =====*/
const meta = {
  title: "Primitive/Toggle",
  component: Toggle,
  argTypes: {
    variant: { control: "select", options: variantOptions },
    size: { control: "select", options: sizeOptions },
  },
  args: { children: "فقط فایل‌دار" },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

/*===== Stories =====*/
export const Playground: Story = {};

export const Pressed: Story = {
  args: { defaultPressed: true },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <BellIcon />
        اطلاعیه‌ها
      </>
    ),
  },
};
