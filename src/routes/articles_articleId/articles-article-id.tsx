import { ORPCError } from "@orpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";

import { Spinner } from "#/components/primitive/spinner/spinner";
import { TextLink } from "#/components/shared/text-link/text-link";
import { absoluteUrl, jsonLd, pageMeta } from "#/lib/seo";
import { orpc } from "#/orpc/client";
import { m } from "#/paraglide/messages";
import { localizeHref } from "#/paraglide/runtime";
import { ArticleBody } from "./components/article-body";
import { ArticleHeader } from "./components/article-header";
import { PhotoViewerProvider } from "./components/photo-viewer";
import { RelatedArticles } from "./components/related-articles";

/*===== Query =====*/
const articleQuery = (id: string) => orpc.homeFeed.article.queryOptions({ input: { id } });

/*===== Route =====*/
export const Route = createFileRoute("/_site-layout/articles/$articleId")({
  // Returns the article as well as caching it, for `head`. An unknown ID is the route's not-found page.
  loader: async ({ context, params }) => {
    try {
      return await context.queryClient.ensureQueryData(articleQuery(params.articleId));
    } catch (error) {
      if (error instanceof ORPCError && error.code === "NOT_FOUND") throw notFound();
      throw error;
    }
  },
  head: (args) => {
    const article = args.loaderData;
    if (!article) return pageMeta({ args, title: m.article_not_found_title(), index: false });

    return {
      ...pageMeta({
        args,
        title: article.title,
        description: article.summary ?? undefined,
        image: article.cover ? { url: article.cover.src, alt: article.title } : undefined,
      }),
      scripts: [
        jsonLd({
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: article.title,
          description: article.summary ?? undefined,
          datePublished: article.publishedOn ?? undefined,
          image: article.cover ? [article.cover.src] : undefined,
          inLanguage: "fa",
          url: absoluteUrl({ matches: args.matches, path: localizeHref(`/articles/${article.id}`) }),
          publisher: { "@type": "CollegeOrUniversity", name: m.site_name() },
        }),
      ],
    };
  },
  component: ArticlePage,
  pendingComponent: ArticlePending,
  notFoundComponent: ArticleNotFound,
});

/*===== Page =====*/

/**
 * One article from the home page's feed (a story, notice, achievement or event): its header, the body in one reading
 * column, and three more of its kind. Every photo on the page opens in one viewer.
 */
function ArticlePage() {
  const { articleId } = Route.useParams();
  const { data: article } = useSuspenseQuery(articleQuery(articleId));

  return (
    <PhotoViewerProvider article={article}>
      <div className="mx-auto max-w-site px-gutter pt-8 pb-section md:pt-10">
        <article aria-labelledby="article-title" className="mx-auto grid max-w-190 gap-5 sm:gap-6">
          <ArticleHeader article={article} />
          <ArticleBody article={article} />
        </article>
        {article.related.length > 0 && <RelatedArticles items={article.related} />}
      </div>
    </PhotoViewerProvider>
  );
}

/*===== States =====*/

/** Shown only when the page takes longer than a second (`pendingMs`), as on a slow connection. */
function ArticlePending() {
  return (
    <div className="grid min-h-art-hero place-items-center">
      <Spinner className="size-8" />
    </div>
  );
}

function ArticleNotFound() {
  return (
    <div className="mx-auto flex max-w-site flex-col items-center gap-4 px-gutter py-section text-center">
      <h1 className="text-h1">{m.article_not_found_title()}</h1>
      <p className="max-w-xl text-muted-foreground">{m.article_not_found_details()}</p>
      <TextLink href="/">{m.article_not_found_back()}</TextLink>
    </div>
  );
}
