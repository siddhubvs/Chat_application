async function chat(event){
    event.preventDefault();
    console.log('submitted')
    const message={
        message:event.target.message.value,
    }
    const token=localStorage.getItem('token');
    const response=await axios.post("http://localhost:4000/chat/postMessage",message,{headers:{"Authorisation":token}});

    if(response.status===201){
        showChat(response.data.NewChatDetail);
    }
    
    
}


var messages=document.getElementById('messages');
window.addEventListener('DOMContentLoaded',async()=>{
    try{
    const token=localStorage.getItem('token');
    const response=await axios.get(`http://localhost:4000/chat/getMessage`,{headers:{"Authorisation":token}});
    for(var i=0;i<response.data.AllChats.length;i++){
        showChat(response.data.AllChats[i]);
    }
    }catch(err){
        console.log(err);
    }
})

function showChat(obj){
    var li=document.createElement('p');
    li.style.fontSize='20px';
   
    li.textContent=obj.userId+' : ' + obj.message;
    
    var p=document.getElementById('siddhu')
    messages.insertBefore(li,p);
}