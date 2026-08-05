function saveUnknownQuestion(question){

let unknown =
JSON.parse(localStorage.getItem("unknown")) || [];


if(!unknown.includes(question)){

unknown.push(question);


localStorage.setItem(
"unknown",
JSON.stringify(unknown)
);

}

}
