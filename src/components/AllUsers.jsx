import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContextWrapper';
import service from '../service/api';

function AllUsers() {
    const { user,activities } = useContext(AuthContext);
    const [activity, setActivity] = useState([]); // Initialize users as an empty array

    
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

    useEffect(() => {
        getAllUsers(); // Fetch all users only once when the component mounts
    }, []);
    console.log(activity)
    return (
        <div className='flex flex-col gap-4'>
            {activity.length > 0 ? (
                activity.map((e) => (
                    <div key={e._id} className='flex justify-center items-center w-[100%] border-2'>
                        <div>
                        <h1>{e.type}</h1>
                        <p>{e.calories}</p>
                        </div>
                        
                        <div>
                        <img src={e.image} alt="" />

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
