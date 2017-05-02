(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.getStyledClone = factory());
}(this, (function () { 'use strict';

const getStyledClone = (elements, position) => {

  const nodes = elements instanceof HTMLElement ? [elements] : Array.from(elements),
        fragment = document.createDocumentFragment();

  nodes.forEach((node, i) => {
    const clone = node.cloneNode(true),
          cloneChilren = Array.prototype.slice.call(clone.querySelectorAll('*')),
          nodeChildren = Array.prototype.slice.call(node.querySelectorAll('*'));
    
    // Process parent
    clone.style.cssText = window.getComputedStyle(node).cssText;
    clone.style.webkitTextFillColor = 'initial';
    if (position) {
      const elementBounds = node.getBoundingClientRect();
       // Positioning
      clone.style.position = 'fixed';
      clone.style.left = `${elementBounds.left}px`;
      clone.style.top = `${elementBounds.top}px`;
      clone.style.zIndex = options.zIndex;
      // Conflicting properties
      clone.style.margin = 0;
      clone.style.transform = 'none';
    }
    
    // Process children
    cloneChildren.forEach((child, n) => {
      child.style.cssText = window.getComputedStyle(nodeChildren[n]).cssText;
      child.style.webkitTextFillColor = 'initial';
    });

    // Append to fragment
    fragment.appendChild(clone);
  });

  // Return DOM fragment
  return fragment;
};

return getStyledClone;

})));
