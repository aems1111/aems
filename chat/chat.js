let database =
new DatabaseEngine();


database.init();



let knowledge =
new KnowledgeEngine(
    database
);





function addMessage(text,type){


let chat =
document.getElementById(
"chat"
);


let div =
document.createElement(
"div"
);


div.className =
"message "+type;


div.innerHTML=text;


chat.appendChild(div);


}








function send(){



let input =
document.getElementById(
"message"
);



let text =
input.value.trim();




if(!text)
return;




addMessage(
"👤 شما: "+text,
"user"
);






let answer =
"این موضوع را هنوز یاد نگرفته‌ام.";



knowledge.getAll()
.forEach(item=>{



if(
text.includes(
item.question
)
){


answer=item.answer;


}



});






addMessage(
"🤖 MyAI: "+answer,
"ai"
);



input.value="";

}
