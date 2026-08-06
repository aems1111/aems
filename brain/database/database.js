class DatabaseEngine {


    constructor(){


        this.storage =
        new StorageEngine();


        this.knowledge=[];


    }







    init(){


        let data =
        this.storage.load(
            "knowledge"
        );



        if(data){


            this.knowledge=data;


        }



    }








    getKnowledge(){


        return this.knowledge;


    }








    addKnowledge(item){


        this.knowledge.push(item);


        this.save();


    }








    save(){



        this.storage.save(

            "knowledge",

            this.knowledge

        );


    }








    clear(){


        this.knowledge=[];


        this.save();


    }



}



window.DatabaseEngine = DatabaseEngine;
