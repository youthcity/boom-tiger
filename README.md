# Boom Tiger CLI

## 功能设计

- []一键生成项目全部文件
- [x]生成 `controller` 文件
- [x]生成 `router`
- [x]生成 `service`
- [x]生成 `db_service`
- [x]生成 `error`
- [x]生成 `contract`
- [x]生成 `interfaces`
- []修改 `api_router`
- []修改 `doc_generator`
- []在根据当前环境写入指定文件内
- []将`interface`写入interface目录下
- []修复`error`的文件名
- []一键生成所有文件时清空dist文件

## 命令设计

```bash
bt new <project_name>
bt init
bt g controller <project_name>
bt g router <project_name>
bt g service <project_name>
```

## 文件生成实现逻辑

假设 filename 参数为 <cloud_variable> 或 <cloudVariable>



- 根据文件名，判断文件夹是否存在。
- 若不存在，则生成。
- 生成指定文件

## 遇到的问题

### Q1 权限拒绝

```bash
zsh: permission denied: ./bin/bt
```

解决办法：
`chmod +x bin/*`
原因：bin目录下的文件没有可执行权限。