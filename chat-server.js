const express = require('express');
const server = express();
const port = 1800;
const cors = require('cors');
server.use(cors());
server.use(express.json());
myIp = '192.168.224.199'
let pTime = '' ;
let pDate = '';

function getTime(){
    var now=new Date();
    var hours= now.getHours();
    var minutes=now.getMinutes();
    var seconds=now.getSeconds();
    var day=now.getDate();
    var month=now.getMonth()+1;
    var year=now.getFullYear();
    
    hours= hours < 10 ? '0' + hours:hours;
    minutes= minutes < 10 ? '0'+ minutes:minutes;
    // seconds=seconds < 10 ? '0' + seconds:seconds;
    month= month < 10 ? '0' + month:month;
    day= day < 10 ? '0' + day:day;
    
    pTime=hours + ':' + minutes;
    pDate= day + "/" + month + "/" + year;
   }

let allmessages = '';

server.get("/messages",(req,res)=>{
    try{
        
        res.status(200).send(allmessages);
    }
    catch(e){
        res.status(404).send('not found');
    }
    console.log(req.method);
    console.log(req.hostname);
})
const mes = "mes";
server.post("/messages",(req,res)=>{
    pSender = req.body.sender;
    pContent = req.body.content;
    try{
        getTime();
        let message = `<div class=${pSender}><p class="sender">${pSender}</p><pre>${pContent}</pre><p class ="time-date">${pTime},${pDate}</p></div>`;
        allmessages+=message;
        res.status(200).send(message);
    }
    catch(e){
        res.status(404).send('failed to send message!'+','+e);
    }
    console.log(req.method);
    console.log(req.hostname);

})
server.listen(port,myIp,()=>{
    console.log(`listening on port ${port}`);
})