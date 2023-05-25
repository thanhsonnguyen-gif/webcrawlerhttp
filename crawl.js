const { JSDOM } = require("jsdom");

async function crawlPage(currentUrl) {
  try {
    const resp = await fetch(currentUrl);
    if (resp.status > 399) {
      console.log(
        `have a problem in fetching Url with status code is: ${resp.status}`
      );
      return;
    }
    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(
        `content-type of page is: ${contentType}, is not format for crawling`
      );
      return;
    }
    console.log(await resp.text());
  } catch (error) {
    console.log(
      `the link of page for fetching have problem, please check this with error message: ${error}`
    );
  }
}

function getUrlFromHtml(htmlBody, baseUrl) {
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  const urls = [];
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === "/") {
      try {
        const urlIsChecked = new URL(`${baseUrl}${linkElement.href}`);
        urls.push(urlIsChecked.href);
      } catch (error) {
        console.log(
          `link in html body is invalid with message error is: ${error}`
        );
      }
    } else {
      try {
        const urlIsChecked = new URL(`${linkElement.href}`);
        urls.push(urlIsChecked.href);
      } catch (error) {
        console.log(
          `link in html body is invalid with message error is: ${error}`
        );
      }
    }
  }
  return urls;
}

function normalizeUrl(urlString) {
  const URLObj = new URL(urlString);
  const hostPath = `${URLObj.hostname}${URLObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

module.exports = {
  normalizeUrl,
  getUrlFromHtml,
  crawlPage,
};
