import React, {useState, useEffect} from 'react'
import { NavLink, useNavigate} from 'react-router-dom'

const Home = () => {
    var data;
    const [userdata, setdata]= useState({});
    const callinfo = async()=>{
        try{
            console.log('welcome2');
            const res= await fetch('https://kushagra101.herokuapp.com/home1',{
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type":"application/json"
                },
                credentials: "include"
            });
            data= await res.json();
            if(data=='-2'|| res.status!=200)
            {
                window.alert('You must be logged in first');
                history('/');
            }
            else{
                console.log(data);
                setdata(data);
            }
        }
        catch(err){
            console.log(err);
        }
    }
    
    const history= useNavigate();
    const [user, setuser] = useState({
        username:"", email:"", mobile:"", address:""});

    let name, value;
    const handleinput= (e) =>{
        name= e.target.name;
        value= e.target.value;
        setuser({...user, [name]:value});
    }

    const postdata= async(e) =>{
        e.preventDefault();
        const {username, email, mobile, address}  = user;
        if(email===""||username===""||mobile===""||address==="")
        {
            window.alert("Data is empty");
        }
        else{
            const res= await fetch("https://kushagra101.herokuapp.com/register", {
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username:username,
                    email:email,
                    mobile:mobile,
                    address:address,
                    check:"OK"
                })
            });
            const data1= await res.json();
            console.log("data "+data1);
            if(data1.status===422 || !data1 || data1.status===500 || data1=="-2")
            {
                window.alert("Invalid Credentials");
            }
            else{
                window.alert("User added successfully");
                window.location.reload();
            }
        }
    }

    const decline = async(name)=>{
        
        try{
            console.log("Hello");
            const res= await fetch(`https://kushagra101.herokuapp.com/decline1/${name._id}`,{
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type":"application/json"
                },
                credentials: "include"
            });
            const data1= await res.json();
            console.log(data1);
            window.location.reload();
            
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        callinfo();
    },[]);

    const users= userdata;
    var conn=new Array();
    for(const u in users)
    {
        conn.push(users[u]);
    }
    console.log("users are");
    for(let i=conn.length-1;i>=0;i--)
    {
        console.log(conn[i]);
    }

    return (
        <div >
            <div className='container-fluid' id='regcont'>
        <div className='row'>
        <div className="col-md-6">
        <div style={{marginLeft: 'auto', marginRight: 'auto', justifyContent: 'center' ,marginTop: '10%', width:'80%', backgroundColor:'#D5EA60', padding: '10px', borderRadius: '10px', border: '5px solid black'}}>
        <h1 style={{textAlign: 'center'}}>Register</h1>
        <form method="POST" class="validated-form" noValidate className='f1' style={{marginLeft: 'auto', marginRight: 'auto'}}>
        <div className="form-group">
        <label for="username" className="form-label">Username</label>
            <input type="text" id="username" className="form-control" name="username" value={user.username} onChange={handleinput} required/>
        </div>
    <div className="form-group">
        <label for="email" className="form-label">E-mail    </label>
            <input type="email" id="email" className="form-control" name="email" value={user.email} onChange={handleinput} required/>
    </div>
    <div className="form-group">
        <label for="mobile" className="form-label">Mobile  </label>
            <input type="tel" pattern="[7-9]{1}[0-9]{9}" id="moblie" className="form-control" name="mobile" value={user.mobile} onChange={handleinput} required/>
    </div>
    <div className="form-group">
        <label for="address" className="form-label">Address</label>
            <input type="text" id="address" className="form-control" name="address" value={user.address} onChange={handleinput} required/>
    </div>
    <div className="form-group form-button">
        <button type="submit" name="submit"  className="btn btn-dark" id="regbt" value="Register" onClick={postdata}>Register</button>
    </div>
    </form>
        </div></div>
        <div className="col-md-6">
        <div style={{marginTop: '10%'}}>
        <h1 style={{textAlign: 'center'}}>Users</h1>
        <table>
        <tr>
    <th style={{border: '2px solid black'}}>Username</th>
    <th style={{border: '2px solid black'}}>E-mail</th>
    <th style={{border: '2px solid black'}}>Mobile</th>
    <th style={{border: '2px solid black'}}>Address</th>
    <th style={{border: '2px solid black'}}>Delete</th>
  </tr>
        
        {conn.map(name => (
            <tr style={{border: '2px solid black'}}>
        <td style={{border: '2px solid black'}}><p style={{display: 'inline'}}>{name.username}</p></td><td style={{border: '2px solid black'}}><p style={{display: 'inline'}}>{name.email}</p></td><td style={{border: '2px solid black'}}><p style={{display: 'inline'}}>{name.mobile}</p></td><td style={{border: '2px solid black'}}><p style={{display: 'inline'}}>{name.address}</p></td>
        <td style={{border: '2px solid black'}}><form method="DELETE">
            <input type="submit" name="submit" className="btn btn-danger" style={{color: 'black'}} value="Delete" onClick={()=>decline(name)}/>
            </form></td>
        </tr>
      ))}
      </table>
      </div>
    </div>
    </div>
    </div>
        </div>
    )
}

export default Home
