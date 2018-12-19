function Question(ask, answer, correct) {
    this.ask = ask;
    this.answer = answer;
    this.correct = correct;
};

// Space Station Category-------------------------------------------------------------------------
var q1 = new Question("The Internation Space Station (ISS) is how many feet long?", ["312 ft.", "289 ft", "357 ft.", "373 ft."], "357 ft.");

var q2 = new Question("How many orbits of the Earth does the ISS make every 24 hours?", ["16 orbits", "9 orbits", "5 orbits", "19 orbits"], "16 orbits");

var q3 = new Question("The ISS has been continuously occupied since when?", ["Sept. 2003", "Nov. 2000", "Jan. 2002", "Feb. 2001"], "Nov. 2000");

var q4 = new Question("How many miles of wiring are on the ISS?", ["3 miles", "12 miles", "8 miles", "6 miles"], "8 miles");

var q5 = new Question("Who has the longest total time on the ISS?", ["Scott Kelly", "Mark Kelly", "Peggy Whitson", "Mikhail Kornienko"], "Peggy Whitson");

var q6 = new Question("How much time has she logged abord the space station?", ["370 days", "534 days", "746 days", "665 days"], "665 days");

var q7 = new Question("On average, how high is the ISS's orbit above Earth?", ["275 miles", "363 miles", "254 miles", "313 miles"], "254 miles");

var q8 = new Question("The ISS, A.K.A. the most expensive thing ever built, cost how much?", ["10 Billion", "12 Billion", "16 Billion", "150 Billion"], "150 Billion");

var q9 = new Question("The first piece of the ISS was launched in what year?", ["1998", "1999", "2000", "1995"], "1998");

var q10 = new Question("What year is the ISS mission expected to come to a close?", ["2025", "2032", "2037", "2028"], "2028");

// President Category -------------------------------------------------------------------------------

var q11 = new Question("Who is the youngest person to serve as President?", ["Barrack Obama", "Theodore Roosevelt", "George W. Bush", "John F. Kennedy"], "Theodore Roosevelt");

var q12 = new Question("Who is the only President to serve 2 terms nonconsecutively?", ["Grover Cleveland", "Franklin Roosevelt", "James K. Polk", "John Adams"], "Grover Cleveland");

var q13 = new Question('Who is the only President to come from the "Federalist" party?', ["John Adams", "Benjamin Harrison", "George Washington", "Thomas Jefferson"], "John Adams");

var q14 = new Question("Who was the first President to be born a United States citizen?", ["James Madison", "William Harrison", "Martin Van Buren", "James K. Polk"], "Martin Van Buren");

var q15 = new Question("Which President has the shortest term in office?", ["William Harrison", "Zachary Taylor", "James Garfield", "William Mckinley"], "William Harrison");

var q16 = new Question("Which President was never elected President or Vice-President?", ["Richard Nixon", "John Tyler", "Chester Arthur", "Gerald Ford"], "Gerald Ford");

var q17 = new Question("Who was the first President to be born in a hospital?", ["Harry Truman", "Dwight Eisenhower", "John F. Kennedy", "Jimmy Carter"], "Jimmy Carter");

var q18 = new Question("Which President was the first President to see the Pacific Ocean?", ["James Garfield", "Ulysses Grant", "James Buchanan", "Abraham Lincoln"], "Ulysses Grant");

var q19 = new Question("Who was the first President to have Air Force One?", ["Harry Truman", "Dwight Eisenhower", "Franklin Roosevelt", "Herbert Hoover"], "Dwight Eisenhower");

var q20 = new Question("Which President went on to become a Justice of the Supreme Court?", ["William Taft", "James Madison", "John Quincy Adams", "Calvin Coolidge"], "William Taft");

// end question objects---------------------------------------------------------------------------

var game = {

    ISSArray: [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10],
    PresArray: [q11, q12, q13, q14, q15, q16, q17, q18, q19, q20],

    questionArray: [],
    
    timer: null,

    whichQuestion: 0,
    displayWhich: 1,

    wasRight: false,
    timeOut: false,

    oldRight: "",

    buttons: ["button1", "button2", "button3", "button4"],

    rightAnswers: 0,

    wrongAnswers: 0,

    // Methods
    displayQuestion: function(){

        if (this.whichQuestion < this.questionArray.length) {
            $(".questionNumber").text(game.displayWhich);
            game.timeOut = false;
            $(".answerButtons").show();
            $(".question").html("<h2>"+this.questionArray[this.whichQuestion].ask+"</h2>");
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
                    game.oldRight = game.questionArray[game.whichQuestion].correct;
                    game.wrongAnswers++;
                    game.whichQuestion++;
                    game.displayWhich++;
                    game.timeOut = true,
                    game.wasRight = false,
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
                $(".question").html("<h2>Game Over</h2><br><h2> You got " + game.rightAnswers + " Right</h2><br><h2> You got " + game.wrongAnswers + " Wrong</h2>");
                $(".startGamePlace").show();
                $(".restart").show()
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
            game.oldRight = game.questionArray[game.whichQuestion].correct;
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
            game.oldRight = game.questionArray[game.whichQuestion].correct;
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
            $(".question").html("<h2>You are Right!</h2>" + "<br>" + "<h2> Correct Answer was:</h2><br><h2>" + game.oldRight + "</h2>");
            $(".answer").text("");
        } else {
            if (!game.timeOut) {
                $(".question").html("<h2>You are Wrong!</h2>" + "<br>" + "<h2> Correct Answer was:</h2><br><h2>" + game.oldRight + "</h2>");
                $(".answer").text("");
            } else {
                $(".question").html("<h2>You ran out of Time!</h2>" + "<br>" + "<h2> Correct Answer was:</h2><br><h2>" + game.oldRight + "</h2>");
                $(".answer").text("");
            }
        };
        setTimeout(function(){
            game.displayQuestion();
            $(".gameBox").removeClass("flip");
        }, 2500);
    },

    restart: function(){
        $(".hide").show();
        $(".answerButtons").attr("class", "answerButtons hidden");
        $(".questionArea").hide();
        $(".restart").hide();
        game.questionArray = [];
        game.rightAnswers = 0;
        game.wrongAnswers = 0;
        game.whichQuestion = 0;
        game.displayWhich = 1;
    },

    startGame: function() {
        switch ($(this).attr("value")){
            case "pres":
                game.questionArray = game.PresArray;
                $(".mainTitle").text("U.S. President Trivia");
                $(".mainTitle").addClass("mainTitle2").removeClass("mainTitle")
                break;
            case "iss":
                game.questionArray = game.ISSArray;
                $(".mainTitle").text("Space Station Trivia");
                break;
            default:
                console.log("switch startGame not working as expected");

        };
        $(".topSection").fadeIn();
        $(".questionArea").fadeIn();
        $(".answerButtons").attr("class", "answerButtons");
        $(".hide").hide();
        $(".startGamePlace").hide();

        game.displayQuestion();
    }

} //End of object


$(".btn").on("click", game.startGame);

$(".restart").on("click", game.restart);
