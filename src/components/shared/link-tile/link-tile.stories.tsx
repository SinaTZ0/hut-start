import type { Meta, StoryObj } from "@storybook/react-vite";
import { CreditCardIcon, GraduationCapIcon, MailIcon } from "lucide-react";

import { LinkTile } from "./link-tile";

/*===== Meta =====*/
const meta = {
  title: "Shared/LinkTile",
  component: LinkTile,
  args: {
    href: "https://golestan.hut.ac.ir/",
    title: "سامانه آموزشی گلستان",
    description: "انتخاب واحد، کارنامه و درخواست‌های آموزشی",
    icon: GraduationCapIcon,
  },
  render: (args) => (
    <div className="max-w-sm">
      <LinkTile {...args} />
    </div>
  ),
} satisfies Meta<typeof LinkTile>;

export default meta;
type Story = StoryObj<typeof meta>;

/*===== Stories =====*/

// An outside system: its address under the name, so a visitor sees they're leaving the site.
export const Playground: Story = {};

// A system reachable only from the campus network says so.
export const InternalOnly: Story = {
  args: {
    href: "https://mail.hut.ac.ir/",
    title: "پست الکترونیک",
    description: "ایمیل دانشگاهی کارکنان و اعضای هیئت علمی",
    icon: MailIcon,
    internalOnly: true,
  },
};

// A title alone, as the section pages' link groups use it: the title lines up with the arrow.
export const TitleOnly: Story = {
  args: { href: "#intro", title: "درباره دانشگاه", description: undefined, icon: undefined },
};

// Tiles in a grid take the tallest one's height.
export const Grid: Story = {
  render: () => (
    <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
      <LinkTile
        href="https://pay.hut.ac.ir/"
        title="پرداخت شهریه"
        description="شهریه دانشجویان شبانه و پردیس"
        icon={CreditCardIcon}
      />
      <LinkTile href="https://golestan.hut.ac.ir/" title="سامانه آموزشی گلستان" icon={GraduationCapIcon} />
    </div>
  ),
};
