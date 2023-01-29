import m from 'mithril';
import cx from 'clsx';

const TabList = () => ({
  view: ({
    attrs: {
      className = 'mithril-tabs__tab-list',
      ...attributes
    },
    children,
  }) => (
    m('ul', {
      ...attributes,
      class: cx(className),
      role: 'tablist',
    }, children)
  ),
});

TabList.tabsRole = 'TabList';

export default TabList;
