import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { SearchField } from "./search-field";

/*===== Meta =====*/
function Field({ placeholder }: { placeholder: string }) {
  const [value, setValue] = useState("");
  return (
    <SearchField label="جست‌وجو در دفترچه تلفن" placeholder={placeholder} value={value} onValueChange={setValue} />
  );
}

const meta = {
  title: "Shared/SearchField",
  component: Field,
  args: { placeholder: "نام، سمت، واحد یا شماره داخلی" },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

/*===== Stories =====*/

// The label is kept for screen readers only; the placeholder says what can be searched.
export const Playground: Story = {};
