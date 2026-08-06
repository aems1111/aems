class KnowledgeEngine {


    constructor(){


        this.knowledge = [];

    }






    load(data){


        if(Array.isArray(data)){


            this.knowledge = data;


        }


    }








    add(item){



        if(
            !item.question ||
            !item.answer
        ){

            return false;

        }



        if(!item.patterns){

            item.patterns=[];

        }



        if(!item.keywords){

            item.keywords=[];

        }



        if(!item.category){

            item.category="عمومی";

        }



        this.knowledge.push(item);



        return true;


    }









    remove(index){



        if(
            index >= 0 &&
            index < this.knowledge.length
        ){


            this.knowledge.splice(
                index,
                1
            );


            return true;


        }



        return false;


    }









    getAll(){


        return this.knowledge;


    }









    search(query,language){



        let best = null;

        let bestScore = 0;





        this.knowledge.forEach(item=>{



            let score=0;





            // بررسی سوال اصلی

            score +=
            language.compare(
                query,
                item.question
            ) * 50;







            // بررسی الگوها


            item.patterns.forEach(pattern=>{


                score +=
                language.compare(
                    query,
                    pattern
                ) * 40;



            });








            // بررسی کلیدواژه‌ها


            item.keywords.forEach(keyword=>{


                if(
                    query.includes(keyword)
                ){

                    score += 15;

                }



            });








            if(score > bestScore){


                bestScore = score;


                best = item;


            }




        });






        return {


            item:best,

            score:bestScore


        };


    }









    update(index,newData){



        if(
            this.knowledge[index]
        ){


            this.knowledge[index]={

                ...this.knowledge[index],

                ...newData

            };



            return true;


        }



        return false;


    }









    count(){


        return this.knowledge.length;


    }



}



window.KnowledgeEngine = KnowledgeEngine;
