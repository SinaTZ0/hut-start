import type { Meta, StoryObj } from "@storybook/react-vite";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";

/*===== Meta =====*/
const meta = {
  title: "Primitive/Accordion",
  component: Accordion,
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

/*===== Stories =====*/

// One item open at a time by default; opening another closes the first. Each panel grows to its height, and with
// reduced motion it opens at once.
export const Default: Story = {
  render: (args) => (
    <div className="max-w-sm">
      <Accordion {...args}>
        <AccordionItem value="about">
          <AccordionTrigger>دانشگاه</AccordionTrigger>
          <AccordionContent>معرفی، مدیریت دانشگاه و راه‌های ارتباط</AccordionContent>
        </AccordionItem>
        <AccordionItem value="education">
          <AccordionTrigger>آموزش</AccordionTrigger>
          <AccordionContent>گروه‌های آموزشی، تحصیلات تکمیلی و آموزش آزاد</AccordionContent>
        </AccordionItem>
        <AccordionItem value="campus-life" disabled>
          <AccordionTrigger>زندگی دانشجویی</AccordionTrigger>
          <AccordionContent>خوابگاه، تغذیه، کانون‌ها و مشاوره</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const Multiple: Story = {
  args: { multiple: true },
  render: Default.render,
};
