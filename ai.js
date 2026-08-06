let knowledge =
JSON.parse(localStorage.getItem("knowledge")) || [];



let defaultKnowledge = [];



fetch("knowledge.json")
.then(res => res.json())
.then(data => {

    defaultKnowledge = data;

});





let currentUser =
localStorage.getItem("currentUser");



if(!currentUser){

    alert("لطفاً وارد حساب شوید");

    window.location="login.html";

}






let allMemory =
JSON.parse(localStorage.getItem("userMemory")) || {};



if(!allMemory[currentUser]){

    allMemory[currentUser]={};

}



let userMemory =
allMemory[currentUser];





function saveMemory(){


    allMemory[currentUser]=userMemory;


    localStorage.setItem(
        "userMemory",
        JSON.stringify(allMemory)
    );

}







function sendMessage(){


let input =
document.getElementById("message");



let text =
input.value.trim();



if(text==="") return;



let box =
document.getElementById("chatBox");



box.innerHTML +=
"<p>👤 شما: "+text+"</p>";



let answer =
think(text);



box.innerHTML +=
"<p>🤖 MyAI: "+answer+"</p>";



input.value="";



}







function think(text){


let clean =
normalize(text);



let intent =
detectIntent(clean);




if(intent==="ask_ai_name"){

return "من MyAI هستم 🤖";

}





if(intent==="ask_user_name"){


if(userMemory.name){

return "اسم شما "
+userMemory.name+
" است 😊";

}


return "هنوز اسم شما را نمی‌دانم.";

}





if(intent==="set_user_name"){


let name =
extractName(clean);



if(name){


userMemory.name=name;


saveMemory();


return "خوشحالم که آشنا شدم "
+name+
" 😊";


}


}





let answer =
searchKnowledge(clean);



if(answer){

return answer;

}




return "این موضوع را هنوز یاد نگرفته‌ام.";

}









function detectIntent(text){



if(

text.includes("اسم تو") ||
text.includes("نام تو") ||
text.includes("تو کی هستی")

){

return "ask_ai_name";

}




if(

text.includes("اسم من چیه") ||
text.includes("اسم من چیست") ||
text.includes("نام من چیست") ||
text.includes("اسمم چیه")

){

return "ask_user_name";

}





if(

(text.includes("اسم من") ||
text.includes("نام من"))

&&

(text.includes("هست") ||
text.includes("است"))

){

return "set_user_name";

}



return "unknown";


}









function extractName(text){


return text

.replace("اسم من","")

.replace("نام من","")

.replace("هست","")

.replace("است","")

.trim();


}









function searchKnowledge(text){


let allKnowledge=[

...defaultKnowledge,

...knowledge

];



let bestAnswer=null;


let bestScore=0;



allKnowledge.forEach(item=>{


let score=calculateScore(

text,

item

);



if(score > bestScore){


bestScore=score;


bestAnswer=item.answer;


}


});




if(bestScore >= 50){

return bestAnswer;

}



return null;


}









function calculateScore(userText,item){


let score=0;



let question =
normalize(item.question);



let keywords =
item.keywords || [];





// شباهت سؤال

score +=
similarity(userText,question) * 50;





// بررسی کلیدواژه‌ها


keywords.forEach(word=>{


if(userText.includes(
normalize(word)
)){

score +=10;

}


});




// کلمات مشترک سؤال


let words =
userText.split(" ");



words.forEach(word=>{


if(question.includes(word)){

score +=5;

}


});




return score;


}









function similarity(a,b){



let A =
a.split(" ");



let B =
b.split(" ");



let same=0;



A.forEach(word=>{


if(

word.length>1
&&
B.includes(word)

){

same++;

}


});



return same /
Math.max(
A.length,
B.length
);


}









function normalize(text){


let stopWords=[

"است",
"هست",
"چی",
"کجاست",
"کجا",
"را",
"یک",
"از",
"به",
"من"

];



return text

.toLowerCase()

.replace(/[؟?!.,]/g,"")

.split(" ")

.filter(word=> !stopWords.includes(word))

.join(" ")

.trim();


}
