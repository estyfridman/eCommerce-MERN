import { Outlet } from "react-router-dom";
import Nav from '../components/uiitems/Nav';
import Myfooter from '../components/uiitems/Myfooter';

export default function Layout() {
  return (
    <div className="layout">
      <div className="content">
        <Nav />
        <Outlet />
      </div>
      <Myfooter />
    </div>
  );
}