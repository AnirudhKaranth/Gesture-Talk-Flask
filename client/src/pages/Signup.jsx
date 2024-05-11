import React, { useState } from 'react'

const Signup = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //function to send signup request
    const register = async (registerData) => {
        try {
          const response = await fetch("/login", registerData);
    
          const { userId, email, userName, token } = response.data;
    
          const user = {
            userId,
            email,
            name: userName,
          };
    
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", token);
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      };

    const handleSubmit = (e) => {
        e.preventDefault()

        if(register({name, email, password})){
          redirect("/home")
        }else{
          alert("register failed")
        }
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>Sign Up</div>
        <input type="text" name="name" placeholder="name" value={name} onChange={(e)=> setName(e.target.value)}/>
        <input type="email" name="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" name="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Signup