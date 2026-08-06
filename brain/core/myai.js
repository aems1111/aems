class MyAICore {


    constructor(){


        // دیتابیس

        this.database =
        new DatabaseEngine();


        this.database.init();




        // مغز دانش

        this.knowledge =
        new KnowledgeEngine(
            this.database
        );




        // بخش های هوش

        this.language =
        new NormalizeEngine();



        this.spell =
        new SpellCheckEngine();



        this.tokenizer =
        new TokenizerEngine();



        this.synonym =
        new SynonymEngine();



        this.questionType =
        new QuestionTypeEngine();



        this.entities =
        new EntityEngine();



        this.search =
        new SemanticSearchEngine();



        this.memory =
        new MemoryEngine();



        this.context =
        new ContextEngine();



        this.learning =
        new LearningEngine();



        this.reasoning =
        new ReasoningEngine();



    }









    ask(userId,message){



        let text =
        this.language.normalize(
            message
        );




        text =
        this.spell.check(text);





        text =
        this.context.resolve(
            text,
            userId
        );







        // بررسی حافظه

        let memory =
        this.checkMemory(
            userId,
            text
        );



        if(memory){

            return memory;

        }







        // جستجو در دانش

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




            this.context.update(

                userId,

                {

                    question:text,

                    topic:
                    result.item.category,

                    entity:
                    result.item.question

                }

            );




            this.memory.addMessage(

                userId,

                message,

                answer

            );




            return answer;


        }







        // اگر جواب نبود

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


                return:

                "اسم شما "
                +
                name
                +
                " است.";


            }


        }



        return null;



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



window.MyAICore =
MyAICore;
