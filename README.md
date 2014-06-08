css-fadeslide.js
================

Enable CSS Transitions for jQuery fadeIn/Out/Toggle & slideUp/Down/Toggle

The default methods are stored and used for browsers that don't support CSS transitions.

**Pretend it's not even there.**

```
$(el).fadeIn(300);

$(el).fadeOut({
	duration : 300,
	easing   : ease
});

$(el).slideToggle('slow', function(){
	// Woah.
});
```

Changelog
---------
**v1.3**
* More updates to method used for determining the height of a hidden element.
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
