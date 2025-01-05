import { render, screen, fireEvent } from "@testing-library/react";
import StringCalculator from "./StringCalculator";

it("Should render StringCalculator component", () => {
    render(<StringCalculator/>);
    //get elements by testId
    const textArea = screen.getByTestId("textarea-field");
    const addButton = screen.getByTestId("add-button");
    const outputBox = screen.getByTestId("output-box");
    expect(textArea).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(outputBox).toBeInTheDocument();
  });

it("Should update textarea value onChange event", () => {
    render(<StringCalculator/>);
    const textArea = screen.getByTestId("textarea-field");
    fireEvent.change(textArea, { target: { value: '1,2,3' } });
    expect(textArea).toHaveValue('1,2,3');
  });

it("Should give output as 0 when no value entered in textarea", () => {
    render(<StringCalculator/>);
    const addButton = screen.getByTestId("add-button");
    fireEvent.click(addButton);
    const output = screen.getByTestId("output-box");
    expect(output).toHaveTextContent("0");
  });
