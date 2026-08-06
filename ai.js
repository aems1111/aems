let knowledge =
JSON.parse(localStorage.getItem("knowledge")) || [];


let defaultKnowledge = [];
let knowledgeLoaded = false;



async function loadKnowledge(){

    try{

        let response = await fetch("knowledge.json");

        defaultKnowledge = await response.json();

    }
    catch(error){

        console.log("خطا در خواندن دانش:", error);

        defaultKnowledge = [];

    }


    knowledgeLoaded = true;

}


loadKnowledge();






let currentUser =
localStorage.getItem("currentUser");



if(!currentUser){

    alert("لطفاً وارد حساب شوید");

    window.location="login.html";

}






let allMemory =
JSON.parse(localStorage.getItem("userMemory")) || {};



if(!allMemory[currentUser]){

    allMemory[currentUser] = {};

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



    if(text==="") return;



    let box =
    document.getElementById("chatBox");



    box.innerHTML +=
    "<p>👤 شما: "+text+"</p>";



    let answer =
    think(text);



    box.innerHTML +=
    "<p>🤖 MyAI: "+answer+"</p>";



    input.value="";



}









function think(text){



    let clean =
    normalize(text);




    // پاسخ‌های پایه


    if(
    clean==="سلام" ||
    clean==="درود"
    ){

        return "سلام خوش آمدی 😊";

    }





    if(
    clean.includes("خوبی") ||
    clean.includes("حالت چطوره")
    ){

        return "من خوبم، ممنون که پرسیدی 😊";

    }





    if(
    clean.includes("خداحافظ")
    ){

        return "خداحافظ، موفق باشی 😊";

    }






    let intent =
    detectIntent(clean);






    if(intent==="ask_ai_name"){


        return "من MyAI هستم 🤖";


    }






    if(intent==="ask_user_name"){



        if(userMemory.name){


            return "اسم شما "
            + userMemory.name
            + " است 😊";


        }



        return "هنوز اسم شما را نمی‌دانم.";

    }







    if(intent==="set_user_name"){



        let name =
        extractName(clean);



        if(name){


            userMemory.name = name;


            saveMemory();



            return "خوشحالم که آشنا شدم "
            + name
            + " 😊";


        }


    }








    let answer =
    searchKnowledge(clean);



    if(answer){

        return answer;

    }





    return "این موضوع را هنوز یاد نگرفته‌ام.";

}









function detectIntent(text){



    if(

        text.includes("اسم تو") ||
        text.includes("نام تو") ||
        text.includes("تو کی هستی")

    ){

        return "ask_ai_name";

    }






    if(

        text.includes("اسم من چیه") ||
        text.includes("اسم من چیست") ||
        text.includes("نام من چیه") ||
        text.includes("نام من چیست") ||
        text.includes("اسمم چیه")

    ){

        return "ask_user_name";

    }






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


    return text

    .replace("اسم من","")

    .replace("نام من","")

    .replace("هست","")

    .replace("است","")

    .trim();


}









function searchKnowledge(text){



    if(!knowledgeLoaded){

        return null;

    }



    let allKnowledge=[

        ...defaultKnowledge,

        ...knowledge

    ];



    let bestAnswer=null;

    let bestScore=0;






    allKnowledge.forEach(item=>{


        let score =
        calculateScore(
            text,
            item
        );



        if(score > bestScore){


            bestScore = score;


            bestAnswer = item.answer;


        }



    });






    if(bestScore >= 35){

        return bestAnswer;

    }



    return null;


}









function calculateScore(text,item){



    let score=0;



    let question =
    normalize(item.question || "");





    score +=
    similarity(text,question)
    *
    50;






    let keywords =
    item.keywords || [];





    keywords.forEach(keyword=>{


        let key =
        normalize(keyword);



        if(
        text.includes(key)
        ){

            score += 15;

        }


    });





    return score;


}









function similarity(a,b){



    let A =
    a.split(" ");



    let B =
    b.split(" ");



    let count=0;



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



    let synonyms = {


        "چیه":"چیست",

        "چی":"چیست",

        "هست":"است",

        "میباشد":"است",

        "می‌باشد":"است",

        "کجاس":"کجاست"


    };



    text =
    text
    .toLowerCase()
    .replace(/[؟?!.,]/g,"");




    let words =
    text.split(" ");




    words =
    words.map(word=>{


        if(synonyms[word]){

            return synonyms[word];

        }


        return word;


    });






    let stopWords=[


        "را",
        "از",
        "به",
        "یک",
        "من"


    ];





    return words

    .filter(word=> !stopWords.includes(word))

    .join(" ")

    .trim();


}
