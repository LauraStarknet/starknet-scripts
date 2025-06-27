//////// CONSTANTS

// rgb 0-1
const bgColor = new Float32Array([ 0, 0, 0 ])
const pointerColor = new Float32Array([ 0, 0, 0 ])
// px
const pointerSize = 100
const blurRadius = 1
// 0-1
const clearFactor = 0.02 // effects from 0.002 to 0.5



//////// SETUP

const canvas = document.querySelector("canvas")
const gl = canvas.getContext("webgl2", {
  preserveDrawingBuffer: true,
//   premultipliedAlpha: false,
  alpha: true,
})
gl.clearColor(0, 0, 0, 0)
setCanvasSize(innerWidth, innerHeight)

const newUniform = gl.getUniformLocation.bind(gl)

const trailTarget = new SwappableTarget(gl, innerWidth, innerHeight)

// fullscreen quad vert shader
const fsQuadShader = createShader(gl, gl.VERTEX_SHADER,
  `#version 300 es
  layout(location=0) in vec2 position;
  layout(location=1) in vec2 a_uv;
  out vec2 uv;
  void main() {
    uv = a_uv;
    gl_Position = vec4(position, 0, 1);
  }`,
)
// position
gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
gl.bufferData(
  gl.ARRAY_BUFFER,
  new Float32Array([ -1, -3, -1, 1, 3, 1 ]),
  gl.STATIC_DRAW
)
gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 8, 0)
gl.enableVertexAttribArray(0)
// a_uv
gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
gl.bufferData(
  gl.ARRAY_BUFFER,
  new Float32Array([ 0, -1, 0, 1, 2, 1 ]),
  gl.STATIC_DRAW
)
gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 8, 0)
gl.enableVertexAttribArray(1)



//////// PROGRAMS

const trailProgram = createProgram(gl, {
  vertexShader: fsQuadShader,
  fragmentShader: `#version 300 es
  precision highp float;
  uniform sampler2D map;
  uniform float blurRadius;
  uniform float clearFactor;
  in vec2 uv;
  out float Color;
  void main() {
    vec2 ts = 1.0 / vec2(textureSize(map, 0)) * blurRadius;
    float fill = 0.0;
    fill += texture(map, uv + vec2( 0, ts.y )).r;
    fill += texture(map, uv + vec2( ts.x, 0 )).r;
    fill += texture(map, uv - vec2( 0, ts.y )).r;
    fill += texture(map, uv - vec2( ts.x, 0 )).r;
    fill *= 0.25;
    Color = fill - sqrt(fill) * clearFactor;
  }`,
})
gl.useProgram(trailProgram)
gl.uniform1i(newUniform(trailProgram, "map"), 0)
gl.uniform1f(newUniform(trailProgram, "blurRadius"), blurRadius)
gl.uniform1f(newUniform(trailProgram, "clearFactor"), clearFactor)


const pointerProgram = createProgram(gl, {
  vertexShader: `#version 300 es
  uniform float pointerSize;
  uniform vec2 pointer;
  void main() {
    gl_PointSize = pointerSize;
    gl_Position = vec4(pointer, 0, 1);
  }`,
  fragmentShader: `#version 300 es
  precision highp float;
  out float Color;
  void main() {
    vec2 c = gl_PointCoord - vec2(0.5);
  if (dot(c, c) > 0.25) discard; // make round shape
  Color = 1.0;
  }`,
})
gl.useProgram(pointerProgram)
gl.uniform1f(newUniform(pointerProgram, "pointerSize"), pointerSize)
const pointerLoc = newUniform(pointerProgram, "pointer")


const renderProgram = createProgram(gl, {
  vertexShader: fsQuadShader,
  fragmentShader: `#version 300 es
  precision highp float;
  uniform sampler2D maskMap;
  uniform vec3 bgColor;
  uniform vec3 pointerColor;
  in vec2 uv;
  out vec3 Color;
  void main() {
    float mask = texture(maskMap, uv).r;
    Color = vec3(mask);
  }`,
})
gl.useProgram(renderProgram)
gl.uniform1i(newUniform(renderProgram, "maskMap"), 0)
//gl.uniform3fv(newUniform(renderProgram, "bgColor"), bgColor)
gl.uniform3fv(newUniform(renderProgram, "pointerColor"), pointerColor)



//////// RENDER

requestAnimationFrame(function render() {
  requestAnimationFrame(render)
  
  trailTarget.bind()
  gl.useProgram(trailProgram)
  gl.bindTexture(gl.TEXTURE_2D, trailTarget.texture)
  gl.drawArrays(gl.TRIANGLES, 0, 3)
  gl.useProgram(pointerProgram)
  gl.drawArrays(gl.POINTS, 0, 1)
  trailTarget.unbind()
  trailTarget.swap()

  gl.useProgram(renderProgram)
  gl.bindTexture(gl.TEXTURE_2D, trailTarget.texture)
  gl.drawArrays(gl.TRIANGLES, 0, 3)
})



//////// HELPERS

function setCanvasSize(width, height) {
  canvas.width = width
  canvas.height = height
  gl.viewport(0, 0, width, height)
}

onresize = function() {
  setCanvasSize(innerWidth, innerHeight)
  trailTarget.setSize(innerWidth, innerHeight)
}

onpointerdown = onpointermove = function(e) {
  gl.useProgram(pointerProgram)
  gl.uniform2f(
    pointerLoc,
    e.clientX / innerWidth * 2 - 1,
    1 - e.clientY / innerHeight * 2,
  )
}



//////// UTILS

function createProgram(gl, config) {
  const vertexShader = typeof config.vertexShader === "string"
    ? createShader(gl, gl.VERTEX_SHADER, config.vertexShader)
    : config.vertexShader

  const fragmentShader = typeof config.fragmentShader === "string"
    ? createShader(gl, gl.FRAGMENT_SHADER, config.fragmentShader)
    : config.vertexShader

  if (!vertexShader || !fragmentShader) {
    console.warn("one of shaders is not provided!")
    return
  }

  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  const linked = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (!linked) {
    console.log(gl.getProgramInfoLog(program))
    gl.deleteProgram(program)
    return
  }

  return program
}

function createShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (!compiled) {
    console.log(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return
  }

  return shader
}

function SwappableTarget(gl, width, height) {
  let writeTarget = new Target(gl, width, height)
  let readTarget  = new Target(gl, width, height)
  
  Object.defineProperties(this, {
    texture: { get() { return readTarget.texture } },
  })
        
  this.swap = function() {
    [ writeTarget, readTarget ] = [ readTarget, writeTarget ]
  }
  
  this.bind = function() {
    writeTarget.bind()
  }
  
  this.unbind = function() {
    writeTarget.unbind()
  }

  this.setSize = function(width, height) {
    writeTarget.setSize(width, height)
    readTarget.setSize(width, height)
  }
}

function Target(gl, width, height) {
  this.texture = createTexture(gl, width, height)
  let buffer = createFramebuffer(gl, this.texture)

  this.bind = function() {
    gl.bindFramebuffer(gl.FRAMEBUFFER, buffer)
  }
  this.unbind = function() {
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  }

  this.setSize = function(width, height) {
    const newTexture = createTexture(gl, width, height)
    this.bind()
    gl.copyTexSubImage2D(gl.TEXTURE_2D, 0, 0, 0, 0, 0, width, height)
    this.unbind()
    gl.deleteTexture(this.texture)
    gl.deleteFramebuffer(buffer)
    this.texture = newTexture
    buffer = createFramebuffer(gl, newTexture)
  }
}

function createTexture(gl, width, height) {
  const texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  return texture
}

function createFramebuffer(gl, texture) {
  const buffer = gl.createFramebuffer()
  gl.bindFramebuffer(gl.FRAMEBUFFER, buffer)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  return buffer
}
