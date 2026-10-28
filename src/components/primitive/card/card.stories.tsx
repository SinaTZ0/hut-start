import type { Meta, StoryObj } from "@storybook/react-vite";

import { ClockIcon, Trash2Icon } from "lucide-react";

import placeholderImage from "#/assets/placeholder.svg";
import { Button } from "#/components/primitive/button/button";
import { SiteLink } from "#/components/shared/site-link/site-link";
import {
  Card,
  CardAction,
  CardBody,
  CardCall,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardKicker,
  CardMedia,
  CardMediaBackdrop,
  CardTitle,
} from "./card";
import { twMediaFit, twSize } from "./card.styles";

const sizeOptions = Object.keys(twSize) as Array<keyof typeof twSize>;
const fitOptions = Object.keys(twMediaFit) as Array<keyof typeof twMediaFit>;

/*===== Meta =====*/
const meta = {
  title: "Primitive/Card",
  component: Card,
  argTypes: {
    size: { control: "inline-radio", options: sizeOptions },
  },
  args: { size: "default" },
  render: (args) => (
    <Card {...args} className="max-w-sm">
      <CardHeader>
        <CardTitle>عنوان کارت</CardTitle>
        <CardDescription>توضیح کوتاه</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            مشاهده
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>محتوای کارت</CardContent>
    </Card>
  ),
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/*===== Stories =====*/
export const Playground: Story = {};

export const Small: Story = {
  args: { size: "sm" },
};

// A feature card, such as the featured story: more room and a larger title.
export const Feature: Story = {
  args: { size: "lg" },
};

// A horizontal card: the media beside the text from `sm` up, stacked on phones. The body carries the padding.
export const Horizontal: Story = {
  render: (args) => (
    <Card {...args} orientation="horizontal" render={<SiteLink href="#news" />} className="max-w-3xl">
      <CardMedia className="aspect-video sm:aspect-auto sm:w-1/2">
        <img src={placeholderImage} alt="تصویر نمونه" />
      </CardMedia>
      <CardBody>
        <CardHeader>
          <CardTitle>انتصاب رئیس دانشگاه به عضویت شورای علمی بنیاد نخبگان استان</CardTitle>
          <CardDescription>۱۹ مهر ۱۴۰۵</CardDescription>
        </CardHeader>
        <CardContent>متن کوتاهی درباره این خبر.</CardContent>
      </CardBody>
    </Card>
  ),
};

// Text that comes from elsewhere (the home feed's lead paragraphs) is clamped with `lines`, so a row of cards keeps
// its rhythm whatever the source wrote.
export const ClampedDescription: Story = {
  render: (args) => (
    <Card {...args} className="max-w-sm">
      <CardHeader>
        <CardTitle>آیین دانش‌آموختگی دانشجویان برگزار شد</CardTitle>
        <CardDescription lines="2">
          به گزارش روابط عمومی دانشگاه، آیین دانش‌آموختگی دانشجویان با حضور خانواده‌ها، استادان و مسئولان دانشگاه در
          سالن اجتماعات برگزار شد و از دانش‌آموختگان ممتاز این دوره با اهدای لوح سپاس قدردانی شد.
        </CardDescription>
      </CardHeader>
    </Card>
  ),
};

// A whole card that is a link: hover or tab to it for the card lift (a darker edge and a shadow) and the media zoom.
// The second card's image is a poster, so it shows from the top instead of being cropped in the middle.
export const LinkWithMedia: Story = {
  render: (args) => (
    <div className="grid max-w-3xl gap-5 sm:grid-cols-2">
      <Card {...args} render={<SiteLink href="#news" />}>
        <CardMedia className="aspect-video">
          <img src={placeholderImage} alt="تصویر نمونه" />
        </CardMedia>
        <CardHeader>
          <CardTitle>عنوان یک مطلب نمونه</CardTitle>
          <CardDescription>۱۰ شهریور ۱۴۰۵</CardDescription>
        </CardHeader>
      </Card>
      <Card {...args} render={<SiteLink href="#news" />}>
        <CardMedia fit="top" className="aspect-video">
          <img src={placeholderImage} alt="تصویر نمونه" />
        </CardMedia>
        <CardHeader>
          <CardTitle>مطلب دوم با تصویر از بالا</CardTitle>
          <CardDescription>۹ شهریور ۱۴۰۵</CardDescription>
        </CardHeader>
      </Card>
    </div>
  ),
};

// The content card anatomy: media, kicker (the category), title, then below a hairline the date and the call, pinned to
// the bottom. A compact horizontal card ends the same way; one with no date keeps the call at the end. A card that isn't
// a link puts its buttons where the call would be.
export const ContentCards: Story = {
  render: (args) => (
    <div className="grid max-w-3xl gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {["عنوان یک مطلب نمونه", "مطلب دوم با عنوانی بلندتر که به دو خط می‌رسد"].map((title) => (
          <Card key={title} {...args} render={<SiteLink href="#news" />}>
            <CardMedia className="aspect-wide">
              <img src={placeholderImage} alt="" />
            </CardMedia>
            <CardHeader>
              <CardKicker>دانشگاه</CardKicker>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardFooter>
              <time dateTime="2026-10-11">
                <ClockIcon aria-hidden />
                ۱۹ مهر ۱۴۰۵
              </time>
              <CardCall>ادامه خبر</CardCall>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Card {...args} size="sm" orientation="horizontal" render={<SiteLink href="#news" />}>
        <CardMedia className="aspect-wide sm:aspect-4/3 sm:w-44">
          <img src={placeholderImage} alt="" />
        </CardMedia>
        <CardBody>
          <CardHeader>
            <CardKicker>مرکز رشد</CardKicker>
            <CardTitle>نشست تخصصی هدایت شغلی</CardTitle>
            <CardDescription>گفت‌وگوی دانشجویان با مدیران صنعت</CardDescription>
          </CardHeader>
          <CardFooter>
            <CardCall>بیشتر بخوانید</CardCall>
          </CardFooter>
        </CardBody>
      </Card>
      <Card {...args} className="max-w-sm">
        <CardHeader>
          <CardTitle>یادداشت نمونه</CardTitle>
        </CardHeader>
        <CardContent>متن کوتاه یادداشت.</CardContent>
        <CardFooter>
          <time dateTime="2026-10-11">
            <ClockIcon aria-hidden />
            ۱۹ مهر ۱۴۰۵
          </time>
          <Button variant="ghost" size="icon-sm" aria-label="حذف">
            <Trash2Icon />
          </Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const MediaFit: Story = {
  render: (args) => (
    <div className="grid max-w-4xl gap-5 sm:grid-cols-3">
      {fitOptions.map((fit) => (
        <Card key={fit} {...args}>
          <CardMedia fit={fit} className="aspect-4/3">
            {fit === "contain" && <CardMediaBackdrop src={placeholderImage} />}
            <img src={placeholderImage} alt="تصویر نمونه" />
          </CardMedia>
          <CardContent dir="ltr" lang="en">
            {fit}
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};

/** A frame outside a card, as in the home page's story rows: `inset` rounds its own corners. */
export const MediaInset: Story = {
  render: () => (
    <CardMedia frame="inset" className="aspect-photo w-54">
      <img src={placeholderImage} alt="تصویر نمونه" />
    </CardMedia>
  ),
};

export const WithFooter: Story = {
  render: (args) => (
    <Card {...args} className="max-w-sm">
      <CardHeader>
        <CardTitle>عنوان کارت</CardTitle>
        <CardDescription>توضیح کوتاه</CardDescription>
      </CardHeader>
      <CardContent>محتوای کارت</CardContent>
      <CardFooter className="justify-start">
        <Button>ادامه</Button>
        <Button variant="ghost">انصراف</Button>
      </CardFooter>
    </Card>
  ),
};
