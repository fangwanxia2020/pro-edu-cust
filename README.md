# yanxue-pep-admin

人教研学平台运维端(PC)

## 环境变量

使用 `.env` 文件形式添加环境变量，[规范详情](https://cli.vuejs.org/zh/guide/mode-and-env.html#%E6%A8%A1%E5%BC%8F)

> **注意** 项目中为了开发调试方便，在根目录添加了 `env.js` 文件，主要用于在不重启项目的情况下，临时性的修改全局环境变量

## 目录结构

- `@/utils` 放置公共方法
- `@/assets` 放置静态资源如图片、样式文件、字体等
- `@/directive` 放置全局指令
- `@/api` 放置后端接口方法
## git 提交 | git commit

     git add *  // add everything

     git status  // check status

     git cz  // commit change

     git push // push stage commit

    // 如果cz 命令无法找到，全局安全commitize
     npm install -g commitizen
