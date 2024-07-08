import React,{useState, useContext} from 'react'
import { TextField,Button } from '@mui/material';
import service from '../service/api';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextWrapper';
function LoginPage() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const { storeToken, authenticateUser,storeUserId} = useContext(AuthContext)
	

    function handleChange(event) {
        const value = event.target.value;
        const key = event.target.name; // Change from id to name
        setFormData({ ...formData, [key]: value });
    }

    async function handleSubmit(event){
        event.preventDefault()
        try {
            const response=await service.post("/login",formData)
            console.log(response);

            if (response.status === 200) {
                storeToken(response.data.accesstoken);
                storeUserId(response.data.userId);
                await authenticateUser()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const {username,password}=formData
  return (
    <>
        <React.Fragment>
                <h2>Log In</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        type="text"
                        variant="outlined"
                        label="Username"
                        name="username"
                        onChange={handleChange}
                        value={username}
                        fullWidth
                        required
                    />
                    <TextField
                        type="password"
                        variant="outlined"
                        label="Password"
                        name="password"
                        onChange={handleChange}
                        value={password}
                        required
                        fullWidth
                        sx={{ mb: 4 }}
                    />
                    <Button variant="outlined" color="secondary" type="submit">Log In</Button>
                </form>
                <small>Did have an account? <Link to="/signup">Register Here</Link></small>
            </React.Fragment>


    </>
  )
}

export default LoginPage