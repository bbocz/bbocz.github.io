
    var collect = new Audio('Sounds/collect.wav'); // for collecting coins
    var death = new Audio('Sounds/lose.mp3');
    var victory = new Audio('Sounds/win.mp3');
    var totalCoins = 113;
    var lives = 3;

    function coinsLeft(){
        $('#coins_left').text(totalCoins);
    }
    function livesLeft(){
        $('#lives_left').text(lives);
    }
    function lose(){
        death.play();
    }
    function win(){
        victory.play();
    }


    var gameWorld = [ // game world tiles: 2 = block, 1 = coin, 0 = empty block
        [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [ 2, 0, 0, 1, 1, 1, 1, 1, 0, 2, 1, 0, 1, 1, 1, 0, 1, 2, 1, 0, 0, 1, 0, 0, 2],
        [ 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 2],
        [ 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 2, 1, 0, 1, 2, 0, 1, 1, 2],
        [ 2, 1, 0, 0, 1, 2, 1, 1, 1, 1, 1, 2, 1, 0, 0, 1, 1, 1, 1, 1, 2, 0, 2, 1, 2],
        [ 2, 1, 0, 0, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 0, 2],
        [ 2, 1, 1, 1, 1, 2, 2, 2, 0, 2, 0, 2, 0, 1, 1, 1, 0, 0, 1, 0, 2, 1, 2, 0, 2],
        [ 2, 1, 1, 2, 2, 0, 1, 1, 1, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 2],
        [ 2, 1, 2, 1, 0, 1, 1, 1, 0, 2, 1, 1, 1, 1, 1, 0, 2, 1, 1, 0, 1, 1, 1, 1, 2],
        [ 2, 2, 1, 1, 1, 0, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 0, 0, 1, 1, 2, 1, 0, 2],
        [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
    ];

    function createWorld(){ // function to create the game world

        var result = '';

        for( var i = 0; i<gameWorld.length; i++ ){

            result += '<div class="row">';

            for( var j = 0; j<gameWorld[i].length; j++){

                if( gameWorld[i][j] == 2){
                result += '<div class="block"></div>';
                }

                else if( gameWorld[i][j] == 1){
                    result += '<div class="coin"></div>';
                }

                else if( gameWorld[i][j] == 0){
                    result += '<div class="empty"></div>';
                }
            }
            result += '</div>';
        }

        $('#game_container').html(result);

    } // end of function createWorld

    var sprite = { // pacman initial position
        y_position: 1,
        x_position: 1
    }

    function moveSprite(){
        document.getElementById('sprite').style.top = sprite.y_position*30 + 'px';
        document.getElementById('sprite').style.left = sprite.x_position*30 + 'px';
    }

    var enemy = {
        y_position: 9,
        x_position: 7
    }
    var enemy2 = {
        y_position: 3,
        x_position: 14
    }

    function createEnemy(){

        document.getElementById('enemy').style.top = enemy.y_position*30 + 'px';
        document.getElementById('enemy').style.left = enemy.x_position*30 + 'px';

        document.getElementById('enemy2').style.top = enemy2.y_position*30 + 'px';
        document.getElementById('enemy2').style.left = enemy2.x_position*30 + 'px';
    }

    function moveEnemy(){

        var random = Math.floor(Math.random() * 4) + 37;

        switch (random) {
            case 37: if(gameWorld[enemy.y_position][enemy.x_position-1] !== 2){
                        enemy.x_position--;
                        $('#enemy').css( 'transform', 'scaleX(-1)');
                    }
                    if(gameWorld[enemy2.y_position+1][enemy2.x_position] !== 2){
                        enemy2.y_position++;
                    }
                    break;
            case 39: if(gameWorld[enemy.y_position][enemy.x_position+1] !== 2){
                        enemy.x_position++;
                        $('#enemy').css('transform', 'scaleX(1)');
                    }
                    if(gameWorld[enemy2.y_position-1][enemy2.x_position] !== 2){
                        enemy2.y_position--;
                    }
                    break;
            case 38: if(gameWorld[enemy.y_position-1][enemy.x_position] !== 2){
                        enemy.y_position--;
                    }
                    if(gameWorld[enemy2.y_position][enemy2.x_position+1] !== 2){
                        enemy2.x_position++;
                        $('#enemy2').css( 'transform', 'scaleX(1)');
                    }
                    break;
            case 40: if(gameWorld[enemy.y_position+1][enemy.x_position] !== 2){
                        enemy.y_position++;
                    }
                    if(gameWorld[enemy2.y_position][enemy2.x_position-1] !== 2){
                        enemy2.x_position--;
                        $('#enemy2').css( 'transform', 'scaleX(-1)');
                    }
                    break;
            }
            createEnemy();
    }

    function dead(){
        if( enemy.y_position == sprite.y_position && enemy.x_position == sprite.x_position ||
            enemy2.y_position == sprite.y_position && enemy2.x_position == sprite.x_position){
                lives--;
                sprite.x_position = 1;
                sprite.y_position = 1;
                livesLeft();
                if( lives === 0){
                    lose();
                    alert('You Lose!');
                    location.reload();
                }
            }
    }

    $(document).ready(function(){

        createWorld();
        moveSprite();
        createEnemy();
        moveEnemy();
        coinsLeft();
        livesLeft();
        setInterval(moveEnemy, 450);

        document.onkeydown = function(event){

            if( event.keyCode == 37 && gameWorld[sprite.y_position][sprite.x_position-1] !== 2){
                sprite.x_position --;
                $('#sprite').css('transform', 'rotate(180deg)');
            }

            else if( event.keyCode == 39 && gameWorld[sprite.y_position][sprite.x_position+1] !== 2){
                sprite.x_position ++;
                $('#sprite').css('transform', 'rotate(0deg)');
            }

            else if( event.keyCode == 38 && gameWorld[sprite.y_position-1][sprite.x_position] !== 2){
                sprite.y_position --;
                $('#sprite').css('transform', 'rotate(270deg)');
            }

            else if( event.keyCode == 40 && gameWorld[sprite.y_position+1][sprite.x_position] !== 2){
                sprite.y_position ++;
                $('#sprite').css('transform', 'rotate(90deg)');
            }

            if( gameWorld[sprite.y_position][sprite.x_position] == 1){ // collect coins

                collect.play();
                totalCoins--;
                coinsLeft();
                gameWorld[sprite.y_position][sprite.x_position] = 0;
                createWorld();

                if( totalCoins == 0){
                    win();
                    alert('You Win!');
                    location.reload();
                }
            }
            dead();
            moveSprite();
        }
    });
