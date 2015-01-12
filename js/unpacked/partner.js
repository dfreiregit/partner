jQuery(document).ready(function ($) {//important to pass the $ because somewhere else in WP uses jQuery.noConflict(), which invalidates the $
	setOrCreateMetaTag('name', 'viewport', 'width=device-width, initial-scale=1.0');
	
	includeJS("https://www.ecornell.com/wp-content/themes/ecustom/js/bootstrap.min.js");
	includeJS("https://www.ecornell.com/wp-content/plugins/ecustom-embed/js/jQuery.tubeplayer.min.js");
	includeJS("https://www.ecornell.com/wp-content/plugins/ecustom-embed/js/ecustom-embed.js");
	
	$('a', '.cancelTransfer').attr('href', 'http://ecornell.force.com/help/articles/FAQ/Organizational-Partner-Drop-Transfer-Policy/');
	
	$('.welcome').insertAfter( $('.contactInfo:last') );
	$('.welcome').prepend('<img src="https://s3.amazonaws.com/ecornell/partner_pages/welcome-thumb.jpg" />');
	$('.welcome').after('<div class="about-ecornell"><h5>About eCornell</h5><p>eCornell\'s online courses are authored by faculty from Cornell University\'s ' + 
			'world-renowned Samuel Curtis Johnson Graduate School of Management, the School of Industrial and Labor Relations (ILR), and the School of Hotel Administration, ' + 
			'a leader in hospitality-management education consistently ranked among the very top institutions worldwide.</p></div>');
	$('.welcome').wrap('<a href="#videoModal" data-toggle="modal" class="welcome-vid-link"></a>');
	
	$('#noticesSection').insertAfter( $('.courseCertListing:first') );
	
	$('.cta-left a.cobalt-btn, .cta-left a.red-btn').each(function(){
		$cloneBtn = $(this).clone();
		$cloneBtn.insertAfter( $('.courseCertListing:first') );
	});
	
	$cloneYT = $('iframe:first', '.cta-wrapper a[href=#videoModal]').clone();
	$('.clone-yt').append( $cloneYT );
	
	
	$('*[data-toggle=modal]').click(function(e){
		e.preventDefault();
		
		var $firstEmbed = $('iframe:first, embed:first, object:first', this).clone();
		
		//autoplay and disable annotations
		var newSrc = $firstEmbed.attr('src');
		if ( newSrc.indexOf('?')==-1 ) {
			newSrc += '?autoplay=1&iv_load_policy=3';
		} else {
			newSrc += '&autoplay=1&iv_load_policy=3';
		}
		
		$firstEmbed.attr('src', newSrc );
		$('.video-container:first', '#videoModal').html( $firstEmbed );
	});
	/*
	$('#videoModal').on('shown', function() {
  	  $('iframe, embed, object', this).each(function(){
  		  $(this).attr('src', $(this).attr('src') + '&autoplay=1' );
  	  });
    });
	*/
	$('#videoModal').on('hidden', function() {
  	  $('iframe, embed, object', '#videoModal').remove();
    });
		
	//fix toggle links
	$('h2.toggleLink a')
		.attr('href', '#')
		.removeAttr('onclick')
		.unbind()
		.on('click', function(e){
			e.preventDefault();
			var $thisH2 = $(this).parents('h2:first');
			var $thisA = 	$(this); 
			$thisH2.next('div:first').fadeToggle(300, function(){
				$thisA.toggleClass('collapsed');
				/*
				if ( $(this).is(':visible') ) {
					$('img[src*=collapse]', $thisA).show();
					$('img[src*=expand]', $thisA).hide();
				} else {
					$('img[src*=collapse]', $thisA).hide();
					$('img[src*=expand]', $thisA).show();
				}
				*/
				
			});
		})
	
	//create sections for each vertical
	$('table.basicTable').each(function(){
		splitTable( $(this) );
	});
	
	function splitTable($el) {
		var $mainTable = $el;
		
		$('h2:first', $mainTable).each(function(){
			var $theRow = $(this).parents('tr:first');
			var splitBefore = $theRow.prevAll('tr').length;
			var splitBy = splitBefore + 1;
			var rowsBefore = $mainTable.find ( "tr" ).slice( splitBefore );
		    var rows = $mainTable.find ( "tr" ).slice( splitBy );
		    
		    $headerTable= $("<table class='basicTable'></table>");
		    $headerTable.insertAfter($mainTable).append(rowsBefore);
		    
		    $appendedTable= $("<table class='basicTable products-list'></table>");
		    $appendedTable.insertAfter($headerTable).append(rows);
			//$mainTable.find ( "tr" ).slice( splitBy ).remove();
		    
		    if ( $('h2', $appendedTable).size()>0 ) {
		    	splitTable( $appendedTable );
		    } 
		});
	}
	
	$('h2', '.basicTable').on('click', function(){
		$el = $(this);
		$parentTable = $el.parents('table:first');
		$parentTable.next('table').fadeToggle(300, function(){
			$el.toggleClass('expanded');
		});
	});

	$('.toggleTrigger').on('click', function(e){
		e.preventDefault();
		
		var $el = $(this);
		var $theTarget = $( $(this).attr('href') );
		
		if ( $theTarget.size()>0 ) {
			$theTarget.fadeToggle(300, function(){
				$el.toggleClass('collapsed');
			});
		}
	});
	
});

function includeJS(src,callback) {
	if(typeof callback != 'function') callback = function() {};

	var script = document.createElement('script');
	if(typeof script.readyState == 'undefined') {
		script.onload = callback;
	} else {
		script.onreadystatechange = function(){
        	if(script.readyState == "loaded" || script.readyState == "complete"){
            	script.onreadystatechange = null;
            	callback();
        	} //if//
    	}; //function//
	} //if-else//

	script.type = 'text/javascript';
	script.src = src;
	document.getElementsByTagName('head')[0].appendChild(script);
}

function setOrCreateMetaTag(metaName, name, value) {
    var t = 'meta['+metaName+'='+name+']';
    var mt = $(t);
    if (mt.length === 0) {
        t = '<meta '+metaName+'="'+name+'" />';
        mt = $(t).appendTo('head');
    }
    mt.attr('content', value);
}