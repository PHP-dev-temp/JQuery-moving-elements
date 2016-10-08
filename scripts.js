jQuery.fn.dragelement = function () {
	var thistarget = $(this);
	var targetw;
	var targeth;
	var thisparent = thistarget.parent();
	var parentw;
	var parenth;	
	var relX;
	var relY;
	var ismousedown;

	thistarget.bind('mousedown', function(e){
		targetw = thistarget.width();
		targeth = thistarget.height();
		parentw = thisparent.width();
		parenth = thisparent.height();
		var parentpos = thisparent.offset();
		var targetpos = thistarget.offset();
		relX = e.pageX - targetpos.left + parentpos.left;
		relY = e.pageY - targetpos.top + parentpos.top;
		ismousedown = true;
	});

	$(document).bind('mousemove',function(e){ 
		if(ismousedown)
		{
			var maxX = parentw - targetw;
			var maxY = parenth - targeth;
			var mouseX = e.pageX;
			var mouseY = e.pageY;
			var diffX = mouseX - relX;
			var diffY = mouseY - relY;
			// provera da li smo dosli do ivice
			if(diffX < 0) diffX = 0;
			if(diffY < 0) diffY = 0;
			if(diffX > maxX) diffX = maxX;
			if(diffY > maxY) diffY = maxY;
			thistarget.css('top', (diffY)+'px');
			thistarget.css('left', (diffX)+'px');
		}
	});
	$(window).bind('mouseup', function(e){
		ismousedown = false;
	});
	return this;
} // end jQuery dragelement function

$(document).ready(function () {
	var newElement = 0;
	//if (typeof newElement === 'undefined' || newElement === null) {newElement = 0;}
		
	$(document).on('mouseover', '[id^=element]', function(){
		$(this).dragelement();
	});
	
	$('#big').on('click',function(){
		newElement++;
		$('#container').append('<div id="element-' + newElement.toString() + '" class="big" style="top: 200px; left: 400px;"></div>');
	});
	
	$('#small').on('click',function(){
		newElement++;
		$('#container').append('<div id="element-' + newElement.toString() + '" class="small" style="top: 200px; left: 400px;"></div>');
	});
});
	
	

	