import React from 'react'
import { IoIosLogOut } from "react-icons/io";
import UseLogoutHook from '../../hooks/UseLogoutHook.js';


const LogOutButton = () => {
  const { logout , loading } = UseLogoutHook()
  return (
    <div className='mt-10 text-white'>
      {!loading ? (
        <IoIosLogOut className='h-6 w-6 cursor-pointer' onClick={logout} />
      ) : (
        <span className='loading loading-spinner'></span>
      )}
    </div>
  )
}

export default LogOutButton
