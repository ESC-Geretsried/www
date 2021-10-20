import { useState, useMemo } from "react";
import { chunk } from "./shared.utils";
// import { useQueryParams, NumberParam } from "use-query-params";

type ButtonProps = {
  onClick?: () => void;
  children: string;
  isActive?: boolean;
  key: string;
};

export const useClientSidePagination = <T>(
  data: Array<T>,
  {
    pageSize,
  }: { pageSize: number; isMobile?: boolean; ellipsisPosition?: number }
) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const chunks = useMemo(() => chunk(data, pageSize), [data, pageSize]);

  const currentPage = chunks[currentPageIndex];

  const next = () =>
    setCurrentPageIndex(
      currentPageIndex < chunks.length - 1
        ? currentPageIndex + 1
        : chunks.length - 1
    );
  const previous = () =>
    setCurrentPageIndex(currentPageIndex > 0 ? currentPageIndex - 1 : 0);

  return {
    chunks,
    currentPageIndex,
    setCurrentPageIndex,
    currentPage,
    next,
    previous,
    isFirstActive: currentPageIndex === 0,
    isLastActive: currentPageIndex === chunks.length - 1,
  };
};

export const usePaginationButtons = ({
  chunkLength,
  setCurrentPageIndex,
  currentPageIndex,
  isMobile = false,
  ellipsisPosition = 2,
}: {
  chunkLength: number;
  setCurrentPageIndex: (index: number) => void;
  currentPageIndex: number;
  isMobile?: boolean;
  ellipsisPosition?: number;
}) => {
  let buttons = Array.from(
    { length: chunkLength },
    (_chunk, i) =>
      ({
        onClick: () => setCurrentPageIndex(i),
        children: `${i + 1}`,
        isActive: currentPageIndex === i,
        key: `${i + 1}`,
      } as ButtonProps)
  ).filter(
    (_chunk, i) =>
      i === chunkLength - 1 || // always show last
      i === 0 || // always show first
      currentPageIndex === i || // always show current
      (currentPageIndex - ellipsisPosition <= i && // show previous 2
        i <= currentPageIndex + ellipsisPosition) // show next 2
  );

  if (
    buttons.length <= chunkLength &&
    ellipsisPosition <= currentPageIndex - ellipsisPosition
  ) {
    buttons.splice(1, 0, {
      children: "...",
      key: "ellipsis-start",
    });
  }

  if (
    buttons.length <= chunkLength &&
    chunkLength - ellipsisPosition >= currentPageIndex + ellipsisPosition + 1
  ) {
    buttons.splice(buttons.length - 1, 0, {
      children: "...",
      key: "ellipsis-end",
    });
  }

  if (isMobile) {
    buttons = [{ children: `${currentPageIndex + 1}`, key: "show-only-index" }];
  }

  return buttons;
};
