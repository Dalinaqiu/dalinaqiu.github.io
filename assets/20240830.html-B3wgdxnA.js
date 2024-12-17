import{_ as s,c as a,a as i,o as t}from"./app-vAERMEX6.js";const n={};function l(d,e){return t(),a("div",null,e[0]||(e[0]=[i(`<h1 id="git目录下的子目录和文件" tabindex="-1"><a class="header-anchor" href="#git目录下的子目录和文件"><span>.git目录下的子目录和文件</span></a></h1><p>每个git仓库下都有一个.git目录，这个目录是隐藏的，可以通过ls -a命令查看。</p><ul><li><strong>hooks</strong></li><li><strong>info</strong></li><li><strong>objects</strong></li><li><strong>refs</strong></li><li>config</li><li>HEAD</li><li>description</li><li>index</li><li>packed-refs</li><li>COMMIT_EDITMSG</li></ul><h2 id="head-git-head" tabindex="-1"><a class="header-anchor" href="#head-git-head"><span>HEAD: .git/head</span></a></h2><p>当前分支名称</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">$ cat .git/HEAD</span>
<span class="line">ref: refs/heads/master</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="branch-git-refs-heads-main" tabindex="-1"><a class="header-anchor" href="#branch-git-refs-heads-main"><span>branch: .git/refs/heads/main</span></a></h2><p>包括一个commit Id</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">$ cat .git/refs/heads/main</span>
<span class="line">872345678901234567890123456789012345678</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="commit-git-objects-10-93da429" tabindex="-1"><a class="header-anchor" href="#commit-git-objects-10-93da429"><span>commit: .git/objects/10/93da429...</span></a></h2><p>commit包含的tree Id、author、committer、message等</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">$ git cat-file -p ec9c88dc6b579cf8f7a4be8f746cc672b0bcdfac</span>
<span class="line">tree f97f9cf91ad05364865f796c7cda9e993b36dea3</span>
<span class="line">parent b1af210923d2f077919b8ca234a57dbd42a4bfbb</span>
<span class="line">author liqiu &lt;qiuli@sohu-inc.com&gt; 1724926020 +0800</span>
<span class="line">committer liqiu &lt;qiuli@sohu-inc.com&gt; 1724926020 +0800</span>
<span class="line"></span>
<span class="line">chore:actions配置更改</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="tree-git-objects-9f-83ee7550" tabindex="-1"><a class="header-anchor" href="#tree-git-objects-9f-83ee7550"><span>tree: .git/objects/9f/83ee7550...</span></a></h2><p>tree包含一些blob文件</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">$  git cat-file -p 9f83ee7550919867e9219a75c23624c92ab5bd83</span>
<span class="line">100644 blob e69de29bb2d1d6434b8b29ae775ad8c2e48c5391	.gitignore</span>
<span class="line">100644 blob 665c637a360874ce43bf74018768a96d2d4d219a	hello.py</span>
<span class="line">040000 tree 24420a1530b1f4ec20ddb14c76df8c78c48f76a6	lib</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="blobs-git-objects-5a-475762c" tabindex="-1"><a class="header-anchor" href="#blobs-git-objects-5a-475762c"><span>blobs: .git/objects/5a/475762c...</span></a></h2><p>blob文件中包含具体的代码</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">$ git cat-file -p 665c637a360874ce43bf74018768a96d2d4d219a	</span>
<span class="line">print(&quot;hello world!&quot;)</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="reflog-git-logs-refs-heads-main" tabindex="-1"><a class="header-anchor" href="#reflog-git-logs-refs-heads-main"><span>reflog: .git/logs/refs/heads/main</span></a></h2><p>reflog保存了每一个分支的历史记录</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">$ tail -n 1 .git/logs/refs/heads/main</span>
<span class="line">33a0481b440426f0268c613d036b820bc064cdea</span>
<span class="line">1093da429f08e0e54cdc2b31526159e745d98ce0</span>
<span class="line">Julia Evans &lt;julia@example.com&gt;</span>
<span class="line">1706119866 -0500</span>
<span class="line">commit: add hello.py</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="tags-git-refs-tags-v1-0" tabindex="-1"><a class="header-anchor" href="#tags-git-refs-tags-v1-0"><span>tags: .git/refs/tags/v1.0</span></a></h2><p>包含commit Id</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">$ cat .git/refs/tags/v1.0</span>
<span class="line">1093da429f08e0e54cdc2b31526159e745d98ce0</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="the-stash-git-refs-stash" tabindex="-1"><a class="header-anchor" href="#the-stash-git-refs-stash"><span>the stash: .git/refs/stash</span></a></h2><p>保存运行stash命令时生成的commit Id</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">cat .git/refs/stash</span>
<span class="line">62caf3d918112d54bcfa24f3c78a94c224283a78</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div>`,27)]))}const c=s(n,[["render",l],["__file","20240830.html.vue"]]),h=JSON.parse('{"path":"/blogs/other/20240830.html","title":".git目录下的子目录和文件","lang":"en-US","frontmatter":{"title":null,"date":"2024/08/30","tags":["日志"],"categories":["日志"]},"headers":[{"level":2,"title":"HEAD: .git/head","slug":"head-git-head","link":"#head-git-head","children":[]},{"level":2,"title":"branch: .git/refs/heads/main","slug":"branch-git-refs-heads-main","link":"#branch-git-refs-heads-main","children":[]},{"level":2,"title":"commit: .git/objects/10/93da429...","slug":"commit-git-objects-10-93da429","link":"#commit-git-objects-10-93da429","children":[]},{"level":2,"title":"tree: .git/objects/9f/83ee7550...","slug":"tree-git-objects-9f-83ee7550","link":"#tree-git-objects-9f-83ee7550","children":[]},{"level":2,"title":"blobs: .git/objects/5a/475762c...","slug":"blobs-git-objects-5a-475762c","link":"#blobs-git-objects-5a-475762c","children":[]},{"level":2,"title":"reflog: .git/logs/refs/heads/main","slug":"reflog-git-logs-refs-heads-main","link":"#reflog-git-logs-refs-heads-main","children":[]},{"level":2,"title":"tags: .git/refs/tags/v1.0","slug":"tags-git-refs-tags-v1-0","link":"#tags-git-refs-tags-v1-0","children":[]},{"level":2,"title":"the stash: .git/refs/stash","slug":"the-stash-git-refs-stash","link":"#the-stash-git-refs-stash","children":[]}],"git":{"createdTime":1724989332000,"updatedTime":1724989332000,"contributors":[{"name":"liqiu","email":"qiuli@sohu-inc.com","commits":1}]},"filePathRelative":"blogs/other/20240830.md"}');export{c as comp,h as data};