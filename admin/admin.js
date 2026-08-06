let database =
new DatabaseEngine();



database.init();





let knowledge =
new KnowledgeEngine(
    database
);





let learning =
new LearningEngine();



learning.load();










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
!question ||
!answer
){

alert(
"سؤال و جواب را وارد کنید"
);

return;

}







knowledge.add({


    question:question,


    patterns:[],


    keywords:

    question

    .split(" "),

    
    entities:[],


    category:"عمومی",


    answer:answer



});





learning.remove(question);



learning.save();




alert(
"آموزش انجام شد"
);



document.getElementById(
"question"
).value="";



document.getElementById(
"answer"
).value="";



loadUnknown();



}









function answerQuestion(q){



let input =
document.getElementById(
"ans_"+q
);





knowledge.add({


question:q,


patterns:[],


keywords:q.split(" "),


entities:[],


category:"عمومی",


answer:
input.value


});





learning.remove(q);


learning.save();



loadUnknown();



}









function loadUnknown(){



let box =
document.getElementById(
"unknown"
);



box.innerHTML="";





let list =
learning.getTop();





list.forEach(item=>{



let div =
document.createElement(
"div"
);



div.className="question";



div.innerHTML=`

<b>
${item.question}
</b>

<br>

تعداد:
${item.count}

<br><br>


<input 
id="ans_${item.question}"
placeholder="جواب"
>


<button onclick="answerQuestion('${item.question}')">

یاد بده

</button>


`;



box.appendChild(div);



});



}









loadUnknown();
