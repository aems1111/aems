class SynonymEngine {


    constructor(){


        this.groups = {


            "پایتخت":[

                "مرکز",
                "پایتخت",
                "مرکز کشور",
                "شهر اصلی"

            ],



            "ماشین":[

                "خودرو",
                "اتومبیل",
                "ماشین",
                "وسیله نقلیه"

            ],



            "کامپیوتر":[

                "رایانه",
                "کامپیوتر",
                "سیستم"

            ],




            "زمین":[

                "کره زمین",
                "زمین",
                "سیاره ما"

            ],




            "هوش مصنوعی":[

                "هوش مصنوعی",
                "ai",
                "هوش ماشینی"

            ],




            "برنامه نویسی":[

                "کدنویسی",
                "برنامه نویسی",
                "کد زدن",
                "توسعه نرم افزار"

            ],




            "اینترنت":[

                "وب",
                "اینترنت",
                "شبکه جهانی"

            ]

        };


    }









    normalizeWord(word){


        word =
        word.toLowerCase();


        return word.trim();


    }









    findConcept(word){



        word =
        this.normalizeWord(word);




        for(
            let concept in this.groups
        ){



            if(
                this.groups[concept]
                .includes(word)
            ){


                return concept;


            }


        }





        return word;


    }









    convertText(text){



        let words =
        text.split(" ");



        words =
        words.map(word=>{


            return this.findConcept(word);


        });




        return words.join(" ");


    }









    getRelatedWords(word){



        word =
        this.findConcept(word);



        if(
            this.groups[word]
        ){

            return this.groups[word];

        }



        return [];


    }









    addSynonym(concept,word){



        if(!this.groups[concept]){


            this.groups[concept]=[];

        }



        this.groups[concept].push(word);


    }





}



window.SynonymEngine = SynonymEngine;
