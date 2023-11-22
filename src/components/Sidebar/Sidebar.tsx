import React from 'react';
import './Sidebar.scss'
import Navbar from '../Navbar/Navbar';
import Searchbar from '../Searchbar/Searchbar';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Navbar />
      <Searchbar />
    </div>
  );
};

export default Sidebar;