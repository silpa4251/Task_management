import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({childern}) => {
    const {isAuthenticated}= useSelector((state) => state.auth);

  return (
    isAuthenticated ? childern : <Navigate to="/" />
  )
}

export default PrivateRoute