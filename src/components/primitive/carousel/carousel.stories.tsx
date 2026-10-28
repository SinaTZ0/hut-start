import type { Meta, StoryObj } from "@storybook/react-vite";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel";

/*===== Meta =====*/
const meta = {
  title: "Primitive/Carousel",
  component: Carousel,
  argTypes: {
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
  },
  args: { orientation: "horizontal" },
  render: (args) => (
    <div className="mx-auto max-w-md px-14">
      <Carousel {...args}>
        <CarouselContent>
          {["۱", "۲", "۳", "۴", "۵"].map((label) => (
            <CarouselItem key={label} className="basis-2/3">
              <div className="grid aspect-3/2 place-items-center rounded-md bg-muted text-h2 text-heading">{label}</div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

/*===== Stories =====*/

// In Persian the slides run right to left: "next" points left, and so does the arrow key that moves to it.
export const Playground: Story = {};
