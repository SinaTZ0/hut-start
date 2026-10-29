import { ToggleGroup, ToggleGroupItem } from "#/components/primitive/toggle-group/toggle-group";
import { formatNumber } from "#/lib/locale";

/*===== Filter Chips =====*/

export type FilterChip<T extends string> = { value: T; label: string; count?: number };

/**
 * One-of filter tags over a list, each with how many items it holds: «همه ۱۳۴», «گروه‌های آموزشی ۶۲». One is always
 * pressed; pressing it again keeps it, so the list is never left unfiltered by accident.
 */
export function FilterChips<T extends string>({
  label,
  chips,
  value,
  onValueChange,
  size = "default",
  className,
}: {
  /** Names the group for screen readers: «واحد», «دسته». */
  label: string;
  chips: FilterChip<T>[];
  value: T;
  onValueChange: (value: T) => void;
  /** `sm` for a second row of filters under the main one (the archive's topics). */
  size?: "default" | "sm";
  className?: string;
}) {
  return (
    <ToggleGroup
      aria-label={label}
      value={[value]}
      size={size}
      onValueChange={(next: string[]) => {
        // Every chip's value is a T; an empty array means the pressed chip was pressed again.
        if (next[0] !== undefined) onValueChange(next[0] as T);
      }}
      className={className}
    >
      {chips.map((chip) => (
        <ToggleGroupItem key={chip.value} value={chip.value}>
          {chip.label}
          {chip.count !== undefined && <span data-slot="toggle-count">{formatNumber(chip.count)}</span>}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
