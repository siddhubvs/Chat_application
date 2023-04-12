async function login(e){
    try{
    e.preventDefault();

    const loginDetails={
        email:e.target.email.value,
        password:e.target.password.value
    }

    const response=await axios.post("http://localhost:4000/user/login",loginDetails);

    if(response.status===200){
    alert(response.data.message);
    window.location.href='../Chat/chat.html';
    localStorage.setItem('token',response.data.token);
    }
    }
    catch(err){
    document.body.innerHTML+=`<br><div style="color:red;text-align:center;">${err}</div`;
    }

}