function Question(ask, answer, correct) {
    this.ask = ask;
    this.answer = answer;
    this.correct = correct;
};

var q1 = new Question("What is the capital of Florida?", ["Tallahasse", "Orlando", "Miami", "Tampa"], "Tallahasse");

var q2 = new Question("Did Raging Al just Beat the Fuck out of Kevin Lee?", ["Yes", "Yes", "Yes", "Hell Yes"], "Hell Yes");

var q3 = new Question("Who is going to the prelims now bitch?", ["Kevin Lee", "that guy in 1", "That guy in 1", "last guy in 1"], "Kevin Lee");

var game = {

    questionArray: [q1, q2, q3],
    
    timer: null,

    whichQuestion: 0,
    displayWhich: 1,

    wasRight: false,
    timeOut: false,

    buttons: ["button1", "button2", "button3", "button4"],

    rightAnswers: 0,

    wrongAnswers: 0,


    // Methods
    displayQuestion: function(){

        if (this.whichQuestion < this.questionArray.length) {
            $(".questionNumber").text(game.displayWhich);
            game.timeOut = false;
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
                    game.wrongAnswers++;
                    game.whichQuestion++;
                    game.timeOut = true,
                    game.between();
                } else {
                    timeLeft = timeLeft - 1;
                    $(".timer").text(timeLeft);
                };
    
            }, 1000);
    
        } else {
            console.log("game over");
            // Might want to make an EndGame method which does all of the stuff
            $(".question").text("");
            
            $(".topSection").slideUp();
            setTimeout(function(){
                $(".question").html("<h2>Game Over</h2><br><h3> You got " + game.rightAnswers + " Right</h3><br><h3> You got " + game.wrongAnswers + " Wrong</h3>");
            }, 500);
        };

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
            game.displayWhich++;
            game.wasRight = true;
            clearInterval(game.timer);
            $(".gameBox").addClass("flip");
            setTimeout(function(){
                game.between();
            // }, 820);
            }, 1450);

        } else {
            console.log("wrong answer");
            clearInterval(game.timer);
            game.whichQuestion++;
            game.displayWhich++;
            game.wrongAnswers++;
            game.wasRight = false;
            $(".gameBox").addClass("flip");
            setTimeout(function(){
                game.between();
            // }, 820);
            }, 1450);
            
        }
    },

    between: function() {
        $(".answerButtons").hide();
        if (game.wasRight) {
            $(".question").text("You are Right!");
            $(".answer").text("");
        } else {
            if (!game.timeOut) {
            $(".question").text("You are Wrong!");
            $(".answer").text("");
            } else {
                $(".question").text("You ran out of Time!!!")
                $(".answer").text("");
            }
    
        };
        setTimeout(function(){
            game.displayQuestion();
            $(".gameBox").removeClass("flip");
        }, 1500)
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