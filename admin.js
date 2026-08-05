let knowledge =
JSON.parse(localStorage.getItem("knowledge")) || [];



let editIndex = -1;



function addKnowledge(){


let question =
document.getElementById("question").value.trim();


let answer =
document.getElementById("answer").value.trim();


let keywords =
document.getElementById("keywords").value
.split(" ");



if(question=="" || answer==""){

alert("سؤال و جواب را وارد کن");

return;

}




let data={

question:question,

answer:answer,

keywords:keywords

};




if(editIndex === -1){


knowledge.push(data);


}

else{


knowledge[editIndex]=data;


editIndex=-1;


}




save();


clear();


show();


alert("ذخیره شد ✅");


}





function save(){


localStorage.setItem(

"knowledge",

JSON.stringify(knowledge)

);


}




function show(){


let box =
document.getElementById("list");


let search =
document.getElementById("search").value
.toLowerCase();



box.innerHTML="";



knowledge.forEach((item,index)=>{


if(
search &&
!item.question.toLowerCase()
.includes(search)
){

return;

}




box.innerHTML += `


<div>

<p>
❓ ${item.question}
</p>


<p>
💡 ${item.answer}
</p>


<button onclick="editKnowledge(${index})">
ویرایش
</button>


<button onclick="deleteKnowledge(${index})">
حذف
</button>


<hr>


</div>


`;



});



}




function editKnowledge(index){


let item =
knowledge[index];



document.getElementById("question").value =
item.question;


document.getElementById("answer").value =
item.answer;


document.getElementById("keywords").value =
item.keywords.join(" ");



editIndex=index;


}





function deleteKnowledge(index){


let ok =
confirm("این آموزش حذف شود؟");



if(ok){


knowledge.splice(index,1);


save();


show();


}


}





function clear(){


document.getElementById("question").value="";

document.getElementById("answer").value="";

document.getElementById("keywords").value="";


}




show();
