
//point:每次通过改变数组重新生成div
//利用二维数组来存储数据
var arr=[],
    hasConflicted=[],
    score=0,
    onOff=false;

//开始新游戏
newgame();

function newgame() {
    //初始化
    init();
    //生成一个随机数
    generateOneNumber();
    generateOneNumber();

}

function init() {
    //初始化二维数组
    for (var i = 0;i < 4;i++){
        arr[i] = [];
        hasConflicted[i] = [];
        for(var j = 0;j < 4;j++){
            arr[i][j]=0;
            hasConflicted[i][j] = false;
        }
    }
    updateNumberCell();
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
            }
            hasConflicted[i][j] = false;
        }
    }
}
//位置确定
function getPosTop( i , j ){
    return 20 + i*120;
}

function getPosLeft( i , j ){
    return 20 + j*120;
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
    return "black";
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

    while (true) {
        //保证随机位置为空
        if (arr[randX][randY] == 0) {
            break;
        }
        //不为空则重新生成
        var randX = parseInt (Math.random() * 4);
        var randY = parseInt (Math.random() * 4);
    }

    //随机生成数字 2 4
    var randNumber = Math.random() > 0.5 ? 2 : 4;
    arr[randX][randY] = randNumber;

    showNumberWithAnimation( randX , randY , randNumber );
}

function showNumberWithAnimation( i , j , randNumber ){

    var numberCell = $('#number-cell-' + i + "-" + j );

    numberCell.css('background-color',getNumberBackgroundColor( randNumber ) );
    numberCell.css('color',getNumberColor( randNumber ) );
    numberCell.text( randNumber );

    numberCell.animate({
        width:"100px",
        height:"100px"
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

//事件监听
$(document).keydown( function (e) {
    //增加判断，一次只能执行一个方向
    if(onOff) return;

    switch(e.keyCode) {
        //左
        case 37:
            if (moveLeft()) {
                onOff = true;
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        //上
        case 38:
            if( moveUp() ){
                onOff = true;
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        //右
        case 39:
            if( moveRight() ){
                onOff = true;
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        //下
        case 40:
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

function isgameover() {
    if( nospace( arr ) && nomove( arr ) ){
        gameover();
    }
    onOff = false;
}
//有待优化
function gameover(){
    alert('gameover!');
}

function moveLeft(){
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




function showMoveAnimation( fromx , fromy , tox, toy ){

    var numberCell = $('#number-cell-' + fromx + '-' + fromy );
    numberCell.animate({
        top:getPosTop( tox , toy ),
        left:getPosLeft( tox , toy )
    },200);
}

function updateScore( score ){
    setTimeout(function () {

    },300);
    $('#score').text( score );
}
