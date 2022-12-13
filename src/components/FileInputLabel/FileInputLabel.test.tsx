import { render, screen, cleanup } from "@testing-library/react";
import FileInputLabel from "./FileInputLabel";

describe("FileInputLabel", () => {
  afterEach(() => {
    cleanup();
  });

  it("Render correct message when isDragActive is true", () => {
    render(<FileInputLabel isDragActive />);
    expect(screen.getByText("Drop the file here ...")).toBeInTheDocument();
  });

  it("Render correct message when isDragActive is false", () => {
    render(<FileInputLabel isDragActive={false} />);
    expect(
      screen.getByText("Drag 'n' drop the file here, or click to select file")
    ).toBeInTheDocument();
  });
});
