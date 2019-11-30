# new GatsbyPost()

> 在 Gatsby.js 项目中创建一篇文章。

## 使用

首先在 `setting.json` 根据自己的项目目录配置以下条目：

```json
{
  // 文章目录，默认值：src/pages
  "gatsby.postsDir": "",

  // 文章头部，默认值：["title", "date", "path"]
  "gatsby.frontmatter": []
}
```

打开命令面板，搜索 `Gatsby: Create new post`，按下回车之后会要求输入，可以是文件名或者路径名，例如：

- 输入 `how-to-use-gatsby` 会创建 `src/pages/how-to-use-gatsby.md`
- 输入 `how-to-use-gatsby/index` 会创建 `src/pages/how-to-use-gatsby/index.md`

**Enjoy!**
