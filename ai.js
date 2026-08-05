let knowledge =
JSON.parse(localStorage.getItem("knowledge")) || [];


let userMemory =
JSON.parse(localStorage.getItem("userMemory")) || [];



function sendMessage(){


let input=document.getElementById("message");


let text=input.value.trim();


if(text=="") return;



let box=document.getElementById("chatBox");



box.innerHTML +=
"<p>👤 شما: "+text+"</p>";



let answer=think(text);



box.innerHTML +=
"<p>🤖 MyAI: "+answer+"</p>";



input.value="";


}





function think(text){


let clean=text
.toLowerCase()
.replace(/[؟?!.,]/g,"");



// حافظه اسم

if(clean.includes("اسم من")){


let name=
clean.replace("اسم من","")
.replace("است","")
.trim();



userMemory.name=name;


localStorage.setItem(
"userMemory",
JSON.stringify(userMemory)
);



return "خوشحالم که آشنا شدم "+name+" 😊";


}




if(clean.includes("اسم من چیست")){


if(userMemory.name){

return "اسم شما "+
userMemory.name+
" است.";

}

}




// جستجوی دانش


let best=null;

let score=0;



knowledge.forEach(item=>{


let s=
similarity(clean,item.question);



if(s>score){

score=s;

best=item.answer;

}


});




if(score>=0.4){

return best;

}




// ذخیره سؤال ناشناخته

saveUnknownQuestion(text);



return "این موضوع را هنوز یاد نگرفته‌ام، ولی سؤال تو ذخیره شد تا بعداً یاد بگیرم.";

}




function similarity(a,b){


let A=a.split(" ");

let B=b.split(" ");


let count=0;


A.forEach(word=>{


if(B.includes(word)){

count++;

}


});



return count /
Math.max(A.length,B.length);


}
