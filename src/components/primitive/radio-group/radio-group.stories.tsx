import type { Meta, StoryObj } from "@storybook/react-vite";

import { Field, FieldContent, FieldDescription, FieldLabel, FieldLegend, FieldSet, FieldTitle } from "../field/field";
import { Label } from "../label/label";
import { RadioGroup, RadioGroupItem } from "./radio-group";

/*===== Meta =====*/
const meta = {
  title: "Primitive/RadioGroup",
  component: RadioGroup,
  args: { defaultValue: "unspecified", "aria-label": "جنسیت" },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const GENDERS = [
  { value: "unspecified", label: "نامعین" },
  { value: "male", label: "مرد" },
  { value: "female", label: "زن" },
];

/*===== Stories =====*/
export const Playground: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      {GENDERS.map((option) => (
        <div key={option.value} className="flex items-center gap-3">
          <RadioGroupItem value={option.value} id={`gender-${option.value}`} />
          <Label htmlFor={`gender-${option.value}`}>{option.label}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
};

/** A FieldLabel wrapping a Field turns each option into a card; the checked card takes the selected wash. */
export const ChoiceCards: Story = {
  args: { defaultValue: "complaint", "aria-label": undefined },
  render: (args) => (
    <FieldSet>
      <FieldLegend variant="label">نوع پیام</FieldLegend>
      <RadioGroup {...args} className="grid-cols-2">
        {[
          { value: "complaint", title: "شکایت", description: "از کاری یا رفتاری ناراضی هستید." },
          { value: "suggestion", title: "پیشنهاد یا انتقاد", description: "راهی برای بهتر شدن سراغ دارید." },
        ].map((option) => (
          <FieldLabel key={option.value} htmlFor={`kind-${option.value}`}>
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>{option.title}</FieldTitle>
                <FieldDescription>{option.description}</FieldDescription>
              </FieldContent>
              <RadioGroupItem value={option.value} id={`kind-${option.value}`} />
            </Field>
          </FieldLabel>
        ))}
      </RadioGroup>
    </FieldSet>
  ),
};

export const Invalid: Story = {
  args: { defaultValue: undefined },
  render: (args) => (
    <RadioGroup {...args}>
      {GENDERS.map((option) => (
        <div key={option.value} className="flex items-center gap-3">
          <RadioGroupItem value={option.value} id={`invalid-${option.value}`} aria-invalid />
          <Label htmlFor={`invalid-${option.value}`}>{option.label}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: Playground.render,
};
