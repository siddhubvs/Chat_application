async function signup(e){
    try{
    e.preventDefault();

    const signupDetails={
        name:e.target.name.value,
        email:e.target.email.value,
        phone:e.target.phone.value,
        password:e.target.password.value
    }

    

    const response=await axios.post("http://localhost:4000/user/signup",signupDetails);

    if(response.status===201){
       alert('Successfuly signed up')
       window.location.href="../Login/login.html"
    }
    else if(response.status===200){
        alert('User already exists, Please Login');
        window.location.href="../Login/login.html"
    }
}
    catch(err){
        document.body.innerHTML+=`<br><div style="color:red;text-align:center;">${err}</div`;
        
    }

}