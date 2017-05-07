(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.getStyledClone = factory());
}(this, (function () { 'use strict';

const getStyledClone = (element, options) => {
  const opts = Object.assign({
    position: false,
    fixTransform: true
  }, options);
  if (element instanceof HTMLElement) {
    const clone = element.cloneNode(true),
          cloneNodes = Array.prototype.slice.call(clone.querySelectorAll('*')),
          elementNodes = Array.prototype.slice.call(element.querySelectorAll('*')),
          elementStyles = window.getComputedStyle(element),
          transformCache = elementStyles.transform;
    // Process parent
    clone.style.cssText = elementStyles.cssText;
    clone.style.webkitTextFillColor = 'initial';
    // Process children
    cloneNodes.forEach((node, i) => {
      node.style.cssText = window.getComputedStyle(elementNodes[i]).cssText;
      node.style.webkitTextFillColor = 'initial';
    });
    // Set clone position
    if (opts.position) {
      clone.style.position = 'fixed';
      clone.style.margin = 0; // Conflicting
      // Transform
      if (opts.fixTransform) {
        // Get bounds without transform
        element.style.transform = 'none';
        const transformlessBounds = element.getBoundingClientRect();
        // Reapply original transform
        element.style.transform = transformCache;
        clone.style.left = `${transformlessBounds.left}px`;
        clone.style.top = `${transformlessBounds.top}px`;
      } else {
        const elementBounds = element.getBoundingClientRect();
        clone.style.left = `${elementBounds.left}px`;
        clone.style.top = `${elementBounds.top}px`;
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
