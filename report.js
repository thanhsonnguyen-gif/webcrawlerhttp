function printReport(pages) {
  const pageArrayIsSorted = sortPages(pages);
  console.log(`=======`);
  console.log(`REPORT`);
  console.log(`=======`);
  for (const page of pageArrayIsSorted) {
    console.log(`link: ${page[0]} appear: ${page[1]} times`);
  }
  console.log(`=======`);
  console.log(`END REPORT`);
  console.log(`=======`);
}

function sortPages(pages) {
  const pageArray = Object.entries(pages);
  pageArray.sort((a, b) => {
    return b[1] - a[1];
  });
  return pageArray;
}

module.exports = {
  sortPages,
  printReport,
};
