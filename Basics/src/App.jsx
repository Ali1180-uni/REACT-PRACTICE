import { useState } from "react";

// ─── SVG Coordinate Plane ───────────────────────────────────────────────────
function CoordPlane({ width = 260, height = 260, range = 6, children, title }) {
  const cx = width / 2, cy = height / 2;
  const scale = (width / 2) / range;
  const toSVG = (x, y) => [cx + x * scale, cy - y * scale];

  const ticks = Array.from({ length: range * 2 + 1 }, (_, i) => i - range).filter(v => v !== 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      {title && <div style={{ fontSize: 11, color: "#94a3b8", fontFamily: "monospace", letterSpacing: 1 }}>{title}</div>}
      <svg width={width} height={height} style={{ background: "#0f172a", borderRadius: 10, border: "1px solid #1e293b" }}>
        {/* Grid */}
        {ticks.map(t => (
          <g key={t}>
            <line x1={toSVG(t, -range)[0]} y1={toSVG(t, -range)[1]} x2={toSVG(t, range)[0]} y2={toSVG(t, range)[1]} stroke="#1e293b" strokeWidth={1} />
            <line x1={toSVG(-range, t)[0]} y1={toSVG(-range, t)[1]} x2={toSVG(range, t)[0]} y2={toSVG(range, t)[1]} stroke="#1e293b" strokeWidth={1} />
          </g>
        ))}
        {/* Axes */}
        <line x1={toSVG(-range, 0)[0]} y1={cy} x2={toSVG(range, 0)[0]} y2={cy} stroke="#334155" strokeWidth={1.5} />
        <line x1={cx} y1={toSVG(0, -range)[1]} x2={cx} y2={toSVG(0, range)[1]} stroke="#334155" strokeWidth={1.5} />
        {/* Tick labels */}
        {[-4,-2,2,4].map(t => (
          <g key={t}>
            <text x={toSVG(t, 0)[0]} y={cy + 14} textAnchor="middle" fontSize={8} fill="#475569">{t}</text>
            <text x={cx - 14} y={toSVG(0, t)[1] + 3} textAnchor="middle" fontSize={8} fill="#475569">{t}</text>
          </g>
        ))}
        <text x={toSVG(range, 0)[0] - 8} y={cy - 5} fontSize={10} fill="#64748b">x</text>
        <text x={cx + 5} y={toSVG(0, range)[1] + 10} fontSize={10} fill="#64748b">y</text>
        {children({ toSVG, scale, cx, cy })}
      </svg>
    </div>
  );
}

// Arrow from (x1,y1) to (x2,y2) in SVG coords
function Arrow({ x1, y1, x2, y2, color = "#38bdf8", label, lx, ly }) {
  const dx = x2 - x1, dy = y2 - y1;
  const angle = Math.atan2(dy, dx);
  const len = 8;
  const ax1 = x2 - len * Math.cos(angle - 0.4);
  const ay1 = y2 - len * Math.sin(angle - 0.4);
  const ax2 = x2 - len * Math.cos(angle + 0.4);
  const ay2 = y2 - len * Math.sin(angle + 0.4);
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={2} />
      <polygon points={`${x2},${y2} ${ax1},${ay1} ${ax2},${ay2}`} fill={color} />
      {label && <text x={lx ?? x2 + 5} y={ly ?? y2 - 5} fontSize={9} fill={color} fontFamily="monospace">{label}</text>}
    </g>
  );
}

function Dot({ x, y, color = "#f59e0b", label, lx, ly }) {
  return (
    <g>
      <circle cx={x} cy={y} r={4} fill={color} />
      {label && <text x={lx ?? x + 6} y={ly ?? y - 5} fontSize={9} fill={color} fontFamily="monospace">{label}</text>}
    </g>
  );
}

// ─── Result Box ──────────────────────────────────────────────────────────────
function Res({ label, value, color = "#38bdf8" }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "baseline", flexWrap: "wrap" }}>
      <span style={{ color: "#64748b", fontSize: 12, fontFamily: "monospace" }}>{label}</span>
      <span style={{ color, fontSize: 13, fontFamily: "monospace", fontWeight: 600 }}>{value}</span>
    </div>
  );
}

function QBlock({ num, children }) {
  return (
    <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 10, padding: "14px 16px", marginBottom: 12 }}>
      <div style={{ fontSize: 11, color: "#475569", fontFamily: "monospace", marginBottom: 8, letterSpacing: 1 }}>Q{num}</div>
      {children}
    </div>
  );
}

function Sub({ label }) {
  return <div style={{ color: "#64748b", fontSize: 11, fontFamily: "monospace", marginTop: 8, marginBottom: 4 }}>{label}</div>;
}

// ─── TABS ───────────────────────────────────────────────────────────────────
const TABS = ["Q1–4 Plots", "Q5–8 Algebra", "Q9–12 Length & Dist", "Q13–18 Area", "Q19–22 Unit & Angle", "Q23–30 Theory & Apps"];

// ─── Q1–4: Plots & Vectors ───────────────────────────────────────────────────
function Tab1() {
  return (
    <div>
      <QBlock num="1">
        <div style={{ color: "#94a3b8", fontSize: 12, marginBottom: 10 }}>Plot points in ℝ²</div>
        <CoordPlane title="Points: (2,−1) (−1,2) (3,4) (−3,−2) (0,2) (0,−3)" range={5}>
          {({ toSVG }) => {
            const pts = [[2,-1,"a","#f59e0b"],[-1,2,"b","#34d399"],[3,4,"c","#f472b6"],[-3,-2,"d","#a78bfa"],[0,2,"e","#38bdf8"],[0,-3,"f","#fb923c"]];
            return pts.map(([x,y,l,c]) => {
              const [sx,sy] = toSVG(x,y);
              return <Dot key={l} x={sx} y={sy} color={c} label={`(${x},${y})`} lx={sx+6} ly={sy-6} />;
            });
          }}
        </CoordPlane>
      </QBlock>

      <QBlock num="2">
        <div style={{ color: "#94a3b8", fontSize: 12, marginBottom: 10 }}>Directed line segments from origin</div>
        <CoordPlane title="u1=[−2,3]  u2=[3,4]  u3=[−3,−3]  u4=[0,−3]" range={5}>
          {({ toSVG }) => {
            const vecs = [[-2,3,"u₁","#38bdf8"],[3,4,"u₂","#34d399"],[-3,-3,"u₃","#f472b6"],[0,-3,"u₄","#f59e0b"]];
            return vecs.map(([x,y,l,c]) => {
              const [ox,oy] = toSVG(0,0);
              const [tx,ty] = toSVG(x,y);
              return <Arrow key={l} x1={ox} y1={oy} x2={tx} y2={ty} color={c} label={l} />;
            });
          }}
        </CoordPlane>
      </QBlock>

      <QBlock num="3">
        <div style={{ color: "#94a3b8", fontSize: 12, marginBottom: 8 }}>
          Vector [−2, 5] with tail at (3, 2) → head at (3+(−2), 2+5) = <span style={{color:"#38bdf8"}}>( 1, 7 )</span>
        </div>
        <CoordPlane title="Tail (3,2) → Head (1,7)" range={8}>
          {({ toSVG }) => {
            const [tx,ty] = toSVG(3,2), [hx,hy] = toSVG(1,7);
            return (<>
              <Arrow x1={tx} y1={ty} x2={hx} y2={hy} color="#38bdf8" label="[−2,5]" />
              <Dot x={tx} y={ty} color="#f59e0b" label="tail(3,2)" lx={tx+5} ly={ty+12} />
              <Dot x={hx} y={hy} color="#34d399" label="head(1,7)" lx={hx+5} ly={hy-8} />
            </>);
          }}
        </CoordPlane>
      </QBlock>

      <QBlock num="4">
        <div style={{ color: "#94a3b8", fontSize: 12, marginBottom: 8 }}>
          Vector [2, 5] with tail at (1, 2) → head at (1+2, 2+5) = <span style={{color:"#38bdf8"}}>( 3, 7 )</span>
        </div>
        <CoordPlane title="Tail (1,2) → Head (3,7)" range={8}>
          {({ toSVG }) => {
            const [tx,ty] = toSVG(1,2), [hx,hy] = toSVG(3,7);
            return (<>
              <Arrow x1={tx} y1={ty} x2={hx} y2={hy} color="#a78bfa" label="[2,5]" />
              <Dot x={tx} y={ty} color="#f59e0b" label="tail(1,2)" lx={tx+5} ly={ty+12} />
              <Dot x={hx} y={hy} color="#34d399" label="head(3,7)" lx={hx+5} ly={hy-8} />
            </>);
          }}
        </CoordPlane>
      </QBlock>
    </div>
  );
}

// ─── Q5–8: Vector Algebra ────────────────────────────────────────────────────
function Tab2() {
  const solve5 = (u, v) => ({
    sum: [u[0]+v[0], u[1]+v[1]],
    diff: [u[0]-v[0], u[1]-v[1]],
    twoU: [2*u[0], 2*u[1]],
    combo: [3*u[0]-2*v[0], 3*u[1]-2*v[1]],
  });

  const fmt = ([a,b]) => `(${a}, ${b})`;
  const cases5 = [
    { u:[2,3],   v:[-2,5], label:"(a)" },
    { u:[0,3],   v:[3,2],  label:"(b)" },
    { u:[2,6],   v:[3,2],  label:"(c)" },
  ];
  const cases6 = [
    { u:[-1,3],  v:[2,4],  label:"(a)" },
    { u:[-4,-3], v:[5,2],  label:"(b)" },
    { u:[3,2],   v:[-2,0], label:"(c)" },
  ];

  return (
    <div>
      {[{q:5,cases:cases5},{q:6,cases:cases6}].map(({q,cases})=>(
        <QBlock key={q} num={q}>
          {cases.map(({u,v,label})=>{
            const r = solve5(u,v);
            return (
              <div key={label} style={{marginBottom:10}}>
                <Sub label={`${label} u=${fmt(u)}, v=${fmt(v)}`} />
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
                  <Res label="u + v =" value={fmt(r.sum)} color="#38bdf8" />
                  <Res label="u − v =" value={fmt(r.diff)} color="#34d399" />
                  <Res label="2u =" value={fmt(r.twoU)} color="#f59e0b" />
                  <Res label="3u − 2v =" value={fmt(r.combo)} color="#f472b6" />
                </div>
              </div>
            );
          })}
        </QBlock>
      ))}

      <QBlock num="7">
        <div style={{color:"#94a3b8",fontSize:12,marginBottom:8}}>u=(1,2), v=(−3,4), w=(w₁,4), x=(−2,x₂)</div>
        <Sub label="(a) w = 2u → w=(2,4) → w₁ = 2" />
        <Res label="w₁ =" value="2" color="#38bdf8" />
        <Sub label="(b) ½x = v → x = 2v = (−6, 8) → x₂ = 8" />
        <Res label="x₂ =" value="8" color="#34d399" />
        <Sub label="(c) w + x = u → (w₁−2, 4+x₂) = (1,2) → w₁=3, x₂=−2" />
        <Res label="w₁ = 3, x₂ =" value="−2" color="#f59e0b" />
      </QBlock>

      <QBlock num="8">
        <div style={{color:"#94a3b8",fontSize:12,marginBottom:8}}>u=(−4,3), v=(2,−5), w=(w₁,w₂)</div>
        <Sub label="(a) w = 2u + 3v = (−8,6)+(6,−15)" />
        <Res label="w =" value="(−2, −9)" color="#38bdf8" />
        <Sub label="(b) u + w = 2u − v → w = u − v = (−4,3)−(2,−5)" />
        <Res label="w =" value="(−6, 8)" color="#34d399" />
        <Sub label="(c) w = (5/2)v = (5/2)(2,−5)" />
        <Res label="w =" value="(5, −12.5)" color="#f59e0b" />
      </QBlock>
    </div>
  );
}

// ─── Q9–12: Length & Distance ────────────────────────────────────────────────
function Tab3() {
  const len = ([a,b]) => Math.sqrt(a*a + b*b);
  const fmtLen = (v) => {
    const l = len(v), sq = v[0]*v[0]+v[1]*v[1];
    if (Number.isInteger(Math.sqrt(sq))) return `${Math.sqrt(sq)}`;
    return `√${sq}`;
  };
  const dist = (p,q) => fmtLen([p[0]-q[0], p[1]-q[1]]);

  const vecs9 = [[1,2],[-3,-4],[0,2],[-4,3]];
  const vecs10 = [[3,0],[-1,2],[-4,-5],[3,2]];
  const pts11 = [[[2,3],[3,4]],[[0,0],[3,4]],[[-3,2],[0,1]],[[0,3],[2,0]]];
  const pts12 = [[[4,2],[1,2]],[[-2,-3],[0,1]],[[2,4],[-1,1]],[[2,0],[3,2]]];

  return (
    <div>
      <QBlock num="9">
        <div style={{color:"#94a3b8",fontSize:12,marginBottom:10}}>Length ‖v‖ = √(v₁² + v₂²)</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
          {vecs9.map((v,i)=>(
            <Res key={i} label={`(${String.fromCharCode(97+i)}) (${v[0]},${v[1]}) =`} value={fmtLen(v)} color="#38bdf8" />
          ))}
        </div>
      </QBlock>

      <QBlock num="10">
        <div style={{color:"#94a3b8",fontSize:12,marginBottom:10}}>Length of vectors</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
          {vecs10.map((v,i)=>(
            <Res key={i} label={`(${String.fromCharCode(97+i)}) (${v[0]},${v[1]}) =`} value={fmtLen(v)} color="#34d399" />
          ))}
        </div>
      </QBlock>

      <QBlock num="11">
        <div style={{color:"#94a3b8",fontSize:12,marginBottom:10}}>Distance = √((x₂−x₁)² + (y₂−y₁)²)</div>
        {pts11.map(([p,q],i)=>(
          <Res key={i} label={`(${String.fromCharCode(97+i)}) (${p}),(${q}) =`} value={dist(p,q)} color="#f59e0b" />
        ))}
      </QBlock>

      <QBlock num="12">
        <div style={{color:"#94a3b8",fontSize:12,marginBottom:10}}>Distance between pairs</div>
        {pts12.map(([p,q],i)=>(
          <Res key={i} label={`(${String.fromCharCode(97+i)}) (${p}),(${q}) =`} value={dist(p,q)} color="#f472b6" />
        ))}
        <div style={{marginTop:8}}>
          <CoordPlane title="Q11(b) Distance (0,0)→(3,4) = 5" range={5}>
            {({toSVG})=>{
              const [ax,ay]=toSVG(0,0),[bx,by]=toSVG(3,4);
              return(<>
                <line x1={ax} y1={ay} x2={bx} y2={by} stroke="#f59e0b" strokeWidth={2} strokeDasharray="4,3"/>
                <Dot x={ax} y={ay} color="#38bdf8" label="(0,0)" lx={ax+5} ly={ay+12}/>
                <Dot x={bx} y={by} color="#34d399" label="(3,4)" lx={bx+5} ly={by-8}/>
                <text x={(ax+bx)/2+5} y={(ay+by)/2} fill="#f59e0b" fontSize={10} fontFamily="monospace">d=5</text>
              </>);
            }}
          </CoordPlane>
        </div>
      </QBlock>
    </div>
  );
}

// ─── Q13–18: Area & Linear Combos ───────────────────────────────────────────
function Tab4() {
  return (
    <div>
      <QBlock num="13">
        <div style={{color:"#94a3b8",fontSize:12,marginBottom:8}}>
          Can (−5,6) = c₁(1,2) + c₂(3,4)?
        </div>
        <div style={{color:"#64748b",fontSize:12,fontFamily:"monospace"}}>
          c₁ + 3c₂ = −5<br/>
          2c₁ + 4c₂ = 6 → c₁ + 2c₂ = 3<br/>
          Subtract: c₂ = −8, c₁ = 19
        </div>
        <Res label="✓ YES:" value="c₁=19, c₂=−8" color="#34d399" />
        <div style={{color:"#475569",fontSize:11,fontFamily:"monospace",marginTop:4}}>Check: 19(1,2)+(−8)(3,4) = (19,38)+(−24,−32) = (−5,6) ✓</div>
      </QBlock>

      <QBlock num="14">
        <div style={{color:"#94a3b8",fontSize:12,marginBottom:8}}>
          c₁[1,2] + c₂[3,4] = [0,0] with c₁,c₂ not both zero?
        </div>
        <div style={{color:"#64748b",fontSize:12,fontFamily:"monospace"}}>
          det = |1 3; 2 4| = 4−6 = −2 ≠ 0
        </div>
        <Res label="✗ NO:" value="Only trivial solution c₁=c₂=0 exists (linearly independent)" color="#f472b6" />
      </QBlock>

      <QBlock num="15">
        <div style={{color:"#94a3b8",fontSize:12,marginBottom:8}}>Triangle: (3,3), (−1,−1), (4,1)</div>
        <div style={{color:"#64748b",fontSize:12,fontFamily:"monospace"}}>
          A = ½|det([v₁−v₀, v₂−v₀])|<br/>
          v₁−v₀=(−4,−4), v₂−v₀=(1,−2)<br/>
          det = (−4)(−2)−(−4)(1) = 8+4 = 12
        </div>
        <Res label="Area =" value="6 sq units" color="#38bdf8" />
        <CoordPlane title="Triangle (3,3)(−1,−1)(4,1)" range={5}>
          {({toSVG})=>{
            const pts=[[3,3],[-1,-1],[4,1]];
            const svgPts=pts.map(([x,y])=>toSVG(x,y));
            const poly=svgPts.map(p=>p.join(",")).join(" ");
            return(<>
              <polygon points={poly} fill="#38bdf822" stroke="#38bdf8" strokeWidth={1.5}/>
              {pts.map(([x,y],i)=>{const[sx,sy]=toSVG(x,y);return<Dot key={i} x={sx} y={sy} color="#f59e0b" label={`(${x},${y})`} lx={sx+5} ly={sy-6}/>;} )}
              <text x={toSVG(2,1)[0]} y={toSVG(2,1)[1]} fill="#38bdf8" fontSize={10} fontFamily="monospace">A=6</text>
            </>);
          }}
        </CoordPlane>
      </QBlock>

      <QBlock num="16">
        <div style={{color:"#94a3b8",fontSize:12,marginBottom:8}}>Right triangle: (0,0), (0,3), (4,0)</div>
        <div style={{color:"#64748b",fontSize:12,fontFamily:"monospace"}}>A = ½ × base × height = ½ × 4 × 3</div>
        <Res label="Area =" value="6 sq units" color="#34d399" />
      </QBlock>

      <QBlock num="17">
        <div style={{color:"#94a3b8",fontSize:12,marginBottom:8}}>Parallelogram: (2,3),(5,3),(4,5),(7,5)</div>
        <div style={{color:"#64748b",fontSize:12,fontFamily:"monospace"}}>
          Side u = (5,3)−(2,3) = (3,0)<br/>
          Side v = (4,5)−(2,3) = (2,2)<br/>
          Area = |det| = |3×2 − 0×2| = 6
        </div>
        <Res label="Area =" value="6 sq units" color="#f59e0b" />
      </QBlock>

      <QBlock num="18">
        <div style={{color:"#94a3b8",fontSize:12,marginBottom:8}}>Quadrilateral Q: (−2,3),(1,4),(3,0),(−1,−3)</div>
        <div style={{color:"#64748b",fontSize:12,fontFamily:"monospace"}}>
          Shoelace Formula:<br/>
          A = ½|Σ(xᵢyᵢ₊₁ − xᵢ₊₁yᵢ)|<br/>
          = ½|(−2·4−1·3)+(1·0−3·4)+(3·(−3)−(−1)·0)+(−1·3−(−2)·(−3))|<br/>
          = ½|(−11)+(−12)+(−9)+(−9)| = ½×41
        </div>
        <Res label="Area =" value="20.5 sq units" color="#a78bfa" />
        <CoordPlane title="Quadrilateral Q" range={5}>
          {({toSVG})=>{
            const pts=[[-2,3],[1,4],[3,0],[-1,-3]];
            const svgPts=pts.map(([x,y])=>toSVG(x,y));
            const poly=svgPts.map(p=>p.join(",")).join(" ");
            return(<>
              <polygon points={poly} fill="#a78bfa22" stroke="#a78bfa" strokeWidth={1.5}/>
              {pts.map(([x,y],i)=>{const[sx,sy]=toSVG(x,y);return<Dot key={i} x={sx} y={sy} color="#f59e0b" label={`(${x},${y})`} lx={sx+5} ly={sy-6}/>;} )}
            </>);
          }}
        </CoordPlane>
      </QBlock>
    </div>
  );
}

// ─── Q19–22: Unit Vectors & Angles ──────────────────────────────────────────
function Tab5() {
  const mag = (v) => Math.sqrt(v[0]**2+v[1]**2);
  const unitFmt = (v) => {
    const m = mag(v);
    const a = (v[0]/m), b = (v[1]/m);
    return `(${a.toFixed(4)}, ${b.toFixed(4)})`;
  };
  const cosFmt = (u,v) => {
    const dot = u[0]*v[0]+u[1]*v[1];
    const d = mag(u)*mag(v);
    return `${(dot/d).toFixed(4)} (θ ≈ ${(Math.acos(dot/d)*180/Math.PI).toFixed(1)}°)`;
  };

  return (
    <div>
      <QBlock num="19">
        <div style={{color:"#94a3b8",fontSize:12,marginBottom:8}}>Unit vector = x/‖x‖</div>
        {[[3,4],[-2,-3],[5,0]].map((v,i)=>(
          <div key={i} style={{marginBottom:6}}>
            <Res label={`(${String.fromCharCode(97+i)}) x=(${v[0]},${v[1]}), ‖x‖=${mag(v).toFixed(3)} →`} value={unitFmt(v)} color="#38bdf8" />
          </div>
        ))}
      </QBlock>

      <QBlock num="20">
        <div style={{color:"#94a3b8",fontSize:12,marginBottom:8}}>Unit vectors</div>
        {[[2,4],[0,-2],[-1,-3]].map((v,i)=>(
          <div key={i} style={{marginBottom:6}}>
            <Res label={`(${String.fromCharCode(97+i)}) x=(${v[0]},${v[1]}), ‖x‖=${mag(v).toFixed(3)} →`} value={unitFmt(v)} color="#34d399" />
          </div>
        ))}
      </QBlock>

      <QBlock num="21">
        <div style={{color:"#94a3b8",fontSize:12,marginBottom:8}}>cos θ = (u·v) / (‖u‖‖v‖)</div>
        {[
          {u:[1,2],v:[2,-3],label:"(a)"},
          {u:[1,0],v:[0,1],label:"(b)"},
          {u:[-3,-4],v:[4,-3],label:"(c)"},
          {u:[2,1],v:[-2,-1],label:"(d)"},
        ].map(({u,v,label})=>(
          <div key={label} style={{marginBottom:6}}>
            <Res label={`${label} u=(${u}), v=(${v}) →`} value={cosFmt(u,v)} color="#f59e0b" />
          </div>
        ))}
      </QBlock>

      <QBlock num="22">
        <div style={{color:"#94a3b8",fontSize:12,marginBottom:8}}>Cosine of angle</div>
        {[
          {u:[0,-1],v:[1,0],label:"(a)"},
          {u:[2,2],v:[4,-5],label:"(b)"},
          {u:[2,-1],v:[-3,-2],label:"(c)"},
          {u:[0,2],v:[3,-3],label:"(d)"},
        ].map(({u,v,label})=>(
          <div key={label} style={{marginBottom:6}}>
            <Res label={`${label} u=(${u}), v=(${v}) →`} value={cosFmt(u,v)} color="#a78bfa" />
          </div>
        ))}
      </QBlock>
    </div>
  );
}

// ─── Q23–30 Theory & Apps ───────────────────────────────────────────────────
function Tab6() {
  return (
    <div>
      <QBlock num="23">
        <div style={{color:"#94a3b8",fontSize:12,marginBottom:6}}>Standard basis dot products</div>
        <Res label="(a) i·i = j·j = 1, i·j = 0" value="— follows from definition of dot product with unit vectors at 90°" color="#38bdf8" />
      </QBlock>

      <QBlock num="24">
        <div style={{color:"#94a3b8",fontSize:12,marginBottom:8}}>u₁=(1,2) u₂=(0,1) u₃=(−2,−4) u₄=(−2,1) u₅=(2,4) u₆=(−6,3)</div>
        <Sub label="(a) Orthogonal (dot = 0):" />
        <Res label="" value="u₁·u₄=(−2+2)=0 ✓   u₁·u₆=(−6+6)=0 ✓   u₃·u₆=(12−12)=0 ✓   u₄·u₅=(−4+4)=0 ✓" color="#34d399" />
        <Sub label="(b) Same direction (positive scalar multiple):" />
        <Res label="" value="u₁ & u₅: (2,4)=2(1,2) ✓" color="#38bdf8" />
        <Sub label="(c) Opposite directions:" />
        <Res label="" value="u₁ & u₃: (−2,−4)=−2(1,2) ✓   u₃ & u₅: (2,4)=−1(−2,−4) ✓" color="#f472b6" />
      </QBlock>

      <QBlock num="25">
        <div style={{color:"#94a3b8",fontSize:12,marginBottom:8}}>(a,4) ∥ (2,5) → ratios equal</div>
        <div style={{color:"#64748b",fontSize:12,fontFamily:"monospace"}}>a/2 = 4/5 → a = 8/5</div>
        <Res label="a =" value="8/5 = 1.6" color="#f59e0b" />
      </QBlock>

      <QBlock num="26">
        <div style={{color:"#94a3b8",fontSize:12,marginBottom:8}}>(a,2) ⊥ (a,−2) → dot = 0</div>
        <div style={{color:"#64748b",fontSize:12,fontFamily:"monospace"}}>a·a + 2·(−2) = 0 → a² = 4</div>
        <Res label="a =" value="±2" color="#a78bfa" />
      </QBlock>

      <QBlock num="27">
        <div style={{color:"#94a3b8",fontSize:12,marginBottom:8}}>Write in terms of i and j</div>
        {[[[1,3],"i + 3j"],[[-2,-3],"−2i − 3j"],[[-2,0],"−2i"],[[0,3],"3j"]].map(([v,s],i)=>(
          <Res key={i} label={`(${String.fromCharCode(97+i)}) (${v[0]},${v[1]}) =`} value={s} color="#38bdf8" />
        ))}
      </QBlock>

      <QBlock num="28">
        <div style={{color:"#94a3b8",fontSize:12,marginBottom:8}}>Write as 2×1 matrix</div>
        <Res label="(a) 3i − 2j =" value="[3, −2]ᵀ" color="#34d399" />
        <Res label="(b) 2i =" value="[2, 0]ᵀ" color="#34d399" />
        <Res label="(c) −2i − 3j =" value="[−2, −3]ᵀ" color="#34d399" />
      </QBlock>

      <QBlock num="29">
        <div style={{color:"#94a3b8",fontSize:12,marginBottom:8}}>Tugboat forces: 300 lbs (−y), 400 lbs (−x)</div>
        <div style={{color:"#64748b",fontSize:12,fontFamily:"monospace"}}>
          Resultant = (−400, −300)<br/>
          ‖R‖ = √(400²+300²) = √250000
        </div>
        <Res label="Magnitude =" value="500 lbs, direction = SW (below negative x-axis, tan⁻¹(300/400) ≈ 36.87°)" color="#f59e0b" />
        <CoordPlane title="Tugboat Forces" range={6}>
          {({toSVG})=>{
            const o=toSVG(0,0),f1=toSVG(-4,0),f2=toSVG(0,-3),r=toSVG(-4,-3);
            return(<>
              <Arrow x1={o[0]} y1={o[1]} x2={f1[0]} y2={f1[1]} color="#38bdf8" label="400lb" lx={f1[0]-10} ly={f1[1]-8}/>
              <Arrow x1={o[0]} y1={o[1]} x2={f2[0]} y2={f2[1]} color="#34d399" label="300lb" lx={f2[0]+5} ly={f2[1]+5}/>
              <Arrow x1={o[0]} y1={o[1]} x2={r[0]} y2={r[1]} color="#f59e0b" label="500lb" lx={r[0]-20} ly={r[1]+12}/>
              <line x1={f1[0]} y1={f1[1]} x2={r[0]} y2={r[1]} stroke="#475569" strokeDasharray="4,3" strokeWidth={1}/>
              <line x1={f2[0]} y1={f2[1]} x2={r[0]} y2={r[1]} stroke="#475569" strokeDasharray="4,3" strokeWidth={1}/>
            </>);
          }}
        </CoordPlane>
      </QBlock>

      <QBlock num="30">
        <div style={{color:"#94a3b8",fontSize:12,marginBottom:8}}>Airplane 260 km/h south, wind 100 km/h west</div>
        <div style={{color:"#64748b",fontSize:12,fontFamily:"monospace"}}>
          sin θ = 100/260 = 5/13 → θ ≈ 22.6° east of south<br/>
          cos θ = 12/13 → Speed = 260 × (12/13)
        </div>
        <Res label="Heading: 22.6° east of south,  Resultant speed =" value="240 km/h due south" color="#a78bfa" />
      </QBlock>
    </div>
  );
}

const COMPONENTS = [Tab1, Tab2, Tab3, Tab4, Tab5, Tab6];

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState(0);
  const Comp = COMPONENTS[active];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#020817",
      fontFamily: "'Georgia', serif",
      color: "#e2e8f0",
      padding: "0 0 40px 0",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
        borderBottom: "1px solid #1e293b",
        padding: "20px 24px 16px",
        textAlign: "center",
      }}>
        <div style={{ fontSize: 11, color: "#6366f1", letterSpacing: 4, fontFamily: "monospace", marginBottom: 6 }}>LINEAR ALGEBRA · CHAPTER 4</div>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#e2e8f0", letterSpacing: -0.5 }}>
          Exercise 4.1 — Vectors in the Plane
        </h1>
        <div style={{ fontSize: 11, color: "#475569", marginTop: 6, fontFamily: "monospace" }}>All 30 Questions · Full Solutions · Interactive Graphs</div>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex",
        overflowX: "auto",
        gap: 4,
        padding: "12px 16px",
        background: "#0f172a",
        borderBottom: "1px solid #1e293b",
      }}>
        {TABS.map((t, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            background: active === i ? "#6366f1" : "#1e293b",
            color: active === i ? "#fff" : "#64748b",
            border: "none",
            borderRadius: 6,
            padding: "6px 12px",
            fontSize: 11,
            fontFamily: "monospace",
            cursor: "pointer",
            whiteSpace: "nowrap",
            letterSpacing: 0.5,
            transition: "all 0.15s",
          }}>{t}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "20px 16px" }}>
        <Comp />
      </div>
    </div>
  );
}
