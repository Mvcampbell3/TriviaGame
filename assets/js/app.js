function Question(ask, answer, correct) {
    this.ask = ask;
    this.answer = answer;
    this.correct = correct;
};

var q1 = new Question("What is the capital of Florida", ["Tallahasse", "Orlando", "Miami", "Tampa"], "Tallahasse");

var q2 = new Question("Did Raging Al just Beat the Fuck out of Kevin Lee?", ["Yes", "Yes", "Yes", "Hell Yes"], "Hell Yes");

var q3 = new Question("Who is going to the prelims now bitch?", ["Kevin Lee", "that guy in 1", "That guy in 1", "last guy in 1"], "Kevin Lee");

var game = {

    questionArray: [q1, q2, q3],
    
    timer: null,

    whichQuestion: 0,

    wasRight: false,

    buttons: ["button1", "button2", "button3", "button4"],

    rightAnswers: 0,

    wrongAnswers: 0,


    // Methods
    displayQuestion: function(){

        if (this.whichQuestion < this.questionArray.length) {
            $(".answerButtons").show();
            $(".question").text(this.questionArray[this.whichQuestion].ask);
            for (var i = 0; i < this.buttons.length; i++){
                $("#" + this.buttons[i]).text(this.questionArray[this.whichQuestion].answer[i]);
                // had to use js not jq because it was triggering more than one click. probably from how jq handles class tags and on click
                document.getElementById(this.buttons[i]).addEventListener("click", this.checkAnswer);
            };
    
            var timeLeft = 30;
            $(".timer").text("30")
        
            this.timer = setInterval(function(){
                if (timeLeft <=0) {
                    clearInterval(game.timer);
                    console.log("ran out of time");
                    // ran out of time
                    game.whichQuestion++;
                    game.between();
                } else {
                    timeLeft = timeLeft - 1;
                    $(".timer").text(timeLeft);
                };
    
            }, 1000);
    
        } else {
            console.log("doingNothing")
            $(".question").text("Game is over");
        }

    },

    checkAnswer: function() {
        console.log($(this));
        console.log(this);
        console.log($(this).text());
        console.log(game.questionArray[game.whichQuestion].correct + " correct");
        for (var i = 0; i < game.buttons.length; i++) {
            document.getElementById(game.buttons[i]).removeEventListener("click", game.checkAnswer);
        };

        var guess = this.innerText;

        if  (guess === game.questionArray[game.whichQuestion].correct) {
            console.log("Right Answer");
            game.whichQuestion++;
            game.rightAnswers++;
            game.wasRight = true;
            clearInterval(game.timer);
            game.between();
        } else {
            console.log("wrong answer");
            clearInterval(game.timer);
            game.whichQuestion++;
            game.wrongAnswers++;
            game.wasRight = false;
            game.between();
        }
    },

    between: function() {
        $(".answerButtons").hide();
        if (game.wasRight) {
            $(".question").text("You were Right!");
            $(".answer").text("");
        } else {
            $(".question").text("You were Wrong!");
            $(".answer").text("");
    
        };
        setTimeout(function(){
            game.displayQuestion();
        }, 3000)
    },

    startGame: function() {
        $(".topSection").fadeIn();
        $(".questionArea").fadeIn();
        $(".answerButtons").attr("class", "answerButtons");
        $("#startButton").hide();

        game.displayQuestion();
    }

} //End of object


$("#startButton").on("click", game.startGame);