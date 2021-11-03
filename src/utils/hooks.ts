import { LinkProps } from "../atoms/Link";
import { Optional } from "../types";

export const usePaginationLinks = ({
  pagesTotal,
  currentPageIndex,
  urlBase,
  isMobile = false,
}: {
  pagesTotal?: number;
  currentPageIndex?: number;
  urlBase: string;
  isMobile?: boolean;
  ellipsisDelta?: number;
}) => {
  if (
    !pagesTotal ||
    currentPageIndex === undefined ||
    currentPageIndex === null
  ) {
    return undefined;
  }

  if (pagesTotal <= 1) {
    return undefined;
  }
  if (isMobile) {
    return [{ children: `${currentPageIndex + 1}`, key: "show-only-index" }];
  }
  let links: Array<Optional<LinkProps, "to"> & { isActive?: boolean }> =
    Array.from({ length: pagesTotal }, (_chunk, i) => ({
      to: `${urlBase}${i === 0 ? "" : i + 1}/`,
      children: `${i + 1}`,
      isActive: currentPageIndex === i,
      key: `${i + 1}`,
    })).filter(
      (_chunk, i) =>
        i === pagesTotal - 1 || // always show last
        i === 0 || // always show first
        currentPageIndex === i || // always show current
        (currentPageIndex <= i + 1 && // show previous 2
          currentPageIndex >= i - 1) // show next 2
    );

  if (currentPageIndex >= 3) {
    links.splice(1, 0, {
      children: "...",
      key: "ellipsis-start",
    });
  }

  if (currentPageIndex <= links.length - 2) {
    links.splice(links.length - 1, 0, {
      children: "...",
      key: "ellipsis-end",
    });
  }

  return links;
};
