class ContextEngine {


    constructor(){


        this.contexts = {};

    }






    create(id){


        if(!this.contexts[id]){


            this.contexts[id]={

                lastTopic:null,

                lastEntity:null,

                lastQuestion:null,

                history:[]

            };


        }


        return this.contexts[id];


    }









    update(id,data){



        let context =
        this.create(id);



        if(data.topic){

            context.lastTopic=data.topic;

        }



        if(data.entity){

            context.lastEntity=data.entity;

        }



        if(data.question){

            context.lastQuestion=data.question;

        }



        context.history.push(data);



    }









    get(id){


        return this.create(id);


    }









    resolve(text,id){



        let context =
        this.create(id);



        if(!context.lastEntity){


            return text;


        }






        let replacements=[


            "ش",

            "آن",

            "اون",

            "این",

            "همین",

            "وی"

        ];







        replacements.forEach(word=>{



            if(
                text.includes(word)
            ){



                text =
                text.replace(
                    word,
                    context.lastEntity
                );


            }


        });






        return text;


    }









    setTopic(id,topic){



        let context =
        this.create(id);



        context.lastTopic=topic;



    }









    getTopic(id){



        return this.create(id)
        .lastTopic;


    }









    clear(id){


        delete this.contexts[id];


    }



}



window.ContextEngine = ContextEngine;
