import './Navbar.scss';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import DefaultAvatar from '../../assets/defaultAvatar.png'

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <span className="navbar_logo">Wonder Chat ✨</span>
      <div className="navbar_user">
        <img src={currentUser?.photoURL as string || DefaultAvatar} alt="user avatar" />
        <span>{currentUser?.displayName as string}</span>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
