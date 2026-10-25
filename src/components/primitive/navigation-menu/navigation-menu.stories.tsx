import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./navigation-menu";

/*===== Meta =====*/
const meta = {
  title: "Primitive/NavigationMenu",
  component: NavigationMenu,
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/*===== Stories =====*/

// Hover a trigger, then move to the next one: the card slides along the bar and resizes to the new panel while the
// panels slide past each other. Click and the arrow keys work too; with reduced motion it switches at once.
export const Default: Story = {
  render: (args) => (
    <div className="flex min-h-80 justify-center">
      <NavigationMenu {...args}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>دانشگاه</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-48">
                <li>
                  <NavigationMenuLink href="#">درباره دانشگاه</NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="#">رئیس دانشگاه</NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="#">دفترچه تلفن</NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>آموزش</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-96 grid-cols-2">
                <li>
                  <NavigationMenuLink href="#">مهندسی برق</NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="#">مهندسی کامپیوتر</NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="#">مهندسی مکانیک</NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="#">مهندسی پزشکی</NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="#">تقویم آموزشی</NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
              سامانه‌ها
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  ),
};
