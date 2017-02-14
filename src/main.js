// import {canMoveLeft,canMoveRight,canMoveUp,canMoveDown,noBlockHorizontal,noBlockVertical,nomove} from './determine';



//point:每次通过改变数组重新生成div
//利用二维数组来存储数据
var arr=[],
    hasConflicted=[],
    score=0,
    //开关，控制移动事件，每次只有一个同时发生
    onOff=false,
    //移动端滑动
    startx = 0,
    starty = 0,
    endx = 0,
    endy = 0;



//自适应计算
var documentWidth = window.screen.availWidth;
var gridContainerWidth = 0.92 * documentWidth;
var cellSideLength = 0.18 * documentWidth;
var cellSpace = 0.04*documentWidth;

//开始新游戏
prepareForMobile();
newgame();
$('.newgamebutton').click(function () {

    //游戏状态删除
    for(var i = 0;i < 4;i++){
        for(var j = 0;j < 4;j++){
            localStorage.removeItem('state'+ i + j)
        }
    }
    return newgame();
});

//新游戏
$('.end').click(function () {

    //游戏状态删除
    for(var i = 0;i < 4;i++){
        for(var j = 0;j < 4;j++){
            localStorage.removeItem('state'+ i + j)
        }
    }
    $('.end').hide();
    return newgame();
});

// $('.newgamebutton').click(newgame);

function newgame() {

    //最高分设置
    changeScore();
    //初始化
    init();

    // if (localStorage.getItem('onOff') == 'on'){
    //     return;
    // }
    if(localStorage.getItem('state33')){
        return;
    }
    //生成一个随机数
    generateOneNumber();
    generateOneNumber();

}
function changeScore() {

    var num = localStorage.getItem('score') || 0;
    $('#best').text( num );

    if( num < score){
        localStorage.setItem('score',score);
        $('#best').text( score );
    }
}

function prepareForMobile(){
    //判断屏幕大小
    if( documentWidth > 500 ){
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }
    //也可用媒体查询
    if( documentWidth < 500 ) {
        $('h1').css('font-size',0.15 * documentWidth + 'px');
        $('.record').css('font-size','20px')
    }
    $('header').css('width',gridContainerWidth);
    $('.grid-container').css('width',gridContainerWidth - 2*cellSpace);
    $('.grid-container').css('height',gridContainerWidth - 2*cellSpace);
    $('.grid-container').css('padding', cellSpace);
    $('.grid-container').css('border-radius',0.02*gridContainerWidth);

    $('.grid-cell').css('width',cellSideLength);
    $('.grid-cell').css('height',cellSideLength);
    $('.grid-cell').css('border-radius',0.02*cellSideLength);
}

function init() {

    //初始化二维数组
    for (var i = 0; i < 4; i++) {
        arr[i] = [];
        hasConflicted[i] = [];
        for (var j = 0; j < 4; j++) {
            arr[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }
    score = 0;
    //判断是否以前玩过
    if (localStorage.getItem('state33')) {
        score = localStorage.getItem('localScore') || 0;
        score = parseInt(score);
        for(var i = 0;i < 4;i++){
            for(var j = 0;j < 4;j++){
                arr[i][j] = parseInt(localStorage.getItem('state'+i+j));
            }
        }
    }

    updateNumberCell();
    $('#score').text( score );
}

function updateNumberCell() {
    //移除
    $('.number-cell').remove();
    for(var i = 0;i< 4;i++){
        for(var j = 0;j <4;j++){
            $('.grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell = $('#number-cell-'+i+'-'+j);

            if( arr[i][j] == 0 ){
                theNumberCell.css('background-color','transparent');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
            } else {
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBackgroundColor( arr[i][j] ) );
                theNumberCell.css('color',getNumberColor( arr[i][j] ) );
                theNumberCell.text( arr[i][j] );
                numberSize(theNumberCell,arr[i][j]);
            }

            hasConflicted[i][j] = false;
        }
    }
    //统一赋值
    $('.number-cell').css({'width':cellSideLength,'height':cellSideLength,'line-height':cellSideLength+'px'});

}

//判断数值绝对字体大小
function numberSize(theNumberCell,number) {
    if(number < 100) {
        theNumberCell.css('font-size',0.6*cellSideLength+'px');
    } else if ( number < 1000 ){
        theNumberCell.css('font-size',0.5*cellSideLength+'px');
    } else  {
        theNumberCell.css('font-size',0.4*cellSideLength+'px');
    }
}

//位置确定
function getPosTop( i , j ){
    return cellSpace + i*( cellSpace + cellSideLength );
}

function getPosLeft( i , j ){
    return cellSpace + j*( cellSpace + cellSideLength );
}
//生成颜色
function getNumberBackgroundColor( number ){
    switch( number ){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
    }
    return "#000";
}
//初始颜色，不大于4
function getNumberColor( number ){
    if( number <= 4 )return "#776e65";
    return "#fff";
}

//生成随机数
function generateOneNumber() {
    //判断是否有空间
    if (nospace(arr)){
        return false;
    }

    //生成随机位置
    var randX = parseInt (Math.random() * 4);
    var randY = parseInt (Math.random() * 4);


/*    //算法优化
    var count=0;
    var temporary=[];
    for(var i=0;i<4;i++) {
        for (var j = 0; j < 4; j++) {
            if (arr[i][j] == 0) {
                temporary[count] = i * 4 + j;
                count++;
            }
        }
    }
    var pos= parseInt( Math.floor( Math.random()  * count ) );
    randx=Math.floor(temporary[pos]/4);
    randy=Math.floor(temporary[pos]%4);*/
    while (true) {
        //保证随机位置为空
        if (arr[randX][randY] == 0) {
            break;
        }
        //不为空则重新生成
        randX = parseInt (Math.random() * 4);
        randY = parseInt (Math.random() * 4);
    }

    //随机生成数字 2 4
    var randNumber = Math.random() > 0.5 ? 2 : 4;
    arr[randX][randY] = randNumber;

    showNumberWithAnimation( randX , randY , randNumber );
    saveState();
}

function showNumberWithAnimation( i , j , randNumber ){

    var numberCell = $('#number-cell-' + i + "-" + j );

    numberCell.css('background-color',getNumberBackgroundColor( randNumber ) );
    numberCell.css('color',getNumberColor( randNumber ) );
    numberCell.text( randNumber );
    numberSize(numberCell,randNumber);

    numberCell.animate({
        width:cellSideLength,
        height:cellSideLength
    },50);
}

function nospace( arr ){
    for( var i = 0 ; i < 4 ; i ++ ) {
        for (var j = 0; j < 4; j++) {
            if (arr[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}

//PC事件监听
$(document).keydown( function(e) {


    switch(e.keyCode) {
        //左
        case 37:
            e.preventDefault();
            //增加判断，一次只能执行一个方向
            if(onOff) return;
            if (moveLeft()) {
                onOff = true;
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        //上
        case 38:
            e.preventDefault();
            //增加判断，一次只能执行一个方向
            if(onOff) return;
            if( moveUp() ){
                onOff = true;
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        //右
        case 39:
            e.preventDefault();
            //增加判断，一次只能执行一个方向
            if(onOff) return;
            if( moveRight() ){
                onOff = true;
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        //下
        case 40:
            e.preventDefault();
            //增加判断，一次只能执行一个方向
            if(onOff) return;
            if( moveDown() ){
                onOff = true;
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        default:
            break;
    }
});

//移动端事件监听
document.addEventListener('touchstart',function(event){
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});
//阻止手机上后退
document.addEventListener('touchmove',function(event){
    event.preventDefault();
});

document.addEventListener('touchend',function(event){
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    var deltax = endx - startx;
    var deltay = endy - starty;

    //判断滑动距离是否过短
    if( Math.abs( deltax ) < 0.1*documentWidth && Math.abs( deltay ) < 0.1*documentWidth ){
        return;
    }
    //XY方向哪个长往哪移动
    if( Math.abs( deltax ) >= Math.abs( deltay ) ){

        if( deltax > 0 ){
            //move right
            if( moveRight() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
        }
        else{
            //move left
            if( moveLeft() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
        }
    }
    else{
        if( deltay > 0 ){
            //move down
            if( moveDown() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
        }
        else{
            //move up
            if( moveUp() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
        }
    }
});

//游戏状态存储
function saveState() {
    for(var i = 0;i < 4;i++){
        for(var j = 0;j < 4;j++){
            localStorage.setItem('state'+ i + j, arr[i][j])
        }
    }
    localStorage.setItem('localScore',score)
}


function moveLeft() {
    //判断能否向左移动，只要最左侧一列有空或最左边两个数字相同
    if( !canMoveLeft( arr ) ) {
        return false;
    }
    //moveLeft
    for( var i = 0 ; i < 4 ; i ++ ){
        for( var j = 1 ; j < 4 ; j ++ ){
            if( arr[i][j] != 0 ){

                for( var k = 0 ; k < j ; k ++ ){
                    if( arr[i][k] == 0 && noBlockHorizontal( i , k , j , arr ) ){
                        //移动
                        showMoveAnimation( i , j , i , k );
                        arr[i][k] = arr[i][j];
                        arr[i][j] = 0;
                        break;
                    }
                    else if( arr[i][k] == arr[i][j] && noBlockHorizontal( i , k , j , arr ) && !hasConflicted[i][k]  ){
                        //移动
                        showMoveAnimation( i , j , i , k );
                        //合并
                        arr[i][k] += arr[i][j];
                        arr[i][j] = 0;

                        //add score
                        score += arr[i][k];
                        updateScore( score );

                        hasConflicted[i][k] = true;
                        break;
                    }
                }
            }
        }
    }
    setTimeout("updateNumberCell()",200);
    return true;
}

function moveRight(){
    if( !canMoveRight( arr ) )
        return false;

    //moveRight
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 2 ; j >= 0 ; j -- ){
            if( arr[i][j] != 0 ){
                for( var k = 3 ; k > j ; k -- ){

                    if( arr[i][k] == 0 && noBlockHorizontal( i , j , k , arr ) ){
                        //move
                        showMoveAnimation( i , j , i , k );
                        arr[i][k] = arr[i][j];
                        arr[i][j] = 0;
                        break;
                    }
                    else if( arr[i][k] == arr[i][j] && noBlockHorizontal( i , j , k , arr ) && !hasConflicted[i][k] ){
                        //move
                        showMoveAnimation( i , j , i , k);
                        //add
                        arr[i][k] += arr[i][j];
                        arr[i][j] = 0;
                        //add score
                        score += arr[i][k];
                        updateScore( score );

                        hasConflicted[i][k] = true;
                        break;
                    }
                }
            }
        }

    setTimeout("updateNumberCell()",200);
    return true;
}

function moveUp(){

    if( !canMoveUp( arr ) )
        return false;

    //moveUp
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 1 ; i < 4 ; i ++ ){
            if( arr[i][j] != 0 ){
                for( var k = 0 ; k < i ; k ++ ){

                    if( arr[k][j] == 0 && noBlockVertical( j , k , i , arr ) ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        arr[k][j] = arr[i][j];
                        arr[i][j] = 0;
                        break;
                    }
                    else if( arr[k][j] == arr[i][j] && noBlockVertical( j , k , i , arr ) && !hasConflicted[k][j] ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        //add
                        arr[k][j] += arr[i][j];
                        arr[i][j] = 0;
                        //add score
                        score += arr[k][j];
                        updateScore( score );

                        hasConflicted[k][j] = true;
                        break;
                    }
                }
            }
        }

    setTimeout("updateNumberCell()",200);
    return true;
}

function moveDown(){
    if( !canMoveDown( arr ) )
        return false;

    //moveDown
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 2 ; i >= 0 ; i -- ){
            if( arr[i][j] != 0 ){
                for( var k = 3 ; k > i ; k -- ){

                    if( arr[k][j] == 0 && noBlockVertical( j , i , k , arr ) ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        arr[k][j] = arr[i][j];
                        arr[i][j] = 0;
                        break;
                    }
                    else if( arr[k][j] == arr[i][j] && noBlockVertical( j , i , k , arr ) && !hasConflicted[k][j] ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        //add
                        arr[k][j] += arr[i][j];
                        arr[i][j] = 0;
                        //add score
                        score += arr[k][j];
                        updateScore( score );

                        hasConflicted[k][j] = true;
                        break;
                    }
                }
            }
        }

    setTimeout("updateNumberCell()",200);
    return true;
}

function isgameover() {
    if( nospace( arr ) && nomove( arr ) ){
        gameover();
    }
    onOff = false;
}
//有待提高
function gameover(){
    $('.end').show();
}

function showMoveAnimation( fromx , fromy , tox, toy ){

    var numberCell = $('#number-cell-' + fromx + '-' + fromy );
    numberCell.animate({
        top:getPosTop( tox , toy ),
        left:getPosLeft( tox , toy )
    },200);
}

function updateScore( score ){
    setTimeout(function() {

    },300);
    $('#score').text( score );
}