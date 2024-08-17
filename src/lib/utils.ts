import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createEmptyArray = (len: number) => {
  return Array.apply(null, Array(len)).map((u, i) => i);
};

export function getDisplayPages(
  pagesCount: number,
  currentPage: number,
  numOfDisplay: number
) {
  const pages = Array.apply(null, Array(pagesCount)).map((u, i) => i + 1);
  if (currentPage < numOfDisplay) {
    return pages.slice(0, numOfDisplay);
  }

  if (currentPage > pagesCount - numOfDisplay) {
    return pages.slice(-numOfDisplay);
  }

  const currentPageIndex = pages.indexOf(currentPage);

  return pages.slice(currentPageIndex - 1, currentPageIndex + numOfDisplay - 1);
}
