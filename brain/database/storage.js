class StorageEngine {


    constructor(){

        this.prefix="myai_";

    }




    save(name,data){


        localStorage.setItem(

            this.prefix+name,

            JSON.stringify(data)

        );


    }






    load(name){


        let data =
        localStorage.getItem(
            this.prefix+name
        );



        if(!data){

            return null;

        }



        try{

            return JSON.parse(data);

        }
        catch(e){

            return null;

        }


    }





    remove(name){


        localStorage.removeItem(

            this.prefix+name

        );


    }



}


window.StorageEngine = StorageEngine;
