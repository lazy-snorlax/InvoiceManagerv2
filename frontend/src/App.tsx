import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { UserProvider } from './context/useAuth'
import Sidebar from './components/Sidebar'
import { ToastContainer, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <UserProvider>
        <div className="drawer">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            <Navbar />
            <Outlet />
            <Sidebar />
            <ToastContainer 
              position="bottom-right"
              autoClose={4000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              transition={Bounce} />
          </div>
        </div>
      </UserProvider>
    </>
  )
}

export default App
