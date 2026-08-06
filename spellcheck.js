class SpellCheckEngine {


    constructor(){


        this.dictionary = {


            "پایتخط":"پایتخت",

            "تهرون":"تهران",

            "ایرون":"ایران",

            "زمیین":"زمین",

            "زمين":"زمین",

            "خورشید":"خورشید",

            "مصنویی":"مصنوعی",

            "مصنوعي":"مصنوعی",

            "هوش مصنویی":"هوش مصنوعی",

            "برنامع":"برنامه",

            "جاوا اسکریپ":"جاوااسکریپت",

            "جاوا اسکریپت":"جاوااسکریپت",

            "کامپیوتر":"کامپیوتر"

        };

    }







    check(text){


        if(!text)
            return "";



        let words =
        text.split(" ");



        words =
        words.map(word=>{


            if(this.dictionary[word]){

                return this.dictionary[word];

            }



            return this.findSimilar(word);


        });



        return words.join(" ");


    }









    findSimilar(word){


        let keys =
        Object.keys(this.dictionary);



        let best = word;

        let bestScore = 0;



        keys.forEach(item=>{


            let score =
            this.similarity(
                word,
                item
            );



            if(score > bestScore){

                bestScore = score;

                best = this.dictionary[item];

            }


        });





        if(bestScore >= 0.75){

            return best;

        }



        return word;


    }









    similarity(a,b){


        let longer =
        Math.max(
            a.length,
            b.length
        );



        if(longer===0)
            return 1;



        let distance =
        this.levenshtein(a,b);



        return (
            longer-distance
        ) / longer;


    }









    levenshtein(a,b){



        let matrix=[];



        for(let i=0;i<=b.length;i++){

            matrix[i]=[i];

        }



        for(let j=0;j<=a.length;j++){

            matrix[0][j]=j;

        }



        for(let i=1;i<=b.length;i++){


            for(let j=1;j<=a.length;j++){



                if(
                    b.charAt(i-1)
                    ===
                    a.charAt(j-1)
                ){

                    matrix[i][j]=
                    matrix[i-1][j-1];


                }
                else{


                    matrix[i][j]=Math.min(

                        matrix[i-1][j-1]+1,

                        matrix[i][j-1]+1,

                        matrix[i-1][j]+1

                    );


                }


            }


        }



        return matrix[b.length][a.length];

    }






    addWord(wrong,right){


        this.dictionary[wrong]=right;


    }




}


window.SpellCheckEngine = SpellCheckEngine;
