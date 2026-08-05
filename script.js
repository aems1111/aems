const memory = {};

function answer(text){

text = text.toLowerCase();

if(text.includes("سلام"))
return "سلام 😊";

if(text.includes("اسمت چیه"))
return "اسم من MyAI است.";

if(text.includes("خوبی"))
return "بله ممنون 😊";

if(text.includes("زمان"))
return new Date().toLocaleTimeString();

if(memory[text])
return memory[text];

return "جواب این را نمی‌دانم.";
}

function send(){

let input=document.getElementById("input");

let msg=input.value;

let box=document.getElementById("messages");

box.innerHTML+="<p><b>شما:</b> "+msg+"</p>";

let res=answer(msg);

box.innerHTML+="<p><b>MyAI:</b> "+res+"</p>";

input.value="";
}
