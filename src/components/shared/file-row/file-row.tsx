import { DownloadIcon, FileTextIcon } from "lucide-react";

import { Badge } from "#/components/primitive/badge/badge";
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from "#/components/primitive/item/item";
import { SiteLink } from "#/components/shared/site-link/site-link";

/*===== File Row =====*/

/**
 * A downloadable file as one row of a ruled list (`ItemGroup variant="ruled"`): a page icon, its title, its format and
 * a download mark. A department's curriculum, an office's guides and the forms page all list files this way.
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
        <ItemActions>
          {/* The file's format is its own name, the same in every language. */}
          <Badge variant="outline" dir="ltr">
            {format.toUpperCase()}
          </Badge>
          <DownloadIcon />
        </ItemActions>
      </Item>
    </li>
  );
}
