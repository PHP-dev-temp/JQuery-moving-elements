

$(document).ready(function (){
	var wtelementId = 0;
	var wtelement = [];
	var wtgrid;
	$('#wt').startwt();
	
	$(document).on('click', '#new-wt', function(){	
		newwt();
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
			wtelement[elementid].topm = (parseInt(wtel.css('top')) / wtgrid).toFixed(1);
			wtelement[elementid].leftm = (parseInt(wtel.css('left')) / wtgrid).toFixed(1);
		}
	});
	
	$(document).on('click', '#wt-big', function(){
		$('#wt-container').append('<div id="element-' + wtelementId.toString() + '" class="big" style="width: ' + (0.8 * wtgrid).toFixed(1).toString() + 'px; height: ' + (1.6 * wtgrid).toFixed(1).toString() + 'px"></div>');
		wtelement.push({'wtmeterh': 1.6, 'wtmeterw': 0.8, 'type': 'table', 'id': wtelementId, 'topm': 0, 'leftm': 0});
		wtelementId++;
	});
	
	$(document).on('click', '#wt-small', function(){
		$('#wt-container').append('<div id="element-' + wtelementId.toString() + '" class="small" style="width: ' + (0.6 * wtgrid).toFixed(1).toString() + 'px; height: ' + (0.6 * wtgrid).toFixed(1).toString() + 'px"></div>');
		wtelement.push({'wtmeterh': 0.6, 'wtmeterw': 0.6, 'type': 'table', 'id': wtelementId, 'topm': 0, 'leftm': 0});
		wtelementId++;
	});
});