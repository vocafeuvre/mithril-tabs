function makeTypeChecker(tabsRole) {
  return (vnode) => !!vnode.tag && vnode.tag.tabsRole === tabsRole;
}

export const isTab = makeTypeChecker('Tab');
export const isTabList = makeTypeChecker('TabList');
export const isTabPanel = makeTypeChecker('TabPanel');
