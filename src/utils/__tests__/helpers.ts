import { formatPixels, getFileExtension } from "../helpers";

describe("formatPixels", () => {
  it("should return formatted value for 1000000", () => {
    expect(formatPixels(1000000)).toBe("1MP");
  });

  it("should return formatted value for 1000", () => {
    expect(formatPixels(1000)).toBe("1000P");
  });
});

describe("getFileExtension", () => {
  it("should get file extension from simple name", () => {
    expect(getFileExtension("simple.png")).toBe("png");
  });

  it("should get file extension from complex name", () => {
    expect(getFileExtension("not-that.simple.png")).toBe("png");
  });

  it("should return empty string for hidden files", () => {
    expect(getFileExtension(".gitIgnore")).toBe("");
  });
});
