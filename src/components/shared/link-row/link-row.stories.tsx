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
    <ItemGroup variant="ruled" className="max-w-xl">
      <LinkRow {...args} />
    </ItemGroup>
  ),
} satisfies Meta<typeof LinkRow>;

export default meta;
type Story = StoryObj<typeof meta>;

/*===== Stories =====*/

// An outside system: its address under the name, so a visitor sees they're leaving the site.
export const Playground: Story = {};

// A page of this site gets the forward arrow and no address.
export const Internal: Story = { args: { href: "/calendar", title: "تقویم آموزشی", description: undefined } };

// An entry of a numbered index (an office's equipment, a new student's steps).
export const Numbered: Story = { args: { icon: undefined, number: 3 } };

// The rows of an index, in two columns from `md` up.
export const Index: Story = {
  render: (args) => (
    <ItemGroup variant="index">
      {[1, 2, 3, 4, 5].map((number) => (
        <LinkRow key={number} {...args} icon={undefined} number={number} />
      ))}
    </ItemGroup>
  ),
};
