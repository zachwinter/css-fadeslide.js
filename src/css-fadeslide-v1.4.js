/* 
 *
 * css-fadeslide.js v1.4 (c) 2014
 * Enable CSS Transitions for jQuery fadeIn/Out/Toggle & slideUp/Down/Toggle
 *
 * @author  : Zach Winter (contact@zachwinter.com)
 * @link    : https://github.com/zachwinter/css-fadeslide.js
 * @license : MIT (http://www.opensource.org/licenses/mit-license.php)
 *
 */

;(function(window, document, $) {
"use strict";

/* 1. AnimationQueue()
      ----------------
      Animation queue constructor function.

      setFadeTransition()
      -------------------
      Set appropriate CSS properties for fadeIn() and fadeOut().

      setSlideTransition()
      --------------------
      Set appropraite CSS properties for slideDown() and slideUp().

      removeTransition()
      ------------------
      Remove all CSS transitions.

      fadeIn()   fadeOut()   fadeToggle()   slideUp()   slideDown()  slideToggle()
      -----------------------------------------------------------------------------
      Replacements for default jQuery methods. 

======================================================================================= */

function rewriteMethods(transitionEnd, vendorPrefix) {

	/* AnimationQueue()
	----------------------------------------------------------------------- */
	function AnimationQueue($el) {

		var self = this;

		// Active function.
		self.active = 0;

		// Array of functions.
		self.chain = [];

		// Method to add function to queue.
		self.add = function(method) {
			self.chain.push(method);
		};

		// Reset queue.
		self.reset = function() {
			self.chain  = [];
			self.active = 0;
		};

		// Routing method.
		self.route = function($el) {
			self.active++;
			setTimeout(function(){
				if (typeof(self.chain[self.active]) !== 'undefined') {
					self.chain[self.active]($el);
				}
			}, 20);
		};

		// Initialize queue.
		self.start = function($el) {
			self.chain[0]($el);
		};

	}

	/* setFadeTransition()
	----------------------------------------------------------------------- */
	$.fn.setFadeTransition = function(duration, easing) {
		this.css(vendorPrefix + 'transition', 'opacity ' + duration / 1000 + 's ' + easing);
		return this;
	};

	/* setSlideTransition()
	----------------------------------------------------------------------- */
	$.fn.setSlideTransition = function(duration, easing) {
		this.css(vendorPrefix + 'transition-property', 'height, margin-top, margin-bottom, padding-top, padding-bottom');
		this.css(vendorPrefix + 'transition-duration', duration / 1000 + 's');
		this.css(vendorPrefix + 'transition-timing-function', easing);
		return this;
	};

	/* removeTransition()
	----------------------------------------------------------------------- */
	$.fn.removeTransition = function() {
		this.css(vendorPrefix + 'transition', 'none');
		return this;
	};

	/* fadeIn()
	----------------------------------------------------------------------- */
	$.fn.fadeIn = function(args, callback) {

		var $els = this,
		       _ = processParameters(args, callback);

		_.namespace = '.fadeIn';

		function animate($el) {

			$el.off(transitionEnd + _.namespace);
			$el.off(transitionEnd + '.fadeOut');

			if (typeof($el.Q) === 'undefined') {
				$el.Q = new AnimationQueue($el);
			}

			$el.Q.reset();

			$el.Q.add(function($el) {
				$el.removeTransition().css({
					'display' : 'block',
					'opacity' : '0'
				}).setFadeTransition(_.duration, _.easing);
				$el.Q.route($el);
			});

			$el.Q.add(function($el) {
				$el.on(transitionEnd + _.namespace, function(e) {
					e.stopPropagation();
					$el.off(transitionEnd + _.namespace).css({
						'display' : 'block',
						'opacity' : '1'
					});
					$el.removeAttr('data-transition');
					if (typeof(_.callback) === "function") _.callback();
				});
				$el.Q.route($el);
			});

			$el.Q.add(function($el) {
				$el.attr('data-transition', 'fadeIn').css('opacity', '1');
				$el.Q.route($el);
			});

			$el.Q.start($el);

		}

		if ($els) {
			$els.each(function() {
				animate($(this));
			});
		}

	};

	/* fadeOut()
	----------------------------------------------------------------------- */
	$.fn.fadeOut = function(args, callback) {

		var $els = this,
		       _ = processParameters(args, callback);

		_.namespace = '.fadeOut';

		function animate($el) {

			$el.off(transitionEnd + _.namespace);
			$el.off(transitionEnd + '.fadeIn');

			if (typeof($el.Q) === 'undefined') {
				$el.Q = new AnimationQueue($el);
			}

			$el.Q.reset();

			$el.Q.add(function($el) {
				$el.removeTransition().css({
					'display' : 'block'
				}).setFadeTransition(_.duration, _.easing);
				$el.Q.route($el);
			});

			$el.Q.add(function($el) {
				$el.on(transitionEnd + _.namespace, function(e){
					e.stopPropagation();
					$el.off(transitionEnd + _.namespace).removeAttr('style').css('display', 'none');
					$el.removeAttr('data-transition');
					if (typeof(_.callback) === "function") _.callback();
				});
				$el.Q.route($el);
			});

			$el.Q.add(function($el) {
				$el.attr('data-transition', 'fadeOut').css('opacity', '0');
				$el.Q.route($el);
			});

			$el.Q.start($el);

		}

		if ($els) {
			$els.each(function() {
				animate($(this));
			});
		}

	};

	/* fadeToggle()
	----------------------------------------------------------------------- */
	$.fn.fadeToggle = function(args, callback) { 

		var $els = this;

		if ($els) {
			$els.each(function() {

				var $el = $(this);

				if ($el.is(':visible')) {
					if (typeof($el.attr('data-transition')) !== 'undefined' && $el.attr('data-transition') === 'fadeOut') {
						$el.fadeIn(args, callback);
					} else {
						$el.fadeOut(args, callback);
					}
				} else {
					if (typeof($el.attr('data-transition')) !== 'undefined' && $el.attr('data-transition') === 'fadeIn') {
						$el.fadeOut(args, callback);
					} else {
						$el.fadeIn(args, callback);
					}
				}

			});
		}

	};

	/* slideUp()
	----------------------------------------------------------------------- */
	$.fn.slideUp = function(args, callback) {

		var $els = this, _ = processParameters(args, callback);

		_.namespace = '.slideUp';

		function animate($el) {

			var setMargin      = $el.css('margin-bottom'),
			    adjustedMargin = parseInt($el.find('* >:last-child').css('margin-bottom')) + parseInt(setMargin),
			    marginUnit     = setMargin.match(/[^\d\.]+/, '');

			$el.off(transitionEnd + '.slideDown');
			$el.off(transitionEnd + '.slideUp');

			if (typeof($el.Q) === 'undefined') {
				$el.Q = new AnimationQueue($el);
			}

			$el.Q.reset();

			if (typeof($el.attr('data-transition')) === "undefined") {

				$el.Q.add(function($el){
					$el.removeTransition()
					$el.Q.route($el);
				});

				$el.Q.add(function($el) {
					$el.css({
						'height'        : $el.outerHeight(),
						'overflow'      : 'hidden',
						'margin-bottom' : adjustedMargin + marginUnit
					});
					$el.Q.route($el);
				});	

				$el.Q.add(function($el) {
					$el.setSlideTransition(_.duration, _.easing);
					$el.Q.route($el);
				});

			}

			$el.Q.add(function($el) {
				$el.on(transitionEnd + _.namespace, function(e){
					e.stopPropagation();
					if (e.originalEvent.propertyName === "height") {
						$el.off(transitionEnd + _.namespace).removeAttr('style').hide();
						$el.removeAttr('data-transition');
						if (typeof(_.callback) === "function") _.callback();
					}
				});
				$el.Q.route($el);
			});

			$el.Q.add(function($el) {
				$el.attr('data-transition', 'slideUp').css({
					'height'         : '0px',
					'margin-top'     : '0px',
					'margin-bottom'  : '0px',
					'padding-top'    : '0px',
					'padding-bottom' : '0px'
				});
				$el.Q.route($el);
			});

			$el.Q.start($el);

		}

		if ($els) {
			$els.each(function() {
				animate($(this));
			});
		}

	};

	/* slideDown()
	----------------------------------------------------------------------- */
	$.fn.slideDown = function(args, callback) {

		var $els = this, _ = processParameters(args, callback);

		_.namespace = '.slideDown';

		function getProperties($el) {

			var $parent = $el.parent(),
				  $clone  = $el.clone(), 
			    $container,
			    properties;

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
				'bottom'   : 'auto',
				'overflow' : 'auto'
			});

			$clone.css({
				'display'    : 'block',
				'height'     : 'auto',
				'min-height' : '0',
				'overflow'   : 'auto'
			}).appendTo($container);

			properties = {
				marginTop     : $clone.css('margin-top'),
				marginBottom  : $clone.css('margin-bottom'),
				paddingTop    : $clone.css('padding-top'),
				paddingBottom : $clone.css('padding-bottom'),
				height        : $clone.outerHeight(),
				childMargin   : $clone.find('> *:last-child').css('margin-bottom')
			};

			$container.remove();

			return properties;

		}

		function animate($el) {

			var properties = getProperties($el);

			$el.off(transitionEnd + '.slideDown');
			$el.off(transitionEnd + '.slideUp');

			if (typeof($el.Q) === 'undefined') {
				$el.Q = new AnimationQueue($el);
			}

			$el.Q.reset();
			
			if (typeof($el.attr('data-transition')) === "undefined") {

				$el.Q.add(function($el) {
					$el.removeAttr('style').hide().removeTransition().css({
						'display'        : 'block',
						'overflow'       : 'hidden',
						'height'         : '0px', 
						'padding-top'    : '0px', 
						'padding-bottom' : '0px',
						'margin-top'     : '0px',
						'margin-bottom'  : '0px'
					});
					$el.Q.route($el);
				});

				$el.Q.add(function($el) {
					$el.setSlideTransition(_.duration, _.easing);
					$el.Q.route($el);
				});

				$el.attr({
					'data-height'         : properties.height,
					'data-padding-top'    : properties.paddingTop,
					'data-padding-bottom' : properties.paddingBotttom,
					'data-margin-top'     : properties.marginTop,
					'data-margin-bottom'  : properties.marginBottom
				});

			};

			$el.Q.add(function($el) {
				$el.on(transitionEnd + _.namespace, function(e) {
					e.stopPropagation();
					if (e.originalEvent.propertyName === "height") {
						$el.off(transitionEnd + _.namespace).removeAttr('style').show();
						$el.removeAttr('data-transition');
						if (typeof(_.callback) === "function") _.callback();
					}
				});
				$el.Q.route($el);
			});

			$el.Q.add(function($el) {
				$el.attr('data-transition', 'slideDown').css({
					'height'         : $el.attr('data-height'),
					'padding-top'    : $el.attr('data-padding-top'),
					'padding-bottom' : $el.attr('data-padding-bottom'),
					'margin-top'     : $el.attr('data-margin-top'),
					'margin-bottom'  : $el.attr('data-margin-bottom')
				});
				$el.Q.route($el);
			});

			$el.Q.start($el);
		
		}

		if ($els) {
			$els.each(function() {
				animate($(this));
			});
		}

	};

	/* slideToggle()
	----------------------------------------------------------------------- */
	$.fn.slideToggle = function(args, callback) {

		var $els = this;

		if ($els) {
			$els.each(function() {

				var $el = $(this);

				if ($el.css('opacity') !== 0 && $el.css('height') !== '0' && $el.css('display') !== 'none') {
					if (typeof($el.attr('data-transition')) !== 'undefined' && $el.attr('data-transition') === 'slideUp') {
						$el.slideDown(args, callback);
					} else {
						$el.slideUp(args, callback);
					}
				} else {
					if (typeof($el.attr('data-transition')) !== 'undefined' && $el.attr('data-transition') === 'slideDown') {
						$el.slideUp(args, callback);
					} else {
						$el.slideDown(args, callback);
					}
				}

			});
		}

	};

}

/* 2. Process / normalize parameters passed to new methods.
======================================================================================= */

function processParameters(args, callback) {

	var defaults = {
		duration : 400,
		easing   : 'ease'
	}, _o;

	if (typeof(args) === "object") {
		_o = $.extend(defaults, args);
		_o.callback = callback;
	}

	else if ($.isNumeric(args)) {
		_o = $.extend(defaults, {
			duration : parseInt(args),
			callback : callback
		});
	}

	else if (typeof(args) === "string") {
		if (args === 'fast') {
			_o = $.extend(defaults, {
				duration : 200,
				callback : callback
			});
		}

		else if (args === 'slow') {
			_o = $.extend(defaults, {
				duration : 600,
				callback : callback
			});

		}

		else {
			_o = $.extend(defaults, {
				callback : callback
			});
		}
	}

	else if (typeof(args) === "function") {
		_o = $.extend(defaults, {
			callback : args
		});
	}

	else {
		_o = $.extend(defaults, {
			callback : callback
		});
	}

	return _o;

}

/* 3. Initialize - Only run if CSS transitions are supported.
======================================================================================= */

(function(){

	var div = document.createElement("div").style,

	styles = [
		div.transition,
		div.WebkitTransition,
		div.MozTransition,
		div.msTransition,
		div.oTransition
	],

	prefix = [
		'',
		'-webkit-',
		'-moz-',
		'-ms-',
		'-o-'
	],

	event = [
		'transitionend',
		'webkitTransitionEnd',
		'transitionend',
		'msTransitionEnd',
		'oTransitionEnd'
	];

	for (var i=0; i<styles.length; i++) {
		if (styles[i] !== undefined) {
			var transitionEnd = event[i],
			    vendorPrefix  = prefix[i];

			// Go! 
			rewriteMethods(transitionEnd, vendorPrefix);
			break;
		}
	}

})();

})(window, document, jQuery); 