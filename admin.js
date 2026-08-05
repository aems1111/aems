let knowledge =
JSON.parse(localStorage.getItem("knowledge")) || [];


let unknown =
JSON.parse(localStorage.getItem("unknown")) || [];




function addKnowledge(){


let question =
document.getElementById("question").value.trim();


let answer =
document.getElementById("answer").value.trim();


let keywords =
document.getElementById("keywords").value.split(" ");



if(question=="" || answer==""){

alert("سؤال و جواب را وارد کن");

return;

}



knowledge.push({

question:question,

answer:answer,

keywords:keywords

});



saveKnowledge();



clearForm();


showKnowledge();


}




function saveKnowledge(){

localStorage.setItem(
"knowledge",
JSON.stringify(knowledge)
);

}




function showKnowledge(){


let box =
document.getElementById("list");


box.innerHTML="";



knowledge.forEach((item)=>{


box.innerHTML += `

<p>
❓ ${item.question}<br>
💡 ${item.answer}
</p>

<hr>

`;

});


}



function showUnknown(){


let box =
document.getElementById("unknownList");


box.innerHTML="";



unknown.forEach((item,index)=>{


box.innerHTML += `


<div>

<p>
❓ ${item}
</p>


<input id="answer${index}" placeholder="جواب را بنویس">


<button onclick="teach(${index})">
یاد دادن
</button>


<hr>

</div>


`;


});


}





function teach(index){


let question =
unknown[index];


let answer =
document.getElementById(
"answer"+index
).value;



if(answer==""){

alert("جواب را وارد کن");

return;

}



knowledge.push({

question:question,

answer:answer,

keywords:question.split(" ")

});



saveKnowledge();



unknown.splice(index,1);



localStorage.setItem(
"unknown",
JSON.stringify(unknown)
);



showUnknown();

showKnowledge();


alert("MyAI یاد گرفت ✅");


}





function clearForm(){


document.getElementById("question").value="";

document.getElementById("answer").value="";

document.getElementById("keywords").value="";


}




showKnowledge();

showUnknown();

