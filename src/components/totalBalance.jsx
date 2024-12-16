import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import formatNumber from "../utils/currency";

const TotalBalance = (props) => {
  const [balance, setBalance] = useState({
    total: 0,
    credit: 0,
    debit: 0,
  });

  useEffect(() => {
    const updateBalance = () => {
      const amounts = props.transactions.map(
        (transaction) => transaction.amount
      );
      const newBalance = {
        total: 0,
        credit: 0,
        debit: 0,
      };

      newBalance.total = amounts
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

      newBalance.credit = amounts
        .filter((item) => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

      newBalance.debit = (
        amounts
          .filter((item) => item < 0)
          .reduce((acc, item) => (acc += item), 0) * -1
      ).toFixed(2);

      setBalance({
        total: formatNumber(newBalance.total),
        credit: formatNumber(newBalance.credit),
        debit: formatNumber(newBalance.debit),
      });
    };
    updateBalance();
  }, [props.transactions]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-6 max-w-md mx-auto transition-transform transform hover:scale-105">
      <h4 className="text-gray-600 text-lg font-semibold">Your Balance</h4>
      <h1 className="text-4xl font-bold text-gray-800 mb-4" id="balance">
        {balance.total}
      </h1>
      <div className="flex justify-between mt-4">
        <div className="text-center">
          <h4 className="text-gray-600">Income</h4>
          <p id="money-plus" className="text-green-500 text-xl font-semibold">
            {balance.credit}
          </p>
        </div>
       
      </div>
      <div className="flex justify-center mt-6">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          onClick={props.onViewDetails} // Call the function when clicked
        >
          View Details
        </button>
      </div>
    </div>
  );
};

TotalBalance.propTypes = {
  transactions: PropTypes.array.isRequired,
  onViewDetails: PropTypes.func.isRequired, // Prop validation for the function
};

export default TotalBalance;
