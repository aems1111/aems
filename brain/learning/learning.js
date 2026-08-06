class LearningEngine {

    constructor() {

        this.unknownQuestions = [];

    }



    normalize(text){

        return text
        .trim()
        .toLowerCase();

    }



    add(question){

        question = this.normalize(question);

        let found =
        this.unknownQuestions.find(item=>item.question===question);

        if(found){

            found.count++;
            found.lastAsked = Date.now();

            return;

        }

        this.unknownQuestions.push({

            question:question,

            count:1,

            firstAsked:Date.now(),

            lastAsked:Date.now()

        });

    }



    getAll(){

        return this.unknownQuestions
        .sort((a,b)=>b.count-a.count);

    }



    getTop(limit=20){

        return this.getAll().slice(0,limit);

    }



    remove(question){

        question=this.normalize(question);

        this.unknownQuestions =
        this.unknownQuestions.filter(item=>item.question!==question);

    }



    clear(){

        this.unknownQuestions=[];

    }



    export(){

        return JSON.stringify(this.unknownQuestions);

    }



    import(json){

        try{

            this.unknownQuestions =
            JSON.parse(json);

        }catch(e){

            this.unknownQuestions=[];

        }

    }



    teach(question,answer,knowledgeEngine){

        knowledgeEngine.add({

            question:question,

            patterns:[],

            keywords:this.extractKeywords(question),

            entities:[],

            category:"عمومی",

            answer:answer

        });

        this.remove(question);

    }



    extractKeywords(text){

        return text

        .replace(/[؟?!،,.]/g," ")

        .split(/\s+/)

        .filter(word=>word.length>2);

    }



    save(){

        localStorage.setItem(

            "myai_learning",

            this.export()

        );

    }



    load(){

        let data =
        localStorage.getItem("myai_learning");

        if(data){

            this.import(data);

        }

    }

}

window.LearningEngine = LearningEngine;
