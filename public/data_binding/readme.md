# MVVM框架实现原理

## 基本思路就是：数据绑定+视图更新

## MVVM模块划分

- 编译模块 Compiler

- 解析模块 Parser

- 视图刷新模块 Updater

- 数据订阅模块 Watcher

- 数据监听模块 Observer

## 各个模块的分工以及流程

> Compiler 编译好指令后将指令信息交给解析器 Parser 解析，Parser 更新初始值并向 Watcher 订阅数据的变化，Observer 监测到数据的变化然后反馈给 Watcher ，Watcher 再将变化结果通知 Updater 找到对应的刷新函数进行视图的刷新。