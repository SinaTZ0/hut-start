import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { twVariant } from "./tabs.styles";

const variantOptions = Object.keys(twVariant) as Array<keyof typeof twVariant>;

/*===== Meta =====*/
const meta = {
  title: "Primitive/Tabs",
  component: TabsList,
  argTypes: {
    variant: {
      control: "select",
      options: variantOptions,
    },
  },
  render: (args) => (
    <Tabs defaultValue="upcoming" className="max-w-sm">
      <TabsList {...args}>
        <TabsTrigger value="upcoming">رویدادهای پیش رو</TabsTrigger>
        <TabsTrigger value="past">گذشته</TabsTrigger>
        <TabsTrigger value="cancelled" disabled>
          لغوشده
        </TabsTrigger>
      </TabsList>
      <TabsContent value="upcoming">همایش ملی هوش مصنوعی، ۲۴ مهر</TabsContent>
      <TabsContent value="past">۱۲ رویداد در ماه گذشته</TabsContent>
      <TabsContent value="cancelled">رویداد لغوشده‌ای وجود ندارد.</TabsContent>
    </Tabs>
  ),
} satisfies Meta<typeof TabsList>;

export default meta;
type Story = StoryObj<typeof meta>;

/*===== Stories =====*/
export const Playground: Story = {};

export const Line: Story = {
  args: { variant: "line" },
};

/** Six tabs in a narrow panel, as the home page's notices: two rows of three, a long label on two lines. */
export const Compact: Story = {
  render: (args) => (
    <Tabs defaultValue="latest" className="max-w-64">
      <TabsList {...args} className="grid w-auto grid-cols-3">
        <TabsTrigger value="latest" size="compact">
          آخرین
        </TabsTrigger>
        <TabsTrigger value="education" size="compact">
          آموزش
        </TabsTrigger>
        <TabsTrigger value="graduate" size="compact">
          تحصیلات تکمیلی
        </TabsTrigger>
        <TabsTrigger value="student" size="compact">
          دانشجویی
        </TabsTrigger>
        <TabsTrigger value="industry" size="compact">
          ارتباط با صنعت
        </TabsTrigger>
        <TabsTrigger value="open" size="compact">
          آموزش آزاد
        </TabsTrigger>
      </TabsList>
      <TabsContent value="latest">اطلاعیه ثبت‌نام کارشناسی ارشد</TabsContent>
      <TabsContent value="education">اطلاعیه حذف و اضافه</TabsContent>
      <TabsContent value="graduate">اطلاعیه دفاع دانشجویان</TabsContent>
      <TabsContent value="student">طرح احوال‌پرسی</TabsContent>
      <TabsContent value="industry">طرح دستیار فناوری</TabsContent>
      <TabsContent value="open">کارگاه آتشباری</TabsContent>
    </Tabs>
  ),
};

export const Vertical: Story = {
  render: (args) => (
    <Tabs defaultValue="profile" orientation="vertical" className="max-w-md">
      <TabsList {...args}>
        <TabsTrigger value="profile">اطلاعات فردی</TabsTrigger>
        <TabsTrigger value="courses">دروس</TabsTrigger>
        <TabsTrigger value="payments">شهریه</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">نام، شماره دانشجویی و نشانی</TabsContent>
      <TabsContent value="courses">۱۸ واحد در نیم‌سال جاری</TabsContent>
      <TabsContent value="payments">۲ قسط پرداخت‌شده</TabsContent>
    </Tabs>
  ),
};
