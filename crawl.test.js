const { normalizeUrl } = require("./crawl");

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