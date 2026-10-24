import type { Meta, StoryObj } from "@storybook/react-vite";

import placeholderImage from "#/assets/placeholder.svg";
import { Button } from "#/components/primitive/button/button";
import { SiteLink } from "#/components/shared/site-link/site-link";
import {
  Card,
  CardAction,
  CardBody,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
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

export const MediaFit: Story = {
  render: (args) => (
    <div className="grid max-w-4xl gap-5 sm:grid-cols-3">
      {fitOptions.map((fit) => (
        <Card key={fit} {...args}>
          <CardMedia fit={fit} className="aspect-4/3">
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

export const WithFooter: Story = {
  render: (args) => (
    <Card {...args} className="max-w-sm">
      <CardHeader>
        <CardTitle>عنوان کارت</CardTitle>
        <CardDescription>توضیح کوتاه</CardDescription>
      </CardHeader>
      <CardContent>محتوای کارت</CardContent>
      <CardFooter>
        <Button className="w-full">ادامه</Button>
      </CardFooter>
    </Card>
  ),
};
