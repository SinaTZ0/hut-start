import { useLocation, useMatches, useNavigate } from "@tanstack/react-router";
import { LinkIcon, PaletteIcon, RotateCcwIcon } from "lucide-react";
import { useEffect, useEffectEvent } from "react";

import { Button } from "#/components/primitive/button/button";
import { Field, FieldLabel, FieldLegend, FieldSet, FieldTitle } from "#/components/primitive/field/field";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "#/components/primitive/popover/popover";
import { RadioGroup, RadioGroupItem } from "#/components/primitive/radio-group/radio-group";
import { toast } from "#/components/primitive/toast/toast";
import { readDesignLink, useDesignPreview } from "#/hooks/use-design-preview";
import {
  DESIGN_CHOICES_PARAM,
  DESIGN_PREVIEW_PARAM,
  DESIGN_VARIANTS,
  type DesignOption,
  type DesignVariantId,
  designVariantsForPage,
  serializeDesignChoices,
} from "#/lib/design-variants";
import { m } from "#/paraglide/messages";

/*===== Share Link =====*/

/** This page with the preview key and the picks in its search, for another reviewer to open. */
function shareLink({ key, choices }: { key: string; choices: string }): string {
  const url = new URL(window.location.href);
  url.searchParams.set(DESIGN_PREVIEW_PARAM, key);
  url.searchParams.set(DESIGN_CHOICES_PARAM, choices);
  url.hash = "";
  return url.href;
}

/*===== Opened From a Link =====*/

/**
 * When the page was opened from a share link, keeps its key and picks in cookies for the pages after this one, then
 * takes the params out of the address bar, so a link copied from it later isn't stale.
 */
function useRememberedLink(remember: () => void) {
  const navigate = useNavigate();
  const hasLink = useLocation({ select: (location) => readDesignLink(location.search) !== undefined });
  const onLink = useEffectEvent(() => {
    remember();
    void navigate({
      to: ".",
      search: ({
        [DESIGN_PREVIEW_PARAM]: _preview,
        [DESIGN_CHOICES_PARAM]: _design,
        ...rest
      }: Record<string, unknown>) => rest,
      replace: true,
      resetScroll: false,
    });
  });

  useEffect(() => {
    if (hasLink) onLink();
  }, [hasLink]);
}

/*===== Switch =====*/

function VariantSwitch<Id extends DesignVariantId>({
  id,
  value,
  onChange,
}: {
  id: Id;
  value: DesignOption<Id>;
  onChange: (option: DesignOption<Id>) => void;
}) {
  const variant = DESIGN_VARIANTS[id];
  const options = Object.entries(variant.options) as [DesignOption<Id>, () => string][];

  return (
    <FieldSet>
      <FieldLegend variant="label">{variant.label()}</FieldLegend>
      <RadioGroup value={value} onValueChange={(option) => onChange(option as DesignOption<Id>)}>
        {options.map(([option, label]) => (
          <FieldLabel key={option} htmlFor={`design-${id}-${option}`}>
            <Field orientation="horizontal">
              <FieldTitle>{label()}</FieldTitle>
              <RadioGroupItem value={option} id={`design-${id}-${option}`} />
            </Field>
          </FieldLabel>
        ))}
      </RadioGroup>
    </FieldSet>
  );
}

/*===== Design Preview =====*/

/**
 * The reviewers' panel for switching between designs still being chosen (`src/lib/design-variants.ts`): a tab on the
 * screen's edge, clear of the phone tab bar and the devtools button, that opens the switches for this page. Renders
 * nothing unless this browser has the preview key (`DESIGN_PREVIEW_KEY`).
 */
export function DesignPreview() {
  const { preview, choices, choose, reset, remember } = useDesignPreview();
  const routePath = useMatches({ select: (matches) => matches.at(-1)?.fullPath ?? "/" });
  useRememberedLink(remember);

  if (!preview.enabled || !preview.key) return null;
  const key = preview.key;
  const ids = designVariantsForPage(routePath);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink({ key, choices: serializeDesignChoices(choices) }));
      toast.add({ title: m.design_preview_copied(), type: "success" });
    } catch {
      toast.add({ title: m.design_preview_copy_failed(), type: "error" });
    }
  };

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="highlight"
            size="icon"
            aria-label={m.design_preview_title()}
            className="fixed end-2 top-1/2 z-40 -translate-y-1/2"
          />
        }
      >
        <PaletteIcon />
      </PopoverTrigger>
      <PopoverContent side="inline-start" sideOffset={8} className="w-80">
        <PopoverHeader>
          <PopoverTitle>{m.design_preview_title()}</PopoverTitle>
          <PopoverDescription>{m.design_preview_description()}</PopoverDescription>
        </PopoverHeader>

        {/*------ Switches ------*/}
        {ids.length === 0 ? (
          <p className="text-body-sm text-muted-foreground">{m.design_preview_none()}</p>
        ) : (
          ids.map((id) => (
            <VariantSwitch
              key={id}
              id={id}
              value={choices[id] ?? DESIGN_VARIANTS[id].default}
              onChange={(option) => choose(id, option)}
            />
          ))
        )}

        {/*------ Actions ------*/}
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={copyLink}>
            <LinkIcon data-icon="inline-start" />
            {m.design_preview_copy()}
          </Button>
          <Button variant="ghost" size="sm" onClick={reset}>
            <RotateCcwIcon data-icon="inline-start" />
            {m.design_preview_reset()}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
