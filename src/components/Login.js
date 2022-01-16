import React, {useState, useContext} from 'react'
import { NavLink, useNavigate} from 'react-router-dom'
const Login = () => {
    const history= useNavigate();
    const [user, setuser] = useState({
        email:"",  password:""});

    let name, value;
    const handleinput= (e) =>{
        name= e.target.name;
        value= e.target.value;
        setuser({...user, [name]:value});
    }
    const postdata= async(e) =>{
        e.preventDefault();
        const {email, password}  = user;
        if(email===""||password==="")
        {
            window.alert("Data is empty");
        }
        else{
            const res= await fetch("https://kushagra101.herokuapp.com/login1", {
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email:email,
                    password:password,
                    check:"OK"
                }),
                credentials: "include"
            });
            const data= res.json();
            console.log("data is "+data);
            if(res.status===400 || !data)
            {
                window.alert("Invalid Credentials");
            }
            else{
                window.alert("Login Successful");
                history("/home");
            }
        }
    }
    return (
        <div>
        <div className='container' style={{textAligin: 'center' ,width: 'max(45%, 300px)', marginTop: '10%', backgroundColor: '#9BF5E2', border:'5px solid black', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', paddingBottom: '30px', paddingTop: '20px', borderRadius: '10px'}}>
            <h1 style={{textAlign: 'center'}}>Login</h1>
            <form method="POST" className="validated-form" noValidate>
        <div classNmae="mb-3">
            <label for="email" class="form-label">Email</label>
                <input type="text" id="email" className="form-control" name="email" value={user.email} onChange={handleinput} required/>
        </div>
        <div className="mb-3">
            <label for="password" class="form-label">Password</label>
                <input type="password" id="password" className="form-control" name="password" value={user.password} onChange={handleinput} required/>
        </div>
        <div className="form-group form-button" style={{textAlign: 'center'}}>
        <input type="submit" name="submit" className="btn btn-dark" value="Login" onClick={postdata}/>
    </div>
    </form>
    </div>
        </div>
    )
}

export default Login
