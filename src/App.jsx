import Expense from './components/Expense';
import Login from './components/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/expense",
      element: <Expense />
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
}

export default App;
