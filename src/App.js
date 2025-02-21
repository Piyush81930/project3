import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [inputData, setInputData] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(inputData);
      const result = await axios.post("https://your-backend-url.herokuapp.com/bfhl", parsedData);
      setResponse(result.data);
      setError("");
    } catch (err) {
      setError("Invalid JSON input");
      setResponse(null);
    }
  };

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_alphabet } = response;
    const filteredResponse = {};

    if (selectedOptions.includes("numbers")) filteredResponse.numbers = numbers;
    if (selectedOptions.includes("alphabets")) filteredResponse.alphabets = alphabets;
    if (selectedOptions.includes("highest_alphabet")) filteredResponse.highest_alphabet = highest_alphabet;

    return (
      <div>
        <h3>Response:</h3>
        <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>ABCD123</h1> {/* Replace with your roll number */}
      <div>
        <textarea
          placeholder='Enter JSON input, e.g., { "data": ["A", "1", "334"] }'
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          rows={5}
          cols={50}
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {response && (
        <div>
          <h3>Select Options:</h3>
          <label>
            <input type="checkbox" value="numbers" onChange={handleOptionChange} /> Numbers
          </label>
          <label>
            <input type="checkbox" value="alphabets" onChange={handleOptionChange} /> Alphabets
          </label>
          <label>
            <input type="checkbox" value="highest_alphabet" onChange={handleOptionChange} /> Highest Alphabet
          </label>
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;