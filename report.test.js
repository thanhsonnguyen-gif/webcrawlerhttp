const { test, expect } = require("@jest/globals");

const { sortPages } = require("./report");

test("two URLs in list", () => {
  const input = { "https://boot.dev/path1": 1, "https://boot.dev/path2": 2 };
  const actual = sortPages(input);
  const expected = [
    ["https://boot.dev/path2", 2],
    ["https://boot.dev/path1", 1],
  ];
  expect(actual).toEqual(expected);
});

test("more than 2 URLs in list", () => {
  const input = {
    "https://boot.dev/path1": 1,
    "https://boot.dev/path2": 2,
    "https://boot.dev/path3": 3,
    "https://boot.dev/path4": 4,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://boot.dev/path4", 4],
    ["https://boot.dev/path3", 3],
    ["https://boot.dev/path2", 2],
    ["https://boot.dev/path1", 1],
  ];
  expect(actual).toEqual(expected);
});
