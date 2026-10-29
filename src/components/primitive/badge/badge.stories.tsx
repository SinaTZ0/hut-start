import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircleCheckIcon, StarIcon } from "lucide-react";

import { Badge } from "./badge";
import { twSize, twVariant } from "./badge.styles";

const variantOptions = Object.keys(twVariant) as Array<keyof typeof twVariant>;
const sizeOptions = Object.keys(twSize) as Array<keyof typeof twSize>;

/*===== Meta =====*/
const meta = {
  title: "Primitive/Badge",
  component: Badge,
  argTypes: {
    variant: { control: "select", options: variantOptions },
    size: { control: "inline-radio", options: sizeOptions },
  },
  args: { children: "برچسب" },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

/*===== Stories =====*/
export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {variantOptions.map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
};

// Status tones travel with an icon and a word, never colour alone.
export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-3">
      <Badge variant="success">
        <CircleCheckIcon data-icon="inline-start" />
        ثبت شد
      </Badge>
      <Badge variant="highlight">
        <StarIcon data-icon="inline-start" />
        ویژه
      </Badge>
    </div>
  ),
};

// `media` labels a photo: it sits in a corner of the image, on the pine that the photos' scrim shares.
export const OnMedia: Story = {
  render: () => (
    <div className="relative aspect-wide w-80 rounded-md bg-accent">
      <Badge variant="media" className="absolute start-3 top-3">
        خبر ویژه
      </Badge>
    </div>
  ),
};

// `wrap` lets a phrase run onto a second line inside a narrow column instead of pushing the column wider.
export const Wrapping: Story = {
  render: () => (
    <ul className="flex w-64 flex-wrap gap-1.5">
      <li>
        <Badge variant="outline" size="wrap">
          دستگاه اندازه‌گیری کشش سطحی (تنسیومتر)
        </Badge>
      </li>
      <li>
        <Badge variant="outline" size="wrap">
          آزمایش کنترل دما: کنترل دمای فرآیند در محفظه عایق توسط المان پلتیر
        </Badge>
      </li>
    </ul>
  ),
};
