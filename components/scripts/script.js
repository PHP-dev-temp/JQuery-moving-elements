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
	
	$(document).on('dblclick', '[id^=element]', function(e){
		cmtop = (parseInt($(this).css('top'), 10) + 20) + 'px';
		cmleft = (parseInt($(this).css('left'), 10) + 20) + 'px';
		$('#cmenu').html('<ul><li><a data-action="move">move</a></li><li><a data-action="rotate">rotate</a></li><li><a data-action="resize">resize</a></li><li><a data-action="clone">clone</a></li><li><a data-action="close">close</a></li></ul>').css({'top': cmtop, 'left': cmleft});	
	});
	
	$(document).on('mouseover', '[id^=element]', function(){
		$(this).dragelement();
	});
	
	$(document).on('mouseup', '[id^=element]', function(){
		wtel = $(this);
		elementid = wtel.attr('id');
		if (elementid.length && (elementid.indexOf('element-') == 0)){
			elementid = elementid.slice(8);
			wtelement[elementid].topm = (parseInt(wtel.css('top')) / wtgrid).toFixed(3);
			wtelement[elementid].leftm = (parseInt(wtel.css('left')) / wtgrid).toFixed(3);
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