import type { Meta, StoryObj } from "@storybook/react-vite";
import { GraduationCapIcon } from "lucide-react";

import { ItemGroup } from "#/components/primitive/item/item";
import { LinkRow } from "./link-row";

/*===== Meta =====*/
const meta = {
  title: "Shared/LinkRow",
  component: LinkRow,
  args: {
    href: "https://golestan.hut.ac.ir/",
    title: "سامانه آموزشی گلستان",
    description: "انتخاب واحد، کارنامه و درخواست‌های آموزشی",
    icon: GraduationCapIcon,
  },
  render: (args) => (
    <ItemGroup variant="strips" className="max-w-xl md:grid-cols-1">
      <LinkRow {...args} />
    </ItemGroup>
  ),
} satisfies Meta<typeof LinkRow>;

export default meta;
type Story = StoryObj<typeof meta>;

/*===== Stories =====*/

// An outside system: its address under the name, so a visitor sees they're leaving the site.
export const Playground: Story = {};

// A page of this site: «مشاهده» with the forward arrow, and no address.
export const Internal: Story = { args: { href: "/calendar", title: "تقویم آموزشی", description: undefined } };

// An email address: «ارسال ایمیل».
export const Email: Story = {
  args: { href: "mailto:egrad@hut.ac.ir", title: "ایمیل دانش‌آموختگان", description: undefined },
};

// An entry of a numbered list whose destination doesn't say what it holds: a machine's page, «مشخصات».
export const Numbered: Story = {
  args: {
    href: "https://lab.hut.ac.ir/",
    title: "سانتریفیوژ",
    description: "Universal 320 · Hettich",
    icon: undefined,
    number: 3,
    action: "مشخصات",
  },
};

// A list of links: ruled rows on a phone, two columns of cards that lift on hover from `md` up.
export const Strips: Story = {
  render: (args) => (
    <ItemGroup variant="strips">
      {[1, 2, 3, 4, 5].map((number) => (
        <LinkRow key={number} {...args} icon={undefined} number={number} />
      ))}
    </ItemGroup>
  ),
};
