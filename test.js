function getDisplayPages(pagesCount, currentPage, numOfDisplay) {
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

// console.log(getDisplayPages(9, 1, 2));
// console.log(getDisplayPages(9, 2, 2));
// console.log(getDisplayPages(9, 3, 2));
// console.log(getDisplayPages(9, 4, 2));
// console.log(getDisplayPages(9, 5, 2));
// console.log(getDisplayPages(9, 6, 2));
// console.log(getDisplayPages(9, 7, 2));
// console.log(getDisplayPages(9, 8, 2));
// console.log(getDisplayPages(9, 9, 2));

console.log(getDisplayPages(3, 1, 3));
console.log(getDisplayPages(3, 2, 3));
console.log(getDisplayPages(3, 3, 3));
