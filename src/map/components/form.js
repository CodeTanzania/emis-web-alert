import React from 'react';

const handleSubmit = () => {
  console.log('handle submit called');
};
export default function AlertForm({ data }) {
  return (
    <form>
      Event:
      <br />
      <input type="text" />
      <br />
      Urgency: <br />
      <select>
        <option value="imediate">Imediate</option>
        <option value="expected">Expected</option>
      </select>
      <br />
      Certainity: <br />
      <select>
        <option value="observed">Observed</option>
        <option value="likely">Likely</option>
      </select>
      <br />
      Severity: <br />
      <select>
        <option value="extreme">Extreme</option>
        <option value="minor">Minor</option>
      </select>
      <br />
      Instructions:
      <br />
      <textarea rows="4" cols="50" />
      <br />
      <button onClick={handleSubmit}>save</button>
    </form>
  );
}
