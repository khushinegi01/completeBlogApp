import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import { Protector } from './component/AuthLayout.jsx'
import Signup from './pages/Signup.jsx'
import AllPost from './pages/AllPost.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: "/login",
        element: (
          <Protector authenticator={false}>
            <Login />
          </Protector>
        )
      },
      {
        path: "/signup",
        element: (
          <Protector authenticator={false}>
            <Signup />
          </Protector>
        )
      },
      {
        path: "/all-posts",
        element: (
          <Protector authenticator={false}>
            <AllPost/>
          </Protector>
        )
      },
      {
        path: "/add-post",
        element: (
          <Protector authentication>
            {" "}
            <AddPost />
          </Protector>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <Protector authentication>
            {" "}
            <EditPost />
          </Protector>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ]

  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
