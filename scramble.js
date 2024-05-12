const wordText=document.querySelector(".word"),
hinttext=document.querySelector(".hint span"),
timeText=document.querySelector(".time b"),
inputFeild=document.querySelector("input"),
refreshBtn=document.querySelector(".refresh-word"),
checkBtn=document.querySelector(".check-word");

let correctWord,timer;

const initTimer = maxTime=>{
    clearInterval(timer);
    timer=setInterval(()=>{
        if(maxTime > 0){
            maxTime--;
            return timeText.innerText=maxTime;
        }
        clearInterval(timer);
        alert(`Time up!⏳ ${correctWord.toLocaleUpperCase()} was the correct word`);
        initGame();  //calling initGame for restarting
    },1000);
}

const initGame=()=>{
    initTimer(30);  //setting timer to 30s
    let randomObj=words[Math.floor(Math.random() * words.length)];   //getting random words
    let wordArray=randomObj.word.split("");   //splitting each letter of random word

    for(let i=wordArray.length-1; i>0; i--){
        let j=Math.floor(Math.random() * (i+1));  //getting random number

        [wordArray[i],wordArray[j]]=[wordArray[j],wordArray[i]];   //shuffling and swipping wordarray letters randomly
    }
    wordText.innerText=wordArray.join("");   //passing shuffle word as word text
    hinttext.innerText=randomObj.hint;
    correctWord=randomObj.word.toLocaleLowerCase();     //passing random word to correct word
    inputFeild.value="";
    inputFeild.setAttribute("maxlength",correctWord.length);  //word length should not more than the answer
    console.log(randomObj);
}
initGame();

const checkWord=()=>{
    let userWord=inputFeild.value.toLocaleLowerCase();  //getting user value
    if(!userWord)
        return alert("Opps! 😒 You haven't enter anything,please enter a word ");   //if user didn't enter anything 

    if(userWord != correctWord)
        return alert(`Oops! 🤦‍♂️ ${userWord} is not a correct word`);

    alert(`Congrats! 😍 ${userWord.toLocaleUpperCase()} is a correct word `);
    initGame();
}

refreshBtn.addEventListener("click",initGame);
checkBtn.addEventListener("click",checkWord);