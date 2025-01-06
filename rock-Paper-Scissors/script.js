let userscore=0;
let computerscore=0;
const choices=document.querySelectorAll('.boxes');
const msg=document.querySelector('#msg')
const comscore=document.querySelector('#computer-score')
const playerscore=document.querySelector("#user-score");
choices.forEach((choice)=>{
    choice.addEventListener("click",()=>{
        const userchoice=choice.getAttribute('id');
        playgame(userchoice);
        
    })
})
let playgame=(userchoice)=>{
    let a=["rock","paper","scissors"]
    let computerchoice=a[Math.floor(Math.random() * a.length)];
    let result=""
    if(computerchoice==userchoice){
        msg.innerText="Match is drawn"
        setTimeout(()=>{
            msg.innerText="Play the game again"
        },2000);
    }
    else if(computerchoice=="rock"){
        result = userchoice =="paper"? "You won the game" : "Computer won the game";
        result == "You won the game"? userscore++ : computerscore++;
        playerscore.innerText=userscore;
        comscore.innerText=computerscore
        msg.innerText=result
    }
    else if(computerchoice=="paper"){
        result = userchoice =="scissors"? "You won the game" : "Computer won the game";
        result == "You won the game"? userscore++ : computerscore++;
        playerscore.innerText=userscore;
        comscore.innerText=computerscore
        msg.innerText=result
    }
    else if(computerchoice=="scissors"){
        result = userchoice =="rock"? "You won the game" : "Computer won the game";
        result == "You won the game"? userscore++ : computerscore++;
        playerscore.innerText=userscore;
        comscore.innerText=computerscore
        msg.innerText=result
    }
}