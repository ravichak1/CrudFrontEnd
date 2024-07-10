import React,{useContext, useState} from 'react'
import service from '../service/api'
import { useNavigate } from 'react-router'
import { AuthContext } from '../context/AuthContextWrapper'
function CreateActivity() {
    const{user, fetchActivities}=useContext(AuthContext)
    const [formData,setFormData]=useState({
        type:"",
        duration:0,
        distance:0,
        sets:0,
        reps:0,
        calories:0,
    })
    const data=user.user

    const navigate=useNavigate()

    function handleChange(event){
        const value = event.target.value;
        const key = event.target.id; // Change from id to name
        setFormData({ ...formData, [key]: value });
    }
    
    async function handleSubmit(event){
        event.preventDefault()
        try {
            console.log("hello")
            const response=await service.post(`/${user.user.username}/create`,formData)
            console.log(response)
            if(response.status===200){
                setTimeout(()=>{
                    navigate("/")
                    fetchActivities()
                },100)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const {
        type,duration,distance,sets,reps,calories
    }=formData
  return (
    <div>
        <h1>Create Activity</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="type">Title:</label>
                <input type="text" name="type" id="type" value={type} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="duration">Duration(mins):</label>
                <input type="number" name="duration" id="duration" value={duration} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="distance">Distance(km):</label>
                <input type="number" name="distance" id="distance" value={distance} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="sets">Sets:</label>
                <input type="number" name="sets" id="sets" value={sets} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="reps">Reps:</label>
                <input type="number" name="reps" id="reps" value={reps} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="calories">Calories:</label>
                <input type="number" name="calories" id="calories" value={calories} onChange={handleChange}/>
            </div>

            <button type='submit'>Create</button>
        </form>
    </div>
  )
}

export default CreateActivity