/**
 * Created by admin on 2018/5/29.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 动画callback只支持1.x版本的TransitionGroup
 */
import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
//import {TweenMax} from "gsap";
//import PropTypes from 'prop-types';

class Page404 extends React.Component {
	static defaultProps = {
		...Component.defaultProps
	}
	static propTypes = {}

	constructor(props) {
		super(props)
		this.state = {}
		this.dom = React.createRef()
		//React.createRef();current
		//事件绑定在es6中用于自定义事件props事件不适用
		//this.handleClick = this.handleClick.bind(this);
	}

	//组件将要装载
	//componentWillMount(){}
	//组件加载完毕
	componentDidMount() {
		//this.dom.root=ReactDOM.findDOMNode(this);
	}

	//组件将要卸载
	//componentWillUnmount(){}
	//组件将更新
	//componentWillUpdate(){}
	//组件更新完毕
	//componentDidUpdate(){}
	//shouldComponentUpdate(nextProps, nextState) {}
	//组件将接收道具
	// componentWillReceiveProps(nextProps){}

	/*动画*/
	//componentWillAppear(callback){}
	//componentDidAppear(){}
	//componentWillEnter(callback){}
	//componentDidEnter(){}
	//componentWillLeave(callback){}
	//componentDidLeave(){}
	render() {
		return (
			<div ref={this.dom}>404</div>
		);
	}
}

export default Page404;
