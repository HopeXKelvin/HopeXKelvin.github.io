# react学习笔记

## React组件的构建方法

三种构建方法：React.createClass,ES6 classes和无状态函数（stateless function）

setState方法是异步方法

## React生命周期

- 组件的挂载

推荐使用下面例子模版初始化组件：

```javascript
import React, {Component, PropTypes} from 'react';

class App extends Component {
    static propTypes = {};
    static defaultProps = {};

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount() {
        // 会在render方法之前执行
    }

    componentDidMount() {
        // 会在render方法之后执行
    }

    componentWillUnmount() {
        // 在此方法中，我们常常回执行一些清理方法，比如事件回收或者清楚定时器
    }

    render() {
        return <div>This is a demo</div>
    }
}
```
