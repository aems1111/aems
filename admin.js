let knowledge =
JSON.parse(localStorage.getItem("knowledge")) || [];


function addKnowledge(){

let question =
document.getElementById("question").value;


let answer =
document.getElementById("answer").value;


let keywords =
document.getElementById("keywords").value
.split(" ");


knowledge.push({

question:question,
answer:answer,
keywords:keywords

});


save();

show();


}


function save(){

localStorage.setItem(
"knowledge",
JSON.stringify(knowledge)
);

}


function show(){

let box=document.getElementById("list");

box.innerHTML="";


knowledge.forEach(item=>{

box.innerHTML +=
`
<p>
<b>سؤال:</b> ${item.question}<br>
<b>جواب:</b> ${item.answer}
</p>
<hr>
`;

});


}


show();
