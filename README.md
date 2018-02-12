# Boom Tiger CLI

## Install

Install with npm:

```bash
npm install boom-tiger -g
```

Install with yarn

```bash
yarn global add boom-tiger
```

## usage

```bash
# Create project base files 创建新项目的基础文件
# bt new <project_name>

bt new lesson_work

# Create the specified type file
# bt g <type> <project_name> [<target_path>]

bt g controller lesson_work

```

## Commands

We have 2 commands: new and generate(alias g).

### bt new <project_name>

### bt g <type> <project_name> [<target_path>]

## Inject code

注入路由信息到特定文件

```javascript
    tian_router:JoiRouter.RouterInstance,
    //@boom-tiger-inject
```

在指定文件，需要插入路由参数的位置，写入标记 `//@boom-tiger-inject`.

当创建路由文件或初始化项目时，会自动注入到文件中.

## 功能设计

- [x] 一键生成项目全部文件
- [x] 生成 `controller` 文件
- [x] 生成 `router`
- [x] 生成 `service`
- [x] 生成 `db_service`
- [x] 生成 `error`
- [x] 生成 `contract`
- [x] 生成 `interfaces`
- [x] 在根据当前环境写入指定文件内
- [x] 修复`error`的文件名
- [x] 一键生成所有文件时清空dist文件
- [x] 注入路由参数到 `api_router`
- [x] 注入路由参数到 `doc_generator`
- [x] 将`interface`写入interface目录下
- [] 一键生成 DB Service 层 CRUD
- [] 交互式生成 DB Service 层 CRUD

## 命令设计

```bash
bt new <project_name>
bt g controller <project_name>
bt g router <project_name>
bt g service <project_name>
```

## 文件生成实现逻辑

假设 filename 参数为 <cloud_variable> 或 <cloudVariable>

- 根据文件名，判断文件夹是否存在。
- 若不存在，则生成。
- 生成指定文件

## 文本插入逻辑

- 当创建 `XXX_router.ts`文件时，将执行文本插入.
- 检测指文件是否存在「标志位」
- 若不存在，则不进行替换，但是进行提示.
- 若存在，则进行文本替换，并提示添加成功

备注：需要替换的地方， `api_router.ts`、`doc_generator.ts`

## 遇到的问题

### Q1 权限拒绝

```bash
zsh: permission denied: ./bin/bt
```

解决办法：
`chmod +x bin/*`
原因：bin目录下的文件没有可执行权限。

### Q2 如何将文本插入到指定文件的指定位置

最初的想法想通过 `typescript` 的词法分析工具，将TS文件转化为语法树，然后往指定的位置插入内容，最后再将语法树，转化成文本。
但是带来了一个新的问题，原有文本的格式会被丢失。 `typescript`在转换语法树的时候，会过滤掉空格和换行。因而，再将语法树转化为文本的时候，会丢失一些格式。

于是，我们使用暴力方法（正则大法），达到文本插入效果：

1. 在文件内的指定位置插入标志位 `//@boom-tiger-inject`
2. 读取文件，利用正则匹配替换掉标志位
