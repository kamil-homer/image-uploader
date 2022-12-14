import { render, screen, cleanup } from "@testing-library/react";
import { generateFakeFileWithPreview } from "../../utils/helpers";
import ImagePreview from "./ImagePreview";

describe("ImagePreview", () => {
  window.URL.createObjectURL = jest.fn();
  const mockedFile = generateFakeFileWithPreview({});
  afterEach(() => {
    cleanup();
  });

  it("Render image preview", () => {
    render(<ImagePreview file={mockedFile} />);
    expect(screen.getByTestId("imagePreview")).toBeInTheDocument();
  });
});
