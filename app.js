var gl,
    shaderProgram,
    verticies,
    vertextCount = 5000;

initGL();
createShaders();
createVerticies();
draw();

function initGL(){
  var canvas = document.getElementById("canvas");
  gl = canvas.getContext("webgl");
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1, 1, 1, 1);
}

function createShaders() {
  var vertexShader = getShader(gl, "shader-vs");

  var fragmentShader = getShader(gl, "shader-fs");

  shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);
}

function createVerticies() {
  verticies = [];

  for(var i = 0; i < vertextCount; i++){
    verticies.push(Math.random() * 2 - 1);
    verticies.push(Math.random() * 2 - 1);
  }

  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticies), gl.STATIC_DRAW);

  var coords = gl.getAttribLocation(shaderProgram, "coords");
  //gl.vertexAttrib3f(coords, 0.5, 0.5, 0);
  gl.vertexAttribPointer(coords, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(coords);
  //gl.bindBuffer(gl.ARRAY_BUFFER, null);

  var pointSize = gl.getAttribLocation(shaderProgram, "pointSize");
  gl.vertexAttrib1f(pointSize, 1);

  var color = gl.getUniformLocation(shaderProgram, "color");
  gl.uniform4f(color, 0, 0, 0, 1);
}
//https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Adding_2D_content_to_a_WebGL_context
function getShader(gl, id) {
  var shaderScript, theSource, currentChild, shader;

  shaderScript = document.getElementById(id);

  if(!shaderScript) {
    return null;
  }

  theSource = "";
  currentChild = shaderScript.firstChild;

  while(currentChild) {
    if(currentChild.nodeType == currentChild.TEXT_NODE) {
      theSource += currentChild.textContent;
    }
    currentChild = currentChild.nextSibling;
  }
  if(shaderScript.type == "x-shader/x-fragment") {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if(shaderScript.type == "x-shader/x-vertex") {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else {
    //Unknown shader type
    return null;
  }
  gl.shaderSource(shader, theSource);

  //Compile the shader program
  gl.compileShader(shader);

  //See if compiled successfully
  if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert("An error occured compiling the shaders: " + gl.getShaderInfoLog(shader));
    return null;
  }
  return shader;
}



function draw() {
  for(var i = 0; i < vertextCount * 2; i += 2){
    verticies[i] += Math.random() * 0.01 - 0.005;
    verticies[i + 1] += Math.random() * 0.01 - 0.005;
  }
  gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(verticies));
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, vertextCount);
  requestAnimationFrame(draw);
}
