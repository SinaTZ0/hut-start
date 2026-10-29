import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "#/components/primitive/accordion/accordion";
import type { Office } from "#/orpc/office/contract";

/*===== FAQ List =====*/

/** The questions visitors ask the office most, each opening to its answer. */
export function FaqList({ faq }: { faq: Office["faq"] }) {
  return (
    <Accordion className="max-w-3xl">
      {faq.map((entry) => (
        <AccordionItem key={entry.question} value={entry.question}>
          <AccordionTrigger>{entry.question}</AccordionTrigger>
          <AccordionContent>
            <p>{entry.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
