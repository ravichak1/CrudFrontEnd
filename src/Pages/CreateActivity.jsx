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
    <div className='flex flex-col justify-center items-center border-2 w-[max-content] mx-auto p-4 rounded-md'>
        <h1 className='p-4'>Create Activity</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div className='flex  gap-4'>
            <div className='flex flex-col gap-5'>
                <label htmlFor="type">Title:</label>
                <label htmlFor="duration">Duration(mins):</label>
                <label htmlFor="distance">Distance(km):</label>
                <label htmlFor="sets">Sets:</label>
                <label htmlFor="reps">Reps:</label>
                <label htmlFor="calories">Calories:</label>
            </div>
            <div className='flex flex-col gap-4'>
                <input type="text" name="type" id="type" value={type} onChange={handleChange} className='border-2'/>
                <input type="number" name="duration" id="duration" value={duration} onChange={handleChange} className='border-2'/>
                <input type="number" name="distance" id="distance" value={distance} onChange={handleChange} className='border-2'/>
                <input type="number" name="sets" id="sets" value={sets} onChange={handleChange} className='border-2'/>
                <input type="number" name="reps" id="reps" value={reps} onChange={handleChange} className='border-2'/>
                <input type="number" name="calories" id="calories" value={calories} onChange={handleChange} className='border-2'/>
            </div>
            </div>
          
            
            <button type='submit' className="bg-green-500 hover:bg-green-900 text-white p-2 rounded">Create</button>
        </form>
    </div>
  )
}

export default CreateActivity