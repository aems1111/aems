class KnowledgeEngine {



    constructor(database){


        this.database =
        database;



        this.knowledge =
        database.getKnowledge();



    }







    add(item){



        this.knowledge.push(item);



        this.database.save();



    }







    getAll(){


        return this.knowledge;


    }



}



window.KnowledgeEngine =
KnowledgeEngine;
