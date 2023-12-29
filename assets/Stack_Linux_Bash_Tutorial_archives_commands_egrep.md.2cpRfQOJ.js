import{_ as s,n as a,p as n,Y as i}from"./chunks/framework.KP8KjELV.js";const g=JSON.parse('{"title":"egrep","description":"","frontmatter":{},"headers":[],"relativePath":"Stack/Linux/Bash/Tutorial/archives/commands/egrep.md","filePath":"Stack/Linux/Bash/Tutorial/archives/commands/egrep.md","lastUpdated":1703840066000}'),p={name:"Stack/Linux/Bash/Tutorial/archives/commands/egrep.md"},e=i(`<h1 id="egrep" tabindex="-1">egrep <a class="header-anchor" href="#egrep" aria-label="Permalink to &quot;egrep&quot;">​</a></h1><p><code>egrep</code>命令用于显示匹配正则模式的行，与<code>grep -E</code>命令等价。</p><p>下面是<code>example.txt</code>文件的内容。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>Lorem ipsum</span></span>
<span class="line"><span>dolor sit amet, </span></span>
<span class="line"><span>consetetur</span></span>
<span class="line"><span>sadipscing elitr,</span></span>
<span class="line"><span>sed diam nonumy</span></span>
<span class="line"><span>eirmod tempor</span></span>
<span class="line"><span>invidunt ut labore</span></span>
<span class="line"><span>et dolore magna</span></span>
<span class="line"><span>aliquyam erat, sed</span></span>
<span class="line"><span>diam voluptua. At</span></span>
<span class="line"><span>vero eos et</span></span>
<span class="line"><span>accusam et justo</span></span>
<span class="line"><span>duo dolores et ea</span></span>
<span class="line"><span>rebum. Stet clita</span></span>
<span class="line"><span>kasd gubergren,</span></span>
<span class="line"><span>no sea takimata</span></span>
<span class="line"><span>sanctus est Lorem</span></span>
<span class="line"><span>ipsum dolor sit</span></span>
<span class="line"><span>amet.</span></span></code></pre></div><p><code>egrep</code>命令显示包括<code>Lorem</code>或<code>dolor</code>的行。</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> egrep</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;(Lorem|dolor)&#39;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> example.txt</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 或者</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> grep</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -E</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;(Lorem|dolor)&#39;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> example.txt</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Lorem</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ipsum</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">dolor</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sit</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> amet,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">et</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dolore</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> magna</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">duo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dolores</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> et</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ea</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sanctus</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> est</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Lorem</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ipsum</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dolor</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sit</span></span></code></pre></div>`,6),l=[e];function t(h,r,o,d,k,c){return a(),n("div",null,l)}const m=s(p,[["render",t]]);export{g as __pageData,m as default};
