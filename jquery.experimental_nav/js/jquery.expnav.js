// --------------------------------------------------------
// Experimental Navigation plugin, hardly complete and needs lots of setup. 
// It doesn't help that that type of navigation is a usability nightmare. But its interesting.
// This plugin needs a lot of work, feel free to tell me what you think.
//
// Author: Patrick Forringer : destos@gmail.com
// Ver: 0.1
// Last Modified: sometime in fall of 09
//

(function($) {
	
	//
	// plugin definition
	//
	$.fn.expNav = function(options) {
		
		// TODO: check for hover intent plugin
		
		if( this.size() != 3 ){
			log('Incorrect amount of objects selected');
			return this;
		}
		
		// build main options
		o = $.extend({}, $.fn.expNav.defaults, options);
		
		// seperate out objects
		$top = this.eq(0);
		$nav = this.eq(1);
			navId = '#'+$nav.attr('id');
		$content = this.eq(2);
		
		// positions and heights
		tHei = $top.height();
		Npos = $nav.position();
		
		if( $nav.children().size() == 1 ){
			log('not enough children to perform magics');
			return this;
		}
		
		// Initial toggle bind
		$nav.children().each(function(){
			if(o.collapse)
				$(this).click( collapseNav );
		});
		
		return this;
	};
	
	//
	// Collapse function
	//
	collapseNav = function(){
		log('collapse run');
		
		$all = $(this).parent().children();
		$others = $(this).parent().children().not(this);
		
		$all.unbind('click'); // not unbinding for some reason.
		
		ulPos = $(this).position();
		ulHei = $(this).height();
		
		// move navigation container to collapse it
		$top.stop().animate({ "height": Npos.top + ulHei }, o.animSpeed );
		
		// move navigation to proper position and fade
		$nav.stop().animate({'top': -ulPos.top}, o.animSpeed);
		$others.stop().animate({'opacity':0, 'visibility':'hidden'}, o.animSpeed);
		
		$(this).hoverIntent(o.HIconfig).click( uncollNav );
		
		// are we going to sticky the content?
		if(o.sticky){
			setTimeout( stickyContent, o.animSpeed );
		}
	};
	
	//
	// Uncollapse function
	//
	uncollNav = function(){
		log('uncollapsed run');
		
		$top.stop().animate({"height": tHei }, o.animSpeed );
		$nav.stop().animate({'top': 0 }, o.animSpeed);
		
		$(this).unbind('mouseover');
		
		$all.stop().animate( {'opacity':1 },o.animSpeed).unbind('click').click( collapseNav );
		
	};
	
	//
	// keeps the content box where its at.
	//
	stickyContent = function(){
		cpos = $content.position();
		
		$top.css({'position':'relative', 'z-index': 20 });
		$content.css({'position':'absolute', 'top': cpos.top, 'z-index': 10 });
		o.sticky = false;
	};
	
	//
	// private function for debugging
	//
	function log(msg, level){
		window.console.log(msg);
	};

	//
	// plugin defaults
	//
	$.fn.expNav.defaults = {
		sticky: true,
		animSpeed: 300,
		collapse: true, // whether or not to collapse
		HIconfig: { // hover intent configuration / maybe move to innards to prevent function change
			sensitivity: 3, // number = sensitivity threshold (must be 1 or higher)    
			interval: 500, // number = milliseconds for onMouseOver polling interval    
			over: uncollNav, // function = onMouseOver callback (REQUIRED)    
			timeout: 0, // number = milliseconds delay before onMouseOut    
			out: function(){} // function = onMouseOut callback (REQUIRED)    
		},
	};
	
//
// end of closure
//
})(jQuery);