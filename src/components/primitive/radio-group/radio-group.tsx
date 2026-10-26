import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { cn } from "#/lib/utils";
import {
  radioGroupClasses,
  radioGroupDotClasses,
  radioGroupIndicatorClasses,
  radioGroupItemClasses,
} from "./radio-group.styles";

/*===== Radio Group =====*/

export type RadioGroupProps = RadioGroupPrimitive.Props;
export type RadioGroupItemProps = RadioPrimitive.Root.Props;

function RadioGroup({ className, ...props }: RadioGroupProps) {
  return <RadioGroupPrimitive data-slot="radio-group" className={cn(radioGroupClasses, className)} {...props} />;
}

/*===== Item =====*/

function RadioGroupItem({ className, ...props }: RadioGroupItemProps) {
  return (
    <RadioPrimitive.Root data-slot="radio-group-item" className={cn(radioGroupItemClasses, className)} {...props}>
      <RadioPrimitive.Indicator data-slot="radio-group-indicator" className={radioGroupIndicatorClasses}>
        <span className={radioGroupDotClasses} />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  );
}

export { RadioGroup, RadioGroupItem };
