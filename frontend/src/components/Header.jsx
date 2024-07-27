import React, { useState,useEffect } from 'react'
import {FaHouseUser,FaSignInAlt,FaSignOutAlt,FaUser,FaArrowDown,FaArrowUp  } from 'react-icons/fa'
import { Outlet, Link, useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import { logOut } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/apiSlice';
import { toast } from 'react-toastify';
import './Header.css'
import Bars from '../assets/bars.svg'
import Close from '../assets/close.svg'

const Header = () => {
  const user = useSelector(state => state.auth);
  const [showMobilemenu, setShowMobileMenu] = useState(false)
  const [showSubmenu, setShowSubMenu] = useState(false)
  const [logoutApiCall, {isLoading}] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const logOutHandler = async (e) => {
    e.preventDefault();
    try{
      await logoutApiCall().unwrap();
      dispatch(logOut());
      navigate('/')
      toast.success("Logout successful!")

    }catch(err){
      console.log(err)
    }
    
  }


  const subMenuToggle = (e) => {
    //console.log(e.target)
    let element = e.target.parentNode.closest('.has_child');
    let subMenu = element.querySelector('.submenu')
    subMenu.classList.toggle("visible");
    setShowSubMenu(!showSubmenu);
    //console.log(subMenu)
  }

  const hideSubmenu = () => {
    if(document.querySelector('.submenu') && document.querySelector('.submenu').classList.contains('visible')){
      document.querySelector('.submenu').classList.remove('visible')
      setShowSubMenu(false)
    }
  }



  const handleBodyClick = (e) => {
    let element = e.target.parentNode.closest('.has_child');
    if(!element){
      hideSubmenu()
    }

    let mainMenuElement = e.target.parentNode.closest('.header_right');
    if(!mainMenuElement){
      hideMobileMenu();
    }
  }
  
  useEffect(() => {
    document.body.addEventListener('click', handleBodyClick)
    // return () => {
    //   document.body.removeEventListener('click', handleBodyClick)
    // }
  })

  const hideMobileMenu = () => {
    setShowMobileMenu(false)
    document.querySelector('.main_menu').classList.remove('visible')
  }
  const displayMobileMenu = () => {
    setShowMobileMenu(true)
    document.querySelector('.main_menu').classList.add('visible')
  }

  const hideMobileMenuOnClick = (e) =>{
    let element = e.target.parentNode.closest('.has_child');
    let subElement = e.target.parentNode.closest('.submenu ');

    if(!element && showMobilemenu){
      hideMobileMenu();
    }
    if(subElement && showMobilemenu){
      hideMobileMenu();
    }
  }


  return (
    <>
      <div className="header bg-black text-white">
        <div className="flex justify-between items-center max-w-7xl w-full mx-auto px-4 relative">
          <div className="flex"><Link className="flex gap-1 items-center py-4" to="/"><b>MERN App</b></Link></div>
          <div className="flex items-center header_right">
            <ul onClick={hideMobileMenuOnClick} className="main_menu flex flex-col md:flex-row gap-0 md:gap-4 px-4 md:px-0">
              <li onClick={hideSubmenu}><Link className="flex gap-1 items-center py-4" to="/"><FaHouseUser />Home</Link></li>

              { user?.userInfo?.name ? (
                <>
                  <li className='flex items-center has_child relative'  >
                    <div className="menu_item_title cursor-pointer select-none flex gap-2 items-center h-full" onClick={subMenuToggle}><FaUser /> { user?.userInfo?.name} {showSubmenu ? <FaArrowUp /> : <FaArrowDown /> } </div>
                    <ul className={`submenu min-w-32 absolute right-0 w-full bg-black p-4 pt-0 `} >
                      <li onClick={hideSubmenu} className='flex items-center mb-1'><Link className='flex gap-2 items-center' to="/profile"><FaUser /> Profile</Link></li>
                      <li onClick={hideSubmenu}><Link onClick={logOutHandler} className="flex gap-2 items-center" to=""><FaSignInAlt />Logout</Link></li>
                    </ul>
                  </li>
                  
                </>
              ) : (
                <>
                  <li><Link className="flex gap-1 items-center py-4" to="/register"><FaSignOutAlt />Register</Link></li>
                  <li><Link className="flex gap-1 items-center py-4" to="/login"><FaSignInAlt />Login</Link></li>
                </>
              )}

              
              
              
            </ul>
            {showMobilemenu ? <img onClick={hideMobileMenu} className="menu_icon opened" src={Close} /> : <img onClick={displayMobileMenu} className="menu_icon closed" src={Bars} /> }
          </div>
        </div>
      </div>
    </>
  )
}

export default Header