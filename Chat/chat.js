async function chat(event){
    event.preventDefault();
    console.log('submitted')
    const message={
        message:event.target.message.value,
    }
    const token=localStorage.getItem('token');
    const response=await axios.post("http://localhost:4000/chat/postMessage",message,{headers:{"Authorisation":token}});
    document.getElementById('message').innerHTML=''
}



var messages=document.getElementById('messages');

var max=0;
window.addEventListener('DOMContentLoaded',getDetails);
async function getDetails(){
    try{
        const token=localStorage.getItem('token');
        const response=await axios.get(`http://localhost:4000/chat/getMessage`,{headers:{"Authorisation":token}});
        for(var i=0;i<response.data.AllChats.length;i++){
            showChat(response.data.AllChats[i]);
        }
        max=response.data.AllChats.length;
        }catch(err){
            console.log(err);
        }
}

setInterval(async ()=>{
    const token=localStorage.getItem('token');
    
    const response=await axios.get(`http://localhost:4000/chat/getMessage`,{headers:{"Authorisation":token}});
        if(response.data.AllChats.length>max){
            console.log(max);
        max=response.data.AllChats.length;

        showChat(response.data.AllChats[max-1]);
        }
    console.log(max);
},1000);

function showChat(obj){
    var li=document.createElement('p');
    li.style.fontSize='20px';
   
    li.textContent=obj.name+' : ' + obj.message;
    
    var p=document.getElementById('siddhu')
    messages.insertBefore(li,p);
}