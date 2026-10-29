import type { Meta, StoryObj } from "@storybook/react-vite";

import { ItemGroup } from "#/components/primitive/item/item";
import { FileRow } from "./file-row";

/*===== Meta =====*/
const meta = {
  title: "Shared/FileRow",
  component: FileRow,
  args: {
    title: "آیین‌نامه آموزشی دوره کارشناسی ارشد ناپیوسته",
    url: "https://hut.ac.ir/documents/example.pdf",
    format: "pdf",
  },
  render: (args) => (
    <ItemGroup variant="ruled" className="max-w-2xl">
      <FileRow {...args} />
    </ItemGroup>
  ),
} satisfies Meta<typeof FileRow>;

export default meta;
type Story = StoryObj<typeof meta>;

/*===== Stories =====*/

// A file in a ruled list: its title, its format, and the download.
export const Playground: Story = {};

// Several, as the forms page and the labs page list them.
export const List: Story = {
  render: () => (
    <ItemGroup variant="ruled" className="max-w-2xl">
      <FileRow title="فرم درخواست مرخصی تحصیلی" url="https://hut.ac.ir/documents/leave.docx" format="docx" />
      <FileRow title="دستورکار آزمایشگاه مدار الکتریکی" url="https://hut.ac.ir/documents/lab.pdf" format="pdf" />
      <FileRow title="نمونه گزارش کار" url="https://hut.ac.ir/documents/report.rar" format="rar" />
    </ItemGroup>
  ),
};
