import { render, screen, cleanup } from "@testing-library/react";
import ErrorMessages from "./ErrorMessages";

const mockedMessages = ["mocked error 1", "mocked error 2"];

describe("ErrorMessages", () => {
  afterEach(() => {
    cleanup();
  });

  it("Render error messages", () => {
    render(<ErrorMessages messages={mockedMessages} />);
    expect(screen.getByText("mocked error 1")).toBeInTheDocument();
    expect(screen.getByText("mocked error 2")).toBeInTheDocument();
  });
});
