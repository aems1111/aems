let knowledge = 
JSON.parse(localStorage.getItem("knowledge")) || [];


// بارگذاری دانش اولیه
let defaultKnowledge = [];

fetch("knowledge.json")
.then(response => response.json())
.then(data => {

    defaultKnowledge = data;

});



// کاربر فعلی

let currentUser =
localStorage.getItem("currentUser");



if(!currentUser){

    alert("لطفاً وارد حساب شوید");

    window.location="login.html";

}



// حافظه کاربران

let allMemory =
JSON.parse(localStorage.getItem("userMemory")) || {};



if(!allMemory[currentUser]){

    allMemory[currentUser] = {};

    localStorage.setItem(
        "userMemory",
        JSON.stringify(allMemory)
    );

}



let userMemory =
allMemory[currentUser];





function saveMemory(){

    allMemory[currentUser] = userMemory;


    localStorage.setItem(
        "userMemory",
        JSON.stringify(allMemory)
    );

}







function sendMessage(){


    let input =
    document.getElementById("message");


    let text =
    input.value.trim();



    if(text===""){
        return;
    }



    let box =
    document.getElementById("chatBox");



    box.innerHTML +=
    "<p>👤 شما: "+text+"</p>";



    let answer =
    think(text);



    box.innerHTML +=
    "<p>🤖 MyAI: "+answer+"</p>";



    input.value="";


    box.scrollTop =
    box.scrollHeight;

}







function think(text){


    let clean =
    normalize(text);



    let intent =
    detectIntent(clean);




    // اسم MyAI

    if(intent==="ask_ai_name"){

        return "من MyAI هستم 🤖";

    }




    // پرسیدن اسم کاربر

    if(intent==="ask_user_name"){


        if(userMemory.name){

            return "اسم شما "
            + userMemory.name
            + " است 😊";

        }


        return "هنوز اسم شما را نمی‌دانم.";

    }





    // ذخیره اسم کاربر

    if(intent==="set_user_name"){


        let name =
        extractName(clean);



        if(name){


            userMemory.name =
            name;


            saveMemory();



            return "خوشحالم که آشنا شدم "
            + name
            + " 😊";

        }

    }






    // جستجو در دانش

    let answer =
    searchKnowledge(clean);



    if(answer){

        return answer;

    }





    return "این موضوع را هنوز یاد نگرفته‌ام.";

}









function detectIntent(text){



    // سوال درباره MyAI

    if(

        text.includes("اسم تو") ||
        text.includes("نام تو") ||
        text.includes("تو کی هستی") ||
        text.includes("تو چی هستی")

    ){

        return "ask_ai_name";

    }





    // سوال درباره اسم خود کاربر

    if(

        text.includes("اسم من چیه") ||
        text.includes("اسم من چیست") ||
        text.includes("نام من چیه") ||
        text.includes("نام من چیست") ||
        text.includes("اسمم چیه") ||
        text.includes("من کی هستم")

    ){

        return "ask_user_name";

    }





    // معرفی اسم

    if(

        (
        text.includes("اسم من") ||
        text.includes("نام من")
        )

        &&

        (
        text.includes("هست") ||
        text.includes("است")
        )

    ){

        return "set_user_name";

    }




    return "unknown";


}









function extractName(text){


    let name = text;


    name =
    name.replace("اسم من","");


    name =
    name.replace("نام من","");


    name =
    name.replace("هست","");


    name =
    name.replace("است","");


    name =
    name.trim();



    return name;

}









function searchKnowledge(text){



    let allKnowledge = [

        ...defaultKnowledge,

        ...knowledge

    ];



    let bestAnswer = null;

    let bestScore = 0;





    allKnowledge.forEach(item=>{


        let score =
        similarity(

            text,

            normalize(item.question)

        );



        if(score > bestScore){


            bestScore = score;


            bestAnswer =
            item.answer;


        }



    });





    if(bestScore >= 0.35){

        return bestAnswer;

    }



    return null;


}









function similarity(a,b){



    let A =
    a.split(" ");



    let B =
    b.split(" ");



    let count = 0;



    A.forEach(word=>{


        if(

            word.length > 1
            &&
            B.includes(word)

        ){

            count++;

        }


    });




    return count /
    Math.max(
        A.length,
        B.length
    );


}









function normalize(text){


    return text

    .toLowerCase()

    .replace(/[؟?!.,]/g,"")

    .trim();


}
