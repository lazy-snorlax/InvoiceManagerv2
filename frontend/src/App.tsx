import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { UserProvider } from './context/useAuth'
import Sidebar from './components/Sidebar'

function App() {
  return (
    <>
      <UserProvider>
        <div className="drawer">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            <Navbar />
            <Outlet />
            <Sidebar/>
          </div>
        </div>
      </UserProvider>
    </>
  )
}

export default App
