import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'

const SideBar = () => {
  return (
    <div>
    
    <SearchInput />
    <div className='divider px-3'></div>
    <Conversations />

    </div>
  )
}

export default SideBar
