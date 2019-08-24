humhub.module('mobile_sidebar', function(module, require, $) {

	var data= {
		/*
		state:
		 0 big screen
		 1 small screen, no toggle needed
		 2 small screen, toggle visible, content active
		 3 small screen, toggle visible, sidebar active
		*/
		'state': 0,
	};

	/* there's probably a better way to do this... */
	var media_rules= function(search1, search2) {
		var result = [];
		var re1= new RegExp(search1);
		var re2= new RegExp(search2);
		for (var i = 0; i < document.styleSheets.length; i++) {
			var styleSheet = document.styleSheets[i];
			var rules = styleSheet.cssRules || styleSheet.rules;
			for (var j=0; j<rules.length; j++) {
				var css= rules[j].cssText;
				if (css.match(/@media[ \t\r\n]*(screen)?[ \t\r\n]*\(/) && css.match(re1) && css.match(re2))
					result.push(css);
			}
		}

		return result;
	}

	var css= function (elem, mode) {
		if (mode=='sidebar') {
			elem.removeClass('layout-content-container'); elem.addClass('layout-sidebar-container');
		} else {
			elem.removeClass('layout-sidebar-container'); elem.addClass('layout-content-container');
		}
	}

	var toggle= function () {
		var d= humhub.modules.mobile_sidebar.data;
		var sidebar= $(d.parent).find(d.side);
		if (! sidebar.length) {
			if (d.state==3)
				reset();
			return;
		}

		var content= $(d.parent).find(d.center);
		var toggle= $('#space-sidebar-toggle');
		if (toggle.hasClass('active')) {
			toggle.removeClass('active');
			css(sidebar, 'sidebar');
			content.css('display', 'block');
			sidebar.css('display', 'none');
			d.state= 2;
		} else {
			toggle.addClass('active');
			css(sidebar, 'content');
			content.css('display', 'none');
			sidebar.css('display', 'block');
			d.state= 3;
		}
	}

	var reset= function () {
		var d= humhub.modules.mobile_sidebar.data;
		$('#space-sidebar-toggle').hide();
		$(d.parent).find(d.center).css('display', 'block');
		var sidebar= $(d.parent).find(d.side);
		if (sidebar.length) {
			css(sidebar, 'sidebar');
			sidebar.css('display', 'block');
		}
		humhub.modules.mobile_sidebar.data.state= 0;
	}

	var resize= function () {
		var d= humhub.modules.mobile_sidebar.data;
		var sidebar= $(d.parent).find(d.side);
		if (! sidebar.length) {
			if (d.state==3)
				reset();
			return;
		}

		if (window.matchMedia(d.match).matches) {  // small screen
			var newstate= $('.panel-default').find('.list-group:first').find('.list-group-item:first').hasClass('active') ? 2 : 1;
			if (newstate >= 2) {
				var toggle= $('#space-sidebar-toggle');
				if (toggle.length) {
					toggle.show();
				} else {
					console.log('resize() add toggle button');
					var menu= $('.panel-default').find('.list-group:first');
					var style= 'position:absolute; right:10px; margin-left:10px';
					menu.append('<a id="space-sidebar-toggle" class="list-group-item" style="' + style + '"'
						+ ' onclick="humhub.modules.mobile_sidebar.toggle()">'
						+ '<i class="fa fa-exchange"></i></a>');
				}
			}
			if (d.state<newstate)
				d.state= newstate;
		} else { // big screen
			if (d.state!=0)
				reset();
		}
	}

	var run= function() {
		resize();
		setTimeout(function () { run() }, 100);
	}

	var init= function() {
		var rules= media_rules('\.layout-sidebar-container', 'display:[ \t\r\n]*none');
		for (var i=0; i<rules.length; i++) {
			var px= rules[i].match(/@media[ \t\r\n]*(screen)?[ \t\r\n]*\([ \t\r\n]*max-width:[ \t\r\n]*([0-9]+)/);
			if (px[2] == null)
				continue;

			var d= {
				'match': '(max-width:' + px[2] + 'px)',
				'parent': '.space-content,.profile-content',
				'center': '.col-md-7',
				'side': '.col-md-3',
				'state': 0,
			}
			humhub.modules.mobile_sidebar.data= d;

			// this is how it should be:
/*
			resize();
			$(window).on("resize", function (e) { humhub.modules.mobile_sidebar.resize() });
			$('.panel-default').find('.list-group:first').on("onAnyChangeIncludingInChildren", function (e) { humhub.modules.mobile_sidebar.resize() });
*/

			// perverted hack alert!!!
			run();
		}
	};

	module.export({
		data: data,
		init: init,
		toggle: toggle,
	});

});
