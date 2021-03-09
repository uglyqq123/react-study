import ReactDOM from './zreact/react-dom';
import {Component} from './zreact/react';
class ClsComponent extends Component{
	render() {
		return (
			<div>{this.props.name}</div>
		)
	}
}

function FcComponent (props){
	return (
		<div>
			{props.name}
		</div>
	)
}

const App  = (
	<div>
		<a href='www.baidu.com' >baidu</a>
		hello
		<button onClick={() => {console.log('clicked');}}>button</button>
		<ClsComponent name='class component' />
		<FcComponent name='function component' />
	</div>
)
ReactDOM.render(App, document.getElementById('root'));
