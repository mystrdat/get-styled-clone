(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.getStyledClone = factory());
}(this, (function () { 'use strict';

  var getStyledClone = function getStyledClone(element, options) {
    var opts = Object.assign({
      position: false,
      fixTransform: true,
      removeClasses: true,
      removeIds: true
    }, options);
    if (element instanceof HTMLElement) {
      var clone = element.cloneNode(true),
          cloneNodes = Array.prototype.slice.call(clone.querySelectorAll('*')),
          elementNodes = Array.prototype.slice.call(element.querySelectorAll('*')),
          elementStyles = window.getComputedStyle(element),
          hasInlineStyle = !!element.getAttribute('style'),
          transformCache = elementStyles.transform;
      // Process parent
      clone.style.cssText = elementStyles.cssText;
      clone.style.webkitTextFillColor = 'initial';
      if (opts.removeClasses) {
        clone.removeAttribute('class');
      }
      if (opts.removeIds) {
        clone.removeAttribute('id');
      }
      // Process children
      cloneNodes.forEach(function (node, i) {
        node.style.cssText = window.getComputedStyle(elementNodes[i]).cssText;
        node.style.webkitTextFillColor = 'initial';
        if (opts.removeClasses) {
          node.removeAttribute('class');
        }
        if (opts.removeIds) {
          node.removeAttribute('id');
        }
      });
      // Set clone position
      if (opts.position) {
        clone.style.position = 'fixed';
        clone.style.margin = 0; // Conflicting
        // Transform
        if (opts.fixTransform) {
          // Get bounds without transform
          element.style.transform = 'none';
          var transformlessBounds = element.getBoundingClientRect();
          // Reapply original transform
          if (hasInlineStyle) {
            element.style.transform = transformCache;
          } else {
            element.removeAttribute('style');
          }
          clone.style.left = transformlessBounds.left + 'px';
          clone.style.top = transformlessBounds.top + 'px';
        } else {
          var elementBounds = element.getBoundingClientRect();
          clone.style.left = elementBounds.left + 'px';
          clone.style.top = elementBounds.top + 'px';
        }
      }
      // Return cloned element
      return clone;
    } else {
      throw new Error('Parameter must be a HTMLElement reference.');
    }
  };

  return getStyledClone;

})));
