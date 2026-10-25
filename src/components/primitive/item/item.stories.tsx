import type { Meta, StoryObj } from "@storybook/react-vite";
import { ExternalLinkIcon, FileTextIcon, FlaskConicalIcon, MessagesSquareIcon, SproutIcon } from "lucide-react";

import { SiteLink } from "#/components/shared/site-link/site-link";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "./item";
import { twMediaVariant, twSize, twVariant } from "./item.styles";

const variantOptions = Object.keys(twVariant) as Array<keyof typeof twVariant>;
const sizeOptions = Object.keys(twSize) as Array<keyof typeof twSize>;
const mediaOptions = Object.keys(twMediaVariant) as Array<keyof typeof twMediaVariant>;

/*===== Meta =====*/
const meta = {
  title: "Primitive/Item",
  component: Item,
  argTypes: {
    variant: { control: "inline-radio", options: variantOptions },
    size: { control: "inline-radio", options: sizeOptions },
  },
  args: { variant: "default", size: "default" },
  render: (args) => (
    <Item {...args} render={<SiteLink href="#item" />} className="max-w-md">
      <ItemMedia variant="icon">
        <FileTextIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>صدای شما برای ما مهم است</ItemTitle>
        <ItemDescription>ثبت شکایت، پیشنهاد یا انتقاد در نظام پیشنهادات دانشگاه</ItemDescription>
      </ItemContent>
      <ItemActions>
        <ExternalLinkIcon />
      </ItemActions>
    </Item>
  ),
} satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj<typeof meta>;

/*===== Stories =====*/
export const Playground: Story = {};

export const MediaVariants: Story = {
  render: (args) => (
    <div className="grid max-w-md gap-3">
      {mediaOptions.map((variant) => (
        <Item key={variant} {...args} variant="outline">
          <ItemMedia variant={variant}>
            <SproutIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{variant}</ItemTitle>
            <ItemDescription>حمایت از ایده‌ها و شرکت‌های دانش‌بنیان</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  ),
};

// Rows ruled apart in one surface, like the help links beside the welcome band. Hover a row for the `accent` wash.
export const Divided: Story = {
  render: () => (
    <ItemGroup variant="divided" className="max-w-lg overflow-hidden rounded-lg border bg-muted">
      {[
        { title: "صدای شما برای ما مهم است", icon: FileTextIcon },
        { title: "همراه شما در مسیر دانشگاه", icon: MessagesSquareIcon },
      ].map((row) => (
        <li key={row.title}>
          <Item size="lg" render={<SiteLink href="#item" />}>
            <ItemMedia variant="icon">
              <row.icon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{row.title}</ItemTitle>
              <ItemDescription>توضیح کوتاه این پیوند</ItemDescription>
            </ItemContent>
            <ItemActions>
              <ExternalLinkIcon />
            </ItemActions>
          </Item>
        </li>
      ))}
    </ItemGroup>
  ),
};

// Rows ruled top and bottom with no panel behind them, like a department's curriculum files.
export const Ruled: Story = {
  render: () => (
    <ItemGroup variant="ruled" className="max-w-lg">
      {["چارت درسی کارشناسی، ورودی ۱۴۰۳ به بعد", "روند و شیوه انتخاب گرایش"].map((title) => (
        <li key={title}>
          <Item render={<SiteLink href="#item" />}>
            <ItemMedia>
              <FileTextIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{title}</ItemTitle>
            </ItemContent>
          </Item>
        </li>
      ))}
    </ItemGroup>
  ),
};

// Cells sharing their edges in a grid, like the research units.
export const Tiled: Story = {
  render: () => (
    <ItemGroup variant="tiled" className="max-w-2xl rounded-lg border bg-card sm:grid-cols-2">
      {["مرکز رشد", "آزمایشگاه مرکزی", "دفتر ارتباط با صنعت", "نشریه علمی"].map((title) => (
        <li key={title}>
          <Item size="lg" render={<SiteLink href="#item" />}>
            <ItemMedia variant="icon">
              <FlaskConicalIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{title}</ItemTitle>
              <ItemDescription>خدمات آزمایشگاهی برای پژوهشگران و صنعت</ItemDescription>
            </ItemContent>
            <ItemActions>
              <ExternalLinkIcon />
            </ItemActions>
          </Item>
        </li>
      ))}
    </ItemGroup>
  ),
};
