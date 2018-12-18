function Question(ask, answer, correct) {
    this.ask = ask;
    this.answer = answer;
    this.correct = correct;
};

var q1 = new Question("The Internation Space Station (ISS) is how many feet long", ["312 ft.", "289 ft", "357 ft.", "373 ft."], "357 ft.");

var q2 = new Question("How many orbits of the Earth does the ISS make every 24 hours?", ["16", "9", "5", "19"], "16");

var q3 = new Question("The ISS has been continuously occupied since when?", ["Sept. 2003", "Nov. 2000", "Jan. 2002", "Feb. 2001"], "Nov. 2000");

var q4 = new Question("How many miles of wiring are on the ISS?", ["3 miles", "12 miles", "8 miles", "6 miles"], "8 miles");

var q5 = new Question("Who has the longest total time on the ISS?", ["Scott Kelly", "Mark Kelly", "Peggy Whitson", "Mikhail Kornienko"], "Peggy Whitson");

var q6 = new Question("How much time has she logged abord the space station?", ["370 days", "534 days", "746 days", "665 days"], "665 days");

var q7 = new Question("On average, how high is the ISS's orbit above Earth?", ["275 miles", "363 miles", "254 miles", "313 miles"], "254 miles");

var q8 = new Question("The ISS, A.K.A. the most expensive thing ever built, cost how much?", ["10 Billion", "12 Billion", "16 Billion", "150 Billion"], "150 Billion");

var q9 = new Question("The first piece of the ISS was launched in what year?", ["1998", "1999", "2000", "1995"], "1998")

var q10 = new Question("What year is the ISS mission expected to come to a close?", ["2025", "2032", "2037", "2028"], "2028")

var game = {

    questionArray: [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10],
    
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
                    $(".gameBox").addClass("flip");
                    setTimeout(function(){
                        game.between();
                    // }, 820); this is if on default animation timing 
                    }, 1450);// this is for linear animation timing
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
            // }, 820); this is if on default animation timing 
            }, 1450);// this is for linear animation timing

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
            // }, 820); this is if on default animation timing 
            }, 1450); //this is for linear animation timing
            
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