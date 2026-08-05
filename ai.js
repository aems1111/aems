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

text = text.toLowerCase();


let bestAnswer=null;
let bestScore=0;


knowledge.forEach(item=>{


let score =
similarity(text,item.question);



if(score > bestScore){

bestScore=score;
bestAnswer=item.answer;

}


});



if(bestScore >= 0.3){

return bestAnswer;

}


return "هنوز جواب این سؤال را یاد نگرفته‌ام.";

}





function similarity(a,b){

let wordsA =
a.split(" ");

let wordsB =
b.split(" ");


let same=0;


wordsA.forEach(word=>{

if(wordsB.includes(word)){
same++;
}

});


return same / Math.max(wordsA.length, wordsB.length);

}
