class SearchEngine {


    constructor(){


        this.results=[];


    }








    search(query,knowledge,language,entities,questionType){



        let results=[];



        let detectedEntities =
        entities.detect(query);



        let detectedType =
        questionType.detect(query);





        knowledge.forEach(item=>{



            let score = 0;







            // مقایسه سؤال اصلی

            score +=
            language.compare(
                query,
                item.question
            )
            *
            50;








            // مقایسه الگوها


            if(item.patterns){


                item.patterns.forEach(pattern=>{


                    score +=
                    language.compare(
                        query,
                        pattern
                    )
                    *
                    40;


                });


            }









            // بررسی کلیدواژه‌ها


            if(item.keywords){



                item.keywords.forEach(keyword=>{



                    if(
                        query.includes(keyword)
                    ){


                        score += 15;


                    }



                });



            }









            // بررسی موجودیت‌ها


            if(item.entities){



                detectedEntities.forEach(entity=>{



                    if(
                        item.entities.includes(
                            entity.value
                        )
                    ){


                        score +=20;


                    }



                });



            }









            // بررسی نوع سؤال


            if(
                item.type &&
                item.type === detectedType.type
            ){


                score +=10;


            }









            results.push({


                item:item,


                score:score


            });




        });









        results.sort(
            (a,b)=>
            b.score-a.score
        );





        this.results=results;



        return results[0] || null;



    }









    getTop(count=5){



        return this.results.slice(
            0,
            count
        );


    }









    confidence(result){



        if(!result){

            return 0;

        }



        if(result.score>=100){

            return "high";

        }



        if(result.score>=50){

            return "medium";

        }



        return "low";


    }









}



window.SearchEngine = SearchEngine;
