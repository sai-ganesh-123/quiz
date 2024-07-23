const question = [
    {
    question: "which is the largest animal in the world" ,
    answers: [
        { text: "shark", correct: false},
        { text: "Blue whale", correct: true},
        { text: "Elephant", correct: false},
        { text: "Giraffe", correct: false}]
},
{
    question: "which is the smallest country in the world" ,
    answers: [
        { text: "Vatican city", correct: true},
        { text: "Bhutan", correct: false},
        { text: "Nepal", correct: false},
        { text: "Sri lanka", correct: false}]
},
{
    question: "which is the largest desert in the world" ,
    answers: [
        { text: "Kalahari", correct: false},
        { text: "Gobi", correct: false},
        { text: "Sahara", correct: false},
        { text: "Antartica", correct: true}]
},
{
    question: "which is the smallest continent in the world?" ,
    answers: [
        { text: "Asia", correct: false},
        { text: "Australia", correct: true},
        { text: "Arctic", correct: false},
        { text: "Africa", correct: false}]
}

];
const questionelement = document.getElementById("question");
const answerbutton = document.getElementById("answer-buttons");
const nextbutton = document.getElementById("next-btn");

let currentquestionindex = 0;
let score =0;
 function startquiz(){
    currentquestionindex = 0;
    score = 0;
    nextbutton.innerHTML = "Next";
    showQuestion();
 }
function showQuestion(){
    resetstate();
    let currentquestion = question[currentquestionindex];
    let questionno = currentquestionindex + 1;
    questionelement.innerHTML = questionno + ". " + currentquestion.question;

    currentquestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerbutton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectanswer);
    });
}

function resetstate(){
    nextbutton.style.display = "none";
    while(answerbutton.firstChild){
        answerbutton.removeChild(answerbutton.firstChild);
    }
}

function selectanswer(e){
    const selectedbtn = e.target;
    const iscorrect = selectedbtn.dataset.correct === "true";
    if(iscorrect){
        selectedbtn.classList.add("correct");
        score++;
    }
    else{
        selectedbtn.classList.add("incorrect");
    }
    Array.from(answerbutton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextbutton.style.display = "block";

}

function showscore(){
    resetstate();
    questionelement.innerHTML = `you scored ${score} out of ${question.length}!`;
    nextbutton.innerHTML = "Play Again";
    nextbutton.style.display = "block";
}

function handlenextbutton(){
    currentquestionindex++;
    if(currentquestionindex < question.length){
        showQuestion();
    }
    else{
        showscore();
    }
}

nextbutton.addEventListener("click",()=>{
    if(currentquestionindex < question.length){
        handlenextbutton();
    }
    else{
        startquiz();
    }
})

startquiz();