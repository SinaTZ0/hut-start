import type { Meta, StoryObj } from "@storybook/react-vite";

import { twSize, twVariant } from "#/components/primitive/toggle/toggle.styles";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

const variantOptions = Object.keys(twVariant) as Array<keyof typeof twVariant>;
const sizeOptions = Object.keys(twSize) as Array<keyof typeof twSize>;

const OFFICES = [
  { id: "all", label: "همه", count: "۱۳۴" },
  { id: "presidency", label: "ریاست و حوزه ریاست", count: "۱۷" },
  { id: "education", label: "معاونت آموزشی و پژوهشی", count: "۱۷" },
  { id: "student", label: "معاونت دانشجویی و فرهنگی", count: "۱۰" },
  { id: "admin", label: "معاونت اداری و مالی", count: "۱۵" },
  { id: "departments", label: "گروه‌های آموزشی", count: "۶۲" },
];

/*===== Meta =====*/
const meta = {
  title: "Primitive/ToggleGroup",
  component: ToggleGroup,
  argTypes: {
    variant: { control: "select", options: variantOptions },
    size: { control: "select", options: sizeOptions },
  },
  render: (args) => (
    <ToggleGroup {...args} defaultValue={["all"]} aria-label="واحد" className="max-w-md">
      {OFFICES.map((office) => (
        <ToggleGroupItem key={office.id} value={office.id}>
          {office.label}
          <span data-slot="toggle-count">{office.count}</span>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  ),
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/*===== Stories =====*/
/** The phone book's office filter: one office at a time, the row wrapping in a narrow column. */
export const Playground: Story = {};

export const Multiple: Story = {
  args: { multiple: true },
};
