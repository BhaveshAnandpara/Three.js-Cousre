precision mediump float ;

uniform vec3 uColor;
uniform sampler2D uTexture;

varying vec2 vUv;
varying float vElevation;

// varying float vRandom;

void main()
{
    // gl_FragColor = vec4(1.0 , 0.0 , 0.0 , 1.0); 
    // gl_FragColor = vec4(uColor, 1.0); 

    vec4 textureColor = texture2D(uTexture , vUv);
    textureColor.rgb *= vElevation * 1.5 + 0.4;
    gl_FragColor = textureColor; 

}