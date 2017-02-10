//判断能否向左移动，有空格或者相邻数字相同
function canMoveLeft(arr) {
    for( var i = 0 ; i < 4 ; i ++ ) {
        for (var j = 1; j < 4; j++) {
            if (arr[i][j] != 0) {
                if (arr[i][j - 1] == 0 || arr[i][j - 1] == arr[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveRight( arr ){

    for( var i = 0 ; i < 4 ; i ++ ) {
        for (var j = 2; j >= 0; j--) {
            if (arr[i][j] != 0) {
                if (arr[i][j + 1] == 0 || arr[i][j + 1] == arr[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveUp( arr ){

    for( var j = 0 ; j < 4 ; j ++ ) {
        for (var i = 1; i < 4; i++) {
            if (arr[i][j] != 0) {
                if (arr[i - 1][j] == 0 || arr[i - 1][j] == arr[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown( arr ) {

    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (arr[i][j] != 0) {
                if (arr[i + 1][j] == 0 || arr[i + 1][j] == arr[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function noBlockHorizontal( row , col1 , col2 , arr ){
    for( var i = col1 + 1 ; i < col2 ; i ++ ) {
        if (arr[row][i] != 0) {
            return false;
        }
    }
    return true;
}

function noBlockVertical( col , row1 , row2 , arr ){
    for( var i = row1 + 1 ; i < row2 ; i ++ ) {
        if (arr[i][col] != 0) {
            return false;
        }
    }
    return true;
}

function nomove( arr ){
    if( canMoveLeft( arr ) ||
        canMoveRight( arr ) ||
        canMoveUp( arr ) ||
        canMoveDown( arr ) ){
        return false;
    }

    return true;
}