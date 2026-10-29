import { SearchIcon } from "lucide-react";
import { useId } from "react";

import { InputGroup, InputGroupAddon, InputGroupInput } from "#/components/primitive/input-group/input-group";
import { Label } from "#/components/primitive/label/label";
import { cn } from "#/lib/utils";

/*===== Search Field =====*/

/** A page's search box over its list: a magnifier, the field, and a label kept for screen readers. */
export function SearchField({
  label,
  placeholder,
  value,
  onValueChange,
  className,
}: {
  label: string;
  placeholder: string;
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}) {
  const id = useId();

  return (
    <div className={cn("w-full max-w-xl", className)}>
      <Label htmlFor={id} className="sr-only">
        {label}
      </Label>
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon aria-hidden />
        </InputGroupAddon>
        <InputGroupInput
          id={id}
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
        />
      </InputGroup>
    </div>
  );
}
