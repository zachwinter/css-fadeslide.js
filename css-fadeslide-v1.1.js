/* 
 *
 * css-fadeslide.js v1.1 (c) 2014
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

/* Default transition speed.
----------------------------------------------------------------------- */
var _SPEED = 400;

/* Detect CSS transition support.
----------------------------------------------------------------------- */
var transitionSupport = function() {
	if (typeof (window.Modernizr) !== 'undefined' && typeof (window.Modernizr.csstransitions) !== 'undefined') {
		return Modernizr.csstransitions;
	} else {
		var a = document.createElement("div").style,
		    b = [ a.transition, a.WebkitTransition, a.MozTransition ];
		for (var i=0; i<b.length; i++) {
			if (b[i] !== 'undefined') { return true; }
		}
		return false;
	}
}, SUPPORT = transitionSupport();

/* Set transition for fadeIn / fadeOut / fadeToggle.
----------------------------------------------------------------------- */
var setFadeTransition = function($el, speed) {
	$el.css({
		'-webkit-transition' : 'opacity ' + speed/1000 + 's ease',
		'-moz-transition'    : 'opacity ' + speed/1000 + 's ease',
		'transition'         : 'opacity ' + speed/1000 + 's ease'
	});
};

/* Set transition for slideUp / slideDown / slideToggle.
----------------------------------------------------------------------- */
var setSlideTransition = function($el, speed) {
	$el.css({
		'-webkit-transition' : 'height         ' + speed/1000 + 's ease, ' +
		                       'margin-top     ' + speed/1000 + 's ease, ' +
		                       'margin-bottom  ' + speed/1000 + 's ease, ' +
		                       'padding-top    ' + speed/1000 + 's ease, ' +
		                       'padding-bottom ' + speed/1000 + 's ease',

		'-moz-transition'    : 'height         ' + speed/1000 + 's ease, ' +
		                       'margin-top     ' + speed/1000 + 's ease, ' +
		                       'margin-bottom  ' + speed/1000 + 's ease, ' +
		                       'padding-top    ' + speed/1000 + 's ease, ' +
		                       'padding-bottom ' + speed/1000 + 's ease',

		'transition'         : 'height         ' + speed/1000 + 's ease, ' +
		                       'margin-top     ' + speed/1000 + 's ease, ' +
		                       'margin-bottom  ' + speed/1000 + 's ease, ' +
		                       'padding-top    ' + speed/1000 + 's ease, ' +
		                       'padding-bottom ' + speed/1000 + 's ease'
	});
};

/* Remove all CSS transition.
----------------------------------------------------------------------- */
var removeTransition = function($el) {
	$el.css({
		'-webkit-transition' : 'none',
		'-moz-transition'    : 'none',
		'transition'         : 'none'
	});
};



/* Fade In
======================================================================================= */

/* Original Method
----------------------------------------------------------------------- */
$.fn.fadeIn_ = $.fn.fadeIn;

/* New Method
----------------------------------------------------------------------- */
$.fn.fadeIn = function(speed, callback) {

	var $els = this;

	/* Parameter Normalization + Default Speed
	======================================================= */
	if (speed === 'fast') { speed = 200; }
	if (speed === 'slow') { speed = 600; }

	if ($.isFunction(speed)) {
		callback =  speed;
		speed    = _SPEED;
	}

	/* CSS Transition
	======================================================= */
	var cssTransition = function($el) {
		setFadeTransition($el, speed);
		$el.css('opacity', '0').show();
		setTimeout(function() {
			$el.on('transitionend webkitTransitionEnd', function() {
				$el.off('transitionend webkitTransitionEnd');
				if ($.isFunction(callback)) { callback(); }
			}).css('opacity', '1');
		}, 20);
	};

	/* jQuery Animation
	======================================================= */
	var jqueryAnimation = function($el) {
		$el.fadeIn_(speed, callback); 
	};

	/* Init
	======================================================= */
	if ($els) {
		$els.each(function() {
			var $el = $(this);
			SUPPORT ? cssTransition($el) : jqueryAnimation($el);
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
$.fn.fadeOut = function(speed, callback) {

	var $els = this;

	/* Parameter Normalization + Default Speed
	======================================================= */
	if (speed === 'fast') { speed = 200; }
	if (speed === 'slow') { speed = 600; }

	if ($.isFunction(speed)) {
		callback =  speed;
		speed    = _SPEED;
	}

	/* CSS Transition
	======================================================= */
	var cssTransition = function($el) {
		setFadeTransition($el, speed);
		$el.css('opacity', '0').on('transitionend webkitTransitionEnd', function() {
			$el.removeAttr('style').hide().off('transitionend webkitTransitionEnd');
			if ($.isFunction(callback)) { callback(); }
		});
	};

	/* jQuery Animation
	======================================================= */
	var jqueryAnimation = function($el) {
		$el.fadeOut_(speed, callback);
	};

	/* Init
	======================================================= */
	if ($els) {
		$els.each(function() {
			var $el = $(this);
			SUPPORT ? cssTransition($el) : jqueryAnimation($el);
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
$.fn.fadeToggle = function(speed, callback) {

	var $els = this;

	/* Parameter Normalization + Default Speed
	======================================================= */
	if (speed === 'fast') { speed = 200; }
	if (speed === 'slow') { speed = 600; }

	if ($.isFunction(speed)) {
		callback =  speed;
		speed    = _SPEED;
	}

	/* Init
	======================================================= */
	if ($els) {
		$els.each(function() {
			var $el = $(this);
			$el.is(':visible') ? $el.fadeOut(speed, callback) : $el.fadeIn(speed, callback);
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
$.fn.slideUp = function(speed, callback) {

	var $els = this;

	/* Parameter Normalization + Default Speed
	======================================================= */
	if (speed === 'fast') { speed = 200; }
	if (speed === 'slow') { speed = 600; }

	if ($.isFunction(speed)) {
		callback =  speed;
		speed    = _SPEED;
	}

	/* CSS Transition
	======================================================= */
	var cssTransition = function($el) {

		setSlideTransition($el, speed);

		var height = $el.outerHeight();

		$el.css({
			'height'   : height,
			'overflow' : 'hidden'
		});

				if (e.originalEvent.propertyName == "height") {
		setTimeout(function() {
			$el.on('transitionend webkitTransitionEnd', function(e) {
				if (e.originalEvent.propertyName === "height") {
					$el.removeAttr('style').hide().off('transitionend webkitTransitionEnd');
					if ($.isFunction(callback)) { callback(); }
				}
			}).css({
				'height'         : '0px',
				'margin-top'     : '0px',
				'margin-bottom'  : '0px',
				'padding-top'    : '0px',
				'padding-bottom' : '0px'
			});
		}, 20);

	};

	/* jQuery Animation
	======================================================= */
	var jqueryAnimation = function($el) {
		$el.slideUp_(speed, callback);
	};

	/* Init
	======================================================= */
	if ($els) {
		$els.each(function() {
			var $el = $(this);
			performTransition($el); // Or more like this?
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
$.fn.slideDown = function(speed, callback) {

	var $els = this;

	/* Parameter Normalization + Default Speed
	======================================================= */
	if (speed === 'fast') { speed = 200; }
	if (speed === 'slow') { speed = 600; }

	if ($.isFunction(speed)) {
		callback =  speed;
		speed    = _SPEED;
	}

	/* CSS Transition
	======================================================= */
	var cssTransition = function($el) {

		$el.removeAttr('style');

		removeTransition($el);

		var $clone = $el.clone();

		$clone.insertAfter($el);

		$clone.css({
			'height'   : 'auto',
			'display'  : 'block',
			'position' : 'fixed',
			'top'      : '-200%',
			'left'     : '-200%',
			'right'    : '200%'
		});

		var marginTop     = $clone.css('margin-top'),
		    marginBottom  = $clone.css('margin-bottom'),
		    paddingTop    = $clone.css('padding-top'),
		    paddingBottom = $clone.css('padding-bottom'),
		    height        = $clone.outerHeight();

		$clone.remove();

		$el.css({
			'display'        : 'block',
			'height'         : '0px', 
			'padding-top'    : '0px',
			'padding-bottom' : '0px',
			'margin-top'     : '0px',
			'margin-bottom'  : '0px',
			'overflow'       : 'hidden'
		});

		setTimeout(function() {
			setSlideTransition($el, speed);
		}, 20);

				if (e.originalEvent.propertyName == "height") {
		setTimeout(function() {
			$el.on('transitionend webkitTransitionEnd', function(e) {
				if (e.originalEvent.propertyName === "height") {
					$el.off('transitionend webkitTransitionEnd').css('height', 'auto');
					if ($.isFunction(callback)) { callback(); }
				}
			}).css({
				'height'         : height,
				'padding-top'    : paddingTop,
				'padding-bottom' : paddingBottom,
				'margin-top'     : marginTop,
				'margin-bottom'  : marginBottom
			});
		}, 40); 

	};

	/* jQuery Animation
	======================================================= */
	var jqueryAnimation = function($el) {
		$el.slideDown_(speed, callback); 
	};

	/* Init
	======================================================= */
	if ($els) {
		$els.each(function() {
			var $el = $(this);
			SUPPORT ? cssTransition($el) : jqueryAnimation($el);
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
$.fn.slideToggle = function(speed, callback) {

	var $els = this;

	/* Parameter Normalization + Default Speed
	======================================================= */
	if (speed === 'fast') { speed = 200; }
	if (speed === 'slow') { speed = 600; }

	if ($.isFunction(speed)) {
		callback =  speed;
		speed    = _SPEED;
	}

	/* Init
	======================================================= */
	if ($els) {
		$els.each(function() {
			var $el = $(this);
			$el.is(':visible') && $el.css('height') !== '0px' ? $el.slideUp(speed, callback) : $el.slideDown(speed, callback);
		});
	}

};



/* End Plugin
======================================================================================= */

})(window, document, jQuery); 