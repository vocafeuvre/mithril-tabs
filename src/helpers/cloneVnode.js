import m from 'mithril';

const cloneVnode = (vnode, attrs, children) => m(
  vnode.tag,
  {
    ...vnode.attrs,
    ...(typeof attrs === 'object' && !!attrs ? attrs : {}),
  },
  children
    ? (
      Array.isArray(children)
        ? children.map((child) => cloneVnode(child))
        : children
    )
    : vnode.text || vnode.children.map((child) => cloneVnode(child)),
);

export default cloneVnode;
