class SemanticSearchEngine {


    constructor(){

        this.weights = {

            word:40,

            synonym:25,

            keyword:20,

            length:15

        };

    }





    search(query, knowledge, language, synonym){


        let results=[];


        knowledge.forEach(item=>{


            let score=0;



            // شباهت مستقیم جمله

            score +=
            this.wordSimilarity(
                query,
                item.question
            )
            *
            this.weights.word;





            // بررسی الگوها

            if(item.patterns){


                item.patterns.forEach(pattern=>{


                    score +=
                    this.wordSimilarity(
                        query,
                        pattern
                    )
                    *
                    30;


                });


            }





            // بررسی مترادف‌ها


            score +=
            this.synonymScore(
                query,
                item.keywords,
                synonym
            )
            *
            this.weights.synonym;






            // بررسی کلیدواژه‌ها


            score +=
            this.keywordScore(
                query,
                item.keywords
            )
            *
            this.weights.keyword;






            // امتیاز طول جمله

            score +=
            this.lengthScore(
                query,
                item.question
            )
            *
            this.weights.length;



            results.push({

                item:item,

                score:score

            });



        });





        results.sort((a,b)=>{

            return b.score-a.score;

        });




        return results[0] || null;


    }









    wordSimilarity(a,b){


        let A=this.clean(a);

        let B=this.clean(b);



        let score=0;



        A.forEach(word=>{


            if(
                B.includes(word)
            ){

                score++;

            }


        });



        let max =
        Math.max(
            A.length,
            B.length
        );



        if(max===0)
            return 0;



        return score/max;


    }









    keywordScore(text,keywords){



        if(!keywords)
            return 0;



        let score=0;



        keywords.forEach(word=>{


            if(
                text.includes(word)
            ){

                score++;

            }


        });



        return score /
        keywords.length;


    }









    synonymScore(text,keywords,synonym){



        if(!keywords)
            return 0;



        let score=0;



        keywords.forEach(keyword=>{



            let related =
            synonym.getRelatedWords(
                keyword
            );



            related.forEach(word=>{


                if(
                    text.includes(word)
                ){

                    score++;

                }


            });



        });



        return score /
        keywords.length;


    }









    lengthScore(a,b){



        let diff =
        Math.abs(
            a.length-b.length
        );



        if(diff<10)
            return 1;



        if(diff<30)
            return 0.5;



        return 0.2;


    }









    clean(text){



        return text

        .toLowerCase()

        .replace(/[؟?!.,،]/g,"")

        .split(" ")

        .filter(x=>x.length>1);


    }



}



window.SemanticSearchEngine = SemanticSearchEngine;

