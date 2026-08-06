class QuestionTypeEngine {


    constructor(){


        this.types = {


            definition:[

                "چیست",
                "چیه",
                "یعنی",
                "معنی",
                "تعریف"

            ],



            location:[

                "کجاست",
                "کجا",
                "مکان",
                "محل"

            ],




            reason:[

                "چرا",
                "دلیل",
                "علت",
                "چطور شد"

            ],




            method:[

                "چگونه",
                "چطور",
                "روش",
                "راه"

            ],




            person:[

                "کیست",
                "کیه",
                "چه کسی",
                "نام"

            ],




            time:[

                "چه زمانی",
                "کی",
                "تاریخ",
                "سال"

            ],




            quantity:[

                "چقدر",
                "چند",
                "مقدار",
                "تعداد"

            ]


        };


    }










    detect(text){



        let result = {

            type:"unknown",

            score:0

        };




        for(
            let type in this.types
        ){



            this.types[type]
            .forEach(keyword=>{


                if(
                    text.includes(keyword)
                ){



                    if(result.score < 1){


                        result.type = type;


                        result.score = 1;


                    }


                }



            });



        }





        return result;


    }









    is(text,type){



        let result =
        this.detect(text);



        return result.type===type;


    }









    getAnswerStyle(type){



        switch(type){


            case "definition":

                return "توضیحی";



            case "location":

                return "مکانی";



            case "reason":

                return "علتی";



            case "method":

                return "مرحله‌ای";



            case "person":

                return "شخصی";



            case "time":

                return "زمانی";



            case "quantity":

                return "عددی";



            default:

                return "عمومی";


        }


    }



}



window.QuestionTypeEngine = QuestionTypeEngine;

