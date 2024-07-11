import React,{useContext} from 'react'
import { useParams } from 'react-router'
import { AuthContext } from '../context/AuthContextWrapper'
import service from '../service/api'
import { faUserPlus, faUserMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function FollowerButton() {
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
    console.log(user)
  return (
    <div>
        {}
        <button onClick={followUser}>Follow</button>
        <button onClick={unfollowUser}>Unfollow</button>
    
    </div>
  )
}

export default FollowerButton