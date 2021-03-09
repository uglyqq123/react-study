/* eslint-disable import/no-anonymous-default-export */
/**
 * @description vnode 虚拟dom node 真实dom
 */
// 核心渲染函数,初次渲染 不考虑diff
function render(vnode, container) {
	// 1. vnode ===> node
	const node = createNode(vnode);
	// 2. node ===> container
	container.appendChild(node);
}

function createNode (vnode) {
	// 虚拟dom js对象 
	const {type} = vnode;
	let node;
	// 原生标签
	if(typeof type === 'string') {
		node = updateHostComponent(vnode);
	} else if (typeof type === 'function') {
		node = type.prototype.isReactComponent ?
		updateClassComponent(vnode) :
		updateFunctionComponent(vnode)
	} else {
		node = updateTextComponent(vnode);
	}
	return node;
}
// 渲染文本节点
function updateTextComponent(vnode) {
	return document.createTextNode(vnode);
}
// 渲染原生标签
function updateHostComponent(vnode) {
	const {type, props} = vnode;
	const node = document.createElement(type);
	updateNode(node, props); // 属性放上去
	reconcilChildren(node, props.children);
	return node;
}
// 渲染类组件
function updateClassComponent(vnode) {
	const {props, type} = vnode;
	const instance = new type(props);
	const vvnode = instance.render();
	return createNode(vvnode);
}
// 渲染函数组件
function updateFunctionComponent(vnode) {
	const {type, props} = vnode;
	const vvnode = type(props);
	return createNode(vvnode);
}
function updateNode (node, props) {
	Object.keys(props)
	.filter((i) => i !== 'children')
	.forEach((p) => node[p] = props[p])
}

function reconcilChildren(node, children){
	const arr = Array.isArray(children) ? children : [children];
	for(let i = 0; i< arr.length; i++) {
		render(arr[i], node);
	}
}
export default {render};
