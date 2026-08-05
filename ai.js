let knowledge =
JSON.parse(localStorage.getItem("knowledge")) || [];


let userMemory =
JSON.parse(localStorage.getItem("userMemory")) || {};



function sendMessage(){

    let input = document.getElementById("message");

    let text = input.value.trim();

    if(text === ""){
        return;
    }


    let box = document.getElementById("chatBox");


    box.innerHTML += 
    "<p>👤 شما: " + text + "</p>";


    let answer = think(text);


    box.innerHTML += 
    "<p>🤖 MyAI: " + answer + "</p>";


    input.value = "";


    box.scrollTop = box.scrollHeight;

}




function think(text){


    let cleanText = text
    .toLowerCase()
    .replace(/[؟?!.,]/g,"")
    .trim();



    // ----------------------
    // حافظه اسم کاربر
    // ----------------------


    if(
        cleanText.includes("اسم من") ||
        cleanText.includes("نام من")
    ){

        let name = cleanText
        .replace("اسم من","")
        .replace("نام من","")
        .replace("است","")
        .trim();


        if(name.length > 0){

            userMemory.name = name;


            localStorage.setItem(
                "userMemory",
                JSON.stringify(userMemory)
            );


            return "خوشحالم که آشنا شدم " + name + " 😊";

        }

    }



    if(
        cleanText.includes("اسم من چیست") ||
        cleanText.includes("نام من چیست")
    ){

        if(userMemory.name){

            return "اسم شما " 
            + userMemory.name 
            + " است.";

        }
        else{

            return "هنوز اسم شما را نمی‌دانم.";

        }

    }




    // ----------------------
    // جستجوی دانش
    // ----------------------


    let bestAnswer = null;

    let bestScore = 0;



    knowledge.forEach(item=>{


        let score = similarity(
            cleanText,
            item.question.toLowerCase()
        );


        if(score > bestScore){

            bestScore = score;

            bestAnswer = item.answer;

        }


    });




    // فقط جواب‌های مطمئن

    if(bestScore >= 0.4){

        return bestAnswer;

    }




    return "این موضوع را هنوز یاد نگرفته‌ام. می‌توانی بعداً از پنل مدیریت به من یاد بدهی.";

}





function similarity(a,b){


    let wordsA =
    a.split(" ");


    let wordsB =
    b.split(" ");



    let same = 0;



    wordsA.forEach(word=>{


        if(
            word.length > 1 &&
            wordsB.includes(word)
        ){

            same++;

        }


    });



    return same /
    Math.max(wordsA.length, wordsB.length);


}
