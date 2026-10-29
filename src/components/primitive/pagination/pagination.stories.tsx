import type { Meta, StoryObj } from "@storybook/react-vite";

import { formatNumber } from "#/lib/locale";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  paginationRange,
} from "./pagination";

/*===== Meta =====*/
// Links go nowhere here; on a page each is the router's `<Link>` with the page in its search params.
function Pages({ page, pageCount }: { page: number; pageCount: number }) {
  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious href="#" text="جدیدتر" />
          </PaginationItem>
        )}
        {paginationRange({ page, pageCount }).map((value, index) => (
          <PaginationItem key={value === "…" ? `gap-${index}` : value}>
            {value === "…" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink href="#" isActive={value === page}>
                {formatNumber(value)}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        {page < pageCount && (
          <PaginationItem>
            <PaginationNext href="#" text="قدیمی‌تر" />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

const meta = {
  title: "Primitive/Pagination",
  component: Pages,
  argTypes: {
    page: { control: { type: "number", min: 1 } },
    pageCount: { control: { type: "number", min: 1 } },
  },
  args: { page: 1, pageCount: 121 },
} satisfies Meta<typeof Pages>;

export default meta;
type Story = StoryObj<typeof meta>;

/*===== Stories =====*/
export const FirstPage: Story = {};

// Deep in a long list: the first and last pages stay in reach, with the gaps folded.
export const Middle: Story = {
  args: { page: 37 },
};

// A gap of one page shows the page rather than «…».
export const FewPages: Story = {
  args: { page: 3, pageCount: 5 },
};
