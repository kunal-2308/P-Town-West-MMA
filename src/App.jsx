import './App.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './components/pages/Home/Home'
import KickBoxing from './components/pages/KickBoxing/KickBoxing'
import Jitsu from './components/pages/Jitsu/Jitsu'
import Kids from './components/pages/Kids/Kids'
import About from './components/pages/About/About'
import Nutrition from './components/pages/Nutrition/Nutrition'
import Contact from './components/pages/Contact/Contact'
import Strength from './components/pages/Strength/Strength'
import Trainer from './components/pages/Trainers/Trainer'


function App() {
  const createRouter = createBrowserRouter([
    {
      path:'/',
      element : <Home/>
    },
    {
      path:'/kickboxing',
      element:<KickBoxing/>
    },
    {
      path:'/jitsu',
      element:<Jitsu/>
    },
    {
      path:'/kids',
      element:<Kids/>
    },
    {
      path:'/about',
      element:<About/>
    },
    {
      path:'/nutrition',
      element:<Nutrition/>
    },
    {
      path:'/contact',
      element:<Contact/>
    },
    {
      path:'/strength',
      element:<Strength/>
    },
    {
      path:'/trainer',
      element:<Trainer/>
    }
  ])
  return (
    <>
      <RouterProvider router={createRouter}></RouterProvider>  
    </>
  )
}

export default App
