let knowledge=[];


fetch("knowledge.json")
.then(r=>r.json())
.then(data=>{
knowledge=data;
});


function sendMessage(){

let input=document.getElementById("message");
let text=input.value;

let box=document.getElementById("chatBox");


box.innerHTML += 
"<p>👤 شما: "+text+"</p>";


let answer=findAnswer(text);


box.innerHTML += 
"<p>🤖 MyAI: "+answer+"</p>";


input.value="";

}



function findAnswer(text){

text=text.toLowerCase();


let best=null;
let score=0;


knowledge.forEach(item=>{

let current=0;


item.keywords.forEach(word=>{

if(text.includes(word))
current++;

});


if(current>score){

score=current;
best=item.answer;

}


});


if(best)
return best;


return "هنوز جواب این سؤال را یاد نگرفته‌ام.";

}
