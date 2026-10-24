import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDownIcon } from "lucide-react";

import { buttonVariants } from "#/components/primitive/button/button.styles";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";

/*===== Meta =====*/
const meta = {
  title: "Primitive/Collapsible",
  component: Collapsible,
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

/*===== Stories =====*/

// Open it to see the panel grow and the paragraph under it glide down; with reduced motion it opens at once.
export const Default: Story = {
  render: (args) => (
    <div className="max-w-sm text-body-sm">
      <Collapsible {...args}>
        <CollapsibleTrigger className={buttonVariants({ variant: "outline" })}>
          سامانه‌های دیگر
          <ChevronDownIcon data-icon="inline-end" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul className="grid gap-2 pt-3">
            <li>سامانه آموزش</li>
            <li>کتابخانه دیجیتال</li>
            <li>رزرو غذا</li>
          </ul>
        </CollapsibleContent>
      </Collapsible>
      <p className="mt-4 text-muted-foreground">متنی که پس از باز شدن پایین می‌رود.</p>
    </div>
  ),
};
