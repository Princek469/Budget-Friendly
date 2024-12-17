const About = () => {
    return (
      <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-lg transition-colors duration-300 hover:shadow-xl transform hover:scale-105">
        <h2 className="text-3xl font-bold mb-4 text-center text-blue-600">About Budget Buddy</h2>
        <p className="mb-4 text-gray-700 text-lg leading-relaxed">
          Budget Buddy is a user-friendly expense tracking application designed to help you manage your finances effectively. Whether you're looking to keep track of your daily expenses, monitor your spending habits, or save for a specific goal, Budget Buddy provides the tools you need to achieve your financial objectives.
        </p>
        <h3 className="text-2xl font-semibold mb-2 text-blue-500">Key Features:</h3>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li className="flex items-center">
            <span className="text-blue-600 mr-2">✔️</span>
            <span>Add Transactions: Easily log your expenses and income with a simple form.</span>
          </li>
          <li className="flex items-center">
            <span className="text-blue-600 mr-2">✔️</span>
            <span>View Transaction History: Keep track of all your transactions in one place, with the ability to remove any entry.</span>
          </li>
          <li className="flex items-center">
            <span className="text-blue-600 mr-2">✔️</span>
            <span>Total Balance Calculation: Get a quick overview of your total expenses, credits, and debits.</span>
          </li>
          <li className="flex items-center">
            <span className="text-blue-600 mr-2">✔️</span>
            <span>Dark Mode: Switch between light and dark themes for a comfortable viewing experience.</span>
          </li>
          <li className="flex items-center">
            <span className="text-blue-600 mr-2">✔️</span>
            <span>User Authentication: Securely sign up and log in to your account to access your personal financial data.</span>
          </li>
        </ul>
        <h3 className="text-2xl font-semibold mb-2 text-blue-500">How to Use Budget Buddy:</h3>
        <ol className="list-decimal list-inside mb-4 space-y-2">
          <li>Sign Up / Sign In: Create a new account or log in to your existing account.</li>
          <li>Add Transactions: Use the "Add New Transaction" form to input your expenses or income. Fill in the label, amount, and date, then click "Add Transaction" to save it.</li>
          <li>View Your Balance: Check your total balance, credits, and debits on the main dashboard.</li>
          <li>Review History: Click on "View Details" to see your transaction history and manage your entries.</li>
          <li>Logout: When you're done, you can log out to secure your account.</li>
        </ol>
        <h3 className="text-2xl font-semibold mb-2 text-blue-500">Get Started!</h3>
        <p className="text-gray-700 text-lg leading-relaxed">
          Start managing your finances today with Budget Buddy! It's simple, intuitive, and designed to help you take control of your spending. If you have any questions or feedback, feel free to reach out!
        </p>
      </div>
    );
  };
  
  export default About;