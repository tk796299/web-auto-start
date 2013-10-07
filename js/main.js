$(function(){
    console.log("this is a test!");
    var $carousl = $('#carousl');
    var  _left    = $('#carousl').position().left;
    $carousl.animate({"left": _left+50+"px"},"slow")
});