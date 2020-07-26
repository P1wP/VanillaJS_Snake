// VANILLA JS 
// RETRO SNAKE GAME


function checkSupported() {
    canvas = document.getElementById("canvasGame");
    if( canvas.getContext ){
        // CANVAS IS SUPPORTED
        ctx = canvas.getContext("2d");
        ctx.clearRect(0,0, canvas.width, canvas.height);
        
        // GLOBALish
        this.currentPosition = [50,50];  // SNAKE HEAD;
        
        var snakeLength = 3;        // MIN SIZE OF SNAKE
        var foodLocation = [];      // LOCATION FOOD
        var foodEaten = 0;          // EATEN FOOD
        var points = 0;             // PONITS
        var speed =  150;           // SNAKE SPEED
        var tail = [];              // TAIL OF THE SNAKE
        var direction = "right";    // TRAVEL DIRECTION
        var width = 10;             // SNAKE WIDHT
        var height = 10;            // SNAKE HEIGHT
        var wall = false;           // WALL ON / OFF
        var highscore;              // HIGHSCORE
        
        // CHECK IF HIGHSCORE
        if(localStorage.getItem("snakeScore")){
            highscore = localStorage.getItem("snakeScore");
            document.getElementById("highscore").innerHTML = highscore;
        }
        else{
            highscore = 0;
        }
        
        // KEY EVENT
        document.onkeydown = function(e) {
            var KeyCode = e.keyCode;
            
            switch(KeyCode){
                    // LEFT
                case 37:
                    // MOVE LEFT
                    if(direction === "right"){
                        break;
                    }
                    direction = "left";
                    moveSnake()
                    break;
                case 38:
                    // MOVE UP
                    if( direction === "down"){
                        break;
                    }
                    direction = "up";
                    moveSnake();
                    break;
                case 39:
                    // MOVE RIGHT
                    if( direction === "left"){
                        break;
                    }
                    direction = "right";
                    moveSnake();
                    break;
                case 40:
                    // MOVE DOWN
                    if(direction === "up"){
                        break;
                    }
                    direction = "down";
                    moveSnake();
                    break;
            }
        } // END KEY EVENT
        
        // TOUCH EVENT 
        var touchstartX = 0;
        var touchstartY = 0;
        var touchendX = 0;
        var touchendY = 0;

        var swiper = document.getElementById('canvasGame');

        swiper.addEventListener('touchstart', function(event) {
            touchstartX = event.changedTouches[0].screenX;
            touchstartY = event.changedTouches[0].screenY;
        }, false);

        swiper.addEventListener('touchend', function(event) {
            touchendX = event.changedTouches[0].screenX;
            touchendY = event.changedTouches[0].screenY;
            handleSwipe();
        }, false); 

        function handleSwipe() {
            if (touchendX <= touchstartX) {
                console.log('Swiped left');
                direction = "left";
            }
    
            if (touchendX >= touchstartX) {
                console.log('Swiped right');
                direction = "right";
            }
    
            if (touchendY <= touchstartY) {
                console.log('Swiped up');
                direction = "up";
            }
    
            if (touchendY >= touchstartY) {
                console.log('Swiped down');
                direction = "down";
            }
    
            if (touchendY === touchstartY) {
                console.log('Tap');
            }
        }
       
        
        // DRAW SNAKE
        function drawSnake(){
            // PUSH TO TAIL
            tail.push( [ currentPosition[0], currentPosition[1] ] );
            
            // DRAW
            ctx.fillStyle = "rgb(0,255,0)";
            ctx.fillRect(currentPosition[0], currentPosition[1], width, height);
            
            // CUT TAIL
            if(tail.length > snakeLength){
                var cutTail = tail.shift();
                ctx.clearRect(cutTail[0], cutTail[1], height, width);
            }
            
        }
        
        
        
        // WALL BOUNDERY
        function wallBoundry(wall) {
            if(wall){
                // SOME BOUNDRY
                return;
            }
            else{
                // NO BOUNDRY
                if(currentPosition[0] === canvas.width){
                    currentPosition[0] = 0;
                }
                else if(currentPosition[0] < 0){
                    currentPosition[0] = canvas.width;
                }
                else if( currentPosition[1] === canvas.height){
                    currentPosition[1] = 0;
                }
                else if(currentPosition[1] < 0){
                    currentPosition[1] = canvas.height;
                }
                
            }
        }
        
        
        function moveSnake() {
            switch(direction){
                    // LEFT
                case "left":
                    // MOVE LEFT
                    wallBoundry();
                    grow();
                    gameOver();
                    currentPosition[0] = currentPosition[0] - width;
                    drawSnake();
                    break;
                case "up":
                    // MOVE UP
                    wallBoundry();
                    grow();
                    gameOver();
                    currentPosition[1] = currentPosition[1] - height;
                    drawSnake();
                    break;
                case "right":
                    // MOVE RIGHT
                    wallBoundry();
                    grow();
                    gameOver();
                    currentPosition[0] = currentPosition[0] + width;
                    drawSnake();
                    break;
                case "down":
                    // MOVE DOWN
                    wallBoundry();
                    grow();
                    gameOver();
                    currentPosition[1] = currentPosition[1] + height;
                    drawSnake();
                    break;
            }
        } // ## END moveSnake ##
        
        function food(){
            foodLocation = [Math.floor(Math.random() * (canvas.width / width)) * width, Math.floor(Math.random() * (canvas.height / height)) * height];
            
            if( tail.length > 3){
                for( var i = 0; i < tail.length; i++){
                    if(tail[i][0] === foodLocation[0] && tail[i][1] === foodLocation[1]){
                        food();
                    }
                    else{
                        ctx.fillStyle = "rgb(255, 0 , 0)";
                        ctx.fillRect(foodLocation[0], foodLocation[1], height, width);
                    }
                } // END FOR LOOP
            } else{
                ctx.fillStyle = "rgb(255, 0 , 0)";
                ctx.fillRect(foodLocation[0], foodLocation[1], height, width);
            }
            
        }
        
        function grow(){
            if(currentPosition[0] === foodLocation[0] && currentPosition[1] === foodLocation[1]){
                foodEaten++;
                snakeLength += foodEaten;
                speed = speed - 25;
                points = foodEaten * 10;
                var pointToString = points.toString();
                document.getElementById("thisPoints").innerHTML= pointToString;
                if(points >= highscore){
                    document.getElementById("highscore").innerHTML = pointToString;
                }
                
                // NEW FOOD
                food();
                
            }
        } // ## END GROW ##
        
        function gameOver(){
            for( var i = tail.length-2; i >= 0; --i){
                if(currentPosition[0] === tail[i][0] && currentPosition[1] === tail[i][1]){
                    console.log("game");
                    clearInterval(game);
                    var pointsToString = points.toString();
                    if(points > highscore){
                        localStorage.setItem("snakeScore", points);
                        document.getElementById("highscore").innerHTML=pointsToString;
                    } // END IF
                    ctx.clearRect(0,0, canvas.width, canvas.height);
                    currentPosition = [50,50];
                    points = 0;
                    foodEaten = 0;
                    
                    // GAME OVER MESSAGE
                    ctx.strokeStyle="rgb(0,255,0)";
                    ctx.font = "40px Arial";
                    ctx.strokeRect(canvas.width/5, canvas.height/3, 300, 100);
                    ctx.textAlign = "center";
                    ctx.fillText("Game Over", canvas.width/2, 225);
                    ctx.stroke;
                
                }// END IF
            }
            
        } // ## END GAME OVER ##
        
        food();
        moveSnake();
        var game = setInterval(moveSnake, speed);
    }
    else {
        // CANVAS NOT SUPPORTED
        alert("Sorry, Your browser does not support canvas :( ");
    }
}