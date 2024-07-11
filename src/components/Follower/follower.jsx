import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContextWrapper'
import { useParams } from 'react-router'
import service from '../../service/api'
function follower() {
    const {user} = useContext(AuthContext)
    const {name} = useParams() 
    async function followUser(event){
        event.preventDefault()
        try {
            await service.post(`/follow/${name}`)
        } catch (error) {
            console.log(error)
        }
    }
    async function unfollowUser(event){
        event.preventDefault()
        try {
            await service.post(`/unfollow/${name}`)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <button onClick={followUser}>Follow</button>
        <button onClick={unfollowUser}>Unfollow</button>
    </div>
  )
}

export default follower