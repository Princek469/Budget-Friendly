import About from './components/About';
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
    },
    {
      path: "/about",
      element: <About />
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
}

export default App;
