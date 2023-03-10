import { deepForEach } from './childrenDeepMap';
import { isTab } from './elementTypes';

export function getTabsCount(children) {
  let tabCount = 0;
  deepForEach(children, (child) => {
    if (isTab(child)) tabCount++;
  });

  return tabCount;
}
