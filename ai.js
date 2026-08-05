let knowledge =
JSON.parse(localStorage.getItem("knowledge")) || [];


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

let point=0;


item.keywords.forEach(word=>{

if(text.includes(word.toLowerCase())){
point++;
}

});


if(point>score){

score=point;
best=item.answer;

}

});


if(best){
return best;
}


return "هنوز این موضوع را یاد نگرفته‌ام.";

}
