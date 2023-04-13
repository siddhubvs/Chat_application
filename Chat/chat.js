async function chat(event){
    event.preventDefault();
    console.log('submitted')
    const message={
        message:event.target.message.value,
    }
    const token=localStorage.getItem('token');
    const response=await axios.post("http://localhost:4000/chat/postMessage",message,{headers:{"Authorisation":token}});
    document.getElementById('message').innerHTML=' '
}



var messages=document.getElementById('messages');

var max=0;
var lastmessage;
window.addEventListener('DOMContentLoaded',getDetails);
async function getDetails(){
    try{
        const token=localStorage.getItem('token');
        var arr=JSON.parse(localStorage.getItem('message'))||[];
        console.log(arr);
        console.log(arr.length);
        lastmessage=arr[arr.length-1];
        //else
        //lastmessage=undefined;
        console.log(lastmessage);
        const response=await axios.get(`http://localhost:4000/chat/getMessage?lastmessage=${lastmessage}`,{headers:{"Authorisation":token}});
        for(var i=0;i<response.data.AllChats.length;i++){
            arr.push(response.data.AllChats[i]);
            if(arr.length>10)
            arr.shift();
        }
        localStorage.setItem('message',JSON.stringify(arr));
        for(var i=0;i<arr.length;i++){
            showChat(arr[i]);
        }
        max=arr[arr.length-1].id;
        }catch(err){
            console.log(err);
        }
}

setInterval(async ()=>{
    const token=localStorage.getItem('token');
    
    const response=await axios.get(`http://localhost:4000/chat/getMessage?lastmessage=${max}`,{headers:{"Authorisation":token}});
        for(var i=0;i<=response.data.AllChats.length-1;i++){
        showChat(response.data.AllChats[i]);
        console.log(response.data.AllChats[i].id)
        }
        
    max=response.data.AllChats[response.data.AllChats.length-1].id;
    console.log(max);
},1000);

function showChat(obj){
    var li=document.createElement('p');
    li.style.fontSize='20px';
    
    li.textContent=obj.id+" "+obj.name+' : ' + obj.message;
    
    var p=document.getElementById('siddhu')
    messages.insertBefore(li,p);
}