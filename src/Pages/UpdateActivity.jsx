import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContextWrapper'

function UpdateActivity() {
    const {user,activity, authenticateUser}=useContext(AuthContext)
    const getUser=user.user
  return (
    <div>{getUser.name}</div>
  )
}

export default UpdateActivity