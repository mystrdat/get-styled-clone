(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.getStyledClone = factory());
}(this, (function () { 'use strict';

const getStyledClone = (element, position = false) => {
  if (element instanceof HTMLElement) {
    const clone = element.cloneNode(true),
          cloneNodes = Array.prototype.slice.call(clone.querySelectorAll('*')),
          elementNodes = Array.prototype.slice.call(element.querySelectorAll('*'));
    // Process parent
    clone.style.cssText = window.getComputedStyle(element).cssText;
    clone.style.webkitTextFillColor = 'initial';
    // Process children
    cloneNodes.forEach((node, i) => {
      node.style.cssText = window.getComputedStyle(elementNodes[i]).cssText;
      node.style.webkitTextFillColor = 'initial';
    });
    // Set clone position
    if (position) {
      const elementBounds = element.getBoundingClientRect();
      clone.style.position = 'fixed';
      clone.style.left = `${elementBounds.left}px`;
      clone.style.top = `${elementBounds.top}px`;
      // Conflicting properties
      clone.style.margin = 0;
      clone.style.transform = 'none'; // TODO: keep relevant transforms
    }
    // Append to fragment
    return clone;
  } else {
    throw new Error('Parameter must be a HTMLElement reference.');
  }
};

return getStyledClone;

})));
