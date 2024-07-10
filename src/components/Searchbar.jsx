import React,{useContext, useEffect, useState} from 'react'
import service from '../service/api'
import { AuthContext } from '../context/AuthContextWrapper'
function Searchbar() {
    const {user}= useContext(AuthContext)
    const [searchUser,setSearchUser]= useState(null)
    const [inputSearchUser,setInputSearchUser]= useState(searchUser)

    const handleSearchUser=(e)=> setSearchUser(e.target.value)
    useEffect(()=>{
        const handler=setTimeout(()=>{
            setInputSearchUser(searchUser)
        },500)
        return ()=>{
            clearTimeout(handler)
        }
    },[searchUser])
    const getUSers = ()=>{
        service.get("/user/search")
        .then((response)=>{
            setSearchUser(response.data)
            console.log(response)
        }).catch((error)=>console.log(error))
    }
    useEffect(()=>{
        getUSers()
    },[inputSearchUser])
  return (
    <>
    <form>
        <input type="text" name='serach' id='search' value={searchUser} onChange={handleSearchUser} />
    </form>

    </>
  )
}

export default Searchbar