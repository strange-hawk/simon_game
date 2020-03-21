var userClickedPattern=[]
var buttonColours=['red','blue','green','yellow']
var gamePattern=[]
var level=0

function nextSequence(){
    randomNumber=Math.floor(Math.random()*4)
    playSound(buttonColours[randomNumber])
    animatePress(buttonColours[randomNumber])
    level=level+1
    $('h1').text('level '+level)
    gamePattern.push(buttonColours[randomNumber])
    userClickedPattern.length=0
}
$('.btn').click(function(){
    userChosenColour=$(this).attr('id')
    userClickedPattern.push(userChosenColour)
    animatePress(userChosenColour)
    playSound(userChosenColour)
    checkanswer(userClickedPattern.length-1)
})

function playSound(name){
    var audio=new Audio('sounds/'+name+'.mp3')
    audio.play()
}

function animatePress(currentColour){
    $('#'+currentColour).addClass('pressed')
    setTimeout(function(){
        $('#'+currentColour).removeClass('pressed')
        
    },100)
    
    
    // await sleep(100)
    // $('#'+currentColour).removeClass('pressed')

}
$(document).keypress(function(event){
    if (event.key!='R' && event.key!='r')
    nextSequence()
    // setTimeout(function(){nextSequence()},1000)
    // console.log(event)
    
})

function checkanswer(currentLevel){
    if(currentLevel==level-1){
        if (userClickedPattern[currentLevel]==gamePattern[currentLevel]){
            setTimeout(function(){nextSequence()},1000)}
    }
    if (userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        // console.log('correct')
    //     setTimeout(function(){
    //         nextSequence()
    //     },1000)
    //     // nextSequence()
    }
    else{
        var audio=new Audio('sounds/wrong.mp3')
        audio.play()
        $('body').addClass('game-over')
        setTimeout(function(){
            $('body').removeClass('game-over')
        },200)
        $('h1').text('Game Over, press R to Restart')
        $(document).keypress(function(event){
            gamePattern.length=0
            level=0
            if(event.key=='r' || event.key=='R'){
                setTimeout(function()
                {
                    nextSequence()
                },800)
        }
    
    })
}

}
