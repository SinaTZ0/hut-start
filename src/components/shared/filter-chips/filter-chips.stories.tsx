import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { FilterChips, type FilterChip } from "./filter-chips";

/*===== Data =====*/
// The phone book's divisions, with their head counts.
const divisions: FilterChip<string>[] = [
  { value: "all", label: "همه", count: 134 },
  { value: "leadership", label: "ریاست و حوزه ریاست", count: 17 },
  { value: "education", label: "معاونت آموزشی و پژوهشی", count: 28 },
  { value: "student", label: "معاونت دانشجویی و فرهنگی", count: 21 },
  { value: "departments", label: "گروه‌های آموزشی", count: 62 },
];

function Chips({ size }: { size?: "default" | "sm" }) {
  const [value, setValue] = useState("all");
  return <FilterChips label="واحد" chips={divisions} value={value} onValueChange={setValue} size={size} />;
}

/*===== Meta =====*/
const meta = {
  title: "Shared/FilterChips",
  component: Chips,
  argTypes: {
    size: { control: "inline-radio", options: ["default", "sm"] },
  },
  args: { size: "default" },
} satisfies Meta<typeof Chips>;

export default meta;
type Story = StoryObj<typeof meta>;

/*===== Stories =====*/

// One chip is always pressed: pressing it again keeps it. The pressed chip's count turns gold.
export const Playground: Story = {};

// The smaller row under a main one, as the archive's topics sit under its kinds.
export const Small: Story = {
  args: { size: "sm" },
};
