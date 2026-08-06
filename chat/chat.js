let ai =
new MyAICore();



let userId =
"guest";







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
"message "
+
type;



div.innerHTML =
text;



chat.appendChild(div);



chat.scrollTop =
chat.scrollHeight;


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
ai.ask(

userId,

text

);





addMessage(

"🤖 MyAI: "+answer,

"ai"

);






input.value="";



}








document

.getElementById("message")

.addEventListener(

"keydown",

function(e){


if(e.key==="Enter"){

send();

}


}

);
