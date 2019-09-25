humhub.module('mobile_sidebar', function(module, require, $) {
	var data;
	/* = {
		state:
		 0 big screen
		 1 small screen, no toggle needed
		 2 small screen, toggle visible, content active
		 3 small screen, toggle visible, sidebar active
	}; */

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

	var reset= function () {
		var d= humhub.modules.mobile_sidebar.data;
		var toggle= $('#mobile-sidebar-toggle');
		toggle.hide();
		toggle.removeClass('active');
		$(d.parent).last().find(d.center).css('display', 'block');
		var sidebar= $(d.parent).last().find(d.side);
		if (sidebar.length) {
			css(sidebar, 'sidebar');
			sidebar.css('display', 'block');
		}
		humhub.modules.mobile_sidebar.data.state= 0;
	}

	var toggle= function () {
		var d= humhub.modules.mobile_sidebar.data;
		var sidebar= $(d.parent).last().find(d.side);
		if (! sidebar.length) {
			if (d.state>=2)
				reset();
			return;
		}

		var content= $(d.parent).last().find(d.center);
		var toggle= $('#mobile-sidebar-toggle');
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

	var resize= function () {
		var d= humhub.modules.mobile_sidebar.data;

		if (d.url != window.location.href) {
			d.url= window.location.href;
			reset();
		}

		var sidebar= $(d.parent).last().children(d.side);
		if (! sidebar.length || ! sidebar.children().first().length) {
			if (d.state>=2)
				reset();
			return;
		}

		if (window.matchMedia(d.match).matches) {  // small screen
			var newstate= sidebar.length ? 2 : 1;
			if (newstate >= 2) {
				var toggle= $('#mobile-sidebar-toggle');
				if (toggle.length) {
					toggle.show();
				} else {
					console.log('mobile-sidebar error #1');
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
				'mobile': this.config.mobile,
				'label': this.config.label,
				'url': '',
				'match': '(max-width:' + px[2] + 'px)',
				'parent': '#layout-content > .container > .row',
				'center': '.col-md-7, .col-md-8',
				'side': '.col-md-3, .col-md-4',
				'state': 0,
			}
			humhub.modules.mobile_sidebar.data= d;

			var menu= $('#topbar-second').find('.container');
			var style= 'padding-top:15px';
			menu.append('<ul class="nav pull-right">'
				+ '<li id="mobile-sidebar-toggle" class="dropdown search-menu" style="display:none">'
				+ '<a style="padding-top:15px" aria-label="' + d.label + '" onclick="humhub.modules.mobile_sidebar.toggle()">'
				+ '<i class="fa fa-exchange"></i>'
				+ '</a></li></ul>');

			// perverted hack alert!!!
			run();

			break;
		}
	};

	module.export({
		data: data,
		init: init,
		toggle: toggle,
	});
});
