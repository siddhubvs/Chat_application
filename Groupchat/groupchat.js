
let listofgrps = document.querySelector(".listofgrps");
let searchinp=document.querySelector('#searchinp');
let addtogroup=document.querySelector('#addtogroup');
let personemail=document.querySelector('#personemail');
let adminvalue=document.querySelector('#adminvalue');
let groupmessages=document.querySelector('.groupmessages');
let sendmessage=document.querySelector('.sendmsg');
let inptxt=document.querySelector('#inptext');
let groupparticipants=document.querySelector('.grpparticipants');
let pangrpname = document.querySelector("#grpname");
let signout = document.querySelector("#signoutgrp");
const token=localStorage.getItem('token');
/*let nam = "";
axios
  .get("http://localhost:4000/user", {
    headers: { authorization: token },
  })
  .then((result) => {
    console.log(result);
    nam += result.data[0].name;
    console.log(nam);
  })
  .catch((err) => {
    console.log(err);
  });
*/


async function grps() {
  try{
    
    const response=await axios.get("http://localhost:4000/group/getGroups",{headers:{"Authorisation":token}})
    let gt='';
    if(response.data.GroupDetails.length==0){
      listofgrps.innerHTML='you are not part of any group! ';
    }
    else{
    for(let i=0;i<response.data.GroupDetails.length;i++){
    gt+=`
        <div style="border-bottom:1px solid white; padding:6px;">
        <a style="color:blue; text-decoration:none;" href="../Groupchat/groupchat.html?g=${response.data.GroupDetails[i].groupId}">${response.data.GroupDetails[i].groupname}</a>
        </div>
    `;
    }  
    listofgrps.innerHTML=gt;   
    }   
        
    }
    catch(err){
        console.log(err);
    }
}

grps();




addtogroup.addEventListener('click',()=>{

 let id= location.href.split("g=")[1];

 let obj={
  mail:personemail.value,
  admin:adminvalue.value
 }

 axios.post(`http://localhost:4000/group/addMember/${id}`, obj,
  {headers:{"Authorisation":token}
 }).then(result=>{

  alert(result.data);
  personemail.value="";
  location.reload();
 })
 .catch(err=>{
  console.log(err);
 })
  
});

sendmessage.addEventListener('click',async ()=>{
  try{
  let id = location.href.split("g=")[1];
  let inptxtvalue=inptxt.value;
  let obj={msg:inptxtvalue}

const response=await axios.post(`http://localhost:4000/group/postMessage/${id}`,obj,{headers:{"Authorisation":token}})
if(response.status===201){
console.log(response.data);
inptxt.value="";
}
  }
catch(err){
  console.log(err);
}
})


setInterval(async () => {
  try{
   let id = location.href.split("g=")[1];

await axios.get(`http://localhost:4000/group/getMessages/${id}`,{headers:{"Authorisation":token}})
.then(result=>{
    let klu="";
    for(let i=0;i<result.data.length;i++){
 
  klu += `
            <div class="p-2 indimsg " style="background:black;border-bottom:1px dotted snow; color:snow; border-radius:3px; ">
            <span>${result.data[i].username}:
        </span>
            <span>${result.data[i].message}</span>
            </div>
            `;
} 
      

    groupmessages.innerHTML=klu;
})
  }catch(err){
    console.log(err);
  }
}, 700);


document.addEventListener('DOMContentLoaded',()=>{
   let id = location.href.split("g=")[1];


  axios.get(`http://localhost:4000/group/getMembers/${id}`, {headers:{"Authorisation":token}})
  .then(result=>{
    let listpar="";
    console.log(result.data[0].name);

    for(let i=0;i<result.data.length;i++){

      
     let nameusershort=result.data[i].name.split(" ")[0];
      if(result.data[i].admin==true){
listpar += `
    <div style="border-bottom:1px solid black; padding:6px; display:flex;">
    <h6 style="color:blue; text-decoration:none;">${nameusershort}</h6>
   <h6 style="color:green; margin-left:17px;">group admin</h6>
    </div>
`;

      }
      else{
        listpar += `
    <div style="border-bottom:1px solid black; padding:6px; display:flex;">
    <h6 style="color:blue; text-decoration:none;">${nameusershort}</h6>
    <button style="border:none;background-color:green;color:white;padding:4px; border-radius:5px; margin-left:10px;" class=" makeadmin" id="${result.data[i].userId}">make admin</button>
    <button style="border:none;background-color:red;color:white; padding:3px; border-radius:5px; margin-left:8px;" class="rempeople" id="${result.data[i].userId}">remove</button>

    </div>
`;
      }
    }

    groupparticipants.innerHTML=listpar;
    })
  .catch(err=>{
    console.log(err);
  })
});


function grpdat(){
     let id = location.href.split("g=")[1];

  axios.get(`http://localhost:4000/group/getGroupName/${id}`,{headers:{"Authorisation":token}})
  .then(result=>{
   pangrpname.innerHTML= result.data.name;

  })
  .catch(err=>{
    console.log(err);
  })
}
grpdat();


groupparticipants.addEventListener('click',(e)=>{
     let id = location.href.split("g=")[1];


  if(e.target.classList.contains('makeadmin')){

    let idd=e.target.id;
    let obj={
      userid:idd
    }

    axios.post(`http://localhost:4000/group/makeAdmin/${id}`,obj,{headers:{"Authorisation":token}})
    .then(result=>{
alert(result.data);
location.reload();
    })
    .catch(err=>{
      console.log(err);
    })
  }


    if (e.target.classList.contains("rempeople")) {
      let iddd = e.target.id;
      let obj = {
        userid: iddd,
      };

      axios.post(`http://localhost:4000/group/removeMember/${id}`,obj,{headers:{"Authorisation":token}})
        .then((result) => {
          alert(result.data);
          location.reload();
        })
        .catch((err) => {
          console.log(err.data);
        });
    }
  })




