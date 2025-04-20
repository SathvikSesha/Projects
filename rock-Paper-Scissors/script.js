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
let playgame = (userchoice) => {
    let a = ["rock", "paper", "scissors"];
    let computerchoice = a[Math.floor(Math.random() * a.length)];
    let result = true;

    if (computerchoice == userchoice) {
        msg.innerText = "Match is drawn";
        setTimeout(() => {
            msg.innerText = "Play the game again";
        }, 1000);
    } else if (computerchoice == "rock") {
        result = userchoice == "paper" ? true : false;
        result == true ? userscore++ : computerscore++;
        playerscore.innerText = userscore;
        comscore.innerText = computerscore;
        msg.innerText = result
            ? `You won! ${userchoice} beats ${computerchoice}`
            : `You lost! ${computerchoice} beats your ${userchoice}`;
    } else if (computerchoice == "paper") {
        result = userchoice == "scissors" ? true : false;
        result == true ? userscore++ : computerscore++;
        playerscore.innerText = userscore;
        comscore.innerText = computerscore;
        msg.innerText = result
            ? `You won! ${userchoice} beats ${computerchoice}`
            : `You lost! ${computerchoice} beats your ${userchoice}`;
    } else if (computerchoice == "scissors") {
        result = userchoice == "rock" ? true : false;
        result == true ? userscore++ : computerscore++;
        playerscore.innerText = userscore;
        comscore.innerText = computerscore;
        msg.innerText = result
            ? `You won! ${userchoice} beats ${computerchoice}`
            : `You lost! ${computerchoice} beats your ${userchoice}`;
    }
};
