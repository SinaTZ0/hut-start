import type { Meta, StoryObj } from "@storybook/react-vite";

import { SectionHead } from "./section-head";
import { twTone } from "./section-head.styles";

const toneOptions = Object.keys(twTone) as Array<keyof typeof twTone>;

/*===== Meta =====*/
const meta = {
  title: "Shared/SectionHead",
  component: SectionHead,
  argTypes: {
    tone: { control: "inline-radio", options: toneOptions },
  },
  args: {
    id: "news",
    kicker: "اخبار و اطلاع‌رسانی",
    title: "تازه‌های دانشگاه",
    lede: "روایت رویدادها، پژوهش‌ها و زندگی جامعه دانشگاهی",
    more: { label: "همه اخبار دانشگاه", href: "#news" },
    tone: "default",
  },
} satisfies Meta<typeof SectionHead>;

export default meta;
type Story = StoryObj<typeof meta>;

/*===== Stories =====*/
export const Playground: Story = {};

// On a pine band the kicker and the link turn gold.
export const OnBand: Story = {
  args: { tone: "band", kicker: "در یک نگاه", title: "دانشگاه به زبان اعداد" },
  render: (args) => (
    <div className="rounded-lg bg-band p-8">
      <SectionHead {...args} />
    </div>
  ),
};
