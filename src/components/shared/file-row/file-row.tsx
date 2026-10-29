import { DownloadIcon, FileTextIcon } from "lucide-react";

import { Badge } from "#/components/primitive/badge/badge";
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from "#/components/primitive/item/item";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { m } from "#/paraglide/messages";

/*===== File Row =====*/

/**
 * A downloadable file as one row of a ruled list (`ItemGroup variant="ruled"`): a page icon, its title, its format and
 * the download, a «دریافت» button from `md` up like a department's track buttons (a phone keeps the bare icon). The whole
 * row is the link; the button only makes it look pressable. A department's curriculum, an office's guides and the
 * forms page all list files this way.
 */
export function FileRow({ title, url, format }: { title: string; url: string; format: string }) {
  return (
    <li>
      <Item render={<SiteLink href={url} />}>
        <ItemMedia>
          <FileTextIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{title}</ItemTitle>
        </ItemContent>
        {/* The file's format is its own name, the same in every language. */}
        <Badge variant="outline" dir="ltr">
          {format.toUpperCase()}
        </Badge>
        {/* On a phone the bare icon keeps close to the format, as one mark. */}
        <ItemActions variant="button" className="max-md:-ms-1">
          <DownloadIcon aria-hidden />
          <span data-slot="item-action-label">{m.file_row_download()}</span>
        </ItemActions>
      </Item>
    </li>
  );
}
