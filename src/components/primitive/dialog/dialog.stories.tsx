import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../button/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { twSize } from "./dialog.styles";

const sizeOptions = Object.keys(twSize) as Array<keyof typeof twSize>;

/*===== Meta =====*/
const meta = {
  title: "Primitive/Dialog",
  component: DialogContent,
  argTypes: {
    size: { control: "inline-radio", options: sizeOptions },
  },
  args: { size: "default" },
  render: (args) => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>باز کردن</DialogTrigger>
      <DialogContent {...args}>
        <DialogHeader>
          <DialogTitle>عنوان پنجره</DialogTitle>
          <DialogDescription>توضیح کوتاهی درباره آنچه این پنجره می‌پرسد.</DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  ),
} satisfies Meta<typeof DialogContent>;

export default meta;
type Story = StoryObj<typeof meta>;

/*===== Stories =====*/
export const Playground: Story = {};

// The photo viewer's ground: the whole screen, dark in both themes, with a glass close button.
export const Fullscreen: Story = { args: { size: "fullscreen" } };
