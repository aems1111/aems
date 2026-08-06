class MyAICore {


    constructor(){


        this.language = new NormalizeEngine();

        this.spell = new SpellCheckEngine();

        this.tokenizer = new TokenizerEngine();

        this.synonym = new SynonymEngine();

        this.questionType = new QuestionTypeEngine();

        this.entities = new EntityEngine();

        this.knowledge = new KnowledgeEngine();

        this.search = new SemanticSearchEngine();

        this.memory = new MemoryEngine();

        this.context = new ContextEngine();

        this.learning = new LearningEngine();

        this.reasoning = new ReasoningEngine();


    }







    ask(userId,message){



        // 1. اصلاح متن

        let text =
        this.language.normalize(message);





        // 2. اصلاح غلط‌ها

        text =
        this.spell.check(text);






        // 3. بررسی زمینه گفتگو

        text =
        this.context.resolve(
            text,
            userId
        );







        // 4. بررسی حافظه کاربر


        let memoryAnswer =
        this.checkMemory(
            userId,
            text
        );



        if(memoryAnswer){


            return memoryAnswer;


        }







        // 5. پیدا کردن جواب


        let result =
        this.search.search(

            text,

            this.knowledge.getAll(),

            this.language,

            this.synonym

        );







        if(
            result &&
            result.score > 40
        ){


            let answer =
            result.item.answer;



            this.saveContext(
                userId,
                text,
                result.item
            );



            this.memory.addMessage(

                userId,

                message,

                answer

            );



            return answer;


        }







        // 6. اگر جواب پیدا نشد


        this.learning.add(text);

        this.learning.save();



        return "این موضوع را هنوز یاد نگرفته‌ام.";

    }









    checkMemory(id,text){



        if(
            text.includes("اسم من")
            ||
            text.includes("نام من")
        ){



            let name =
            this.memory.get(
                id,
                "name"
            );



            if(name){


                return "اسم شما "+name+" است.";


            }


        }





        return null;


    }









    saveContext(id,text,item){



        this.context.update(

            id,

            {

                question:text,

                topic:item.category,

                entity:item.question


            }

        );


    }









    teach(question,answer){



        this.knowledge.add({


            question:question,

            patterns:[],

            keywords:
            this.tokenizer
            .tokenize(question)
            .important,


            entities:[],

            category:"عمومی",

            answer:answer


        });


    }



}



window.MyAICore = MyAICore;
