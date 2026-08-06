class KnowledgeEngine {


    constructor(database){


        this.database = database;


        this.knowledge = [];


        this.load();


    }








    load(){



        if(this.database){


            this.knowledge =
            this.database.getKnowledge();



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





        this.save();



        return true;


    }









    save(){



        if(this.database){


            this.database.knowledge =
            this.knowledge;



            this.database.save();



        }



    }









    getAll(){


        return this.knowledge;


    }









    searchByQuestion(question){



        return this.knowledge.find(item=>{


            return item.question === question;


        });



    }









    remove(index){



        if(
            this.knowledge[index]
        ){


            this.knowledge.splice(

                index,

                1

            );



            this.save();



            return true;


        }



        return false;


    }









    update(index,data){



        if(
            this.knowledge[index]
        ){


            this.knowledge[index]={

                ...this.knowledge[index],

                ...data

            };



            this.save();



            return true;


        }




        return false;


    }









    count(){


        return this.knowledge.length;


    }



}



window.KnowledgeEngine = KnowledgeEngine;
