let knowledge =
JSON.parse(localStorage.getItem("knowledge")) || [];


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




// مغز اصلی

function think(text){


let clean =
normalize(text);



let intent =
detectIntent(clean);





// ------------------
// معرفی اسم
// ------------------


if(intent==="set_name"){


let name =
extractName(clean);


if(name){


userMemory.name=name;

saveMemory();


return "خوشحالم که آشنا شدم "+name+" 😊";

}


}





// ------------------
// پرسیدن اسم
// ------------------


if(intent==="ask_name"){


if(userMemory.name){

return "اسم شما "+userMemory.name+" است 😊";

}


return "هنوز اسم شما را نمی‌دانم.";

}





// ------------------
// جستجوی دانش
// ------------------


let result =
searchKnowledge(clean);



if(result){

return result;

}



return "این موضوع را هنوز یاد نگرفته‌ام.";

}





// تشخیص منظور

function detectIntent(text){



// سؤال درباره اسم

if(
text.includes("اسم من چیست") ||
text.includes("اسمم چیست") ||
text.includes("نام من چیست") ||
text.includes("من کی هستم")
){

return "ask_name";

}




// معرفی اسم

if(
text.includes("اسم من") ||
text.includes("نام من") ||
text.includes("من هستم") ||
text.includes("منم")
){

return "set_name";

}



return "unknown";

}





function extractName(text){


let name=text;


name=name.replace("اسم من","");

name=name.replace("نام من","");

name=name.replace("است","");

name=name.replace("هست","");

name=name.replace("هستم","");

name=name.replace("من","");

name=name.trim();



return name;

}





function searchKnowledge(text){


let best=null;

let score=0;



knowledge.forEach(item=>{


let s =
similarity(
text,
normalize(item.question)
);



if(s>score){

score=s;

best=item.answer;

}


});



if(score>=0.4){

return best;

}



return null;

}





function similarity(a,b){


let A=a.split(" ");

let B=b.split(" ");


let count=0;


A.forEach(word=>{


if(
word.length>1 &&
B.includes(word)
){

count++;

}


});



return count /
Math.max(
A.length,
B.length
);


}





function normalize(text){


return text
.toLowerCase()
.replace(/[؟?!.,]/g,"")
.trim();

}
