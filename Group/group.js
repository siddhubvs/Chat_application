async function creategroup(event){
    event.preventDefault();
    const token=localStorage.getItem('token');
    try{
    let obj={
        name:event.target.groupname.value
    }
    await axios.post("http://localhost:4000/group/creategroup",obj,{headers:{"Authorisation":token}})
    alert('New group is created');
    
    document.getElementById('groupname').value='';
    showGroups();
    }catch(err){
        console.log(err);
    }
}

var listofgroups=document.getElementById('listofgroups')
async function showGroups(){
try{
const token=localStorage.getItem('token');
const response=await axios.get("http://localhost:4000/group/getGroups",{headers:{"Authorisation":token}})
let gt='';
if(response.data.GroupDetails.length==0){
listofgroups.innerHTML='you are not part of any group! ';
}
else{
for(let i=0;i<response.data.GroupDetails.length;i++){
gt+=`
    <div style="border-bottom:1px solid white; padding:6px;">
    <a style="color:blue; text-decoration:none;" href="../Groupchat/groupchat.html?g=${response.data.GroupDetails[i].groupId}">${response.data.GroupDetails[i].groupname}</a>
    </div>
`;
}  
listofgroups.innerHTML=gt;   
}   
    
}
catch(err){
    console.log(err);
}
}
showGroups();
