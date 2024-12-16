import PropTypes from "prop-types";
import formatNumber from "../utils/currency";

const TransactionHistory = (props) => {
  return (
    <div
      className={`${
        props.isDarkMode ? "bg-white text-black" : "bg-black text-white"
      } shadow-lg rounded-lg p-6 mt-6 max-w-md mx-auto transition-colors duration-300`}
    >
      <h3
        className={`${
          props.isDarkMode ? "text-black" : "text-white"
        } text-2xl font-semibold mb-4`}
      >
        History
      </h3>
      <ul id="list" className="list">
        {props.transactions.map((transaction) => (
          <li
            key={transaction.id}
            className={`flex justify-between items-center p-4 rounded-md mb-2 transition duration-200 ${
              transaction.amount < 0
                ? props.isDarkMode
                  ? "bg-red-600 text-red-100"
                  : "bg-red-100 text-red-800"
                : props.isDarkMode
                ? "bg-green-600 text-green-100"
                : "bg-green-100 text-green-800"
            }`}
          >
            {/* Label and Date */}
            <div className="flex-1">
              <div
                className={`${
                  props.isDarkMode ? "text-black" : "text-gray-800"
                } font-semibold`}
              >
                {transaction.label}
              </div>
              <div
                className={`${
                  props.isDarkMode ? "text-black" : "text-gray-500"
                } text-sm`}
              >
                {transaction.date}
              </div>
            </div>

            {/* Amount */}
            <span
              className={`font-bold ${
                transaction.amount < 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {transaction.amount < 0 ? "-" : "+"}
              {formatNumber(Math.abs(transaction.amount))}
            </span>

            {/* Remove Button */}
            <button
              className={`ml-4 text-red-500 hover:text-red-700 font-bold transition duration-200 ${
                props.isDarkMode ? "text-gray-300" : "text-gray-500"
              }`}
              onClick={() => props.removeTransactionHandler(transaction.id)}
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

TransactionHistory.propTypes = {
  transactions: PropTypes.array.isRequired,
  removeTransactionHandler: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired, // Add prop validation for dark mode
};

export default TransactionHistory;
