import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from "react-router-dom";
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { AppSidebarNav } from './AppSidebarNav';
import  logoNegative  from "../assets/images/Asset 4soomy.png";
import { sygnet } from '../assets/brand/sygnet';
import { setSideBar,sidebarUnfoldable } from "../redux/dashboardSlice";
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const dashboard = useSelector((state) => state.dashboard)
  const {sidebarShow,unfoldable} = dashboard;

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        
        dispatch(setSideBar(visible))
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <Link to={'/'}><img className="sidebar-brand-full" src={logoNegative} height={35} /></Link>
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch(sidebarUnfoldable(!unfoldable))}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
