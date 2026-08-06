class EntityEngine {


    constructor(){


        this.entities = {


            country:[

                "ایران",
                "آمریکا",
                "آلمان",
                "فرانسه",
                "ژاپن",
                "چین",
                "انگلیس"

            ],




            city:[

                "تهران",
                "برلین",
                "پاریس",
                "توکیو",
                "لندن",
                "نیویورک"

            ],





            planet:[

                "زمین",
                "مریخ",
                "زهره",
                "مشتری"

            ],





            technology:[

                "html",
                "javascript",
                "جاوااسکریپت",
                "هوش مصنوعی",
                "کامپیوتر",
                "اینترنت"

            ],





            person:[

                "آلبرت اینشتین",
                "ابن سینا",
                "نیوتن",
                "استیو جابز"

            ],





            animal:[

                "سگ",
                "گربه",
                "شیر",
                "ببر"

            ]

        };


    }









    detect(text){



        let result=[];



        for(
            let type in this.entities
        ){



            this.entities[type]
            .forEach(item=>{



                if(
                    text.includes(item)
                ){



                    result.push({

                        value:item,

                        type:type


                    });



                }



            });



        }





        return result;


    }









    getType(word){



        for(
            let type in this.entities
        ){



            if(
                this.entities[type]
                .includes(word)
            ){



                return type;

            }


        }





        return null;


    }









    addEntity(type,value){



        if(
            !this.entities[type]
        ){


            this.entities[type]=[];

        }



        this.entities[type]
        .push(value);


    }









    findRelated(text,type){



        if(
            this.entities[type]
        ){



            return this.entities[type]
            .filter(item=>
                text.includes(item)
            );


        }




        return [];


    }



}



window.EntityEngine = EntityEngine;
