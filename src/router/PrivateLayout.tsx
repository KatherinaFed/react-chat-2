import { Navigate, useOutlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const PrivateLayout = () => {
  const { currentUser }  =  useContext(AuthContext);
  const outlet = useOutlet(); // children routes

  if (!currentUser) {
    return <Navigate to="/login" replace={true} />;
  }
  return <div>{outlet}</div>;
};

export default PrivateLayout;