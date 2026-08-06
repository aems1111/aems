class NormalizeEngine {

    constructor() {

        this.synonyms = {

            "چیه": "چیست",
            "چی": "چیست",
            "هست": "است",
            "میباشد": "است",
            "می‌باشد": "است",
            "کجاس": "کجاست",
            "کیه": "کیست",
            "کی": "کیست",
            "واسه": "برای",
            "واسطه": "برای",
            "میشه": "می‌شود",
            "نمیشه": "نمی‌شود",
            "میخوام": "می‌خواهم",
            "میخام": "می‌خواهم",
            "میخوای": "می‌خواهی",
            "میخواد": "می‌خواهد",
            "اره": "بله",
            "آره": "بله",
            "نه": "خیر"

        };


        this.stopWords = [

            "را",
            "رو",
            "از",
            "به",
            "در",
            "برای",
            "که",
            "اگر",
            "اما",
            "یا",
            "با",
            "روی",
            "این",
            "آن",
            "یک",
            "هم",
            "همه",
            "من",
            "تو",
            "شما",
            "او",
            "ما",
            "آنها",
            "لطفا",
            "لطفاً"

        ];

    }






    normalize(text){

        if(!text)
            return "";



        text = this.fixArabic(text);

        text = this.removeEmoji(text);

        text = this.removeExtraChars(text);

        text = this.fixSpaces(text);

        text = this.lower(text);

        text = this.replaceSynonyms(text);

        text = this.removeStopWords(text);

        return text.trim();

    }







    lower(text){

        return text.toLowerCase();

    }







    fixArabic(text){

        return text

        .replace(/ي/g,"ی")
        .replace(/ك/g,"ک")
        .replace(/ة/g,"ه")
        .replace(/ؤ/g,"و")
        .replace(/إ/g,"ا")
        .replace(/أ/g,"ا")
        .replace(/ۀ/g,"ه");

    }








    removeEmoji(text){

        return text.replace(

            /[\u{1F300}-\u{1FAFF}]/gu,

            ""

        );

    }








    removeExtraChars(text){

        return text

        .replace(/[؟?!.,،؛:]/g," ")

        .replace(/ـ+/g,"")

        .replace(/([ا-ی])\1{2,}/g,"$1")

        .replace(/\s+/g," ");

    }








    fixSpaces(text){

        return text

        .replace(/\s+/g," ")

        .trim();

    }








    replaceSynonyms(text){

        let words = text.split(" ");



        words = words.map(word=>{

            return this.synonyms[word] || word;

        });



        return words.join(" ");

    }








    removeStopWords(text){

        let words = text.split(" ");



        words = words.filter(word=>{

            return !this.stopWords.includes(word);

        });



        return words.join(" ");

    }








    tokenize(text){

        return this.normalize(text).split(" ");

    }








    contains(text,word){

        return this.tokenize(text).includes(word);

    }








    keywordScore(text){

        let result=[];

        let words=this.tokenize(text);



        words.forEach(word=>{

            let score=1;



            if(word.length>=3)
                score+=2;



            if(word.length>=5)
                score+=2;



            result.push({

                word:word,

                score:score

            });

        });



        result.sort((a,b)=>b.score-a.score);

        return result;

    }








    compare(a,b){

        let A=this.tokenize(a);

        let B=this.tokenize(b);



        let score=0;



        A.forEach(word=>{

            if(B.includes(word))
                score++;

        });



        return score/Math.max(A.length,B.length);

    }

}

window.NormalizeEngine = NormalizeEngine;
