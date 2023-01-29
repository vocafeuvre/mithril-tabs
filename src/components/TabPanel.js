import m from 'mithril';
import cx from 'clsx';

const DEFAULT_CLASS = 'mithril-tabs__tab-panel';

const TabPanel = () => ({
  /**
     *
     * @typedef TabPanelAttrs
     * @property {string} id
     * @property {string} className
     * @property {boolean} forceRender
     * @property {boolean} selected
     * @property {string} selectedClassName
     */

  /**  @param {m.Vnode<TabPanelAttrs>} vnode */
  view: ({
    attrs: {
      id,
      className = DEFAULT_CLASS,
      forceRender = false,
      selected,
      selectedClassName = `${DEFAULT_CLASS}--selected`,
      ...attributes
    },
    children,
  }) => (
    m('div', {
      ...attributes,
      class: cx(
        className,
        {
          [selectedClassName]: selected,
        },
      ),
      role: 'tabpanel',
      id: `panel${id}`,
      'aria-labelledby': `tab${id}`,
    }, forceRender || selected ? children : null)
  ),
});

TabPanel.tabsRole = 'TabPanel';

export default TabPanel;
