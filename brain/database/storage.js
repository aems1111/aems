class StorageEngine {


    save(key,data){

        localStorage.setItem(
            key,
            JSON.stringify(data)
        );

    }



    load(key){


        let data =
        localStorage.getItem(key);



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


}


window.StorageEngine = StorageEngine;
