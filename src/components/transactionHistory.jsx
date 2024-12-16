import PropTypes from 'prop-types';
import formatNumber from '../utils/currency';

const TransactionHistory = (props) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-6 max-w-md mx-auto">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">History</h3>
      <ul id="list" className="list">
        {props.transactions.map((transaction) => (
          <li
            key={transaction.id}
            className={`flex justify-between items-center p-4 rounded-md mb-2 transition duration-200 ${
              transaction.amount < 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
            }`}
          >
            {/* Label and Date */}
            <div className="flex-1">
              <div className="font-semibold">{transaction.label}</div>
              <div className="text-sm text-gray-500">{transaction.date}</div>
            </div>

            {/* Amount */}
            <span className="font-bold">
              {transaction.amount < 0 ? '-' : '+'}
              {formatNumber(Math.abs(transaction.amount))}
            </span>

            {/* Remove Button */}
            <button
              className="ml-4 text-red-500 hover:text-red-700 font-bold transition duration-200"
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
};

export default TransactionHistory;
