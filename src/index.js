// 数据结构的中转站
function createElement(tag, attr, ...children)
{
  console.log('333333');
  return {
    tag,
    attr,
    children
  }
}

function setAttribute(dom, key, value)
{

}
function createComponent(component, props)
{
  let inst;
  return new component(props);
}

function setComponentProps(component, props)
{
  // 组件属性的变化触发
  if (!component.base)
  {
    if (component.componentWillMount) component.componentWillMount();
  } else if (component.componentReceiveProps)
  {
    component.componentReceiveProps(props);
  }
  component.props = props;
  renderComponent(component);
}

// 重绘
function renderComponent(component)
{
  let base;
  const renderer = component.render();
  if (component.base && component.componentWillUpdate)
  {
    component.componentWillUpdate();
  }
  base = _render(renderer);
  if (component.base && component.base.parentNode)
  {
    component.base.parentNode.replaceChild(base, component.base); // diff
  }
  component.base = base;
  base._component = component;
}

// 虚拟DOM转换为真实DOM
function _render(vnode)
{
  if (vnode === undefined || vnode === null || typeof vnode === 'boolean') vnode = '';
  if (typeof vnode === 'number') vnode = String(vnode);
  if (typeof vnode === 'string')
  {
    let textNode = document.createTextNode(vnode);
    return textNode;
  }
  if (typeof vnode.type === 'function')
  {
    const component = createComponent(vnode.type, vnode.attrs);
    setComponentProps(component, vnode.attrs);
    return component.base;
  }
  console.log('tag', vnode);

  const dom = document.createElement(vnode.type);
  if (vnode.attrs)
  {
    Object.keys(vnode.attrs).forEach((key) =>
    {
      const value = vnode.attrs[key];
      setAttribute(dom, key, value);
    })
  }
  // console.log('vnode', vnode);
  // if (typeof (vnode.props?.children) === 'array') vnode.props.children?.forEach((child) => render(child, dom))
  // else render(vnode.props.children, dom);
  return dom;
}

// 插入真实dom节点
function render(vnode, container)
{
  container.append(_render(vnode));
}
class Component
{
  constructor(props)
  {
    this.props = props;
    this.state = {};
  }
  setState(stateChange)
  {
    Object.assign(this.state, stateChange);
    renderComponent(this);
  }
}
const React = {
  createElement,
  Component
}

const ReactDOM = {
  render(vnode, container)
  {
    container.innerHtml = '';
    render(vnode, container);
  }
}

class Vnode extends React.Component
{
  state = {
    number: 2
  }
  render()
  {
    return (
      <div>
        {/* props--{this.props.name} */}
        <p> dddddd </p>
        <div>
          state: {this.state.number}
          <button onClick={(e) => { alert(3) }}> click </button>
        </div >
      </div>
    )
  }
}


ReactDOM.render(<Vnode name='test' />, document.getElementById('root'));