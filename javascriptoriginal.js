var playing = false;
var score;
var acton;
var timeRemaining;
var correctAnswer;
var id;
//if we click on start/reset
document.getElementById("startReset").onclick = function(){
    //if we are playing
    if(playing == true){
       location.reload();//yes->reload page
       }else{ //if we are not playing
           //change mode to playing
           playing = true;
           //no->set score to 0
           score = 0;
           document.getElementById("scoreValue").innerHTML = score;
           //show countdown box
//           document.getElementById("timeRemaining").style.display = "block";
           show("timeRemaining");
           timeRemaining = 60;
           document.getElementById("timeRemainingValue").innerHTML = timeRemaining;
           // hide gameover box
           hide("gameOver");
           //change button to reset
           document.getElementById("startReset").innerHTML = "Reset Game";
           //start countdown
           startCountDown();
           
           //generate a new Q&A
           generateQA();
          
       }
}
   
 // clicking on an answer box
        for(i=1;i<5;i++){
            document.getElementById("box"+i).onclick = function(){
           // check if we wre playing
            if(playing == true){
                // yes
                if(this.innerHTML == correctAnswer){
                    // correct answer
                    score++;
                    document.getElementById("scoreValue").innerHTML = score;
                    
                    // hide wrong box show correct box
                    hide("wrong");
                    show("correct");
                    setTimeout(function(){
                    hide("correct");},1000);
                    
                    // generate QA
                    generateQA();
                    
                }else{
                    hide("correct");
                    show("wrong");
                    setTimeout(function(){
                    hide("wrong");},1000);
                    
                }
            }
            
        }
     
        }
        
     //if we click on answer box
    //if we are playing
        //correct?
            //yes
                //increase score
                //show correct box for 1sec
                //generate new Q&A
            //no
                //show try again box for 1sec 

//functions

// start counter

function startCountDown(){
    action = setInterval(function(){
        timeRemaining -= 1;
         document.getElementById("timeRemainingValue").innerHTML = timeRemaining;
        if(timeRemaining == 0){
            stopCountDown();
            //document.getElementById("gameOver").style.display = "block";
            show("gameOver");
            document.getElementById("gameOver").innerHTML = "<p>Game over!</p><p>Your score is "+ score +".</p>";
           // document.getElementById("timeRemaining").style.display = "none";
            hide("timeRemaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startReset").innerHTML = "Start Game"; 
            
        }
    },1000);
}


//stop counter

function stopCountDown(){
    clearInterval(action);
}

// hide element

function hide(id){
     document.getElementById(id).style.display = "none";
}

// show element

function show(id){
     document.getElementById(id).style.display = "block";
}

// generate question and multiple answers

function generateQA(){
    var x = 1 + Math.round(9*Math.random());
    var y = 1 + Math.round(9*Math.random());
    correctAnswer = x * y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1 + Math.round(3*Math.random());
    
    
    // fill one box with correct answer
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer;
    
    // fill other boxes with wrong answers
    var answers = [correctAnswer];
    
    for(i=1;i<5;i++){
        if(i != correctPosition){
            var wrongAnswer;
            
            do{
            var wrongAnswer = (1 + Math.round(9*Math.random()))*(1 + Math.round(9*Math.random()));
        }while(answers.indexOf(wrongAnswer)>-1)
            
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
        
    }
    
}