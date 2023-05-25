const { normalizeUrl, getUrlFromHtml } = require("./crawl");

const { test, expect } = require("@jest/globals");

test("normalize strip URL", () => {
  const input = "https://boot.dev/path";
  const actual = normalizeUrl(input);
  const expected = "boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalize URL with slash", () => {
  const input = "https://boot.dev/path/";
  const actual = normalizeUrl(input);
  const expected = "boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalize URL include capital", () => {
  const input = "https://BOOT.dev/path/";
  const actual = normalizeUrl(input);
  const expected = "boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalize URL with http method", () => {
  const input = "http://BOOT.dev/path/";
  const actual = normalizeUrl(input);
  const expected = "boot.dev/path";
  expect(actual).toEqual(expected);
});

test("get absolute URL from Html", () => {
  const inputHtml = `
  <html>
    <body>
        <a href="https://blog.boot.dev">
            Blog of Boot.dev
        </a>
    </body>
  </html>
  `;

  const baseUrl = "https://blog.boot.dev";
  const actual = getUrlFromHtml(inputHtml, baseUrl);
  const expected = ["https://blog.boot.dev/"];
  expect(actual).toEqual(expected);
});

test("get relative URL from Html", () => {
  const inputHtml = `
  <html>
    <body>
        <a href="/path/">
            Blog of Boot.dev with path
        </a>
    </body>
  </html>
  `;

  const baseUrl = "https://blog.boot.dev";
  const actual = getUrlFromHtml(inputHtml, baseUrl);
  const expected = ["https://blog.boot.dev/path/"];
  expect(actual).toEqual(expected);
});

test("get both style of URL from Html", () => {
  const inputHtml = `
  <html>
    <body>
        <a href="https://blog.boot.dev/path1/">
            Blog of Boot.dev path 1
        </a>
        <a href="/path2/">
            Blog of Boot.dev with path 2
        </a>
    </body>
  </html>
  `;

  const baseUrl = "https://blog.boot.dev";
  const actual = getUrlFromHtml(inputHtml, baseUrl);
  const expected = [
    "https://blog.boot.dev/path1/",
    "https://blog.boot.dev/path2/",
  ];
  expect(actual).toEqual(expected);
});

test("reject invalid URL from Html", () => {
  const inputHtml = `
  <html>
    <body>
        <a href="invalid">
            Blog of Boot.dev with path
        </a>
    </body>
  </html>
  `;

  const baseUrl = "https://blog.boot.dev";
  const actual = getUrlFromHtml(inputHtml, baseUrl);
  const expected = [];
  expect(actual).toEqual(expected);
});
