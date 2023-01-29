import cloneVnode from './cloneVnode';
import { isTab, isTabList, isTabPanel } from './elementTypes';

function isTabChild(child) {
  return isTab(child) || isTabList(child) || isTabPanel(child);
}

export function deepMap(children, callback) {
  return children.map((child) => {
    if (child === null) return null;

    if (isTabChild(child)) {
      return callback(child);
    }

    if (
      child.attrs
            && child.children
            && Array.isArray(child.children)
    ) {
      // Clone the child that has children and map them too
      return cloneVnode(
        child,
        ...child.attrs,
        deepMap(child.children, callback),
      );
    }

    return child;
  });
}

export function deepForEach(children, callback) {
  return children.forEach((child) => {
    if (child === null) return;

    if (isTab(child) || isTabPanel(child)) {
      callback(child);
    } else if (
      child.attrs
            && child.children
            && Array.isArray(child.children)
    ) {
      if (isTabList(child)) callback(child);
      deepForEach(child.props.children, callback);
    }
  });
}
