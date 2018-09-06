const getStyledClone = (element, options) => {
  const opts = Object.assign({
    position: false,
    fixTransform: true,
    removeClasses: true,
    removeIds: true
  }, options);
  if (element instanceof HTMLElement) {
    const clone = element.cloneNode(true),
          cloneNodes = Array.prototype.slice.call(clone.querySelectorAll('*')),
          elementNodes = Array.prototype.slice.call(element.querySelectorAll('*')),
          elementStyles = window.getComputedStyle(element),
          hasInlineStyle = !!element.getAttribute('style'),
          transformCache = elementStyles.transform,
          transitionCache = elementStyles.transition;
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
    cloneNodes.forEach((node, i) => {
      node.style.cssText = window.getComputedStyle(elementNodes[i]).cssText;
      node.style.webkitTextFillColor = 'initial';
      if (opts.removeClasses) {
        node.removeAttribute('class');
      }
      if (opts.removeIds) {
        node.removeAttribute('id');
      }
    })
    // Set clone position
    if (opts.position) {
      clone.style.position = 'fixed';
      clone.style.margin = 0; // Conflicting
      // Transform
      if (opts.fixTransform) {
        // Disable transition
        element.style.transition = 'none !important';
        // Get bounds without transform
        element.style.transform = 'none !important';
        const transformlessBounds = element.getBoundingClientRect();
        // Reapply original transition and transform
        if (hasInlineStyle) {
          element.style.transition = transitionCache;
          element.style.transform = transformCache;
        } else {
          element.removeAttribute('style');
        }
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
}

export default getStyledClone;
