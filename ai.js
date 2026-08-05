let knowledge = [];

let savedKnowledge = localStorage.getItem("knowledge");

if(savedKnowledge){
    knowledge = JSON.parse(savedKnowledge);
}
else{
    fetch("knowledge.json")
    .then(r => r.json())
    .then(data => {
        knowledge = data;
    });
}


function sendMessage(){

    let input = document.getElementById("message");
    let text = input.value;

    let box = document.getElementById("chatBox");

    box.innerHTML += 
    "<p>👤 شما: " + text + "</p>";

    let answer = findAnswer(text);

    box.innerHTML += 
    "<p>🤖 MyAI: " + answer + "</p>";

    input.value="";
}



function findAnswer(text){

    text = text.toLowerCase();

    let bestAnswer = null;
    let score = 0;


    knowledge.forEach(item=>{

        let currentScore = 0;

        item.keywords.forEach(word=>{

            if(text.includes(word.toLowerCase())){
                currentScore++;
            }

        });


        if(currentScore > score){
            score = currentScore;
            bestAnswer = item.answer;
        }

    });


    if(bestAnswer){
        return bestAnswer;
    }


    return "این موضوع را هنوز یاد نگرفته‌ام.";
}
