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

it("If only one number entered give output as that number", () => {
    render(<StringCalculator/>);
    const addButton = screen.getByTestId("add-button");
    const textArea = screen.getByTestId("textarea-field");
    fireEvent.change(textArea, { target: { value: '1' } });
    fireEvent.click(addButton);
    const output = screen.getByTestId("output-box");
    expect(output).toHaveTextContent("1");
  });
it("Should give sum for comma (,) separated numbers", () => {
    render(<StringCalculator/>);
    const addButton = screen.getByTestId("add-button");
    const textArea = screen.getByTestId("textarea-field");
    fireEvent.change(textArea, { target: { value: '1,2,3,4' } });
    fireEvent.click(addButton);
    const output = screen.getByTestId("output-box");
    expect(output).toHaveTextContent("10");
  });
it("Should give sum for new line (\n) separated numbers", () => {
    render(<StringCalculator/>);
    const addButton = screen.getByTestId("add-button");
    const textArea = screen.getByTestId("textarea-field");
    fireEvent.change(textArea, { target: { value: '1,2,3\n4,5' } });
    fireEvent.click(addButton);
    const output = screen.getByTestId("output-box");
    expect(output).toHaveTextContent("15");
  });
it("Should give sum for different delimiters like //$\n2$5,5,6 or //|\n1|2|3|4 ", () => {
    render(<StringCalculator/>);
    const addButton = screen.getByTestId("add-button");
    const textArea = screen.getByTestId("textarea-field");
    fireEvent.change(textArea, { target: { value: '//$\n2$5,5,6' } });
    fireEvent.click(addButton);
    const output = screen.getByTestId("output-box");
    expect(output).toHaveTextContent("18");
  });
it("Should give error if negative numbers are entered", () => {
    render(<StringCalculator/>);
    const addButton = screen.getByTestId("add-button");
    const textArea = screen.getByTestId("textarea-field");
    fireEvent.change(textArea, { target: { value: '1,2,-3,-4,-5' } });
    fireEvent.click(addButton);
    const output = screen.getByTestId("output-box");
    expect(output).toHaveTextContent("Negative numbers not allowed: -3, -4, -5");
  });
