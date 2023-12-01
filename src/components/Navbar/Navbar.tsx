import React from 'react'
import './Navbar.scss'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'

const Navbar = () => {
  return (
    <div className='navbar'>
      <span className="navbar_logo">Wonder Chat ✨</span>
      <div className="navbar_user">
        <img src="https://m.media-amazon.com/images/S/pv-target-images/16627900db04b76fae3b64266ca161511422059cd24062fb5d900971003a0b70.jpg" alt="" />
        <span>Katja</span>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>

    </div>
  )
}

export default Navbar