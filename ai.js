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

allMemory[currentUser] = {};

localStorage.setItem(
"userMemory",
JSON.stringify(allMemory)
);

}



let userMemory = allMemory[currentUser];





function saveUserMemory(){

allMemory[currentUser] = userMemory;


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
text
.toLowerCase()
.replace(/[؟?!.,]/g,"")
.trim();





// اول بررسی کن آیا کاربر اسمش را پرسیده


if(
clean.includes("اسم من چیست") ||
clean.includes("نام من چیست") ||
clean.includes("اسمم چیست")
){


if(userMemory.name){

return "اسم شما " + userMemory.name + " است.";

}

else{

return "هنوز اسم شما را نمی‌دانم.";

}


}




// یادگیری اسم کاربر


if(
clean.includes("اسم من") ||
clean.includes("نام من")
){


let name =
clean
.replace("اسم من","")
.replace("نام من","")
.replace("است","")
.trim();



if(name.length > 0){


userMemory.name = name;


saveUserMemory();



return "خوشحالم که آشنا شدم "+name+" 😊";


}


}




// جستجو در دانش


let bestAnswer=null;

let bestScore=0;



knowledge.forEach(item=>{


let score =
similarity(
clean,
item.question.toLowerCase()
);



if(score > bestScore){

bestScore = score;

bestAnswer = item.answer;

}


});




if(bestScore >= 0.4){

return bestAnswer;

}



return "این موضوع را هنوز یاد نگرفته‌ام.";

}





function similarity(a,b){


let wordsA =
a.split(" ");


let wordsB =
b.split(" ");



let count=0;



wordsA.forEach(word=>{


if(
word.length>1 &&
wordsB.includes(word)
){

count++;

}


});



return count /
Math.max(
wordsA.length,
wordsB.length
);


}
