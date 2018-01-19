# Boom Tiger CLI

## 功能设计

- []生成项目全部文件
- []生成 `controller` 文件
- []生成 `router`
- []生成 `service`
- []生成 `db_service`
- []生成 `error`
- []生成 `contract`
- []生成 `interfaces`
- []修改 `api_router`
- []修改 `doc_generator`

## 命令设计

```bash
bt new <project_name>
bt init
bt g controller <project_name>
bt g router <project_name>
bt g service <project_name>
```

## 遇到的问题

### Q1 权限拒绝

```bash
zsh: permission denied: ./bin/bt
```

解决办法：
`chmod +x bin/*`
原因：bin目录下的文件没有可执行权限。