
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix; //handles Camera
uniform mat4 modelMatrix; //Apply Transformation like ( rotation , scale  , etc) Apply to mesh and THree.js does all work to convert modelmatrix
uniform vec2 uFrequency;
uniform float uTime;

attribute vec3 position; //Provides 3d position of vertexes from bufferGeometry
attribute float aRandom; //aRandom => Attribute Random
attribute vec2 uv;


varying vec2 vUv;
varying float vElevation;

// varying float vRandom; //vRandom => varying Random //Varying means to send data from vertex.glsl to fragment.glsl as we cannot use attributes in fragment.glsl

void main()
{

    vec4 modelPosition = modelMatrix * vec4(position , 1.0);

    float elevation = sin(modelPosition.x * uFrequency.x + uTime) * 0.1;
    elevation += sin(modelPosition.y * uFrequency.y + uTime) * 0.1;

    modelPosition.z = elevation;
    // modelPosition.z += aRandom * 0.1;

    vec4 viewPosition = viewMatrix * modelPosition ;
    vec4 projectedPosition =  projectionMatrix * viewPosition ;

    gl_Position = projectedPosition;

   //gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position , 1.0);

    //gl_Position is already existed vec4 variable and we are assigning value over there 

    // vRandom = aRandom;
    vUv = uv;
    vElevation = elevation;
}