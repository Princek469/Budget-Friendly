import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../utils/firebase";
import TransactionHistory from "./transactionHistory.jsx";
import TotalBalance from "./totalBalance.jsx";
import AddTransaction from "./addTransaction.jsx";

function Expense() {
  const location = useLocation();
  const navigate = useNavigate();

  const userData = location.state?.userData || { expenses: [] };
  const uid = location.state?.uid;

  const [transactions, setTransactions] = useState(userData.expenses);
  const [showHistory, setShowHistory] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Theme toggle state

  // Toggle Theme Handler
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Update Firestore whenever transactions change
  async function updateTransactionHandler(updatedTransactions) {
    setTransactions(updatedTransactions);

    const userRef = doc(db, "users", uid);
    await setDoc(userRef, { expenses: updatedTransactions }, { merge: true });
  }

  // Remove transaction by ID
  function removeTransactionHandler(id) {
    const newTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    updateTransactionHandler(newTransactions);
  }

  // Logout Handler
  async function logoutHandler() {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout Failed:", error.message);
    }
  }

  // Toggle Transaction History Visibility
  const toggleHistory = () => {
    setShowHistory((prevState) => !prevState);
  };

  return (
    <div
      className={`App p-4 sm:p-5 min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-gray text-black"
      }`}
    >
      {/* Header */}
      <h2 className="text-center text-3xl sm:text-4xl font-bold mb-6">
        Budget Buddy
      </h2>

      {/* Responsive Flexbox Container */}
      <div className="flex flex-col sm:flex-row justify-center mt-24 gap-0 sm:gap-4">
        <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
          <TotalBalance
            transactions={transactions}
            onViewDetails={toggleHistory}
          />
        </div>
        <div className="w-full sm:w-1/2">
          <AddTransaction
            transactions={transactions}
            updateTransactionHandler={updateTransactionHandler}
          />
        </div>
      </div>

      {/* Transaction History */}
      {showHistory && (
        <div className="mt-4 sm:mt-6">
          <TransactionHistory
            transactions={transactions}
            removeTransactionHandler={removeTransactionHandler}
          />
        </div>
      )}

      {/* Logout Button */}
      <button
        onClick={logoutHandler}
        className="absolute top-5 right-5 bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg font-bold text-sm sm:text-base"
      >
        Logout
      </button>

      {/* Dark/Light Mode Toggle Button */}
      <button
        className="absolute top-5 right-32 bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-lg font-bold text-sm sm:text-base transition-colors duration-300"
        onClick={toggleTheme}
      >
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
}

export default Expense;
