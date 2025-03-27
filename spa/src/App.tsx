import { RouterProvider } from 'react-router-dom';
import { router } from './Router';

function App() {
  return (
    <div className='min-h-screen flex flex-col justify-between'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
