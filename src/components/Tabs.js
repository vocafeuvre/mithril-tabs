import m from 'mithril';
import UncontrolledTabs from './UncontrolledTabs';
import { getTabsCount } from '../helpers/count';

const MODE_CONTROLLED = 0;
const MODE_UNCONTROLLED = 1;

/**
 *
 * it would be nice if we had a mithril helper that can insert default vnode.attrs if they're missing
 *
 * i think the helper could be something like this:
 * const Component = () => assignDefaultAttrs({
 *      view: (vnode) => m('span', 'bla')
 *      oncreate: (vnode) => vnode.dom.textContent = vnode.attrs.value
 * }, {
 *      value: 'default'
 * })
 *
 * or: const Component = () => assignDefaultAttrs({
 *      view: (vnode) => m('span', 'bla')
 *      oncreate: (vnode) => vnode.dom.textContent = vnode.attrs.value
 * }, {
 *      value: 'default'
 * })
 *
 */

const getModeFromAttrs = (vnode) => (
  vnode.attrs.selectedIndex === null
  || vnode.attrs.selectedIndex === undefined
    ? MODE_UNCONTROLLED
    : MODE_CONTROLLED
);

const checkForIllegalModeChange = (vnode, mode) => {
  if (
    mode != undefined // eslint-disable-line eqeqeq
        && mode !== getModeFromAttrs(vnode)
  ) {
    throw new Error(
      'Switching between controlled mode (by using `selectedIndex`) and uncontrolled mode is not supported in `Tabs`.',
    );
  }
};

/**
 * State:
 *   mode: Initialized only once from props and never changes
 *   selectedIndex: null if controlled mode, otherwise initialized with prop defaultIndex, changed on selection of tabs, has effect to ensure it never gets out of bound
 *   focus: Because we never remove focus from the Tabs this state is only used to indicate that we should focus the current tab.
 *          It is initialized from the prop defaultFocus, and after the first render it is reset back to false. Later it can become true again when using keys to navigate the tabs.
 */
const Tabs = () => {
  let focus;
  let mode;
  let selectedIndex;

  let tabsCountCache;

  return {
    oninit: (vnode) => {
      const defaultFocus = vnode.attrs.defaultFocus === undefined ? false : vnode.attrs.defaultFocus;
      const defaultIndex = vnode.attrs.defaultIndex === undefined ? null : vnode.attrs.defaultIndex;

      focus = defaultFocus;
      mode = getModeFromAttrs(vnode);
      selectedIndex = mode === MODE_UNCONTROLLED ? defaultIndex || 0 : null;
    },
    oncreate: (vnode) => {
      focus = false;

      if (mode === MODE_UNCONTROLLED) {
        // Ensure that we handle removed tabs and don't let selectedIndex get out of bounds
        const tabsCount = getTabsCount(vnode.children);
        if (tabsCount !== tabsCountCache) {
          if (selectedIndex !== null) {
            const maxTabIndex = Math.max(0, tabsCount - 1);
            selectedIndex = Math.min(selectedIndex, maxTabIndex);
          }
        }
        tabsCountCache = tabsCount;
      }
    },
    onupdate: (vnode) => {
      if (mode === MODE_UNCONTROLLED) {
        // Ensure that we handle removed tabs and don't let selectedIndex get out of bounds
        const tabsCount = getTabsCount(vnode.children);
        if (tabsCount !== tabsCountCache) {
          if (selectedIndex !== null) {
            const maxTabIndex = Math.max(0, tabsCount - 1);
            selectedIndex = Math.min(selectedIndex, maxTabIndex);
          }
        }
        tabsCountCache = tabsCount;
      }
    },
    view: (vnode) => {
      const { onselect } = vnode.attrs;
      let { focusTabOnClick } = vnode.attrs;

      if (focusTabOnClick === undefined) {
        focusTabOnClick = true;
      }

      checkForIllegalModeChange(vnode, mode);

      const handleSelected = (index, last, event) => {
        // Call change event handler
        if (typeof onselect === 'function') {
          // Check if the change event handler cancels the tab change
          if (onselect(index, last, event) === false) return;
        }

        // Always set focus on tabs unless it is disabled
        if (focusTabOnClick) {
          focus = true;
        }

        if (mode === MODE_UNCONTROLLED) {
          // Update selected index
          selectedIndex = index;
        }
      };

      const subAttrs = { ...vnode.attrs };

      subAttrs.focus = focus;
      subAttrs.onselect = handleSelected;

      if (selectedIndex != null) {
        subAttrs.selectedIndex = selectedIndex;
      }

      delete subAttrs.defaultFocus;
      delete subAttrs.defaultIndex;
      delete subAttrs.focusTabOnClick;

      return m(
        UncontrolledTabs,
        subAttrs,
        vnode.children,
      );
    },
  };
};

Tabs.tabsRole = 'Tabs';

export default Tabs;
