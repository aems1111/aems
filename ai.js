let knowledge =
JSON.parse(localStorage.getItem("knowledge")) || [];


let currentUser =
localStorage.getItem("currentUser");



if(!currentUser){

alert("لطفاً اول وارد حساب شوید");

window.location="login.html";

}




let allMemory =
JSON.parse(localStorage.getItem("userMemory")) || {};



if(!allMemory[currentUser]){

allMemory[currentUser]={};

}



let userMemory =
allMemory[currentUser];





function saveUserMemory(){


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



if(text=="") return;



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
text
.toLowerCase()
.replace(/[؟?!.,]/g,"");




// ذخیره اسم

if(clean.includes("اسم من")){


let name =
clean
.replace("اسم من","")
.replace("است","")
.trim();



if(name){


userMemory.name=name;


saveUserMemory();



return "خوشحالم که آشنا شدم "+name+" 😊";


}

}





// پرسیدن اسم

if(
clean.includes("اسم من چیست") ||
clean.includes("نام من چیست")
){


if(userMemory.name){


return "اسم شما "+
userMemory.name+
" است.";


}


return "هنوز اسم شما را نمی‌دانم.";


}





// جستجوی دانش


let best=null;

let score=0;



knowledge.forEach(item=>{


let s =
similarity(
clean,
item.question.toLowerCase()
);



if(s>score){


score=s;

best=item.answer;


}


});



if(score>=0.4){

return best;

}



return "این موضوع را هنوز یاد نگرفته‌ام.";

}





function similarity(a,b){


let A=a.split(" ");

let B=b.split(" ");



let same=0;



A.forEach(word=>{


if(
word.length>1 &&
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
