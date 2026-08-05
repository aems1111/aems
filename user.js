let users =
JSON.parse(localStorage.getItem("users")) || [];



function register(){


let username =
document.getElementById("username").value.trim();


let password =
document.getElementById("password").value.trim();



if(username=="" || password==""){

alert("همه قسمت‌ها را پر کن");

return;

}



let exists =
users.find(
u=>u.username===username
);



if(exists){

alert("این نام کاربری وجود دارد");

return;

}



users.push({

username:username,

password:password

});



localStorage.setItem(
"users",
JSON.stringify(users)
);



alert("ثبت نام موفق بود ✅");


window.location="login.html";


}





function login(){


let username =
document.getElementById("username").value.trim();


let password =
document.getElementById("password").value.trim();



let user =
users.find(
u =>
u.username===username &&
u.password===password
);



if(user){


localStorage.setItem(
"currentUser",
username
);



alert("خوش آمدی "+username+" 😊");


window.location="index.html";


}

else{


alert("نام کاربری یا رمز اشتباه است");


}


}
