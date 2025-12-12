
import { Outlet } from 'react-router-dom'
import AppAppBar from '../AppAppBar/AppAppBar'

const MainLayout = () => {
  return (
    <div>
        <AppAppBar/>
        <Outlet/>
    </div>
  )
}

export default MainLayout