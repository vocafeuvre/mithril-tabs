import m from 'mithril';
import cx from 'clsx';

const DEFAULT_CLASS = 'mithril-tabs__tab';
const DEFAULT_DISABLED_CLASS = `${DEFAULT_CLASS}--disabled`;
const DEFAULT_SELECTED_CLASS = `${DEFAULT_CLASS}--selected`;

const Tab = () => {
  let element = null;

  return {
    oncreate: ({ attrs: { selected, focus = false } }) => {
      if (selected && focus && element) {
        element.focus();
      }
    },
    onupdate: ({ attrs: { selected, focus = false } }) => {
      if (selected && focus && element) {
        element.focus();
      }
    },
    view: ({
      attrs: {
        className = DEFAULT_CLASS,
        disabled,
        disabledClassName = DEFAULT_DISABLED_CLASS,
        id = null,
        selected = false,
        selectedClassName = DEFAULT_SELECTED_CLASS,
        tabIndex,
        tabRef,
        ...attributes
      },
      children,
    }) => m('li', {
      oncreate: ({ dom }) => {
        element = dom;

        if (tabRef) {
          tabRef(element);
        }
      },
      ...attributes,
      class: cx(
        className,
        {
          [selectedClassName]: selected,
          [disabledClassName]: disabled,
        },
      ),
      role: 'tab',
      id: `tab${id}`,
      'aria-selected': selected ? 'true' : 'false',
      'aria-disabled': disabled ? 'true' : 'false',
      'aria-controls': `panel${id}`,
      tabIndex: tabIndex || (selected ? '0' : null),
      'data-mttab': true,
    }, children),
  };
};

Tab.tabsRole = 'Tab';

export default Tab;
