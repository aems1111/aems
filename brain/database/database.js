class DatabaseEngine {


    constructor(){


        this.storage =
        new StorageEngine();



        this.knowledge=[];


    }






    init(){



        let data =
        this.storage.load(
            "myai_knowledge"
        );



        if(data){

            this.knowledge=data;

        }



    }






    getKnowledge(){


        return this.knowledge;


    }







    add(item){



        this.knowledge.push(item);



        this.save();



    }







    save(){



        this.storage.save(

            "myai_knowledge",

            this.knowledge

        );


    }



}



window.DatabaseEngine = DatabaseEngine;
