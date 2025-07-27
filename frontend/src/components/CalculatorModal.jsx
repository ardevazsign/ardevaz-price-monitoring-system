import React, { useState } from 'react';

const CalculatorModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const toggleModal = () => {
    setShowModal(!showModal);
    setInput('');
    setResult(null);
  };

  const handleInput = (value) => {
    setInput((prev) => prev + value);
  };

  const calculateResult = () => {
    try {
      const evalResult = eval(input); // Use a safe eval library in production
      setResult(evalResult);
    } catch {
      setResult('Error');
    }
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
  };

  return (
    <div className="absolute -top-3 -left-0  z-50 ">
      {/* Calculator Icon Button */}
      <button
        onClick={toggleModal}
        className="bg-cyan-300 text-white p-2 shadow-md hover:bg-cyan-400"
      >
        🧮
      </button>

      {/* Modal */}
      {showModal && (
        <div className="mt-2 w-72 bg-white rounded-xl shadow-lg border p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Calculator</h2>
            <button
              onClick={toggleModal}
              className="text-gray-500 hover:text-black"
            >
              ✖
            </button>
          </div>

          {/* Display */}
          <div className="bg-gray-100 p-2 mb-3 rounded text-right text-xl font-mono">
            {result !== null ? result : input || '0'}
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {['7', '8', '9', '/'].map((val) => (
              <button
                key={val}
                onClick={() => handleInput(val)}
                className="btn"
              >
                {val}
              </button>
            ))}
            {['4', '5', '6', '*'].map((val) => (
              <button
                key={val}
                onClick={() => handleInput(val)}
                className="btn"
              >
                {val}
              </button>
            ))}
            {['1', '2', '3', '-'].map((val) => (
              <button
                key={val}
                onClick={() => handleInput(val)}
                className="btn"
              >
                {val}
              </button>
            ))}
            {['0', '.', '=', '+'].map((val) =>
              val === '=' ? (
                <button
                  key={val}
                  onClick={calculateResult}
                  className="btn bg-green-500 hover:bg-green-600 text-white"
                >
                  {val}
                </button>
              ) : (
                <button
                  key={val}
                  onClick={() => handleInput(val)}
                  className="btn"
                >
                  {val}
                </button>
              )
            )}
            <button
              onClick={handleClear}
              className="col-span-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculatorModal;
