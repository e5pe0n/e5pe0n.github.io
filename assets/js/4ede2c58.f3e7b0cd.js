"use strict";(self.webpackChunke_5_pe_0_n_github_io=self.webpackChunke_5_pe_0_n_github_io||[]).push([[6748],{9613:(n,e,t)=>{t.d(e,{Zo:()=>o,kt:()=>f});var a=t(9496);function r(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function i(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,a)}return t}function s(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?i(Object(t),!0).forEach((function(e){r(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}function m(n,e){if(null==n)return{};var t,a,r=function(n,e){if(null==n)return{};var t,a,r={},i=Object.keys(n);for(a=0;a<i.length;a++)t=i[a],e.indexOf(t)>=0||(r[t]=n[t]);return r}(n,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);for(a=0;a<i.length;a++)t=i[a],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(r[t]=n[t])}return r}var l=a.createContext({}),p=function(n){var e=a.useContext(l),t=e;return n&&(t="function"==typeof n?n(e):s(s({},e),n)),t},o=function(n){var e=p(n.components);return a.createElement(l.Provider,{value:e},n.children)},d="mdxType",u={inlineCode:"code",wrapper:function(n){var e=n.children;return a.createElement(a.Fragment,{},e)}},c=a.forwardRef((function(n,e){var t=n.components,r=n.mdxType,i=n.originalType,l=n.parentName,o=m(n,["components","mdxType","originalType","parentName"]),d=p(t),c=r,f=d["".concat(l,".").concat(c)]||d[c]||u[c]||i;return t?a.createElement(f,s(s({ref:e},o),{},{components:t})):a.createElement(f,s({ref:e},o))}));function f(n,e){var t=arguments,r=e&&e.mdxType;if("string"==typeof n||r){var i=t.length,s=new Array(i);s[0]=c;var m={};for(var l in e)hasOwnProperty.call(e,l)&&(m[l]=e[l]);m.originalType=n,m[d]="string"==typeof n?n:r,s[1]=m;for(var p=2;p<i;p++)s[p]=t[p];return a.createElement.apply(null,s)}return a.createElement.apply(null,t)}c.displayName="MDXCreateElement"},2545:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>l,contentTitle:()=>s,default:()=>u,frontMatter:()=>i,metadata:()=>m,toc:()=>p});var a=t(8957),r=(t(9496),t(9613));const i={},s="Trees",m={unversionedId:"algorithms/trees",id:"algorithms/trees",title:"Trees",description:"Find-Union Tree",source:"@site/docs/algorithms/trees.md",sourceDirName:"algorithms",slug:"/algorithms/trees",permalink:"/docs/algorithms/trees",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"techNoteSidebar",previous:{title:"Strings Algorithms",permalink:"/docs/algorithms/strings-algorithms"},next:{title:"Coding",permalink:"/docs/category/coding"}},l={},p=[{value:"Find-Union Tree",id:"find-union-tree",level:2},{value:"Segment Trees",id:"segment-trees",level:2},{value:"RMQ: Range Minimum Query",id:"rmq-range-minimum-query",level:3},{value:"BIT: Binary Indexed Tree",id:"bit-binary-indexed-tree",level:3}],o={toc:p},d="wrapper";function u(n){let{components:e,...t}=n;return(0,r.kt)(d,(0,a.Z)({},o,t,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"trees"},"Trees"),(0,r.kt)("h2",{id:"find-union-tree"},"Find-Union Tree"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"DON'T FORGET TO CALL init() !!")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-cpp",metastring:'title="C++"',title:'"C++"'},"ll par[MAX_N], rnk[MAX_N];\n\nvoid init() {\n  for (ll i = 0; i < N; ++i) {\n    par[i] = i;\n    rnk[i] = 0;\n  }\n}\n\nll find(ll x) {\n  if (x == par[x]) return x;\n  return par[x] = find(par[x]);\n}\n\nvoid unite(ll x, ll y) {\n  x = find(x);\n  y = find(y);\n  if (x == y) return;\n  if (rnk[x] < rnk[y])\n    par[x] = y;\n  else {\n    par[y] = x;\n    if (rnk[x] == rnk[y]) ++rnk[x];\n  }\n}\n\nbool same(ll x, ll y) {\n  return find(x) == find(y);\n}\n\nint main() {\n  cin >> N >> M;\n  init();\n}\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python",metastring:'title="Python"',title:'"Python"'},"N, M = map(int, input().split())\n\npar = list(range(N))\nrnk = [0] * N\n\n\ndef find(x):\n    global par\n    if x == par[x]:\n        return x\n    par[x] = find(par[x])\n    return par[x]\n\n\ndef unite(x, y):\n    global par, rnk\n    x = find(x)\n    y = find(y)\n    if x == y:\n        return\n    if rnk[x] < rnk[y]:\n        par[x] = y\n    else:\n        par[y] = x\n        if rnk[x] == rnk[y]:\n            rnk[x] += 1\n\n\ndef same(x, y):\n    return find(x) == find(y)\n")),(0,r.kt)("h2",{id:"segment-trees"},"Segment Trees"),(0,r.kt)("h3",{id:"rmq-range-minimum-query"},"RMQ: Range Minimum Query"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Each node holds min val in the range"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("span",{parentName:"li",className:"math math-inline"},(0,r.kt)("span",{parentName:"span",className:"katex"},(0,r.kt)("span",{parentName:"span",className:"katex-mathml"},(0,r.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,r.kt)("semantics",{parentName:"math"},(0,r.kt)("mrow",{parentName:"semantics"},(0,r.kt)("mi",{parentName:"mrow"},"O"),(0,r.kt)("mo",{parentName:"mrow",stretchy:"false"},"("),(0,r.kt)("mi",{parentName:"mrow"},"l"),(0,r.kt)("mi",{parentName:"mrow"},"o"),(0,r.kt)("mi",{parentName:"mrow"},"g"),(0,r.kt)("mi",{parentName:"mrow"},"N"),(0,r.kt)("mo",{parentName:"mrow",stretchy:"false"},")")),(0,r.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"O(log N)")))),(0,r.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,r.kt)("span",{parentName:"span",className:"base"},(0,r.kt)("span",{parentName:"span",className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,r.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.02778em"}},"O"),(0,r.kt)("span",{parentName:"span",className:"mopen"},"("),(0,r.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.01968em"}},"l"),(0,r.kt)("span",{parentName:"span",className:"mord mathnormal"},"o"),(0,r.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.03588em"}},"g"),(0,r.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.10903em"}},"N"),(0,r.kt)("span",{parentName:"span",className:"mclose"},")"))))))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-txt",metastring:'title="test1.txt"',title:'"test1.txt"'},"8\n5 3 7 9 6 4 1 2\n       1\n   3       1\n 3   7   4   1\n5 3 7 9 6 4 1 2\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-cpp",metastring:'title="C++"',title:'"C++"'},'#include <algorithm>\n#include <climits>\n#include <fstream>\n#include <stdio.h>\n\nusing namespace std;\n\nconst int MAX_N = 1 << 17;\nint n;\nint dat[MAX_N * 2 - 1];\n\nvoid init(int n_) {\n  n = 1;\n  while (n < n_)\n    n *= 2;\n  for (int i = 0; i < n * 2 - 1; ++i) {\n    dat[i] = INT_MAX;\n  }\n}\n\nvoid update(int k, int a) {\n  k += n - 1;\n  dat[k] = a;\n  while (k > 0) {\n    k = (k - 1) / 2;\n    dat[k] = min(dat[k * 2 + 1], dat[k * 2 + 2]);\n  }\n}\n\nint query(int a, int b, int k, int left, int right) {\n  // return min val in [a, b)\n  if (right <= a || b <= left) {\n    return INT_MAX;\n  }\n  if (a <= left && right <= b) {\n    return dat[k];\n  } else {\n    int vl = query(a, b, k * 2 + 1, left, (left + right) / 2);\n    int vr = query(a, b, k * 2 + 2, (left + right) / 2, right);\n    return min(vl, vr);\n  }\n}\n\nint main() {\n  ifstream ifs("../testset/segment_tree_rmq/test1.txt");\n  int N;\n  ifs >> N;\n  init(N);\n  for (int i = 0; i < N; ++i) {\n    int x;\n    ifs >> x;\n    update(i, x);\n  }\n  printf("%d\\n", query(0, 7, 0, 0, n)); // 1\n  printf("%d\\n", query(2, 6, 0, 0, n)); // 4\n  printf("%d\\n", query(7, 8, 0, 0, n)); // 2\n}\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python",metastring:'title="Python"',title:'"Python"'},"INF = float('inf')\n\n\ndef ns(f):\n    return next(f).strip()\n\n\nwith open(\"../testset/segment_tree_rmq/test1.txt\", 'r') as f:\n    N = int(ns(f))\n    X = list(map(int, ns(f).split()))\n\nn = 1\nwhile n < N:\n    n *= 2\ndat = [INF] * (n * 2 - 1)\n\n\ndef update(k, a):\n    global dat\n    k += n - 1\n    dat[k] = a\n    while k > 0:\n        k = (k - 1) // 2\n        dat[k] = min(dat[k * 2 + 1], dat[k * 2 + 2])\n\n\ndef query(a, b, k, left, right):\n    if right <= a or b <= left:\n        return INF\n    if a <= left and right <= b:\n        return dat[k]\n    else:\n        vl = query(a, b, k * 2 + 1, left, (left + right) // 2)\n        vr = query(a, b, k * 2 + 2, (left + right) // 2, right)\n        return min(vl, vr)\n\n\nfor i, x in enumerate(X):\n    update(i, x)\nprint(query(0, 7, 0, 0, n))  # 1\nprint(query(2, 6, 0, 0, n))  # 4\nprint(query(7, 8, 0, 0, n))  # 2\n")),(0,r.kt)("h3",{id:"bit-binary-indexed-tree"},"BIT: Binary Indexed Tree"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Each node holds sum of vals in the range"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("span",{parentName:"li",className:"math math-inline"},(0,r.kt)("span",{parentName:"span",className:"katex"},(0,r.kt)("span",{parentName:"span",className:"katex-mathml"},(0,r.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,r.kt)("semantics",{parentName:"math"},(0,r.kt)("mrow",{parentName:"semantics"},(0,r.kt)("mi",{parentName:"mrow"},"O"),(0,r.kt)("mo",{parentName:"mrow",stretchy:"false"},"("),(0,r.kt)("mi",{parentName:"mrow"},"l"),(0,r.kt)("mi",{parentName:"mrow"},"o"),(0,r.kt)("mi",{parentName:"mrow"},"g"),(0,r.kt)("mi",{parentName:"mrow"},"N"),(0,r.kt)("mo",{parentName:"mrow",stretchy:"false"},")")),(0,r.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"O(log N)")))),(0,r.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,r.kt)("span",{parentName:"span",className:"base"},(0,r.kt)("span",{parentName:"span",className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,r.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.02778em"}},"O"),(0,r.kt)("span",{parentName:"span",className:"mopen"},"("),(0,r.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.01968em"}},"l"),(0,r.kt)("span",{parentName:"span",className:"mord mathnormal"},"o"),(0,r.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.03588em"}},"g"),(0,r.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.10903em"}},"N"),(0,r.kt)("span",{parentName:"span",className:"mclose"},")"))))))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-txt",metastring:'title="test1.txt"',title:'"test1.txt"'},"8\n5 3 7 9 6 4 1 2\n       37\n   24      13\n 8   16  10  3\n5 3 7 9 6 4 1 2\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-cpp",metastring:'title="C++"',title:'"C++"'},'#include <fstream>\n#include <stdio.h>\n\n#define MAX_N 100\'000\n\nusing namespace std;\n\nint N;\nint B[MAX_N + 1];\n\nint sum(int i) {\n  // return sum of vals in [0, i]\n  int s = 0;\n  while (i > 0) {\n    s += B[i];\n    i -= i & -i;  // minus last 1 bit\n  }\n  return s;\n}\n\nvoid add(int i, int diff) {\n  while (i <= N) {\n    B[i] += diff;\n    i += i & -i;  // plus last 1 bit\n  }\n}\n\nint main() {\n  ifstream ifs("../testset/binary_indexed_tree/test1.txt");\n  ifs >> N;\n  for (int i = 1; i <= N; ++i) {\n    int b;\n    ifs >> b;\n    add(i, b);\n  }\n  printf("%d\\n", sum(7)); // 35\n  printf("%d\\n", sum(4)); // 24\n  printf("%d\\n", sum(1)); // 5\n}\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python",metastring:'title="C++"',title:'"C++"'},"def ns(f):\n    return next(f).strip()\n\n\nwith open(\"../testset/binary_indexed_tree/test1.txt\", 'r') as f:\n    N = int(ns(f))\n    A = list(map(int, ns(f).split()))\n\nB = [0] * (N + 1)\n\n\ndef _sum(i):\n    s = 0\n    while i > 0:\n        s += B[i]\n        i -= i & -i # minus last 1 bit\n    return s\n\n\ndef _add(i, diff):\n    global B\n    while i <= N:\n        B[i] += diff\n        i += i & -i # plus last 1 bit\n\n\nfor i in range(N):\n    _add(i + 1, A[i])\n\nprint(_sum(7))  # 35\nprint(_sum(4))  # 24\nprint(_sum(1))  # 5\n")))}u.isMDXComponent=!0}}]);