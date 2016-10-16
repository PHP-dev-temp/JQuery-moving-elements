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
		/*
		  1 = Left   mouse button
		  2 = Centre mouse button
		  3 = Right  mouse button
		*/
		if (e.which != 1){return;}
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
}
