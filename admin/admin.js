let database =
new DatabaseEngine();


database.init();



let knowledge =
new KnowledgeEngine(
    database
);






function teach(){



let question =
document.getElementById(
"question"
).value;



let answer =
document.getElementById(
"answer"
).value;





if(
question=="" ||
answer==""
){

alert(
"سؤال و جواب را وارد کن"
);

return;

}





knowledge.add({


question:question,


patterns:[

question

],


keywords:

question.split(" "),


answer:answer


});





alert(
"آموزش انجام شد"
);




document.getElementById(
"question"
).value="";



document.getElementById(
"answer"
).value="";



}

