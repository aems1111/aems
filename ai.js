let knowledge =
JSON.parse(localStorage.getItem("knowledge")) || [];


function sendMessage(){

let input=document.getElementById("message");
let text=input.value;

let box=document.getElementById("chatBox");


box.innerHTML += "<p>👤 شما: "+text+"</p>";


let result=findAnswer(text);


box.innerHTML += "<p>🤖 MyAI: "+result+"</p>";


input.value="";

}



function findAnswer(text){

text = text.toLowerCase();


let bestAnswer=null;
let bestScore=0;


knowledge.forEach(item=>{

let score = similarity(text,item.question);


if(score > bestScore){

bestScore=score;
bestAnswer=item.answer;

}

});


// فقط اگر حداقل ۴۰ درصد شباهت داشت جواب بده

if(bestScore >= 0.4){

return bestAnswer;

}


return "این موضوع را هنوز یاد نگرفته‌ام.";

}





function similarity(a,b){


let wordsA=a.split(" ");
let wordsB=b.split(" ");


let same=0;


wordsA.forEach(word=>{

if(word.length>1 && wordsB.includes(word)){
same++;
}

});


return same / Math.max(wordsA.length,wordsB.length);


}
