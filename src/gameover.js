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