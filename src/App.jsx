import './App.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './components/pages/Home/Home'
function App() {
  const createRouter = createBrowserRouter([
    {
      path:'/',
      element : <Home/>
    }
  ])
  return (
    <>
      <RouterProvider router={createRouter}></RouterProvider>  
    </>
  )
}

export default App
