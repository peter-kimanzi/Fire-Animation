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




















        














