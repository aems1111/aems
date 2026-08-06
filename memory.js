class MemoryEngine {


    constructor(){


        this.users = {};

    }








    createUser(id){



        if(
            !this.users[id]
        ){



            this.users[id]={

                profile:{},

                facts:{},

                history:[]

            };



        }



        return this.users[id];


    }









    remember(id,key,value){



        let user =
        this.createUser(id);



        user.profile[key]=value;



        return true;


    }









    get(id,key){



        let user =
        this.createUser(id);



        return user.profile[key] || null;


    }









    has(id,key){



        return this.get(id,key)!==null;


    }









    rememberFact(id,category,key,value){



        let user =
        this.createUser(id);





        if(
            !user.facts[category]
        ){


            user.facts[category]={};


        }





        user.facts[category][key]=value;



    }









    getFact(id,category,key){



        let user =
        this.createUser(id);





        if(
            user.facts[category]
        ){



            return user.facts[category][key] || null;



        }





        return null;


    }









    addMessage(id,userText,aiText){



        let user =
        this.createUser(id);



        user.history.push({


            user:userText,


            ai:aiText,


            time:Date.now()



        });




    }









    getHistory(id){



        let user =
        this.createUser(id);



        return user.history;


    }









    clearHistory(id){



        let user =
        this.createUser(id);



        user.history=[];



    }









    export(){


        return JSON.stringify(
            this.users
        );


    }









    import(data){



        try{


            this.users =
            JSON.parse(data);



            return true;


        }

        catch(e){


            return false;


        }


    }



}



window.MemoryEngine = MemoryEngine;

