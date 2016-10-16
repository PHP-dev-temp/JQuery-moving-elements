
function createwt(){
	$('#wt-wrapper').html('<div id="wt-container"></div><button id="wt-big">Add big</button><button id="wt-small">Add small</button></div>');
}

jQuery.fn.startwt = function(){
	$(this).html('<div id="wt-wrapper"><button id="new-wt">New</button><button id="open-wt">Open</button></div>');	
}

function newwt(){	
	$('#wt-wrapper').html('<h2>New</h2> \
		<input type="number" id="wt-width" name="wt-width" placeholder="Enter width (m)" max="100" min="5" required /> \
		<input type="number" id="wt-height" name="wt-height" placeholder="Enter height (m)" max="100" min="5" required /> \
		<input type="submit" id="wt-submit" value="Submit"> \
		<p></p> \
	');
}