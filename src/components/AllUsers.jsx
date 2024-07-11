import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContextWrapper';
import service from '../service/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes,faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
function AllUsers() {
    const { user,activities } = useContext(AuthContext);
    const [activity, setActivity] = useState([]); // Initialize users as an empty array
    const loginUser = user.user
    
    async function getAllUsers() {
        try {
            const response = await service.get('/users');
            console.log(response)
            const allActivities = response.data.activities;
        
            setActivity(allActivities);
        } catch (error) {
            console.log(error);
        }
    }
    
    async function handleDelete(id,userId) {
        if (loginUser._id === userId) {
            try {
                await service.delete(`${loginUser._id}/delete/${id}`);
                // Filter out the deleted activity from the state
                setActivity(prevActivities => prevActivities.filter(activity => activity._id !== id));
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log('You are not authorized to delete this activity');
        }
    }

    useEffect(() => {
        getAllUsers(); // Fetch all users only once when the component mounts
    }, []);
    
    

    return (
        <div className='flex flex-col gap-4'>
            {activity.length > 0 ? (
                activity.map((e) => (
                    <div key={e._id} className='relative font-extrabold flex justify-center items-center w-[100%] bg-no-repeat border-2 bg-cover bg-center h-[150px]' style={{backgroundImage: `url(${e.image})`}}>
                        <div>{loginUser._id===e.user._id?(<Link to={`/update/${e._id}`} className='absolute top-0 right-12'>
                            <FontAwesomeIcon icon={faPenSquare} size='2x' className='text-blue-600'/>
                        </Link>):(<></>)}
                        
                        <button onClick={()=>handleDelete(e._id,e.user._id)} className='absolute top-0 right-4'>
                            <FontAwesomeIcon icon={faTimes} size='2x' className='text-red-600'/>
                        </button>
                        </div>
                        
                        <div className='bg-white bg-opacity-10 w-[100%]'>
                        <h1>{e.type.toUpperCase()}</h1>
                        <p>Calories Burned: {e.calories}</p>
                        {e.duration>0? (<p>{e.duration} mins</p>):(<></>)}
                        {e.distance>0? (<p>{e.distance} kms</p>):(<></>)}
                        {e.sets>0? (<p>{e.sets} sets</p>):(<></>)}
                        {e.reps>0? (<p>{e.reps} reps</p>):(<></>)}
                        </div>
                        <div className='flex absolute bottom-0 right-6 items-center gap-4'>
                            
                                <h5>{e.user.name.toUpperCase()}</h5>
                                <img src={e.user.image} alt="" className='rounded-full h-[50px] w-[50px]'/>
                
                    
                        </div>
                    </div>
                ))
            ) : (
                <p>Loading users...</p>
            )}
        </div>
    );
}

export default AllUsers;
