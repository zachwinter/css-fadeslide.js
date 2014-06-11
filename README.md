css-fadeslide.js
================

If the browser supports it, enable CSS Transitions for jQuery fadeIn/Out/Toggle & slideUp/Down/Toggle.

## How to use

Make sure you have jQuery loaded, then load the css-fadeslide.js file.

```javascript
<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script src="/js/css-fadeslide-v1.4.min.js"></script>
```

At this point, you can pretend it's not even there.

```javascript
$(el).fadeIn(300);

$(el).fadeOut({
	duration : 300,
	easing   : ease
});

$(el).slideToggle('slow', function(){
	// Woah.
});
```

## Changelog

**v1.4**
* Added animation queueing for chaining CSS property changes.
* Toggling fade or slide animations now behave as if stop() is being used. 
* Major refactoring & optimization.

**v1.3**
* Updated + broke out method for determining height (+ other properties) of hidden elements.
* Minor refactoring. 

**v1.2**
* Added parameter normalization.
* Added transitionEnd event normalization.
* Added the ability to choose a timing function.
* Updated method of chaining CSS property changes (got rid of those pesky 20ms setTimeout calls).

**v1.1**
* Fixed bug in fadeOut method.
* Added support for “fast” and “slow” speeds.
* Default speed is now defined once, globally.
* Slide functions now only animate the top and bottom margin/padding.
* Updated method for determining the height of a hidden element.
