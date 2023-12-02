import React from 'react';
import './Home.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Chat from '../../components/Chat/Chat';

const Home = () => {
  return (
    <div className="home">
      <div className="home_container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
