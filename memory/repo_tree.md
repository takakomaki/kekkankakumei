# リポジトリ構造ツリー（UTF-8 / 文字化けなし）

このファイルは `C:\doc\repo_kekkankakumei` のフォルダ・ファイル構造をツリー化したものです。

## 生成方法

```powershell
pwsh -NoProfile -File .\\tools\\generate_repo_tree_md.ps1 -Path . -OutputFile .\\memory\\repo_tree.md -ExcludeGit
```

## ツリー（`.git` 除外）

```text
repo_kekkankakumei
├── assets
├── docs
│   ├── initial_setup.md
│   ├── lp_hero_section.md
│   └── test.txt
├── memory
│   └── repo_tree.md
├── src
├── tools
│   ├── generate_repo_tree_md.ps1
│   └── tree_utf8.ps1
├── .gitignore
└── README.md
```

