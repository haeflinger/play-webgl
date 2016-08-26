var gl;

initGL();
createShaders();
draw();

function initGL(){
  var canvas = document.getElementById("canvas");
  gl = canvas.getContext("webgl");
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1, 1, 1, 1);
}

function createShaders() {
  var vs = "";
  vs += "void main(void) {";
  vs += "  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);";
  vs += "}";

  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vs);
  gl.compileShader(vertexShader);

  var fs = "";
  fs += "void main(void) {";
  fs += "  gl+FragColor = vec4(0.0, 0.0, 0.0, 1.0);";
  fs += "}";

  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fs);
  gl.compileShader(fragmentShader);
}

function draw() {
  gl.clear(gl.COLOR_BUFFER_BIT);

}
