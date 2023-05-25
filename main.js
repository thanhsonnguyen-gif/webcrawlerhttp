const { crawlPage } = require("./crawl");
const { printReport } = require("./report");

async function main() {
  if (process.argv.length < 3) {
    console.log("no website is provided");
    process.exit(1);
  }

  if (process.argv.length > 3) {
    console.log("only one website can be crawl in our tool");
    process.exit(1);
  }

  const baseUrl = process.argv[2];
  console.log(`starting crawl website: ${baseUrl}`);
  const pages = await crawlPage(baseUrl, baseUrl, {});
  printReport(pages);
}

main();
