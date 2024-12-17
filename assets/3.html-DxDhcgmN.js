import{_ as s,c as a,a as p,o as e}from"./app-vAERMEX6.js";const t={};function o(l,n){return e(),a("div",null,n[0]||(n[0]=[p(`<h1 id="n-body问题" tabindex="-1"><a class="header-anchor" href="#n-body问题"><span>n-body问题</span></a></h1><h1 id="一-原理" tabindex="-1"><a class="header-anchor" href="#一-原理"><span>一 原理</span></a></h1><p>N-body问题（或者说N体问题），是一个常见的物理模拟问题。在N-body系统中，每个粒子体都会与剩下的其他粒子产生交互作用（交互作用因具体问题而异），从而产生相应的物理现象。</p><h1 id="二-代码" tabindex="-1"><a class="header-anchor" href="#二-代码"><span>二 代码</span></a></h1><div class="language-cpp line-numbers-mode" data-highlighter="prismjs" data-ext="cpp" data-title="cpp"><pre><code><span class="line"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;math.h&gt;</span></span></span>
<span class="line"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span></span>
<span class="line"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdlib.h&gt;</span></span></span>
<span class="line"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;timer.h&quot;</span></span></span>
<span class="line"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;files.h&quot;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">SOFTENING</span> <span class="token expression"><span class="token number">1e-9f</span></span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment">/*</span>
<span class="line"> * Each body contains x, y, and z coordinate positions,</span>
<span class="line"> * as well as velocities in the x, y, and z directions.</span>
<span class="line"> */</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token punctuation">{</span> <span class="token keyword">float</span> x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> z<span class="token punctuation">,</span> vx<span class="token punctuation">,</span> vy<span class="token punctuation">,</span> vz<span class="token punctuation">;</span> <span class="token punctuation">}</span> Body<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">/*</span>
<span class="line"> * Calculate the gravitational impact of all bodies in the system</span>
<span class="line"> * on all others.</span>
<span class="line"> */</span></span>
<span class="line"></span>
<span class="line">__global__ <span class="token keyword">void</span> <span class="token function">bodyForce</span><span class="token punctuation">(</span>Body <span class="token operator">*</span>p<span class="token punctuation">,</span> <span class="token keyword">float</span> dt<span class="token punctuation">,</span> <span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">int</span> i <span class="token operator">=</span> threadIdx<span class="token punctuation">.</span>x<span class="token operator">+</span>blockIdx<span class="token punctuation">.</span>x<span class="token operator">*</span>blockDim<span class="token punctuation">.</span>x<span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;</span> n<span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">float</span> Fx <span class="token operator">=</span> <span class="token number">0.0f</span><span class="token punctuation">;</span> <span class="token keyword">float</span> Fy <span class="token operator">=</span> <span class="token number">0.0f</span><span class="token punctuation">;</span> <span class="token keyword">float</span> Fz <span class="token operator">=</span> <span class="token number">0.0f</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">float</span> dx <span class="token operator">=</span> p<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">.</span>x <span class="token operator">-</span> p<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>x<span class="token punctuation">;</span></span>
<span class="line">            <span class="token keyword">float</span> dy <span class="token operator">=</span> p<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">.</span>y <span class="token operator">-</span> p<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>y<span class="token punctuation">;</span></span>
<span class="line">            <span class="token keyword">float</span> dz <span class="token operator">=</span> p<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">.</span>z <span class="token operator">-</span> p<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>z<span class="token punctuation">;</span></span>
<span class="line">            <span class="token keyword">float</span> distSqr <span class="token operator">=</span> dx<span class="token operator">*</span>dx <span class="token operator">+</span> dy<span class="token operator">*</span>dy <span class="token operator">+</span> dz<span class="token operator">*</span>dz <span class="token operator">+</span> SOFTENING<span class="token punctuation">;</span></span>
<span class="line">            <span class="token keyword">float</span> invDist <span class="token operator">=</span> <span class="token function">rsqrtf</span><span class="token punctuation">(</span>distSqr<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token keyword">float</span> invDist3 <span class="token operator">=</span> invDist <span class="token operator">*</span> invDist <span class="token operator">*</span> invDist<span class="token punctuation">;</span></span>
<span class="line">            Fx <span class="token operator">+=</span> dx <span class="token operator">*</span> invDist3<span class="token punctuation">;</span> Fy <span class="token operator">+=</span> dy <span class="token operator">*</span> invDist3<span class="token punctuation">;</span> Fz <span class="token operator">+=</span> dz <span class="token operator">*</span> invDist3<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    p<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>vx <span class="token operator">+=</span> dt<span class="token operator">*</span>Fx<span class="token punctuation">;</span> p<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>vy <span class="token operator">+=</span> dt<span class="token operator">*</span>Fy<span class="token punctuation">;</span> p<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>vz <span class="token operator">+=</span> dt<span class="token operator">*</span>Fz<span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">__global__ <span class="token keyword">void</span> <span class="token function">integrate_position</span><span class="token punctuation">(</span>Body <span class="token operator">*</span>p<span class="token punctuation">,</span><span class="token keyword">float</span> dt<span class="token punctuation">,</span><span class="token keyword">int</span> n<span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">int</span> i<span class="token operator">=</span>threadIdx<span class="token punctuation">.</span>x<span class="token operator">+</span>blockIdx<span class="token punctuation">.</span>x<span class="token operator">*</span>blockDim<span class="token punctuation">.</span>x<span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">if</span><span class="token punctuation">(</span>i<span class="token operator">&lt;</span>n<span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">        p<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>x <span class="token operator">+=</span> p<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>vx<span class="token operator">*</span>dt<span class="token punctuation">;</span></span>
<span class="line">        p<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>y <span class="token operator">+=</span> p<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>vy<span class="token operator">*</span>dt<span class="token punctuation">;</span></span>
<span class="line">        p<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>z <span class="token operator">+=</span> p<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>vz<span class="token operator">*</span>dt<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span><span class="token operator">*</span> argv<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">// The assessment will test against both 2&lt;11 and 2&lt;15.</span></span>
<span class="line">  <span class="token comment">// Feel free to pass the command line argument 15 when you gernate ./nbody report files</span></span>
<span class="line">  <span class="token keyword">int</span> nBodies <span class="token operator">=</span> <span class="token number">2</span><span class="token operator">&lt;&lt;</span><span class="token number">11</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>argc <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">)</span> nBodies <span class="token operator">=</span> <span class="token number">2</span><span class="token operator">&lt;&lt;</span><span class="token function">atoi</span><span class="token punctuation">(</span>argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">// The assessment will pass hidden initialized values to check for correctness.</span></span>
<span class="line">  <span class="token comment">// You should not make changes to these files, or else the assessment will not work.</span></span>
<span class="line">  <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span> initialized_values<span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span> solution_values<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>nBodies <span class="token operator">==</span> <span class="token number">2</span><span class="token operator">&lt;&lt;</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    initialized_values <span class="token operator">=</span> <span class="token string">&quot;files/initialized_4096&quot;</span><span class="token punctuation">;</span></span>
<span class="line">    solution_values <span class="token operator">=</span> <span class="token string">&quot;files/solution_4096&quot;</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token comment">// nBodies == 2&lt;&lt;15</span></span>
<span class="line">    initialized_values <span class="token operator">=</span> <span class="token string">&quot;files/initialized_65536&quot;</span><span class="token punctuation">;</span></span>
<span class="line">    solution_values <span class="token operator">=</span> <span class="token string">&quot;files/solution_65536&quot;</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>argc <span class="token operator">&gt;</span> <span class="token number">2</span><span class="token punctuation">)</span> initialized_values <span class="token operator">=</span> argv<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>argc <span class="token operator">&gt;</span> <span class="token number">3</span><span class="token punctuation">)</span> solution_values <span class="token operator">=</span> argv<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">const</span> <span class="token keyword">float</span> dt <span class="token operator">=</span> <span class="token number">0.01f</span><span class="token punctuation">;</span> <span class="token comment">// Time step</span></span>
<span class="line">  <span class="token keyword">const</span> <span class="token keyword">int</span> nIters <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>  <span class="token comment">// Simulation iterations</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">int</span> bytes <span class="token operator">=</span> nBodies <span class="token operator">*</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>Body<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">float</span> <span class="token operator">*</span>buf<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  buf <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">float</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token function">malloc</span><span class="token punctuation">(</span>bytes<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">// Body *p = (Body*)buf;</span></span>
<span class="line">  <span class="token comment">// cudaMallocHost((void **)&amp;buf, bytes);</span></span>
<span class="line">  </span>
<span class="line">  <span class="token function">cudaMallocManaged</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>buf<span class="token punctuation">,</span> bytes<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  Body <span class="token operator">*</span>p <span class="token operator">=</span> <span class="token punctuation">(</span>Body <span class="token operator">*</span><span class="token punctuation">)</span>buf<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token function">read_values_from_file</span><span class="token punctuation">(</span>initialized_values<span class="token punctuation">,</span> buf<span class="token punctuation">,</span> bytes<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">double</span> totalTime <span class="token operator">=</span> <span class="token number">0.0</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">/*</span>
<span class="line">   * This simulation will run for 10 cycles of time, calculating gravitational</span>
<span class="line">   * interaction amongst bodies, and adjusting their positions to reflect.</span>
<span class="line">   */</span></span>
<span class="line"></span>
<span class="line">  size_t block_size <span class="token operator">=</span> <span class="token number">32</span><span class="token punctuation">;</span></span>
<span class="line">  size_t block_num <span class="token operator">=</span> <span class="token punctuation">(</span>nBodies <span class="token operator">+</span> block_size <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">/</span> block_size<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> iter <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> iter <span class="token operator">&lt;</span> nIters<span class="token punctuation">;</span> iter<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">StartTimer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">/*</span>
<span class="line">   * You will likely wish to refactor the work being done in \`bodyForce\`,</span>
<span class="line">   * and potentially the work to integrate the positions.</span>
<span class="line">   */</span></span>
<span class="line">   </span>
<span class="line">    bodyForce<span class="token operator">&lt;&lt;</span><span class="token operator">&lt;</span>block_num<span class="token punctuation">,</span>block_size<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>p<span class="token punctuation">,</span> dt<span class="token punctuation">,</span> nBodies<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    </span>
<span class="line">    <span class="token comment">// bodyForce(p, dt, nBodies); // compute interbody forces</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">/*</span>
<span class="line">   * This position integration cannot occur until this round of \`bodyForce\` has completed.</span>
<span class="line">   * Also, the next round of \`bodyForce\` cannot begin until the integration is complete.</span>
<span class="line">   */</span></span>
<span class="line"></span>
<span class="line">    integrate_position<span class="token operator">&lt;&lt;</span><span class="token operator">&lt;</span>block_num<span class="token punctuation">,</span>block_size<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>p<span class="token punctuation">,</span>dt<span class="token punctuation">,</span>nBodies<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 执行到最后一次，GPU内存数据传到CPU</span></span>
<span class="line">    <span class="token comment">// if(iter == nIters-1)</span></span>
<span class="line">       <span class="token comment">// cudaMemcpy(buf,d_buf,bytes,cudaMemcpyDeviceToHost);</span></span>
<span class="line">    <span class="token keyword">if</span><span class="token punctuation">(</span>iter <span class="token operator">==</span> nIters<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">       <span class="token function">cudaDeviceSynchronize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">const</span> <span class="token keyword">double</span> tElapsed <span class="token operator">=</span> <span class="token function">GetTimer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">1000.0</span><span class="token punctuation">;</span></span>
<span class="line">    totalTime <span class="token operator">+=</span> tElapsed<span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">double</span> avgTime <span class="token operator">=</span> totalTime <span class="token operator">/</span> <span class="token punctuation">(</span><span class="token keyword">double</span><span class="token punctuation">)</span><span class="token punctuation">(</span>nIters<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">float</span> billionsOfOpsPerSecond <span class="token operator">=</span> <span class="token number">1e-9</span> <span class="token operator">*</span> nBodies <span class="token operator">*</span> nBodies <span class="token operator">/</span> avgTime<span class="token punctuation">;</span></span>
<span class="line">  <span class="token function">write_values_to_file</span><span class="token punctuation">(</span>solution_values<span class="token punctuation">,</span> buf<span class="token punctuation">,</span> bytes<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">// You will likely enjoy watching this value grow as you accelerate the application,</span></span>
<span class="line">  <span class="token comment">// but beware that a failure to correctly synchronize the device might result in</span></span>
<span class="line">  <span class="token comment">// unrealistically high values.</span></span>
<span class="line">  <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;%0.3f Billion Interactions / second&quot;</span><span class="token punctuation">,</span> billionsOfOpsPerSecond<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token function">free</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5)]))}const i=s(t,[["render",o],["__file","3.html.vue"]]),u=JSON.parse('{"path":"/blogs/cuda/3.html","title":"Cn-body问题","lang":"en-US","frontmatter":{"title":"Cn-body问题","date":"2022/05/30","tags":["机器学习"],"categories":["cuda"]},"headers":[],"git":{"createdTime":1698896250000,"updatedTime":1700045822000,"contributors":[{"name":"liqiu03","email":"liqiu03@baidu.com","commits":1}]},"filePathRelative":"blogs/cuda/3.md"}');export{i as comp,u as data};