precision mediump float ;

varying vec2 vUv;

float random( vec2 st ){ //random does not exist in glsl

    return fract(sin(dot(st.xy , vec2(12.9898 , 78.233))) * 43758.5453123);

}

void main()
{

    float Xstrength = vUv.x;
    float Ystrength = vUv.y;

    //Pattern 1
    // gl_FragColor = vec4(vUv.x, vUv.y, 1.0, 1.0);

    //Patttern2
    // gl_FragColor = vec4(Xstrength , Xstrength, Xstrength, 1.0);

    //Patttern3
    // gl_FragColor = vec4(Ystrength , Ystrength, Ystrength, 1.0);

    //Patttern4
    // gl_FragColor = vec4(1.0 - Ystrength , 1.0 - Ystrength, 1.0 - Ystrength, 1.0);

    //Patttern5
    //   gl_FragColor = vec4(10.0 * Ystrength ,10.0 *  Ystrength,10.0 *  Ystrength, 1.0);

    //Patttern6
    // Ystrength = mod(vUv.y * 10.0 , 1.0);
    // gl_FragColor = vec4(Ystrength ,Ystrength,Ystrength, 1.0);
    
    //Patttern7
    /*
    Ystrength = mod(vUv.y * 10.0 , 1.0);

    if( Ystrength < 0.5)
        Ystrength = 0.0;

    else
        Ystrength = 1.0;

    gl_FragColor = vec4(Ystrength ,Ystrength,Ystrength, 1.0);
    */

    //Patttern8
    /*
    Xstrength = mod(vUv.x * 10.0 , 1.0);

    if( Xstrength < 0.8)
        Xstrength = 0.0;

    else
        Xstrength = 1.0;

    gl_FragColor = vec4(Xstrength ,Xstrength,Xstrength, 1.0);
    */

    //Patttern9
    /*
    Xstrength = mod(vUv.x * 10.0 , 1.0);
    Ystrength = mod(vUv.y * 10.0 , 1.0);

    if( Xstrength < 0.8 && Ystrength < 0.8){
        Xstrength = 0.0;
        Ystrength = 0.0;
    }

    else{
        Xstrength = 1.0;
        Ystrength = 1.0;
    }

    gl_FragColor = vec4(Xstrength ,Ystrength,Xstrength, 1.0);
    */

    
    //Patttern10
    /*
    Xstrength = mod(vUv.x * 10.0 , 1.0);
    Ystrength = mod(vUv.y * 10.0 , 1.0);

    if( Xstrength < 0.25 && Ystrength < 0.25){
        Xstrength = 1.0;
        Ystrength = 1.0;
    }

    else{
        Xstrength = 0.0;
        Ystrength = 0.0;
    }

    gl_FragColor = vec4(Xstrength ,Ystrength,Xstrength, 1.0);
    */

    //Patttern11
    /*
    Xstrength = mod(vUv.x * 10.0 , 1.0);
    Ystrength = mod(vUv.y * 10.0 , 1.0);

    if( Xstrength < 0.75 && Ystrength < 0.75){
        Xstrength = 1.0;
        Ystrength = 1.0;
    }

    else{
        Xstrength = 0.0;
        Ystrength = 0.0;
    }

    gl_FragColor = vec4(Xstrength ,Ystrength,Xstrength, 1.0);
    */

    //Patttern12
    /*
    float barX = step(0.4 , mod(vUv.x * 10.0 , 1.0));
    barX *= step(0.8 , mod(vUv.y * 10.0 + 0.2, 1.0));

    float barY = step(0.8 , mod(vUv.x * 10.0 + 0.2, 1.0));
    barY  *= step(0.4 , mod(vUv.y * 10.0 , 1.0));

    float strength = barX + barY ;

    gl_FragColor = vec4(strength ,strength,strength, 1.0);
    */

    //Pattern 13

    // float strength = abs(Xstrength - 0.5);
    // gl_FragColor = vec4( strength,strength,strength, 1.0);

    //Pattern 14
/*
    Xstrength = abs(Xstrength - 0.5);
    Ystrength = abs(Ystrength - 0.5);

    float strength = min(Xstrength , Ystrength);

    gl_FragColor = vec4( strength,strength,strength, 1.0);
*/

    //Pattern 15
/*
    Xstrength = abs(Xstrength - 0.5);
    Ystrength = abs(Ystrength - 0.5);

    float strength = max(Xstrength , Ystrength);

    gl_FragColor = vec4( strength,strength,strength, 1.0);
*/

    //Pattern 16
/*
    Xstrength = abs(Xstrength - 0.5);
    Ystrength = abs(Ystrength - 0.5);
    float strength = step( 0.2  ,  max(Xstrength , Ystrength));

    gl_FragColor = vec4( strength,strength,strength, 1.0);
*/

    //Pattern 17
/*
    float strength = floor(( Xstrength * 10.0 )) / 10.0;

    gl_FragColor = vec4( strength,strength,strength, 1.0);
*/


    //Pattern 18
/*
    float strength = floor(( Xstrength * 10.0 )) / 10.0 * floor(( Ystrength * 10.0 )) / 10.0;

    gl_FragColor = vec4( strength,strength,strength, 1.0);
*/

    //Pattern 19
/*
    float strength = random(vUv);

    gl_FragColor = vec4( strength,strength,strength, 1.0);
*/

    //Pattern 20
/*
    vec2 lightUv = vec2( vUv.x * 0.1 + 0.45 , vUv.y * 0.5 + 0.25);
    float strength = 0.015 / distance(lightUv , vec2(0.5));

    gl_FragColor = vec4( strength,strength,strength, 1.0);
*/

    //Pattern 21
/*
    vec2 lightUvX = vec2( vUv.x * 0.1 + 0.45 , vUv.y * 0.5 + 0.25);
    float lightX = 0.015 / distance(lightUvX , vec2(0.5));

    vec2 lightUvY = vec2( vUv.y * 0.1 + 0.45 , vUv.x * 0.5 + 0.25);
    float lightY = 0.015 / distance(lightUvY , vec2(0.5));

    float strength = lightX * lightY;

    gl_FragColor = vec4( strength,strength,strength, 1.0);
*/

   //Pattern 22
/*
    float strength = 1.0 - step(0.01 , abs(distance(vUv , vec2(0.5)) - 0.25));

    gl_FragColor = vec4( strength,strength,strength, 1.0);
*/

   //Pattern 23
/*
    vec2 waveUv = vec2(
        vUv.x,
        vUv.y + sin(vUv.x * 30.0) * 0.1
    );

    float strength = 1.0 - step(0.01 , abs(distance(waveUv , vec2(0.5)) - 0.25));

    gl_FragColor = vec4( strength,strength,strength, 1.0);
*/

   //Pattern 24
/*
    vec2 waveUv = vec2(
        vUv.x + sin(vUv.y * 30.0) * 0.1,
        vUv.y + sin(vUv.x * 30.0) * 0.1
    );

    float strength = 1.0 - step(0.01 , abs(distance(waveUv , vec2(0.5)) - 0.25));

    gl_FragColor = vec4( strength,strength,strength, 1.0);
*/

    //Pattern 25
    

}