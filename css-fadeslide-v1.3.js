/* 
 *
 * css-fadeslide.js v1.3 (c) 2014
 * Enable CSS Transitions for jQuery fadeIn/Out/Toggle & slideUp/Down/Toggle
 *
 * @author  : Zach Winter (contact@zachwinter.com)
 * @link    : https://github.com/zachwinter/css-fadeslide.js
 * @license : MIT (http://www.opensource.org/licenses/mit-license.php)
 *
 */

;(function(window, document, $) {
"use strict";



/* Shared Variables + Functions
======================================================================================= */

/* Detect CSS transition support.
----------------------------------------------------------------------- */
var transitionSupport = function() {
	if (typeof (window.Modernizr) !== 'undefined' && typeof (window.Modernizr.csstransitions) !== 'undefined') {
		return Modernizr.csstransitions;
	} else {
		var a = document.createElement("div").style,
		    b = [ a.transition, a.WebkitTransition, a.MozTransition ];
		for (var i=0; i<b.length; i++) {
			if (b[i] !== undefined) {
				return true;
			}
		}
		return false;
	}
}, SUPPORT = transitionSupport();

/* Get CSS transition event name.
----------------------------------------------------------------------- */
var getEventName = function() {
	var a = document.createElement('div').style,
	    b = {
	    	'transition'       : 'transitionend',
	    	'OTransition'      : 'otransitionend', 
	    	'MozTransition'    : 'transitionend',
	    	'WebkitTransition' : 'webkitTransitionEnd'
	    };
	for (var i in b) {
		if (b.hasOwnProperty(i) && a[i] !== undefined) {
			return b[i];
		}
	}
}, transitionEventName;

if (SUPPORT) {
	transitionEventName = getEventName();
}

/* Process Parameters
----------------------------------------------------------------------- */
var processParameters = function(args, callback) {

	/* Default Arguments
	======================================================= */
	var defaults = {
		duration : 400,
		easing   : 'ease'
	}, _o;

	/* Object
	======================================================= */
	if (typeof(args) === "object") {
		_o = $.extend(defaults, args);
		_o.callback = callback;
	}

	/* Number
	======================================================= */
	else if ($.isNumeric(args)) {
		_o = $.extend(defaults, {
			duration : parseInt(args),
			callback : callback
		});
	}

	/* String
	======================================================= */
	else if (typeof(args) === "string") {

		// "Fast"
		if (args === 'fast') {
			_o = $.extend(defaults, {
				duration : 200,
				callback : callback
			});
		}

		// "Slow"
		else if (args === 'slow') {
			_o = $.extend(defaults, {
				duration : 600,
				callback : callback
			});

		}

		// Use defaults for everything else.
		else {
			_o = $.extend(defaults, {
				callback : callback
			});
		}

	}

	/* Function
	======================================================= */
	else if (typeof(args) === "function") {
		_o = $.extend(defaults, {
			callback : args
		});
	}

	/* Everything else, use defaults.
	======================================================= */
	else {
		_o = $.extend(defaults, {
			callback : callback
		});
	}

	return _o;

};

/* Set transition for fadeIn / fadeOut / fadeToggle.
----------------------------------------------------------------------- */
$.fn.setFadeTransition = function(duration, easing) {
	this.redraw().css({
		'-webkit-transition' : 'opacity ' + duration/1000 + 's ' + easing,
		'-moz-transition'    : 'opacity ' + duration/1000 + 's ' + easing,
		'transition'         : 'opacity ' + duration/1000 + 's ' + easing
	}).redraw();
	return this;
};

/* Set transition for slideUp / slideDown / slideToggle.
----------------------------------------------------------------------- */
$.fn.setSlideTransition = function(duration, easing) {
	this.redraw().css({
		'-webkit-transition' : 'height         ' + duration/1000 + 's ' + easing + ', ' +
		                       'margin-top     ' + duration/1000 + 's ' + easing + ', ' +
		                       'margin-bottom  ' + duration/1000 + 's ' + easing + ', ' +
		                       'padding-top    ' + duration/1000 + 's ' + easing + ', ' +
		                       'padding-bottom ' + duration/1000 + 's ' + easing,

		'-moz-transition'    : 'height         ' + duration/1000 + 's ' + easing + ', ' +
		                       'margin-top     ' + duration/1000 + 's ' + easing + ', ' +
		                       'margin-bottom  ' + duration/1000 + 's ' + easing + ', ' +
		                       'padding-top    ' + duration/1000 + 's ' + easing + ', ' +
		                       'padding-bottom ' + duration/1000 + 's ' + easing,

		'transition'         : 'height         ' + duration/1000 + 's ' + easing + ', ' +
		                       'margin-top     ' + duration/1000 + 's ' + easing + ', ' +
		                       'margin-bottom  ' + duration/1000 + 's ' + easing + ', ' +
		                       'padding-top    ' + duration/1000 + 's ' + easing + ', ' +
		                       'padding-bottom ' + duration/1000 + 's ' + easing
	}).redraw();
	return this;
};

/* Remove all CSS transition.
----------------------------------------------------------------------- */
$.fn.removeTransition = function() {
	this.redraw().css({
		'-webkit-transition' : 'none',
		'-moz-transition'    : 'none',
		'transition'         : 'none'
	}).redraw();
	return this;
};

/* Redraw element.
----------------------------------------------------------------------- */
$.fn.redraw = function() {
	this.each(function() { var redraw = this.offsetHeight; });
	return this;
};



/* Fade In
======================================================================================= */

/* Original Method
----------------------------------------------------------------------- */
$.fn.fadeIn_ = $.fn.fadeIn;

/* New Method
----------------------------------------------------------------------- */
$.fn.fadeIn = function(args, callback) {

	var $els = this;

	/* Process Parameters
	======================================================= */
	var _ = processParameters(args, callback);

	/* CSS Transition
	======================================================= */
	var cssTransition = function($el) {

		var transitionEnd = transitionEventName + '.fadeIn';

		$el.removeTransition().css({
			'opacity' : '0',
			'display' : 'block'
		});

		$el.setFadeTransition(_.duration, _.easing).on(transitionEnd, function(e){
			e.stopPropagation();
			$el.off(transitionEnd).removeAttr('style').show().redraw();
			if (typeof(_.callback) == "function") _.callback();
		});

		$el.css('opacity', '1');

	};

	/* jQuery Animation
	======================================================= */
	var jqueryAnimation = function($el) {
		$el.fadeIn_(args, callback); 
	};

	/* Perform transition.
	======================================================= */
	var performTransition = function($el) {
		if (SUPPORT) {
			cssTransition($el);
		} else {
			jqueryAnimation($el);
		}
	};

	/* Init
	======================================================= */
	if ($els) {
		$els.each(function() {
			performTransition($(this));
		});
	}

};



/* Fade Out
======================================================================================= */

/* Original Method
----------------------------------------------------------------------- */
$.fn.fadeOut_ = $.fn.fadeOut;

/* New Method
----------------------------------------------------------------------- */
$.fn.fadeOut = function(args, callback) {

	var $els = this;

	/* Process Parameters
	======================================================= */
	var _ = processParameters(args, callback);

	/* CSS Transition
	======================================================= */
	var cssTransition = function($el) {

		var transitionEnd = transitionEventName + '.fadeOut';

		$el.setFadeTransition(_.duration, _.easing).css('opacity', '0').on(transitionEnd, function(e){
			e.stopPropagation();
			$el.off(transitionEnd).removeAttr('style').hide().redraw();
			if (typeof(_.callback) == "function") _.callback();
		});

	};

	/* jQuery Animation
	======================================================= */
	var jqueryAnimation = function($el) {
		$el.fadeOut_(args, callback); 
	};
	
	/* Perform transition.
	======================================================= */
	var performTransition = function($el) {
		if (SUPPORT) {
			cssTransition($el);
		} else {
			jqueryAnimation($el);
		}
	};

	/* Init
	======================================================= */
	if ($els) {
		$els.each(function() {
			performTransition($(this));
		});
	}

};



/* Fade Toggle
======================================================================================= */

/* Original Method
----------------------------------------------------------------------- */
$.fn.fadeToggle_ = $.fn.fadeToggle;

/* New Method
----------------------------------------------------------------------- */
$.fn.fadeToggle = function(args, callback) {

	var $els = this;

	/* Init
	======================================================= */
	if ($els) {
		$els.each(function() {
			var $el = $(this);
			if ($el.is(':visible')) {
				$el.fadeOut(args, callback);
			} else {
				$el.fadeIn(args, callback);
			}
		});
	}

};



/* Slide Up
======================================================================================= */

/* Original Method
----------------------------------------------------------------------- */
$.fn.slideUp_ = $.fn.slideUp;

/* New Method
----------------------------------------------------------------------- */
$.fn.slideUp = function(args, callback) {

	var $els = this;

	/* Process Parameters
	======================================================= */
	var _ = processParameters(args, callback);

	/* CSS Transition
	======================================================= */
	var cssTransition = function($el) {

		var transitionEnd = transitionEventName + '.slideUp';

		$el.removeTransition().css({
			'height'   : $el.outerHeight(),
			'overflow' : 'hidden'
		});

		$el.setSlideTransition(_.duration, _.easing).on(transitionEnd, function(e){
			e.stopPropagation();
			if (e.originalEvent.propertyName == "height") {
				$el.off(transitionEnd).redraw().removeAttr('style').hide().redraw();
				if (typeof(_.callback) == "function") _.callback();
			}
		});

		$el.css({
			'height'         : '0px',
			'margin-top'     : '0px',
			'margin-bottom'  : '0px',
			'padding-top'    : '0px',
			'padding-bottom' : '0px'
		});

	};

	/* jQuery Animation
	======================================================= */
	var jqueryAnimation = function($el) {
		$el.slideUp_(args, callback);
	};
	
	/* Perform transition.
	======================================================= */
	var performTransition = function($el) {
		if (SUPPORT) {
			cssTransition($el);
		} else {
			jqueryAnimation($el);
		}
	};

	/* Init
	======================================================= */
	if ($els) {
		$els.each(function() {
			performTransition($(this));
		});
	}

};



/* Slide Down
======================================================================================= */

/* Original Method
----------------------------------------------------------------------- */
$.fn.slideDown_ = $.fn.slideDown;

/* New Method
----------------------------------------------------------------------- */
$.fn.slideDown = function(args, callback) {

	var $els = this;

	/* Process Parameters
	======================================================= */
	var _ = processParameters(args, callback);

	/* CSS Transition
	======================================================= */
	var cssTransition = function($el) {

		var transitionEnd,
		    $parent,
		    $container,
		    $clone,
		    marginTop,
		    marginBottom,
		    paddingTop,
		    paddingBottom,
		    height;
		
		$parent = $el.parent();
		$parent.append('<div class="clone-container" />');

		$container = $parent.find('.clone-container');
		$container.css({
			'width'    : $parent.outerWidth() + 'px',
			'padding'  : $parent.css('padding'),
			'height'   : 'auto',
			'display'  : 'block',
			'position' : 'fixed',
			'top'      : '-300%',
			'left'     : '-300%',
			'right'    : 'auto',
			'bottom'   : 'auto'
		});

		$clone = $el.clone();
		$clone.css({
			'display'    : 'block',
			'height'     : 'auto',
			'min-height' : '0'
		}).appendTo($container);

		marginTop     = $clone.css('margin-top');
		marginBottom  = $clone.css('margin-bottom');
		paddingTop    = $clone.css('padding-top');
		paddingBottom = $clone.css('padding-bottom');
		height        = $clone.outerHeight();

		$container.remove();

		$el.removeAttr('style').hide().removeTransition().css({
			'display'        : 'block',
			'overflow'       : 'hidden',
			'height'         : '0px', 
			'padding-top'    : '0px', 
			'padding-bottom' : '0px',
			'margin-top'     : '0px',
			'margin-bottom'  : '0px'
		});

		transitionEnd = transitionEventName + '.slideDown';

		$el.removeTransition().setSlideTransition(_.duration, _.easing).on(transitionEnd, function(e){
			e.stopPropagation();
			if (e.originalEvent.propertyName == "height") {
				$el.off(transitionEnd).removeAttr('style').show().redraw();
				if (typeof(_.callback) == "function") _.callback();
			}
		});

		$el.css({
			'height'         : height,
			'padding-top'    : paddingTop,
			'padding-bottom' : paddingBottom,
			'margin-top'     : marginTop,
			'margin-bottom'  : marginBottom
		});

	};

	/* jQuery Animation
	======================================================= */
	var jqueryAnimation = function($el) {
		$el.slideDown_(args, callback); 
	};
	
	/* Perform transition.
	======================================================= */
	var performTransition = function($el) {
		if (SUPPORT) {
			cssTransition($el);
		} else {
			jqueryAnimation($el);
		}
	};

	/* Init
	======================================================= */
	if ($els) {
		$els.each(function() {
			performTransition($(this));
		});
	}

};



/* Slide Toggle
======================================================================================= */

/* Original Method
----------------------------------------------------------------------- */
$.fn.slideToggle_ = $.fn.slideToggle;

/* New Method
----------------------------------------------------------------------- */
$.fn.slideToggle = function(args, callback) {

	var $els = this;

	/* Init
	======================================================= */
	if ($els) {
		$els.each(function() {
			var $el = $(this);
			if ($el.is(':visible') && $el.css('height') !== '0px') {
				$el.slideUp(args, callback);
			} else {
				$el.slideDown(args, callback);
			}
		});
	}

};



/* End Plugin
======================================================================================= */

})(window, document, jQuery); 