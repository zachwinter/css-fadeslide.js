/* 
 *
 * css-fadeslide.js v1.0 (c) 2014
 * Enable CSS Transitions for jQuery fadeIn/Out/Toggle & slideUp/Down/Toggle
 * 
 * @author  : Zach Winter (contact@zachwinter.com)
 * @license : MIT (http://www.opensource.org/licenses/mit-license.php)
 *
 */

;(function($){
"use strict";



/* Shared Functions
======================================================================================= */
var _shared = {

	/* Detect CSS transition support.
	----------------------------------------------------------------------- */
	transitionSupport : function() {
		if (typeof(Modernizr) != 'undefined' && typeof(Modernizr.csstransitions) != 'undefined') {
			return Modernizr.csstransitions;
		} else {
			var a = document.createElement("div").style,
			    b = [ a.transition, a.WebkitTransition, a.MozTransition ];
			for (var i=0; i<b.length; i++) if (b[i] !== undefined) return true;
			return false;
		}
	},

	/* Set transition for fadeIn / fadeOut / fadeToggle.
	----------------------------------------------------------------------- */
	setFadeTransition : function($el, speed) {
		$el.css({
			'-webkit-transition' : 'opacity ' + speed/1000 + 's ease',
			'-moz-transition'    : 'opacity ' + speed/1000 + 's ease',
			'transition'         : 'opacity ' + speed/1000 + 's ease'
		});
	},

	/* Set transition for slideUp / slideDown / slideToggle.
	----------------------------------------------------------------------- */
	setSlideTransition : function($el, speed) {
		$el.css({
			'-webkit-transition' : 'height ' + speed/1000 + 's ease, margin ' + speed/1000 + 's ease, padding ' + speed/1000 + 's ease',
			'-moz-transition'    : 'height ' + speed/1000 + 's ease, margin ' + speed/1000 + 's ease, padding ' + speed/1000 + 's ease',
			'transition'         : 'height ' + speed/1000 + 's ease, margin ' + speed/1000 + 's ease, padding ' + speed/1000 + 's ease'
		});
	},

	/* Remove all CSS transition.
	----------------------------------------------------------------------- */
	removeTransition : function($el) {
		$el.css({
			'-webkit-transition' : 'none',
			'-moz-transition'    : 'none',
			'transition'         : 'none'
		});
	}

};



/* Fade In
======================================================================================= */

/* Original Method
----------------------------------------------------------------------- */
$.fn.fadeIn_ = $.fn.fadeIn;

/* New Method
----------------------------------------------------------------------- */
$.fn.fadeIn = function(speed, callback){

	var $els = this;

	/* Parameter Normalization + Default Speed
	======================================================= */
	if ($.isFunction(speed)) {
		callback = speed;
		speed    = 300;
	}

	/* CSS Transition
	======================================================= */
	var cssTransition = function($el) {
		_shared.setFadeTransition($el, speed);
		$el.css('opacity', '0').show();
		setTimeout(function(){
			$el.on('transitionend webkitTransitionEnd', function(){
				$el.off('transitionend webkitTransitionEnd');
				if (typeof(callback) != 'undefined') callback();
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
		var support = _shared.transitionSupport();
		$els.each(function(){
			var $el = $(this);
			support ? cssTransition($el) : jqueryAnimation($el);
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
$.fn.fadeOut = function(speed, callback){

	var $els = this;

	/* Parameter Normalization + Default Speed
	======================================================= */
	if ($.isFunction(speed)) {
		callback = speed;
		speed    = 300;
	}

	/* CSS Transition
	======================================================= */
	var cssTransition = function($el) {
		_shared.setFadeTransition($el, speed);
		$el.css('opacity', '0');
		$el.on('transitionend webkitTransitionEnd', function(){
			$el.hide().removeAttr('style').off('transitionend webkitTransitionEnd');
			if (typeof(callback) != 'undefined') callback();
		});
	};

	/* jQuery Animation
	======================================================= */
	var jqueryAnimation = function($el){
		$el.fadeOut_(speed, callback);
	};

	/* Init
	======================================================= */
	if ($els) {
		var support = _shared.transitionSupport();
		$els.each(function(){
			var $el = $(this);
			support ? cssTransition($el) : jqueryAnimation($el);
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
$.fn.fadeToggle = function(speed, callback){

	var $els = this;

	/* Parameter Normalization + Default Speed
	======================================================= */
	if ($.isFunction(speed)) {
		callback = speed;
		speed    = 300;
	}

	/* Init
	======================================================= */
	if ($els) {
		$els.each(function(){
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
$.fn.slideUp = function(speed, callback){

	var $els = this;

	/* Parameter Normalization + Default Speed
	======================================================= */
	if ($.isFunction(speed)) {
		callback = speed;
		speed    = 300;
	}

	/* CSS Transition
	======================================================= */
	var cssTransition = function($el) {

		_shared.setSlideTransition($el, speed);

		var height = $el.outerHeight();

		$el.css({
			'height'   : height,
			'overflow' : 'hidden'
		});

		setTimeout(function(){
			$el.on('transitionend webkitTransitionEnd', function(e){
				if (e.originalEvent.propertyName == "height") {
					$el.off('transitionend webkitTransitionEnd');
					if (typeof(callback) != 'undefined') callback();
				}
			}).css({
				'height'  : '0px',
				'margin'  : '0px',
				'padding' : '0px'
			});
		}, 20);

	};

	/* jQuery Animation
	======================================================= */
	var jqueryAnimation = function($el){
		$el.slideUp_(speed, callback);
	};

	/* Init
	======================================================= */
	if ($els) {
		var support = _shared.transitionSupport();
		$els.each(function(){
			var $el = $(this);
			support ? cssTransition($el) : jqueryAnimation($el);
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
$.fn.slideDown = function(speed, callback){

	var $els = this;

	/* Parameter Normalization + Default Speed
	======================================================= */
	if ($.isFunction(speed)) {
		callback = speed;
		speed    = 300;
	}

	/* CSS Transition
	======================================================= */
	var cssTransition = function($el) {

		_shared.removeTransition($el);

		var margin  = $el.css('margin'),
		    padding = $el.css('padding'),
		    height  = $el.css({
			    'height'  : 'auto',
			    'display' : 'block'
		    }).outerHeight();

		$el.css({
			'height'   : '0px', 
			'padding'  : '0px',
			'margin'   : '0px',
			'overflow' : 'hidden'
		});

		setTimeout(function(){
			_shared.setSlideTransition($el, speed);
		}, 20);

		setTimeout(function(){
			$el.on('transitionend webkitTransitionEnd', function(e){
				if (e.originalEvent.propertyName == "height") {
					$el.off('transitionend webkitTransitionEnd').css('height', 'auto');
					if (typeof(callback) != 'undefined') callback();
				}
			}).css({
				'height'  : height,
				'padding' : padding,
				'margin'  : margin
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
		var support = _shared.transitionSupport();
		$els.each(function(){
			var $el = $(this);
			support ? cssTransition($el) : jqueryAnimation($el);
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
$.fn.slideToggle = function(speed, callback){

	var $els = this;

	/* Parameter Normalization + Default Speed
	======================================================= */
	if ($.isFunction(speed)) {
		callback = speed;
		speed    = 300;
	}

	/* Init
	======================================================= */
	if ($els) {
		$els.each(function(){
			var $el = $(this);
			$el.is(':visible') && $el.css('height') !== '0px' ? $el.slideUp(speed, callback) : $el.slideDown(speed, callback);
		});
	}

};



/* End Plugin
======================================================================================= */

})(jQuery); 