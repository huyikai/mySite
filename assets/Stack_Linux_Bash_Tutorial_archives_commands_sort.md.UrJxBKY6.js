import{_ as s,n as a,p as i,Y as n}from"./chunks/framework.KP8KjELV.js";const g=JSON.parse('{"title":"sort","description":"","frontmatter":{},"headers":[],"relativePath":"Stack/Linux/Bash/Tutorial/archives/commands/sort.md","filePath":"Stack/Linux/Bash/Tutorial/archives/commands/sort.md","lastUpdated":1703840066000}'),t={name:"Stack/Linux/Bash/Tutorial/archives/commands/sort.md"},e=n(`<h1 id="sort" tabindex="-1">sort <a class="header-anchor" href="#sort" aria-label="Permalink to &quot;sort&quot;">​</a></h1><p><code>sort</code>命令用于文本文件的排序。</p><p>下面是<code>example.txt</code>文件的内容。</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">f</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">b</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">c</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">g</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">a</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">e</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">d</span></span></code></pre></div><p>执行<code>sort</code>命令对其进行排序。</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sort</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> example.txt</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">a</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">b</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">c</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">d</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">e</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">f</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">g</span></span></code></pre></div><h2 id="参数" tabindex="-1">参数 <a class="header-anchor" href="#参数" aria-label="Permalink to &quot;参数&quot;">​</a></h2><p><code>-R</code>参数表示随机排序。</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sort</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -R</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> example.txt</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">b</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">d</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">a</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">c</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">g</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">e</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">f</span></span></code></pre></div>`,9),p=[e];function l(h,k,c,d,r,o){return a(),i("div",null,p)}const C=s(t,[["render",l]]);export{g as __pageData,C as default};
