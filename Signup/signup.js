async function signup(e){
    try{
    e.preventDefault();

    const signupDetails={
        name:e.target.name.value,
        email:e.target.email.value,
        phone:e.target.phone.value,
        password:e.target.password.value
    }

    console.log(signupDetails);

    const response=await axios.post("http://localhost:4000/user/signup",signupDetails);

    if(response.status===201){
       document.body.innerHTML+=`<br><div style="color:red;text-align:center;">${response.data.message}</div`
    }
    
    }
    catch(err){
        document.body.innerHTML+=`<br><div style="color:red;text-align:center;">${err.message}</div`;
    }

}