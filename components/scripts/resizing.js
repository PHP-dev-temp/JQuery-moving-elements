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