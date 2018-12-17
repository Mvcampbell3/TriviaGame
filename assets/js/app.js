function Question(ask, answer, correct) {
    this.ask = ask;
    this.answer = answer;
    this.correct = correct;
};

var timer;

var q1 = new Question("What is the capital of Florida", ["Tallahase", "Orlando", "Miami", "Tampa"], "Tallahase");

var q2 = new Question("Did Raging Al just Beat the Fuck out of Kevin Lee?", ["Yes", "Yes", "Yes", "Hell Yes"], "Hell Yes");

var q3 = new Question("Who is going to the prelims now bitch?", ["Kevin Lee", "that guy in 1", "That guy in 1", "last guy in 1"], "Kevin Lee");

var questionArray = [q1, q2, q3];

var whichQuestion = 0;

var wasRight = false;

var buttons = ["button1", "button2", "button3", "button4"];



var rightAnswers = 0;
var wrongAnswers = 0;

function displayQuestion(){
    if (whichQuestion < questionArray.length) {
        $(".question").text(questionArray[whichQuestion].ask);
        for (var i = 0; i < buttons.length; i++){
            $("#" + buttons[i]).text(questionArray[whichQuestion].answer[i]);
            document.getElementById(buttons[i]).addEventListener("click", checkAnswer);
        };

        var timeLeft = 30;
        $(".timer").text("30")
    
        timer = setInterval(function(){
            if (timeLeft <=0) {
                clearInterval(timer);
                console.log("ran out of time");
                // ran out of time
                whichQuestion++;
                between();
            } else {
                timeLeft = timeLeft - 1;
                $(".timer").text(timeLeft);
            };

        }, 1000);

    } else {
            console.log("doingNothing")
        };
};


    

function checkAnswer() {
    console.log($(this));
    console.log(this);
    console.log($(this).text());
    console.log(questionArray[whichQuestion].correct + " correct");
    for (var i = 0; i < buttons.length; i++) {
        document.getElementById(buttons[i]).removeEventListener("click", checkAnswer);
    };

    var guess = this.innerText;

    if  (guess === questionArray[whichQuestion].correct) {
        console.log("Right Answer");
        whichQuestion++;
        rightAnswers++;
        wasRight = true;
        // clearInterval(timer);
        between();
    } else {
        console.log("wrong answer");
        // clearInterval(timer);
        whichQuestion++;
        wrongAnswers++;
        wasRight = false;
        between();
    }
};


function between(){
    if (wasRight) {
        $(".question").text("You were Right!");
        $(".answer").text("");
    } else {
        $(".question").text("You were Wrong!");
        $(".answer").text("");

    };
    setTimeout(function(){
        displayQuestion();
    }, 3000)
}

displayQuestion();

var game = {

    

}