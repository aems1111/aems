let knowledge = JSON.parse(localStorage.getItem("knowledge")) || [];


function addKnowledge(){

    let question = document.getElementById("question").value;
    let answer = document.getElementById("answer").value;
    let keywords = document.getElementById("keywords").value
        .split(" ");

    knowledge.push({
        question: question,
        answer: answer,
        keywords: keywords
    });


    localStorage.setItem(
        "knowledge",
        JSON.stringify(knowledge)
    );


    show();

    alert("MyAI یاد گرفت ✅");
}



function show(){

    let box = document.getElementById("list");

    box.innerHTML = "";

    knowledge.forEach(item=>{

        box.innerHTML += `
        <p>
        ❓ ${item.question}<br>
        💡 ${item.answer}
        </p>
        <hr>
        `;

    });

}


show();
