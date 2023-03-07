const canvas = window.canvas
const gl = canvas.getContext("webgl2")
const dpr = Math.max(1, .5*window.devicePixelRatio)
/** @type {Map<string,PointerEvent>} */
const touches = new Map()

const vertexSource = `#version 300 es
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

in vec2 position;

void main(void) {
    gl_Position = vec4(position, 0., 1.);
}
`
const fragmentSource = `#version 300 es

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

out vec4 waterColor;

uniform vec2 resolution;
uniform float time;
uniform int pointerCount;
uniform vec2 touch;

const vec3 roomsize=vec3(6,5,44)*1.1;
const vec3 boxsize=vec3(0,0,0);
const float walleps=1e-2;

#define T time
#define S smoothstep
#define mouse (touch/resolution)
#define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a))

float tick(float t,float e) {
    return floor(t)+pow(S(.0,1.,S(.0,1.,fract(t))),e);
}

float box(vec3 p,vec3 s,float r) {
    p=abs(p)-s;

    return length(max(p,.0))+
        min(.0,max(max(p.x,p.y),p.z))-r;
}

float mat=.0;
float map(vec3 p) {
    float d=1e5,
    room=-box(p,roomsize,.05),
    bx=box(p-vec3(0,-(roomsize.y-(boxsize.y+.05)),0),boxsize,.05);

    d=min(d, room);
    d=min(d, bx);

    if (d==bx) mat=1.;
    else mat=.0;

    return d;
}

vec3 water2(vec2 uv) {
    vec2
    n=vec2(0),
    q=vec2(0);

    uv*=.775;

    float
    d=dot(uv,uv),
    s=9.,
    a=.02,
    b=sin(T*4.4-d*90.)*.7,
    t=T*1.;

    mat2 m=mat2(.6,1.2,-1.2,.6);
    for (float i=.0; i<30.; i++) {
        n*=m;
        q=uv*s-t+b+i+n;
        a+=dot(sin(q)/s,vec2(.2));
        n-=sin(q);
        s*=1.2;
    }

    vec3 col=vec3(1,3,4)*(a+a)+a+a-d;
    col=exp(-col*8.);
    col=abs(col);
    col=sqrt(col);
    col=exp(-col*4.);

    return col;
}

vec3 water5(vec2 uv) {
    vec2
    n=vec2(0),
    q=vec2(0);

    uv*=.875;

    float
    d=dot(uv,uv),
    s=9.,
    a=.02,
    b=sin(T*4.4-d*90.)*.7,
    t=T*4.;

    mat2 m=mat2(.6,1.2,-1.2,.6);
    for (float i=.0; i<30.; i++) {
        n*=m;
        q=uv*s-t+b+i+n;
        a+=dot(sin(q)/s,vec2(.2));
        n-=sin(q);
        s*=1.2;
    }

    vec3 col=vec3(1,3,4)*(a+a)+a+a-d;
    col=exp(-col*8.);
    col=abs(col);
    col=sqrt(col);
    col=exp(-col*4.);

    return col;
}

vec3 water4(vec2 uv) {
    vec2
    n=vec2(0),
    q=vec2(0);

    uv*=.875;

    float
    d=dot(uv,uv),
    s=9.,
    a=.02,
    b=sin(T*4.4-d*90.)*.7,
    t=T*1.;

    mat2 m=mat2(.6,1.2,-1.2,.6);
    for (float i=.0; i<30.; i++) {
        n*=m;
        q=uv*s-t+b+i+n;
        a+=dot(sin(q)/s,vec2(.2));
        n-=sin(q);
        s*=1.2;
    }

    vec3 col=vec3(1,3,4)*(a+a)+a+a-d;
    col=exp(-col*8.);
    col=abs(col);
    col=sqrt(col);
    col=exp(-col*4.);

    return col;
}

vec3 water6(vec2 uv) {
    vec2
    n=vec2(0),
    q=vec2(0);

    uv*=.875;

    float
    d=dot(uv,uv),
    s=9.,
    a=.02,
    b=sin(T*.4-d*4.)*.9,
    t=T*4.;

    uv*=rot(sin(6.+t*.05)*.8-.567);
    uv.y-=t*.05;

    mat2 m=mat2(.6,1.2,-1.2,.6);
    for (float i=.0; i<30.; i++) {
        n*=m;
        q=uv*s-t+b+i+n;
        a+=dot(cos(q)/s,vec2(.2));
        n+=sin(q);
        s*=1.2;
    }

    vec3 col=vec3(4,2,1)*(a+.2)+a+a-d;
    col=exp(-col*8.);
    col=abs(col);
    col=sqrt(col);
    col=exp(-col*4.);

    return col;
}

vec3 water3(vec2 uv) {
    vec2
    n=vec2(0),
    q=vec2(0);

    uv*=.875;

    float
    d=dot(uv,uv),
    s=9.,
    a=.02,
    b=sin(T*4.4-d*90.)*.7,
    t=T*4.;

    mat2 m=mat2(.6,1.2,-1.2,.6);
    for (float i=.0; i<30.; i++) {
        n*=m;
        q=uv*s-t+b+i+n;
        a+=dot(sin(q)/s,vec2(.2));
        n-=sin(q);
        s*=1.2;
    }

    vec3 col=vec3(1,3,4)*(a+a)+a+a-d;
    col=exp(-col*8.);
    col=abs(col);
    col=sqrt(col);
    col=exp(-col*4.);

    return col;
}

vec3 water(vec2 uv) {
    vec2
    n=vec2(0),
    q=vec2(0);

    uv*=.875;

    float
    d=dot(uv,uv),
    s=9.,
    a=.02,
    b=sin(T*4.4-d*90.)*.7,
    t=T*4.;

    mat2 m=mat2(.6,1.2,-1.2,.6);
    for (float i=.0; i<30.; i++) {
        n*=m;
        q=uv*s-t+b+i+n;
        a+=dot(sin(q)/s,vec2(.2));
        n-=sin(q);
        s*=1.2;
    }

    vec3 col=vec3(1,3,4)*(a+a)+a+a-d;
    col=exp(-col*8.);
    col=abs(col);
    col=sqrt(col);
    col=exp(-col*1.);

    return col;
}

vec3 norm(vec3 p) {
    vec2 e=vec2(1e-3,0);
    float d=map(p);
    vec3 n=d-vec3(
        map(p-e.xyy),
        map(p-e.yxy),
        map(p-e.yyx)
    );

    return normalize(n);
}

void cam(inout vec3 p) {

        p.yz*=.7*rot(sin(3.+1.0*T*.1)*-.1);
        p.xz*=-.8*rot(tick(3.+1.0*T*.0001, 1.)*1.57079);
    
}

void main(void) {
    vec2 uv = (
        gl_FragCoord.xy-.5*resolution
    )/min(resolution.x, resolution.y);
    
    float zoom=pointerCount>0
        ? .0
        : -exp(-cos(T))*.2;
        

    vec3 col=vec3(0),
    ro=vec3(0,-roomsize.y*.5,zoom-(roomsize.x-roomsize.x*.225)),
    rd=normalize(vec3(uv,1)),
    l=normalize(vec3(-6,2.49,-4));

    cam(ro);
    cam(rd);

    vec3 p=ro;

    const float steps=80.,maxd=20.;
    float dd=.0,side=1.,e=1.;

    for (float i=.0; i<steps; i++) {
        float d=map(p)*side;

        if (d<1e-2) {
            vec3 n=norm(p)*side;

            if (dot(l,n)<.0) l=-l;

            float diff=max(.0,dot(l,n)),
            fog=1.-clamp(dd/maxd,.0,1.),
            fres=max(.0,dot(-rd,n));

            if (mat==.0) {
                if (p.x>(roomsize.x-walleps)) {
                    col+=mix(diff*water3(p.zy*.125)*2.,vec3(fres),fog)*e;
                } else if (p.x<-(roomsize.x-walleps)) {
                    col+=mix(diff*water6(p.zy*.25)*2.,vec3(fres),fog)*e;
                } else if (p.z<-(roomsize.z-walleps)) {
                    col+=mix(diff*water4(p.xy*.25)*2.5,vec3(fres),fog)*e;
                } else if (p.z>(roomsize.z-walleps)) {
                    col+=mix(diff*water2(p.xy*.15)*2.,vec3(fres),fog)*e;
                } else if (p.y>(roomsize.y-walleps)) {
                    col+=mix(diff*water(p.xz*.125)*4.,vec3(fres),fog)*e;
                } else if (p.y<-(roomsize.y-walleps)) {
                    col+=mix(diff*water5(p.xz*.1)*4.,vec3(fres),fog)*e;
                } else {
                    // no color...
                }
                col-=diff*fog;
                
                break;
            } else {
                vec3 h=normalize(l-rd);
                col+=e*fog*diff*(
                1.88*pow(max(.0, dot(n, h)), 33.) +
                .05*pow(max(.0, fres), 33.));     

                side=-side;
                vec3 rdo=refract(rd,n,1.+side*.45);

                if (dot(rdo,rdo)==.0) {
                rdo=reflect(rd,n);
                }

                rd=rdo;
                d=9e-2;
                e*=.925;
            }
        }

        if (dd>maxd) {
            dd=maxd;
            break;
        }

        p+=rd*d;
        dd+=d;
    }

    waterColor = vec4(col,.1);
}
`
let time
let buffer
let program
let touch
let resolution
let pointerCount
let vertices = []
let touching = false

function resize() {
    const { innerWidth: width, innerHeight: height } = window

    canvas.width = width * dpr
    canvas.height = height * dpr

    gl.viewport(0, 0, width * dpr, height * dpr)
}

function compile(shader, source) {
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader))
    }
}

function setup() {
    const vs = gl.createShader(gl.VERTEX_SHADER)
    const fs = gl.createShader(gl.FRAGMENT_SHADER)

    program = gl.createProgram()

    compile(vs, vertexSource)
    compile(fs, fragmentSource)

    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program))
    }

    vertices = [-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0]
   
    buffer = gl.createBuffer()

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

    const position = gl.getAttribLocation(program, "position")

    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    time = gl.getUniformLocation(program, "time")
    touch = gl.getUniformLocation(program, "touch")
    pointerCount = gl.getUniformLocation(program, "pointerCount")
    resolution = gl.getUniformLocation(program, "resolution")
}

function draw(now) {
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.uniform1f(time, now * 0.0004)
    gl.uniform2f(resolution, canvas.width, canvas.height)
    gl.drawArrays(gl.TRIANGLES, 0, vertices.length * 0.5)
}

function getTouches() {
    if (!touches.size) {
        return [0, 0]
    }

    for (let [id, t] of touches) {
        const result = [dpr * t.clientX, dpr * (innerHeight - t.clientY)]

        return result
    }
}

function loop(now) {
    draw(now)
    requestAnimationFrame(loop)
}

function init() {
    setup()
    resize()
    loop(0)
}

document.body.onload = init
window.onresize = resize

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 355,
      "density": {
        "enable": true,
        "value_area": 789.1476416322727
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
     



  
    
 
});