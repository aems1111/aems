class MyAICore {


    constructor(){


        this.database =
        new DatabaseEngine();


        this.database.init();



        this.knowledge =
        new KnowledgeEngine(
            this.database
        );



        this.language =
        new NormalizeEngine();



        this.spell =
        new SpellCheckEngine();



        this.tokenizer =
        new TokenizerEngine();



        this.synonym =
        new SynonymEngine();



        this.search =
        new SemanticSearchEngine();



        this.memory =
        new MemoryEngine();



        this.context =
        new ContextEngine();



        this.learning =
        new LearningEngine();



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






        let memoryAnswer =
        this.checkMemory(
            userId,
            text
        );



        if(memoryAnswer){

            return memoryAnswer;

        }







        let result =
        this.search.search(

            text,

            this.knowledge.getAll(),

            this.language,

            this.synonym

        );








        if(
            result &&
            result.score > 20
        ){


            let answer =
            result.item.answer;



            this.context.update(

                userId,

                {

                    question:text,

                    topic:
                    result.item.category || "عمومی",

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








        this.learning.add(text);

        this.learning.save();



        return "این موضوع را هنوز یاد نگرفته‌ام.";


    }









    checkMemory(id,text){



        if(

            text.includes("اسم من")
            ||
            text.includes("نام من")
            ||
            text.includes("من کی هستم")

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









    teach(question,answer){



        this.knowledge.add({


            question:question,


            patterns:[

                question

            ],



            keywords:

            this.tokenizer
            .tokenize(question)
            .important || [],



            entities:[],


            category:"عمومی",


            answer:answer


        });



    }



}



window.MyAICore = MyAICore;
