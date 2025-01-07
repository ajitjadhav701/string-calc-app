import { render, screen, fireEvent } from "@testing-library/react";
import StringCalculator from "./StringCalculator";

describe('StringCalculator component', () => {
  let textArea: HTMLElement;
  let addButton: HTMLElement;
  let outputBox: HTMLElement;

  beforeEach(() => {
    render(<StringCalculator />);
    textArea = screen.getByTestId("textarea-field");
    addButton = screen.getByTestId("add-button");
    outputBox = screen.getByTestId("output-box");
  });

  it("Should render StringCalculator component", () => {
    expect(textArea).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(outputBox).toBeInTheDocument();
  });

  it("Should update textarea value onChange event", () => {
    fireEvent.change(textArea, { target: { value: '1,2,3' } });
    expect(textArea).toHaveValue('1,2,3');
  });

  it("Should give output as 0 when no value entered in textarea", () => {
    fireEvent.change(textArea, { target: { value: '' } });
    fireEvent.click(addButton);
    expect(outputBox).toHaveTextContent("0");
  });

  it("Should give output as the entered number when only one number is entered", () => {
    fireEvent.change(textArea, { target: { value: '1' } });
    fireEvent.click(addButton);
    expect(outputBox).toHaveTextContent("1");
  });
  
  it("Should give sum for comma (,) separated numbers", () => {
    fireEvent.change(textArea, { target: { value: '1,2,3,4' } });
    fireEvent.click(addButton);
    expect(outputBox).toHaveTextContent("10");
  });

  it("Should give sum for new line (\n) separated numbers", () => {
    fireEvent.change(textArea, { target: { value: '1,2,3\n4,5' } });
    fireEvent.click(addButton);
    expect(outputBox).toHaveTextContent("15");
  });

  it("Should give sum for different delimiters like //$\n2$5,5,6 or //|\n1|2|3|4 ", () => {
    fireEvent.change(textArea, { target: { value: '//$\n2$5,5,6' } });
    fireEvent.click(addButton);
    expect(outputBox).toHaveTextContent("18");
  });

  it("Should give error if negative numbers are entered", () => {
    fireEvent.change(textArea, { target: { value: '1,2,-3,-4,-5' } });
    fireEvent.click(addButton);
    expect(outputBox).toHaveTextContent("Negative numbers not allowed: -3, -4, -5");
  });

  it("Should ignore number if greater than 1000", () => {
    fireEvent.change(textArea, { target: { value: '1,2,1001' } });
    fireEvent.click(addButton);
    expect(outputBox).toHaveTextContent("3");
  });
});