import type { Meta, StoryObj } from "@storybook/react-vite";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./table";

/*===== Meta =====*/
const meta = {
  title: "Primitive/Table",
  component: Table,
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

/*===== Stories =====*/

/** The library's opening hours, as its office page shows them: a row per desk, a column per days. */
export const OpeningHours: Story = {
  render: (args) => (
    <div className="max-w-2xl">
      <Table {...args}>
        <TableCaption>نیمه نخست سال</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead scope="col">بخش</TableHead>
            <TableHead scope="col">شنبه تا چهارشنبه</TableHead>
            <TableHead scope="col">پنجشنبه</TableHead>
            <TableHead scope="col">جمعه</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableHead scope="row">امانت</TableHead>
            <TableCell>۸ تا ۱۲:۳۰ و ۱۴ تا ۱۶</TableCell>
            <TableCell>تعطیل</TableCell>
            <TableCell>تعطیل</TableCell>
          </TableRow>
          <TableRow>
            <TableHead scope="row">سالن مطالعه</TableHead>
            <TableCell>۸ تا ۲۰</TableCell>
            <TableCell>۸ تا ۱۸</TableCell>
            <TableCell>تعطیل</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};
