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
    setOutput('');
    if(inputString.length === 0){
      return 0;
    }
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
