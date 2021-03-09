# Study of React 
关于React的实现的基本原理

## 知识点
+ 什么是虚拟dom？
React 本身只是一个 DOM 的抽象层，使用组件构建虚拟 DOM。
用 JavaScript 对象表示 DOM 信息和结构，当状态变更的时候，重新渲染这个 JavaScript 的对象结构。这个 JavaScript 对象称为virtual dom；DOM操作很慢，轻微的操作都可能导致页面重新排版，非常耗性能。相对于DOM对象，js对象处理起来更快，而且更简单。通过diff算法对比新旧vdom之间的差异，可以批量的、最小化的执行dom操作，从而提高性能。
+ 什么是jsx
    1. 什么是JSX
	语法糖， React 使用 JSX 来替代常规的 JavaScript。
	JSX 是一个看起来很像 XML 的 JavaScript 语法扩展。
	2. 为什么需要JSX
	- 开发效率：使用 JSX 编写模板简单快速。
	- 执行效率：JSX编译为 JavaScript 代码后进行了优化，执行更快。
	- 类型安全：在编译过程中就能发现错误。
	3. React 16原理：babel-loader会预编译JSX为React.createElement(...)
	4. React 17原理：React 17中的 JSX 转换不会将 JSX 转换为 React.createElement，而是自动从 React 的 package 中引入新的入口函数并调用。另外此次升级不会改变 JSX 语法，旧的 JSX 转换也将继续工作。

## ReactDOM.render(node, container[, callback])
    首次调用的时候，容器里节点的所有DOM元素都会被替换，后续的调用则会用react的diff算法进行高效的更新
* vnode转换成dom
* dom 插入container节点
