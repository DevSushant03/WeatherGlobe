import React from 'react'
import "./App.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import WeatherApp from './pages/WeatherApp'
import CityWeather from './pages/CityWeather'
import Map from './pages/Map'
import AppLayout from './components/AppLayout'
import { ErrorPage } from './pages/ErrorPage'

const App = () => {

  const router = createBrowserRouter([
    {
      path:"/",
      element:<AppLayout/>,
      errorElement:<ErrorPage/>,
      children:[
        {
          path:"/",
          element:<WeatherApp/>
        },
        {
          path:"/city",
          element:<CityWeather/>
        },
        {
          path:"/map",
          element:<Map/>
        }

      ]
    }
   
  ])
  return (

    <RouterProvider router={router}/>

  )
}

export default App