let knowledge =
JSON.parse(localStorage.getItem("knowledge")) || [];


let currentUser =
localStorage.getItem("currentUser");


let allMemory =
JSON.parse(localStorage.getItem("userMemory")) || {};


if(!allMemory[currentUser]){
    allMemory[currentUser] = {};
}


let userMemory = allMemory[currentUser];



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



    let intent =
    detectIntent(clean);



    if(intent==="ask_ai_name"){

        return "من MyAI هستم 🤖";

    }



    if(intent==="ask_user_name"){


        if(userMemory.name){

            return "اسم شما "+userMemory.name+" است 😊";

        }


        return "هنوز اسم شما را نمی‌دانم.";

    }




    if(intent==="set_user_name"){


        let name =
        extractName(clean);


        if(name){

            userMemory.name=name;

            saveMemory();


            return "خوشحالم که آشنا شدم "+name+" 😊";

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



    // اسم MyAI

    if(
        text.includes("اسم تو") ||
        text.includes("نام تو") ||
        text.includes("تو کی هستی")
    ){

        return "ask_ai_name";

    }



    // پرسیدن اسم کاربر

    if(
        text.includes("اسم من چیه") ||
        text.includes("اسم من چیست") ||
        text.includes("نام من چیه") ||
        text.includes("نام من چیست") ||
        text.includes("اسمم چیه")
    ){

        return "ask_user_name";

    }




    // معرفی اسم کاربر

    if(
        text.includes("اسم من") &&
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


    let name=text;


    name=name
    .replace("اسم من","")
    .replace("نام من","")
    .replace("هست","")
    .replace("است","")
    .trim();


    return name;

}





function searchKnowledge(text){


    let best=null;

    let score=0;



    knowledge.forEach(item=>{


        let s =
        similarity(
            text,
            normalize(item.question)
        );


        if(s>score){

            score=s;

            best=item.answer;

        }

    });



    if(score>=0.4){

        return best;

    }


    return null;

}





function similarity(a,b){


    let A=a.split(" ");

    let B=b.split(" ");


    let count=0;


    A.forEach(word=>{


        if(
            word.length>1 &&
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
