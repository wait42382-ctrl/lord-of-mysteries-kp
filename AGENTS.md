# 项目协作约定

本项目是《诡秘之主》同人 KP 主持工具，纯静态 HTML + CSS + 原生 JavaScript。

- 从 README.md 与 docs/rules/ 了解用途和规则，保持双击 index.html 本地运行。
- data/ 先于 js/ 加载，数据通过顶层 var 暴露，保留有条件的 module.exports。
- 页面通过 player.html 常驻外层维持音乐；不要在内部页面重复创建播放器。
- 保留首页及档案目录首次点击选择、再次点击打开的交互。
- 不擅改“拜祭之指”的设定；区分小说概念、CoC 规则和本项目改编值。
- 修改范围最小，说明验证边界。不要提交凭证、私人路径、旧备份或开发抓取材料。
- 原创代码遵循 LICENSE；素材和第三方材料遵循 THIRD_PARTY_NOTICES.md 及各自许可。
