(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  var root = document.documentElement;
  function $(s,c){return (c||document).querySelector(s)}
  function $$(s,c){return [].slice.call((c||document).querySelectorAll(s))}

  /* ---------- EDIT YOUR POSTS HERE ----------
     img: optional. Put a real photo path like 'images/desk.jpg' to replace the generated cover art. */
  var POSTS = [
    {t:'Why I redesign my desk every winter',c:'Habits',d:'Oct 18, 2026',m:'6 min',s:'A small ritual that keeps my work honest, and what a clean surface does to a messy mind.',style:'aurora',pal:['#ff9a3c','#7a5cff','#0f1a3a','#2de2c4'],seed:11,img:'',
      b:['Every November I clear the desk completely. Monitor, lamp, cables, the pile of notebooks. Everything goes on the floor and only what I truly use comes back.','Most years about a third of it never returns. That third is a quiet record of projects I told myself I would finish.','<h3>The rule of three</h3>','Three tools, three notebooks, three things on the wall. When something new arrives, something old leaves. It is a boring rule and it works because it is boring.','<blockquote>A workspace is a list of promises. Audit it like one.</blockquote>','If you try this, start with the drawer nobody sees. That is where the honest answers are.']},
    {t:'Building a 3D hero without melting a phone',c:'Code',d:'Oct 11, 2026',m:'9 min',s:'Performance budgets for WebGL: pixel ratio, draw calls and when to just use a video.',style:'grid',pal:['#7aa2ff','#1d2b5e','#0a0e17','#ffb454'],seed:23,img:'',
      b:['A rotating 3D object looks great on a laptop and cooks a mid-range phone. The fix is rarely clever. It is a budget.','<h3>Cap the pixel ratio</h3>','Rendering at a device pixel ratio of 3 means nine times the pixels of 1. Capping at 1.75 is almost invisible and saves most of the heat.','<h3>Pause when hidden</h3>','Stop the render loop when the canvas is off screen or the tab is in the background. An IntersectionObserver takes six lines.','<blockquote>The fastest frame is the one you do not draw.</blockquote>','If the scene is a loop that never changes, record it once and ship a video. No shame in that.']},
    {t:'Type pairings I keep coming back to',c:'Design',d:'Oct 4, 2026',m:'7 min',s:'Five font combinations, why they work, and the one mistake that ruins all of them.',style:'orbits',pal:['#f4d35e','#ee6055','#1b1f3b','#7ae7c7'],seed:37,img:'',
      b:['Good pairings share a skeleton and differ in personality. A geometric display face with a humanist text face is the safest recipe I know.','<h3>The mistake</h3>','Using both faces at the same weight. Contrast is the whole point, so let one shout and the other whisper.','<blockquote>Pick one face to be loud. Everything else earns its quiet.</blockquote>','Set body text between 16 and 18 pixels, keep lines near 65 characters and give headings a tighter line height than paragraphs.']},
    {t:'Twelve hours on the Konkan Railway',c:'Travel',d:'Sep 27, 2026',m:'8 min',s:'Tunnels, monsoon green and the best chai I have had at a station platform.',style:'waves',pal:['#2de2c4','#1a6fb5','#08162b','#ffd29c'],seed:41,img:'',
      b:['The train leaves before sunrise. By the time the light arrives we are already in the hills, crossing rivers that were not on any plan.','<h3>Why go slow</h3>','A flight collapses a journey into a fact. A train keeps it a story, with chapters made of stations and strangers.','<blockquote>Distance is something you should be allowed to feel.</blockquote>','Pack a book, a thermos and low expectations about the Wi-Fi.']},
    {t:'Notes from shipping a side project in 30 days',c:'Code',d:'Sep 19, 2026',m:'11 min',s:'What I cut, what I kept, and the Tuesday I almost gave up.',style:'blocks',pal:['#ff6b6b','#ffb454','#2b2d6e','#10151f'],seed:53,img:'',
      b:['The project was small on purpose: one screen, one job, no accounts. Thirty days was the constraint that made it real.','<h3>What I cut</h3>','Settings, onboarding, dark mode (yes, really) and a feature called Smart Suggestions that was neither.','<blockquote>Shipping is a skill you only practice by shipping.</blockquote>','On day nineteen I nearly stopped. I wrote down the smallest next step, did it, and the feeling passed within the hour.']},
    {t:'A morning routine that survives bad weeks',c:'Habits',d:'Sep 8, 2026',m:'5 min',s:'Ten minutes, three actions, zero apps. The version of discipline that actually lasts.',style:'contours',pal:['#9be15d','#00b4a6','#06202a','#f9f871'],seed:67,img:'',
      b:['Most routines fail because they are designed for your best day. Design for your worst one instead.','<h3>My ten minutes</h3>','Water, a short walk to the end of the street, and one written line about what matters today.','<blockquote>If it takes willpower, it is too big. Shrink it.</blockquote>','On good days I add more. On bad days the ten minutes still count, and that is the point.']}
  ];
  var PROJ_ART = [
    {style:'grid',pal:['#7aa2ff','#1d2b5e','#0a0e17','#ffb454'],seed:101},
    {style:'blocks',pal:['#ff6b6b','#ffb454','#2b2d6e','#10151f'],seed:117},
    {style:'orbits',pal:['#f4d35e','#ee6055','#1b1f3b','#7ae7c7'],seed:131}
  ];
  var topicsList = ['Code','Design','Habits','Travel','Essays','Field notes','Experiments','Reading lists'];
  $('#track').innerHTML = '<span>'+topicsList.join('</span><span>')+'</span><span>'+topicsList.join('</span><span>')+'</span>';

  /* ---------- generative HD cover art ---------- */
  function rng(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
  function draw(cv,p){
    var ctx=cv.getContext('2d'),W=cv.width,H=cv.height,R=rng(p.seed),pal=p.pal,i,j;
    var g=ctx.createLinearGradient(0,0,W,H);g.addColorStop(0,pal[2]);g.addColorStop(1,pal[1]);
    ctx.fillStyle=g;ctx.fillRect(0,0,W,H);ctx.lineCap='round';
    if(p.style==='aurora'){
      for(i=0;i<6;i++){var x=R()*W,y=R()*H,r=H*(.35+R()*.5),rg=ctx.createRadialGradient(x,y,0,x,y,r);
        rg.addColorStop(0,pal[i%2?0:3]+'cc');rg.addColorStop(1,pal[i%2?0:3]+'00');ctx.fillStyle=rg;ctx.fillRect(0,0,W,H)}
      ctx.strokeStyle='rgba(255,255,255,.22)';ctx.lineWidth=W/900;
      for(i=0;i<40;i++){ctx.beginPath();for(j=0;j<=60;j++){var xx=j/60*W,yy=H*.55+Math.sin(j*.18+i*.3)*H*.14+i*H*.012-H*.2;j?ctx.lineTo(xx,yy):ctx.moveTo(xx,yy)}ctx.stroke()}
    }else if(p.style==='grid'){
      var hz=H*.46,sg=ctx.createLinearGradient(0,0,0,hz);sg.addColorStop(0,pal[2]);sg.addColorStop(1,pal[1]);ctx.fillStyle=sg;ctx.fillRect(0,0,W,hz);
      var gl=ctx.createRadialGradient(W/2,hz,0,W/2,hz,H*.5);gl.addColorStop(0,pal[3]+'aa');gl.addColorStop(1,pal[3]+'00');ctx.fillStyle=gl;ctx.fillRect(0,0,W,H);
      ctx.fillStyle=pal[3];ctx.beginPath();ctx.arc(W/2,hz,H*.17,Math.PI,0);ctx.fill();
      ctx.strokeStyle=pal[0]+'aa';ctx.lineWidth=W/700;
      for(i=-24;i<=24;i++){ctx.beginPath();ctx.moveTo(W/2+i*W*.012,hz);ctx.lineTo(W/2+i*W*.2,H);ctx.stroke()}
      for(i=1;i<18;i++){var yy2=hz+Math.pow(i/18,2.2)*(H-hz);ctx.beginPath();ctx.moveTo(0,yy2);ctx.lineTo(W,yy2);ctx.stroke()}
    }else if(p.style==='orbits'){
      var cx=W*.62,cy=H*.5;
      for(i=1;i<9;i++){ctx.strokeStyle=pal[i%3]+(i>5?'55':'bb');ctx.lineWidth=W/500;ctx.beginPath();ctx.ellipse(cx,cy,H*.12*i,H*.12*i*(.5+R()*.4),R()*3,0,7);ctx.stroke()}
      for(i=0;i<46;i++){ctx.fillStyle=pal[Math.floor(R()*4)];ctx.beginPath();ctx.arc(R()*W,R()*H,W*(.002+R()*.008),0,7);ctx.fill()}
      var og=ctx.createRadialGradient(cx-H*.05,cy-H*.05,0,cx,cy,H*.2);og.addColorStop(0,pal[0]);og.addColorStop(1,pal[1]);ctx.fillStyle=og;ctx.beginPath();ctx.arc(cx,cy,H*.2,0,7);ctx.fill();
    }else if(p.style==='waves'){
      for(i=0;i<9;i++){var base=H*(.3+i*.09),amp=H*(.04+R()*.06),f=.004+R()*.004,ph=R()*6;
        ctx.beginPath();ctx.moveTo(0,H);for(j=0;j<=W;j+=6){ctx.lineTo(j,base+Math.sin(j*f+ph)*amp+Math.sin(j*f*2.3+ph)*amp*.4)}ctx.lineTo(W,H);ctx.closePath();
        var wg=ctx.createLinearGradient(0,base-amp,0,H);wg.addColorStop(0,pal[i%2?0:1]+(i===0?'ff':'cc'));wg.addColorStop(1,pal[2]+'ee');ctx.fillStyle=wg;ctx.fill();
        ctx.strokeStyle='rgba(255,255,255,.28)';ctx.lineWidth=W/800;ctx.stroke()}
      ctx.fillStyle=pal[3];ctx.beginPath();ctx.arc(W*.78,H*.24,H*.09,0,7);ctx.fill();
    }else if(p.style==='blocks'){
      for(i=0;i<26;i++){var x0=R()*W,y0=R()*H,s=H*(.2+R()*.5);ctx.fillStyle=pal[Math.floor(R()*3)]+(R()>.5?'dd':'88');
        ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(x0+s,y0+R()*s*.5);ctx.lineTo(x0+R()*s*.6,y0+s);ctx.closePath();ctx.fill()}
      ctx.strokeStyle='rgba(255,255,255,.18)';ctx.lineWidth=W/900;for(i=0;i<14;i++){ctx.beginPath();ctx.moveTo(R()*W,0);ctx.lineTo(R()*W,H);ctx.stroke()}
    }else{
      var ccx=W*.55,ccy=H*.55;
      for(i=26;i>0;i--){ctx.beginPath();for(j=0;j<=120;j++){var a=j/120*Math.PI*2,rr=H*.028*i*(1+.16*Math.sin(a*3+p.seed)+.1*Math.sin(a*5+i*.2));var px=ccx+Math.cos(a)*rr*1.5,py=ccy+Math.sin(a)*rr;j?ctx.lineTo(px,py):ctx.moveTo(px,py)}ctx.closePath();
        ctx.fillStyle=pal[i%3===0?0:1]+(i%2?'18':'30');ctx.fill();ctx.strokeStyle=pal[i%2?0:3]+'aa';ctx.lineWidth=W/700;ctx.stroke()}
    }
    var id=ctx.getImageData(0,0,W,H),d=id.data,gr=rng(p.seed+9);
    for(i=0;i<d.length;i+=4){var n=(gr()-.5)*14;d[i]+=n;d[i+1]+=n;d[i+2]+=n}
    ctx.putImageData(id,0,0);
  }

  /* ---------- cards ---------- */
  function card(p,idx,big){
    var b=document.createElement('button');b.className='card';b.type='button';b.setAttribute('data-open',idx);b.setAttribute('data-cat',p.c);
    b.setAttribute('data-q',(p.t+' '+p.s+' '+p.c).toLowerCase());
    var media=p.img?'<img src="'+p.img+'" alt="" loading="lazy">':'<canvas width="'+(big?1280:1120)+'" height="'+(big?800:700)+'"></canvas>';
    b.innerHTML='<div class="cover">'+media+'<span class="chip">'+p.c+'</span></div>'+
      '<div class="body"><span class="mono">'+p.d+' &middot; '+p.m+' read</span><h3>'+p.t+'</h3><p>'+p.s+'</p><div class="meta"><span class="more">Read post &rarr;</span></div></div>';
    var cv=b.querySelector('canvas');if(cv)draw(cv,p);return b;
  }
  var feat=$('#featList'),grid=$('#postGrid');
  [0,1,2].forEach(function(i){feat.appendChild(card(POSTS[i],i,true))});
  POSTS.forEach(function(p,i){grid.appendChild(card(p,i,false))});
  draw($('#heroThumb'),POSTS[0]);
  $$('canvas[data-art]').forEach(function(c){draw(c,PROJ_ART[+c.getAttribute('data-art')])});

  /* portrait art (replace the canvas with an <img> to use your photo) */
  (function(){var c=$('#portrait'),x=c.getContext('2d'),W=c.width,H=c.height,i;
    var g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,'#1d2b5e');g.addColorStop(1,'#ff9a3c');x.fillStyle=g;x.fillRect(0,0,W,H);
    x.strokeStyle='rgba(255,255,255,.18)';x.lineWidth=2;for(i=0;i<30;i++){x.beginPath();x.arc(W*.5,H*.62,60+i*26,Math.PI,0);x.stroke()}
    x.fillStyle='#0a0e17';x.beginPath();x.arc(W*.5,H*.46,W*.17,0,7);x.fill();x.beginPath();x.ellipse(W*.5,H*1.02,W*.38,H*.3,0,Math.PI,0);x.fill();
    var gr=rng(2),id=x.getImageData(0,0,W,H),d=id.data;for(i=0;i<d.length;i+=4){var n=(gr()-.5)*12;d[i]+=n;d[i+1]+=n;d[i+2]+=n}x.putImageData(id,0,0);
  })();

  /* ---------- filters + search ---------- */
  var cats=['All'].concat(POSTS.map(function(p){return p.c}).filter(function(v,i,a){return a.indexOf(v)===i}));
  var fl=$('#filters'),active='All',q='';
  function applyFilter(){var shown=0;$$('.card',grid).forEach(function(cd){var ok=(active==='All'||cd.getAttribute('data-cat')===active)&&(!q||cd.getAttribute('data-q').indexOf(q)>-1);cd.hidden=!ok;if(ok)shown++});$('#none').style.display=shown?'none':'block'}
  cats.forEach(function(c,i){var b=document.createElement('button');b.className='pill';b.type='button';b.textContent=c;b.setAttribute('aria-pressed',i===0?'true':'false');
    b.onclick=function(){$$('.pill',fl).forEach(function(x){x.setAttribute('aria-pressed','false')});b.setAttribute('aria-pressed','true');active=c;applyFilter()};fl.appendChild(b)});
  $('#search').addEventListener('input',function(e){q=e.target.value.trim().toLowerCase();applyFilter()});

  /* ---------- 3D tilt + spotlight ---------- */
  document.addEventListener('pointermove',function(e){var cd=e.target.closest&&e.target.closest('.card');if(!cd)return;var r=cd.getBoundingClientRect();
    cd.style.setProperty('--mx',(e.clientX-r.left)+'px');cd.style.setProperty('--my',(e.clientY-r.top)+'px');
    if(fine&&!reduce&&cd.parentElement.classList.contains('tilt')){var x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      cd.style.transform='rotateY('+(x*14)+'deg) rotateX('+(-y*12)+'deg) translateZ(10px)'}});
  document.addEventListener('pointerout',function(e){var cd=e.target.closest&&e.target.closest('.card');if(cd&&!cd.contains(e.relatedTarget))cd.style.transform=''});

  /* ---------- custom cursor + magnetic buttons ---------- */
  if(fine&&!reduce){
    var cur=$('#cur'),dot=$('#curDot'),cx=0,cy=0,tx=0,ty=0;
    addEventListener('pointermove',function(e){tx=e.clientX;ty=e.clientY;cur.classList.add('on');dot.classList.add('on');dot.style.transform='translate('+tx+'px,'+ty+'px)'},{passive:true});
    (function tick(){cx+=(tx-cx)*.16;cy+=(ty-cy)*.16;cur.style.transform='translate('+cx+'px,'+cy+'px)';requestAnimationFrame(tick)})();
    document.addEventListener('pointerover',function(e){if(e.target.closest('a,button,.card,input,.tile'))cur.classList.add('big')});
    document.addEventListener('pointerout',function(e){if(e.target.closest('a,button,.card,input,.tile'))cur.classList.remove('big')});
    $$('.mag').forEach(function(b){b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.22)+'px,'+((e.clientY-r.top-r.height/2)*.3)+'px)'});
      b.addEventListener('pointerleave',function(){b.style.transform=''})});
  }

  /* ---------- reader ---------- */
  var rd=$('#reader'),lastFocus=null,cur_i=0;
  function openPost(i){var p=POSTS[i];cur_i=i;if(!rd.classList.contains('open'))lastFocus=document.activeElement;
    var cover=$('.paper .cover');cover.innerHTML=p.img?'<img src="'+p.img+'" alt="">':'<canvas id="rCover" width="1600" height="800"></canvas>';
    if(!p.img)draw($('#rCover'),p);
    var prev=POSTS[(i+POSTS.length-1)%POSTS.length],next=POSTS[(i+1)%POSTS.length];
    $('#rBody').innerHTML='<span class="mono">'+p.c+' &middot; '+p.d+' &middot; '+p.m+' read</span><h2>'+p.t+'</h2>'+
      p.b.map(function(t){return t.charAt(0)==='<'?t:'<p>'+t+'</p>'}).join('')+
      '<div class="pager"><button class="btn ghost" type="button" data-open="'+((i+POSTS.length-1)%POSTS.length)+'">&larr; '+prev.t.slice(0,26)+'...</button><button class="btn primary" type="button" data-open="'+((i+1)%POSTS.length)+'">'+next.t.slice(0,26)+'... &rarr;</button></div>';
    rd.classList.add('open');rd.scrollTop=0;document.body.style.overflow='hidden';$('#closeBtn').focus()}
  function closePost(){rd.classList.remove('open');document.body.style.overflow='';if(lastFocus&&lastFocus.focus)lastFocus.focus()}
  document.addEventListener('click',function(e){var o=e.target.closest('[data-open]');if(o){openPost(+o.getAttribute('data-open'));return}if(e.target===rd)closePost()});
  $('#closeBtn').onclick=closePost;
  document.addEventListener('keydown',function(e){if(!rd.classList.contains('open'))return;if(e.key==='Escape')closePost();
    if(e.key==='ArrowRight')openPost((cur_i+1)%POSTS.length);if(e.key==='ArrowLeft')openPost((cur_i+POSTS.length-1)%POSTS.length)});
  $('#copyBtn').onclick=function(){var t=POSTS[cur_i].t,b=this;try{navigator.clipboard.writeText(t+' - '+location.href.split('#')[0]).then(function(){b.style.borderColor='var(--accent)'},function(){})}catch(e){}};

  /* ---------- nav, theme, progress, back to top ---------- */
  var links=$('#links'),mb=$('#menuBtn');
  mb.onclick=function(){var o=links.classList.toggle('open');mb.setAttribute('aria-expanded',o)};
  links.addEventListener('click',function(e){if(e.target.tagName==='A'){links.classList.remove('open');mb.setAttribute('aria-expanded','false')}});
  try{var st=localStorage.getItem('jj-theme');if(st)root.setAttribute('data-theme',st)}catch(e){}
  function isDark(){var t=root.getAttribute('data-theme');return t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches}
  $('#themeBtn').onclick=function(){var n=isDark()?'light':'dark';root.setAttribute('data-theme',n);try{localStorage.setItem('jj-theme',n)}catch(e){}applyGL()};
  var bar=$('#progress i'),toTop=$('#toTop');
  function onScroll(){var h=document.documentElement.scrollHeight-innerHeight;bar.style.transform='scaleX('+(h>0?Math.min(1,scrollY/h):0)+')';toTop.classList.toggle('show',scrollY>900)}
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  toTop.onclick=function(){scrollTo({top:0,behavior:reduce?'auto':'smooth'})};
  var navLinks=$$('.links a'),secs=['featured','posts','now','projects','about','subscribe'].map(function(id){return document.getElementById(id)});
  new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)navLinks.forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id)})})},{rootMargin:'-45% 0px -50% 0px'}).observe(secs[0]);
  var navIO=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)navLinks.forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id)})})},{rootMargin:'-45% 0px -50% 0px'});
  secs.forEach(function(s){navIO.observe(s)});

  /* reveal + counters */
  function count(el){if(el._d)return;el._d=1;var to=+el.getAttribute('data-count'),t0=performance.now();
    (function step(t){var k=Math.min(1,(t-t0)/1400);el.textContent=Math.round(to*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(step)})(t0)}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
  $$('.rv').forEach(function(n){io.observe(n)});
  if(!reduce){var cio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){count(e.target);cio.unobserve(e.target)}})});$$('[data-count]').forEach(function(n){cio.observe(n)})}

  /* live clock (Pune) */
  var ck=$('#clock'),sub=$('#clockSub');
  function tickClock(){try{var d=new Date(),f=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(d);ck.textContent=f;
    var h=+f.slice(0,2);sub.textContent=h<5?'Quiet hours. Probably asleep.':h<12?'Morning. Prime writing time.':h<18?'Afternoon. Deep work or a long walk.':'Evening. Reading and reflection.'}catch(e){}}
  tickClock();setInterval(tickClock,1000);

  /* newsletter (demo only) */
  $('#subForm').addEventListener('submit',function(e){e.preventDefault();var v=$('#email').value.trim(),m=$('#formMsg');
    if(!/^\S+@\S+\.\S+$/.test(v)){m.textContent='Enter a valid email address, like name@example.com.';return}
    m.textContent='Thanks. This form is a demo and does not store addresses yet. Connect an email service to collect subscribers.'});

  /* ---------- WebGL hero ---------- */
  var glCanvas=$('#gl'),scene,cam,rdr,knot,orbit,sats=[],pts,light,ptsMat,knotMat,satMat,visible=true,mx=0,my=0,smx=0,smy=0;
  function css(n){return getComputedStyle(root).getPropertyValue(n).trim()}
  function applyGL(){if(!knotMat)return;knotMat.color.set(css('--accent'));knotMat.emissive.set(css('--accent'));knotMat.emissiveIntensity=isDark()?.2:.05;ptsMat.color.set(css('--cool'));light.color.set(css('--cool'));satMat.color.set(css('--cool'))}
  function sizeGL(){var h=glCanvas.parentElement,w=h.clientWidth,ht=h.clientHeight;rdr.setSize(w,ht,false);cam.aspect=w/ht;cam.updateProjectionMatrix();
    var narrow=w<900;orbit.position.set(narrow?0:w/ht*.9,narrow?2:0,0);orbit.scale.setScalar(narrow?.62:1)}
  try{
    if(!window.THREE)throw 0;
    rdr=new THREE.WebGLRenderer({canvas:glCanvas,antialias:true,alpha:true});rdr.setPixelRatio(Math.min(devicePixelRatio||1,1.75));
    scene=new THREE.Scene();cam=new THREE.PerspectiveCamera(45,1,.1,100);cam.position.z=8;
    orbit=new THREE.Group();scene.add(orbit);
    knotMat=new THREE.MeshStandardMaterial({color:0xffb454,metalness:.6,roughness:.22,flatShading:true});
    knot=new THREE.Mesh(new THREE.TorusKnotGeometry(1.5,.46,220,28,2,3),knotMat);orbit.add(knot);
    knot.add(new THREE.Mesh(new THREE.TorusKnotGeometry(1.5,.5,90,12,2,3),new THREE.MeshBasicMaterial({color:0xffffff,wireframe:true,transparent:true,opacity:.12})));
    satMat=new THREE.MeshStandardMaterial({color:0x7aa2ff,metalness:.2,roughness:.15,transparent:true,opacity:.55,flatShading:true});
    var geos=[new THREE.IcosahedronGeometry(.34,0),new THREE.OctahedronGeometry(.3,0),new THREE.TetrahedronGeometry(.34,0)];
    geos.forEach(function(g,i){var m=new THREE.Mesh(g,satMat);m._a=i*2.1;m._r=2.9+i*.45;m._s=.5+i*.17;m.add(new THREE.LineSegments(new THREE.EdgesGeometry(g),new THREE.LineBasicMaterial({color:0xffffff,transparent:true,opacity:.6})));orbit.add(m);sats.push(m)});
    var ring=new THREE.Mesh(new THREE.TorusGeometry(3.2,.012,8,160),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.25}));ring.rotation.x=1.2;orbit.add(ring);
    var n=800,pos=new Float32Array(n*3);for(var i=0;i<n;i++){pos[i*3]=(Math.random()-.5)*24;pos[i*3+1]=(Math.random()-.5)*13;pos[i*3+2]=(Math.random()-.5)*10-2}
    var geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
    ptsMat=new THREE.PointsMaterial({size:.045,transparent:true,opacity:.8,color:0x7aa2ff});pts=new THREE.Points(geo,ptsMat);scene.add(pts);
    scene.add(new THREE.AmbientLight(0xffffff,.55));light=new THREE.PointLight(0x7aa2ff,2.6,40);light.position.set(-4,3,6);scene.add(light);
    var l2=new THREE.DirectionalLight(0xffffff,.9);l2.position.set(4,5,5);scene.add(l2);
    applyGL();sizeGL();addEventListener('resize',sizeGL);
    addEventListener('pointermove',function(e){mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5},{passive:true});
    new IntersectionObserver(function(es){visible=es[0].isIntersecting}).observe($('#hero'));
    (function loop(t){requestAnimationFrame(loop);if(!visible&&!reduce)return;var s=reduce?0:t*.001;smx+=(mx-smx)*.06;smy+=(my-smy)*.06;
      knot.rotation.x=s*.25+smy*.7+scrollY*.0006;knot.rotation.y=s*.35+smx*.9;
      sats.forEach(function(m){var a=m._a+s*m._s;m.position.set(Math.cos(a)*m._r,Math.sin(a*1.3)*1.1,Math.sin(a)*m._r*.6);m.rotation.x=s;m.rotation.y=s*.7});
      orbit.rotation.z=Math.sin(s*.3)*.12;light.position.x=-4+smx*8;light.position.y=3-smy*6;
      pts.rotation.y=s*.02+smx*.15;pts.position.y=scrollY*.002;rdr.render(scene,cam)})(0);
  }catch(err){glCanvas.style.display='none'}
})();
