import './App.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './components/pages/Home/Home'
import KickBoxing from './components/pages/KickBoxing/KickBoxing'
function App() {
  const createRouter = createBrowserRouter([
    {
      path:'/',
      element : <Home/>
    },
    {
      path:'/kickboxing',
      element:<KickBoxing/>
    }
  ])
  return (
    <>
      <RouterProvider router={createRouter}></RouterProvider>  
    </>
  )
}

export default App
