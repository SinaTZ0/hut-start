import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchIcon } from "lucide-react";

import { Button } from "../button/button";
import { Input } from "../input/input";
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "./popover";

/*===== Meta =====*/
const meta = {
  title: "Primitive/Popover",
  component: PopoverContent,
  argTypes: {
    side: {
      control: "select",
      options: ["top", "bottom", "inline-start", "inline-end"],
    },
    align: { control: "inline-radio", options: ["start", "center", "end"] },
  },
  args: { side: "bottom", align: "end" },
  // `defaultOpen` keeps the panel visible.
  render: (args) => (
    <div className="flex justify-center p-16">
      <Popover defaultOpen>
        <PopoverTrigger render={<Button variant="tool" size="icon-sm" aria-label="جست‌وجوی سامانه‌ها" />}>
          <SearchIcon />
        </PopoverTrigger>
        <PopoverContent {...args}>
          <PopoverHeader>
            <PopoverTitle>کدام سامانه را می‌خواهید؟</PopoverTitle>
            <PopoverDescription>نام سامانه یا کاری که می‌خواهید انجام دهید.</PopoverDescription>
          </PopoverHeader>
          <Input type="search" aria-label="جست‌وجوی سامانه‌ها" placeholder="مثلاً گلستان، غذا، وام…" />
        </PopoverContent>
      </Popover>
    </div>
  ),
} satisfies Meta<typeof PopoverContent>;

export default meta;
type Story = StoryObj<typeof meta>;

/*===== Stories =====*/
export const Playground: Story = {};
