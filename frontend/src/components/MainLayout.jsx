import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return(
    <div>
      사이드바

      <div>
        <Outlet />
      </div>
    </div>
  )
}
