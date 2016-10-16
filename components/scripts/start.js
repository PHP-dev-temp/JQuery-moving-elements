
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