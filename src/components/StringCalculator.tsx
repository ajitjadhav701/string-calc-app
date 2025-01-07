import React, { useState } from "react";
const StringCalculator: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [output, setOutput] = useState<string | number>("");

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };
  const additionHandler=()=>{
    try {
      const sum = add(inputText.trim());
      setOutput(sum ?? 0);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred in calculation";
      setOutput(errorMessage);
    }
  }

  const add = (inputString:string)=>{
    //remove previous output
    setOutput('');

    //if empty string is provided
    if(inputString.length === 0){
      return 0;
    }

    //if entered only one valid number
    if (!isNaN(Number(inputString))) {
      return inputString; 
    }
    //default delemeters comma and new line
    let delimiters = [',', '\n']; 
    //Support different delimiters
    if (inputString.startsWith("//")) {
      const delimiterMatch = inputString.match(/^\/\/(.+)\n/);
      if (delimiterMatch) {
        const customDelimiter = delimiterMatch[1].replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
        delimiters.push(customDelimiter);
        inputString = inputString.slice(delimiterMatch[0].length);
      }
    }
    const delimiterRegex = new RegExp(`[${delimiters.join('')}]`);
   
    const inputNumbers = inputString.split(delimiterRegex).map(Number);

    //if negative numbers present 
    const negativeNumbers = inputNumbers.filter(num => num < 0);
    if (negativeNumbers.length > 0) {
      const allNegativenums = negativeNumbers.join(', ');
      throw new Error(`Negative numbers not allowed: ${allNegativenums}`);
    }

    // Filter out numbers greater than 1000
    const filteredNumbers = inputNumbers.filter(num => num <= 1000);

    return filteredNumbers.reduce((sum, num) => sum + num, 0);
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center ">
        <label htmlFor="textarea-field" data-testid="input-label">
          Enter string
        </label>
        <textarea
          className="text-base w-96  h-12 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="textarea-field"
          data-testid="textarea-field"
          placeholder="1,2,3 or 1\n2,3 or //;\n1;2"
          value={inputText}
          onChange={handleTextChange}
        />
        <button
          data-testid="add-button"
          className="m-4 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={additionHandler}
        >
          Add
        </button>
        <div
          data-testid="output-box"
          className="flex w-96 h-10 bg-slate-200 text-left p-2 rounded-md"
        >
          {output}
        </div>
      </div>
    </>
  );
};

export default StringCalculator;
