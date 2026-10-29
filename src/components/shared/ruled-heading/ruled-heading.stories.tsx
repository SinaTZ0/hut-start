import type { Meta, StoryObj } from "@storybook/react-vite";

import { TextLink } from "#/components/shared/text-link/text-link";
import { RuledHeading } from "./ruled-heading";

/*===== Meta =====*/
const meta = {
  title: "Shared/RuledHeading",
  component: RuledHeading,
  argTypes: {
    tone: { control: "inline-radio", options: ["default", "band"] },
  },
  args: { id: "story-heading", number: 2, title: "آزمایشگاه‌ها و کارگاه‌ها", tone: "default" },
} satisfies Meta<typeof RuledHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

/*===== Stories =====*/

// The number in gold, the title, and the ruler running to the far end.
export const Playground: Story = {};

// A page whose sections aren't a sequence leaves the number out.
export const WithoutNumber: Story = {
  args: { number: undefined, title: "مدیریت" },
};

// The ruler stops at the «همه …» link.
export const WithAction: Story = {
  args: { number: 3, title: "اطلاعیه‌ها", action: <TextLink href="#notices">همه اطلاعیه‌ها</TextLink> },
};

// On a pine band.
export const OnBand: Story = {
  args: { tone: "band" },
  render: (args) => (
    <div className="rounded-lg bg-band p-8">
      <RuledHeading {...args} />
    </div>
  ),
};
