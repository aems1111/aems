class ReasoningEngine {


    constructor(){


        this.rules = [];

    }









    addRule(condition,result){



        this.rules.push({


            condition:condition,


            result:result



        });



    }









    analyze(question,knowledge,entities){



        let found=[];



        let detected =
        entities.detect(question);





        detected.forEach(entity=>{


            knowledge.forEach(item=>{



                if(
                    item.entities &&
                    item.entities.includes(
                        entity.value
                    )
                ){


                    found.push(item);



                }



            });



        });





        return found;


    }









    infer(question,data){



        if(!data || data.length===0){


            return null;


        }





        for(
            let rule of this.rules
        ){



            if(
                rule.condition(question,data)
            ){


                return rule.result(
                    data
                );


            }



        }






        return null;


    }









    createRelation(a,b,type){



        return {


            from:a,


            to:b,


            relation:type



        };


    }









    findRelation(entity,relations,type){



        return relations.filter(item=>{


            return (

                item.from===entity
                &&
                item.relation===type

            );


        });



    }









    simpleAnswer(question,knowledge){



        for(
            let item of knowledge
        ){



            if(
                item.question === question
            ){



                return item.answer;


            }



        }





        return null;


    }



}



window.ReasoningEngine = ReasoningEngine;
