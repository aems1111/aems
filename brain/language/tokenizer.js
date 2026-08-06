class TokenizerEngine {


    constructor(){


        this.importantWords = [

            "چیست",
            "است",
            "پایتخت",
            "کشور",
            "شهر",
            "سیاره",
            "تاریخ",
            "علت",
            "دلیل",
            "چرا",
            "چگونه",
            "روش",
            "نام",
            "اسم"

        ];


    }






    tokenize(text){


        if(!text){

            return {

                words:[],
                important:[],
                phrases:[]

            };

        }



        let words =
        text

        .split(" ")

        .filter(
            word=>word.length>1
        );





        return {


            words:words,


            important:
            this.extractImportant(words),



            phrases:
            this.createPhrases(words)



        };


    }









    extractImportant(words){



        return words.filter(word=>{


            if(
                this.importantWords.includes(word)
            ){

                return false;

            }



            return word.length>=3;


        });


    }









    createPhrases(words){


        let phrases=[];



        for(
            let i=0;
            i<words.length-1;
            i++
        ){



            phrases.push(

                words[i]
                +
                " "
                +
                words[i+1]

            );


        }



        return phrases;


    }









    countKeywords(text){



        let data =
        this.tokenize(text);



        let result={};



        data.important.forEach(word=>{


            if(!result[word]){

                result[word]=0;

            }



            result[word]++;



        });



        return result;


    }









    compareTokens(a,b){


        let first =
        this.tokenize(a);



        let second =
        this.tokenize(b);




        let score=0;



        first.important.forEach(word=>{


            if(
                second.important.includes(word)
            ){

                score++;

            }


        });



        return score /
        Math.max(
            first.important.length,
            second.important.length
        );


    }



}


window.TokenizerEngine = TokenizerEngine;

