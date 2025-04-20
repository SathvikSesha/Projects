let boxes=document.querySelectorAll('.box');
let resetbtn=document.querySelector('#reset');
let winner=document.querySelector('#win');
let a=document.createElement("button");
a.innerText="Play Again";
a.setAttribute("id","again");
resetbtn.addEventListener('click',()=>{
    for(let i=0;i<boxes.length;i++){
        boxes[i].innerText="";
    }
})
let turnO=true;

const winpat=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];
let moves=0;
boxes.forEach((box)=>{
    box.addEventListener('click',() => {
        moves++;
        if(turnO){
            box.innerText="O";
            turnO=false;
        }else{
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true;
        checkwinner();
    });
});
const checkwinner =()=>{
    if(moves==9){
        winner.style.display="block"
        winner.innerText=`X O \n Match Drawn\n`
        winner.append(a);
        document.querySelector('h1').style.visibility="hidden"
    }
    for(pattern of winpat){
        let pos1=boxes[pattern[0]].innerText;
        let pos2=boxes[pattern[1]].innerText;
        let pos3=boxes[pattern[2]].innerText;
        if(pos1!="" && pos2!="" && pos3!=""){
            if(pos1===pos2 && pos2===pos3){
                winner.style.display="block"
                winner.innerText=`${pos1} Won the Game \n Congragulations!!\n`
                winner.append(a);
                document.querySelector('h1').style.visibility="hidden"
            }
        }
    }
}
a.addEventListener('click',()=>{
    location.reload();
})

