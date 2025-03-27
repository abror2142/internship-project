import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import { useTheme } from './hooks/useTheme';

function App() {
  const { isDarkMode } = useTheme();
  return (
    <div className={`min-h-screen flex flex-col justify-between ${isDarkMode && 'dark'} dark:bg-gray-700`}>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
