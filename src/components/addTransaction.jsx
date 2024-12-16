import { useState } from "react";
import PropTypes from "prop-types";

const AddTransaction = ({ transactions, updateTransactionHandler, isDarkMode }) => {
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(getFormattedDate());

  // Helper function to format date as YYYY-MM-DD (HTML5 date input format)
  function getFormattedDate() {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, "0");
    const year = today.getFullYear();
    return `${year}-${month}-${day}`; // Format: YYYY-MM-DD
  }

  function generateID() {
    return Math.floor(Math.random() * 100000000);
  }

  function addTransactionHandler(e) {
    e.preventDefault();

    if (!date) {
      alert("Please select a valid date.");
      return;
    }

    const newTransaction = {
      id: generateID(),
      label,
      amount: +amount,
      date,
    };

    const newTransactions = [...transactions, newTransaction];
    updateTransactionHandler(newTransactions);

    // Reset fields after adding transaction
    setLabel("");
    setAmount("");
    setDate(""); // Reset date field to empty
  }

  return (
    <div
      className={`shadow-lg rounded-lg p-6 mt-6 ml-10 max-w-md mx-auto transition-colors duration-300 ${
        isDarkMode ? "bg-white text-black" : "bg-black text-white"
      }`}
    >
      <h3 className="text-2xl font-semibold mb-4">Add New Transaction</h3>
      <form id="form" onSubmit={addTransactionHandler}>
        {/* Label Input */}
        <div className="mb-4">
          <label htmlFor="label" className="block mb-1">
            Label
          </label>
          <input
            type="text"
            id="label"
            maxLength="10"
            required
            value={label}
            onChange={(e) => setLabel(e.target.value.trim())}
            placeholder="Enter label..."
            className={`rounded-md p-3 w-full focus:outline-none focus:ring-2 transition duration-200 ${
              isDarkMode
                ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-300"
                : "border-gray-300 focus:ring-blue-500 text-black"
            }`}
          />
        </div>

        {/* Amount Input */}
        <div className="mb-4">
          <label htmlFor="amount" className="block mb-1">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            max="10000000000"
            min="-9999"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
            className={`rounded-md p-3 w-full focus:outline-none focus:ring-2 transition duration-200 ${
              isDarkMode
                ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-300"
                : "border-gray-300 focus:ring-blue-500 text-black"
            }`}
          />
        </div>

        {/* Date Input */}
        <div className="mb-4">
          <label htmlFor="date" className="block mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`rounded-md p-3 w-full focus:outline-none focus:ring-2 transition duration-200 ${
              isDarkMode
                ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-300"
                : "border-gray-300 focus:ring-blue-500 text-black"
            }`}
          />
        </div>

        {/* Submit Button */}
        <button
          className={`font-bold py-2 px-4 rounded-md w-full transition duration-200 ${
            isDarkMode
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

AddTransaction.propTypes = {
  transactions: PropTypes.array.isRequired,
  updateTransactionHandler: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired, // Add PropType validation for isDarkMode
};

export default AddTransaction;
