let learning =
new LearningEngine();


let knowledge =
new KnowledgeEngine();





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






learning.teach(

question,

answer,

knowledge

);





save();



alert(
"آموزش انجام شد"
);



loadUnknown();



}









function save(){



localStorage.setItem(

"myai_learning",

learning.export()

);




localStorage.setItem(

"myai_knowledge",

JSON.stringify(
knowledge.getAll()
)

);



}









function loadKnowledge(){



let data =
localStorage.getItem(
"myai_knowledge"
);




if(data){


knowledge.load(
JSON.parse(data)
);


}



}









function loadUnknown(){



let box =
document.getElementById(
"unknown"
);



box.innerHTML="";




let items =
learning.getTop();





items.forEach(item=>{


let div =
document.createElement(
"div"
);



div.className="question";



div.innerHTML = `

<b>
${item.question}
</b>

<br>

تعداد پرسش:
${item.count}

<br><br>

<input 
placeholder="جواب"
id="ans_${item.question}"
>

<button onclick="answerQuestion('${item.question}')">

آموزش

</button>

`;



box.appendChild(div);



});



}









function answerQuestion(q){



let input =
document.getElementById(
"ans_"+q
);



learning.teach(

q,

input.value,

knowledge

);



save();


loadUnknown();



}







loadKnowledge();

loadUnknown();
