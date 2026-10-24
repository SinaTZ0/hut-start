import type { Meta, StoryObj } from "@storybook/react-vite";

import { LogoMark } from "./logo-mark";

/*===== Meta =====*/
const meta = {
  title: "Shared/LogoMark",
  component: LogoMark,
} satisfies Meta<typeof LogoMark>;

export default meta;
type Story = StoryObj<typeof meta>;

/*===== Stories =====*/

// The header's tile (light) and the footer's (on the band): the mark takes the text colour around it.
export const Tiles: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <span className="grid size-12 place-items-center rounded-sm bg-primary text-primary-foreground">
        <LogoMark />
      </span>
      <span className="grid size-12 place-items-center rounded-sm border border-band-line bg-band-deep text-on-band">
        <LogoMark />
      </span>
      <span className="text-heading">
        <LogoMark className="size-12" />
      </span>
    </div>
  ),
};
