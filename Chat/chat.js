async function chat(e){
    try{
    e.preventDefault();

    const message={
        message:e.target.message.value,
    }
    const token=localStorage.getItem('token');
    const response=await axios.post("http://localhost:4000/chat/postMessage",message,{headers:{"Authorisation":token}});

    if(response.status===201){
    alert('Message sent successfully');
    }
    }
    catch(err){
    document.body.innerHTML+=`<br><div style="color:red;text-align:center;">${err}</div`;
    }

}