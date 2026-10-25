import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "#/lib/utils";
import {
  accordionClasses,
  accordionContentClasses,
  accordionContentInnerClasses,
  accordionItemClasses,
  accordionTriggerClasses,
  accordionTriggerIconClasses,
} from "./accordion.styles";

/*===== Accordion =====*/

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return <AccordionPrimitive.Root data-slot="accordion" className={cn(accordionClasses, className)} {...props} />;
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item data-slot="accordion-item" className={cn(accordionItemClasses, className)} {...props} />
  );
}

/*===== Compound Parts =====*/

/** The item's heading button. shadcn swaps a down and an up chevron; here one chevron turns over instead. */
function AccordionTrigger({ className, children, ...props }: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(accordionTriggerClasses, className)}
        {...props}
      >
        {children}
        <ChevronDownIcon aria-hidden data-slot="accordion-trigger-icon" className={accordionTriggerIconClasses} />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

/** The panel; it slides open and shut (see `accordion.styles.ts`), and unmounts once it has closed. */
function AccordionContent({ className, children, ...props }: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel data-slot="accordion-content" className={accordionContentClasses} {...props}>
      <div className={cn(accordionContentInnerClasses, className)}>{children}</div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
