
function createwt(){
	$('#wt-wrapper').html('<div id="wt-container"></div><button id="wt-big">Add big</button><button id="wt-small">Add small</button><button id="wt-save">Save</button></div>');
}

jQuery.fn.startwt = function(){
	$(this).html('<div id="wt-wrapper"><button id="new-wt">New</button><button id="open-wt">Open</button></div>');	
}

function newwt(){	
	$('#wt-wrapper').html('<h2>New</h2> \
		<input type="text" id="wt-name" name="wt-name" placeholder="Name of object" required /> \
		<input type="number" id="wt-width" name="wt-width" placeholder="Enter width (m)" max="100" min="5" required /> \
		<input type="number" id="wt-height" name="wt-height" placeholder="Enter height (m)" max="100" min="5" required /> \
		<input type="submit" id="wt-submit" value="Submit"> \
		<p></p> \
	');
}

function showelement(wtelement, wtgrid){
	$('#wt-container').append('<div id="element-' + wtelement.id.toString() + '" class=' + wtelement.type + ' style="width: ' + (wtelement.wtmeterw * wtgrid).toFixed(2).toString() + 'px; height: ' + (wtelement.wtmeterh * wtgrid).toFixed(2).toString() + 'px; top: ' + (wtelement.topm * wtgrid).toFixed(2).toString() + 'px; left: ' + (wtelement.leftm * wtgrid).toFixed(2).toString() + 'px;"></div>');
}
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

jQuery.fn.responsive = function (wtmeterw, wtmeterh) {
	// wtmeter dimensions of worktable in meters
	thistarget = $(this);
	targetw = thistarget.width();
	grid = gridcalculate(targetw, wtmeterw);
	targeth = (wtmeterh * grid).toString() + 'px';
	thistarget.css({'background-size': grid.toString() + 'px, ' + grid.toString() + 'px'}).height(targeth);
}

jQuery.fn.responsiveElement = function (wtelment, wtgrid) {
	thistarget = $(this);
	targetw = (wtelment.wtmeterw * wtgrid).toFixed(1).toString() + 'px';
	targeth = (wtelment.wtmeterh * wtgrid).toFixed(1).toString() + 'px';
	thistarget.width(targetw).height(targeth);
	targettop = (wtelment.topm * wtgrid).toFixed(1).toString() + 'px';
	targetleft = (wtelment.leftm * wtgrid).toFixed(1).toString() + 'px';
	thistarget.css({'top': targettop, 'left': targetleft});
}

function gridcalculate(wtdivw, wtmeterw){
	grid = (wtdivw/wtmeterw).toFixed(2);
	return grid;
}

function doResize(wtelement){
	if (wtelement[0]){
		$('#wt-container').responsive(wtelement[0].wtmeterw, wtelement[0].wtmeterh);		
		wtgrid = gridcalculate($('#wt-container').width(), wtelement[0].wtmeterw);
		$('#wt-container').find('[id^=element]').each(function(){
			elementId = $(this).attr('id');
			if (elementId.length && (elementId.indexOf('element-') == 0)){
				elementId = elementId.slice(8);
				$(this).responsiveElement(wtelement[elementId], wtgrid);
			}
		});
		return wtgrid;
	} else {
		return 0;
	}
	
}
$(document).ready(function (){
	var wtelementId = 0;
	var wtelement = [];
	var wtgrid;
	$('#wt').startwt();
	
	$(document).on('click', '#new-wt', function(){	
		newwt();
	});
	
	$(document).on('click', '#open-wt', function(){	
		$.getJSON("data.json", function(json) {
			for(item in json){
				wtelement.push(json[item]);
			}
			createwt();
			$('#wt-container').responsive(wtelement[0].wtmeterw, wtelement[0].wtmeterh);
			wtgrid = gridcalculate($('#wt-container').width(), wtelement[0].wtmeterw);
			for (var i = 1; i < wtelement.length; i++) {
				showelement(wtelement[i], wtgrid);
			}
		});
	});
	
	$(document).on('click', '#wt-submit', function(){
		wtw = $('#wt-width').val();
		wth = $('#wt-height').val();
		if(wtw < 5 || wth < 5 || wtw > 100 || wth > 100){
			$('#wt-wrapper>p').text('Please enter value between 5 and 100 (m).');
		} else {
			wtelement.push({'wtmeterh': wth, 'wtmeterw': wtw, 'type': 'wt', 'id': wtelementId});
			wtelementId++;
			createwt();
			$('#wt-container').responsive(wtw, wth);
			wtgrid = gridcalculate($('#wt-container').width(), wtelement[0].wtmeterw);
		}		
	});
		
	$(window).resize(function(){	
		wtgridtemp = doResize(wtelement);
		if (wtgridtemp){wtgrid = wtgridtemp;}		
	});
	
	$(document).on('mouseover', '[id^=element]', function(){
		$(this).dragelement();
	});
	
	$(document).on('mouseup', '[id^=element]', function(){
		wtel = $(this);
		elementid = wtel.attr('id');
		if (elementid.length && (elementid.indexOf('element-') == 0)){
			elementid = elementid.slice(8);
			wtelement[elementid].topm = (parseInt(wtel.css('top')) / wtgrid).toFixed(2);
			wtelement[elementid].leftm = (parseInt(wtel.css('left')) / wtgrid).toFixed(2);
		}
	});
	
	$(document).on('click', '#wt-big', function(){
		wtelement[wtelementId] = ({
			'wtmeterh': 1.6, 
			'wtmeterw': 0.8, 
			'type': 'wt-table', 
			'id': wtelementId, 
			'topm': 0, 
			'leftm': 0
		});
		showelement(wtelement[wtelementId], wtgrid);
		wtelementId++;
	});
	
	$(document).on('click', '#wt-small', function(){
		wtelement[wtelementId] = ({
			'wtmeterh': 0.6, 
			'wtmeterw': 0.6, 
			'type': 'wt-chair', 
			'id': wtelementId, 
			'topm': 0, 
			'leftm': 0
		});
		showelement(wtelement[wtelementId], wtgrid);
		wtelementId++;
	});
	
	$(document).on('click', '#wt-save', function(){
		data = JSON.stringify(wtelement);
		console.log(data);;
	});
});