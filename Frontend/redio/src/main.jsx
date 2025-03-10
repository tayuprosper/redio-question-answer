import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.css'
import App from './App.jsx'
import Dashboard from './Dashboard.jsx'
import NotFound from './NotFound.jsx'
import LoginPage from './LoginPage.jsx'
import SignUp from './SignUp.jsx'
import AskQuestion from './AskQuestion.jsx'
import ProtectedRoute from './ProtectedRount.jsx'

const router = createBrowserRouter([
  {
    path: "/", element: <App/>
  },
  {
    path: "/dashboard", element:<ProtectedRoute children={<Dashboard/>}/>
  },
  {
    path: "/login", element: <LoginPage/>
  },
  {
    path: "/signup", element: <SignUp />
  },
  {
    path: "/askquestion", element:<ProtectedRoute children={<AskQuestion/>}/>
  },
  {
    path: "*", element: <NotFound/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
