import '../src/style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import gsap from 'gsap'
// import * as dat from 'dat.gui'
import { Object3D } from 'three'
import TWEEN from '@tweenjs/tween.js'
import { InteractionManager } from 'three.interactive';
import GUI from 'lil-gui';





// Ellipse class, which extends the virtual base class Curve
function Ellipse( xRadius, yRadius ) {
	new THREE.EllipseCurve( this );
    // let curve = new THREE.Curve.call(this)
	// add radius as a property
	this.xRadius = xRadius;
	this.yRadius = yRadius;
	}

Ellipse.prototype = Object.create( THREE.Curve.prototype );
	Ellipse.prototype.constructor = Ellipse;

	// define the getPoint function for the subClass
	Ellipse.prototype.getPoint = function ( t ) {

		var radians = 2 * Math.PI * t;

		return new THREE.Vector3( this.xRadius * Math.cos( radians ),
								0,
								this.yRadius * Math.sin( radians ) );

	};

/**
 * GET DATA FROM GSHEETS FIRST
 */

/**
 *                                  USING 2D ARRAYS INSTEAD OF ARRAY OF OBJECTS
 */
/**                         column
 *               index      name_participant       char_wanted       totalScore       totalFruits       totalPreach     totalPreach_mean        bonus
 *     rows                     shane               1                   5000                5               878         112                     444
 *
 *      rows                 AND SO ON....
 *               
 *               
 *               
 *               
 */
let gs_data2threejs =[[]]; //TWO DIMENSIONAL ARRAY

var mixer_total;
var loader2 = new GLTFLoader();
let modelGlb=[];
let always_Zero=[];     // WE WANT DIFFERENT VARS WITH 0 VALUE INSIDE THE ORBIT FUNCTION, ARRAY WULD BE GOOD
  

let abc=[];
const mixers = [];

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// renderer.setClearColor(0x131A3D, 1);


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}












/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(90, sizes.width / sizes.height, 1, 2000)
scene.add(camera)
camera.position.set(0, 15, 1000)


const interactionManager = new InteractionManager(
    renderer,
    camera,
    renderer.domElement
  );
//   https://lil-gui.georgealways.com/#Guide#Installation
  const gui = new GUI({
    closeFolders : true,
    autoPlace: true, //autoPlace - Adds the GUI to document.body and fixes it to the top right of the page.
    title: 'Participants',

    

}); 
   

  var a_br_folder = gui.addFolder('Adult Brothers');
  var a_sis_folder = gui.addFolder('Adult Sisters');
  var y_br_folder = gui.addFolder('Youth & Stud. Brothers');
  var y_sis_folder = gui.addFolder('Youth & Stud. Sisters');

  var a_br_folder_group1 = a_br_folder.addFolder('Group1');
  var a_br_folder_group2 = a_br_folder.addFolder('Group2');
  var a_sis_folder_group1 = a_sis_folder.addFolder('Group1');
  var a_sis_folder_group2 = a_sis_folder.addFolder('Group2');
  var a_sis_folder_group3 = a_sis_folder.addFolder('Group3');
//   var y_br_folder_group2 = a_br_folder.addFolder('Group2');

// var gui2 = new guify({
//     title: "Some Title",
// });









            function onComplete(allData){ // When the code completes, do this
                
                    allData = allData.replace(/[""]+/g,'"'); //dont' know why data has extra ""  so remove them
                    allData = allData.replace('"[{','[{'); //dont' know why data has extra ["  so remove them
                    allData = allData.replace('}]"','}]');     
                    // console.log(allData);    
                    var sheet_arrayObject = JSON.parse(allData);
                    // console.log(sheet_arrayObject);
/**
 * 
 *                  NOW HERE YOU CAN ACCESS THE DATA WITH 
 *                      myobje[i].id
 * 
 */

                 
                 // myobje.map(x => console.log(x.Id)); to loop it through                     
               
             
                    var participants = Object.keys(sheet_arrayObject).length;
                        console.log(participants);
              
                            const forLoop = async _ => {
                                console.log("Start");
                                
                               for (let index = 0; index < participants; index++) {
                                var tempsheetObject = sheet_arrayObject[index]
                                const numFruit = await myPromise(tempsheetObject);
                                console.log(numFruit);
                                }
                                
                               console.log("End");
                               
                               };
                               forLoop();


                           
                        // }

                    //   var  str = JSON.stringify(modelGlb[2]);
                    //     str = JSON.stringify(modelGlb[2], null, 4); // (Optional) beautiful indented output.
                    //     console.log(str);
                // console.log(result)

            }

            let model_OrbitPath =[];
            



/**
 * 
 *                          A PROMISE FUNCTION DECLARATION HERE
 */

            const myPromise = tempsheetObject => {
                // Perform some asynchronous operation
                // If the operation is successful, call the resolve function with the result
                // If the operation fails, call the reject function with the error
                var all_models = [ //['number','name','url','scale','pos.x','pos.y','rot.x','rot.y','rot.z','object with X and Y exchnge?'] IF true THEN SCORE SHOULD BE pos.x
                ['1','Boeing',          './assets/glb/low-size/boeing_787_dreamliner.glb',  '0.4', '1', '1','0','4.2','0','false'],  
                ['2','Carton Plane',    "./assets/glb/low-size/cartoon_plane.glb",          '4', '300','1','0','4.2','0','false'],
                ['3','Sop Wit',         './assets/glb/low-size/sopup.glb',                  '4','-700','1','0','5.2','0','false'],
                ['4','FlyingBird',      './assets/glb/low-size/flying_bird.glb',           '30','-900','1','0','4.2','0','false'],
                ['5','Butterfly',       './assets/glb/low-size/animated_butterfly.glb',     '4', '400','1','0','4.2','0','false'],
                ['6','SimpleBird',      './assets/glb/low-size/simple_bird.glb',            '3','-200','1','0','1.5','0','false'], 
                ['7','LowPolyBird',     './assets/glb/low-size/low_poly_bird_animated.glb', '4', '500','1','0','4.6','0','false'], 
                ['8','LowPolyHumming',  './assets/glb/low-size/lowpoly_humming-bird.glb',   '4', '1','9','0','4.2','0','true'], 
                ['9','BirdFlig',        './assets/glb/low-size/bird_flight_animation.glb',  '0.4', '1','9','0','4.2','0','true'],
                ['10','Bird',           './assets/glb/low-size/bird.glb',                   '0.8', '1','9','0','4.2','0','true'],
                ['11','Butterfly Tsar', './assets/glb/low-size/butterfly_tsar.glb',         '0.1', '-160','9','0','6.6','0','true'],
                ['12','LowPolyEagle',   './assets/glb/low-size/low_poly_eagle.glb',         '0.9', '100','9','0','4.7','0','true'],
                ['13','stylized ww1 Plane','./assets/glb/low-size/stylized_ww1_plane.glb',  '5', '100','9','0','3.2','0','false'],
                ['14','Stylized Plane', './assets/glb/low-size/stylized_airplane.glb',      '0.1', '-300','9','0','4.2','0','false'],
                ['15','Star sparrow Spaces','./assets/glb/low-size/spaceship.glb',          '0.02', '1','9','0','4.2','0','false'],
                ['16','Pixel Plane',    './assets/glb/low-size/pixel_plane.glb',            '0.06', '-500','9','0','6.2','0','false'],
                
               
                ['19','Candy cruise',   './assets/glb/low-size/the_candy_cruiser.glb',      '0.09', '-800','90','0','4.2','0','false'],
                ['20','Ansaldo',        './assets/glb/low-size/ansaldo.glb',                '0.06', '-900','9','0','4.2','0','false'],//
                ['21','Dae Flying circus','./assets/glb/low-size/dae_flying_circus.glb',    '4', '-950','10','0','4.2','0','false']
                
                ];
                let search = tempsheetObject.character;         // desired character
                var arr = all_models.filter( function( el ) {   //to find the string in 2d array then return whole index
                    return !!~el.indexOf( search );                     // find the desired character in array
                } );
                var objectFilename = arr[0][2]; //url Of chosed Object ENABLE THIS !! already chosed the model with "return !!~el.indexof(search)"
                let objectscale = arr[0][3];    // arr is the selected model by user
                var i = tempsheetObject.Id;
                // console.log(tempsheetObject);
                // console.log('Model Name:: '+all_models[i][1]);
                
                // let objectPos_X = all_models[i][4];
                // let objectPos_Y = all_models[i][5];
                // let objectRot_X = all_models[i][6];
                // let objectRot_Y = all_models[i][7];
                // let objectRot_Z = all_models[i][8];

                var actual_total_score = tempsheetObject.Total;

/**
 * ACCORDING TO GOOGLE SHEETS TOTAL IS 70000 AND MAX ZOOM OUT 3500 
 * WHICH IS 20X OF TOTAL SO 
 * WE HAVE TO DIVIDE THE TOTAL SCORE FROM 20 
 * BUT WHEN YOU SHOW THE SCORE IT SHOULD BE AS IT IS
 * 
 * NOW
 * X AND Y BOTH MOVE THE CHARACTER SO ONE SHOULD BE IN NEGATIVE AND ONE SHOULD BE POSITIVE WITH SAME VALUES
 */             let distance_travel_score_X = actual_total_score;
                let distance_travel_score_Z;
                let random_distance_Z;
                if(distance_travel_score_X<20){
                    distance_travel_score_X =  3500;
                    distance_travel_score_Z = -3500;    

                    }else{
                        distance_travel_score_X = distance_travel_score_X/20;
                        distance_travel_score_X = 3500-distance_travel_score_X;
                        distance_travel_score_Z = -Math.abs(distance_travel_score_X);
                        random_distance_Z       = randomGenerator(distance_travel_score_Z,distance_travel_score_X);

                        console.log("distance_travel_score for "+tempsheetObject.Participant+" and Y is: "+distance_travel_score_X+"   "+distance_travel_score_Z);
                    }


                var age_group = tempsheetObject.group;
                var name_participant = tempsheetObject.Participant;
               
              

               
                console.log('object File:: '+objectFilename);                                                          
                let modelGlb_source = [];
                modelGlb_source[i]= objectFilename;
                           
                                loader2.load(modelGlb_source[i],function(glb){
                                modelGlb [i]= glb.scene;
                                
                             
                               modelGlb[i].scale.set(objectscale,objectscale,objectscale);
                            //    modelGlb[i].rotateX(objectRot_X);
                            //    modelGlb[i].rotateY(objectRot_Y);
                            //    modelGlb[i].rotateZ(objectRot_Z);
                               modelGlb[i].position.set(distance_travel_score_X,objectPos_Y,distance_travel_score_Z); 
                                interactionManager.add(modelGlb[i]);
                                modelGlb[i].addEventListener('click', (event) => {
                                    var root = modelGlb[i];
                                            // compute the box that contains all the stuff
                                        // from root and below
                                        const box = new THREE.Box3().setFromObject(root);
                                        const boxSize = box.getSize(new THREE.Vector3()).length();
                                        const boxCenter = box.getCenter(new THREE.Vector3());
                                        console.log('interaction manager trig');
                                        // set the camera to frame the box
                                        frameArea(boxSize * 2, boxSize, boxCenter, camera,tempsheetObject);
                                });
                                
                                gsap.to( modelGlb[i].position, {
                                    duration: 9,
                                    y: 2,
                                    // z: 2.5 ,
                                    repeat: -1,
                                    yoyo: true,
                                    ease: 'power3.inOut'
                                });  
                                gsap.to( modelGlb[i].position,  {
                                    duration: 9,
                                    // y: -8,
                                    
                                    // yoyo: true,
                                    // repeat: 1,
                                    ease: 'power3.inOut'
                                });
                                modelGlb[i].rotateY(Math.PI)
                                scene.add(modelGlb[i]);
                                abc[i] = modelGlb[i].children[0];
                                const mixer = new THREE.AnimationMixer(abc[i]);
                                mixer.clipAction(glb.animations[0]).play();
                                mixers.push(mixer);
                                console.log(i)
                                model_OrbitPath[i] = new Ellipse( distance_travel_score_X, distance_travel_score_Z );
                                /**
                                 * ADD BUTTONS TO GUI
                                 */
                                
                                //for GUI
                                var camerOnClick = {
                                           [name_participant]: function () {
                                            //first collapse all folders
                                            gui.close(true);
                                           
                                             //remove box
                                            var container = document.querySelectorAll("container")[0];
                                            if(container != null)
                                            {console.log('not')
                                            document.querySelectorAll("container")[0].remove();}
                                            var root = modelGlb[i];
                                            // compute the box that contains all the stuff
                                            // from root and below
                                            const box = new THREE.Box3().setFromObject(root);
                                            const boxSize = box.getSize(new THREE.Vector3()).length();
                                            const boxCenter = box.getCenter(new THREE.Vector3());
                                            
                                            // set the camera to frame the box

                                            frameArea(boxSize * 2, boxSize, boxCenter, camera,tempsheetObject);
                                            
                                          }

                                };

                                //a var for orbit control
                                

                                 always_Zero[i] = 0;
   
                                    
                               console.log("age group is :"+age_group);
                                if(age_group==='Adult Brother1')
                                a_br_folder_group1.add(camerOnClick, name_participant );

                                else if(age_group==='Adult Brother2')
                                a_br_folder_group2.add(camerOnClick, name_participant);

                                else if(age_group==='Adult Sister1')
                                a_sis_folder_group1.add(camerOnClick, name_participant);

                                else if(age_group==='Adult Sister2')
                                a_sis_folder_group2.add(camerOnClick, name_participant);

                                else if(age_group==='Adult Sister3')
                                a_sis_folder_group3.add(camerOnClick, name_participant);

                                else if(age_group==='Youth Brother')
                                y_br_folder.add(camerOnClick, name_participant);
                                
                                else if(age_group==='Youth Sister')
                                y_sis_folder.add(camerOnClick, name_participant);

                                // collapse folder1
                                // folder1.close();


                            }); 
                            
                            // return resolve;
              };
              


//load sky map in background
              const loader = new THREE.CubeTextureLoader();
              const texture = loader.load([
                './assets/skyMap/skymap_posx_1024x1024.jpg',
                './assets/skyMap/skymap_negx_1024x1024.jpg',
                './assets/skyMap/skymap_posy_1024x1024.jpg',
                './assets/skyMap/skymap_negy_1024x1024.jpg',
                './assets/skyMap/skymap_posz_1024x1024.jpg',
                './assets/skyMap/skymap_negz_1024x1024.jpg',
                
                
              ]);
            //   scene.background.color)
              scene.background = texture;
                        
            // Set the texture to repeat horizontally and vertically
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;

            // Set the initial offset value
            var offset = new THREE.Vector2(0, 0);
              
            //   var skyGeo = new THREE.SphereGeometry(1000, 1000, 250); 
            //   var loaderTexture  = new THREE.TextureLoader(),
            //    texture2 = loaderTexture.load( "./assets/eso_milkyway.jpg" );
            //    var material = new THREE.MeshPhongMaterial({ 
            //     map: texture2,
            //    });
            //    var sky = new THREE.Mesh(skyGeo, material);
            //    sky.material.side = THREE.BackSide;
            //    scene.add(sky);
               
              
               
           
               
             
               
          
               
     















/***
 * NEW JERUSALEM IS HERE
 */
    
const loader22 = new GLTFLoader();
var galaxy,cinder_castle;
loader22.load('./assets/glb/castle.glb',function(glb){
    
    glb.scene.scale.set(0.4,0.4,0.4);
    glb.scene.position.set(1,1,1);
    glb.scene.rotateX('4.7');
    glb.scene.rotateY('0');
    glb.scene.rotateZ('0')
    galaxy= glb.scene;
   scene.add(galaxy);
},function(error){
    console.log("error");
});
var all_models = [ //['number','name','url','scale','pos.x','pos.y','rot.x','rot.y','rot.z','object with X and Y exchnge?'] IF true THEN SCORE SHOULD BE pos.x
['1','Boeing',          './assets/glb/low-size/boeing_787_dreamliner.glb',  '0.4', '1', '1','0','4.2','0','false'],  
['2','Carton Plane',    "./assets/glb/low-size/cartoon_plane.glb",          '4', '300','1','0','4.2','0','false'],
['3','Sop Wit',         './assets/glb/low-size/sopup.glb',                  '4','-700','1','0','5.2','0','false'],
['4','FlyingBird',      './assets/glb/low-size/flying_bird.glb',           '30','-900','1','0','4.2','0','false'],
['5','Butterfly',       './assets/glb/low-size/animated_butterfly.glb',     '4', '400','1','0','4.2','0','false'],
['6','SimpleBird',      './assets/glb/low-size/simple_bird.glb',            '3','-200','1','0','1.5','0','false'], 
['7','LowPolyBird',     './assets/glb/low-size/low_poly_bird_animated.glb', '4', '500','1','0','4.6','0','false'], 
['8','LowPolyHumming',  './assets/glb/low-size/lowpoly_humming-bird.glb',   '4', '1','9','0','4.2','0','true'], 
['9','BirdFlig',        './assets/glb/low-size/bird_flight_animation.glb',  '4', '1','9','0','4.2','0','true'],
['10','Bird',           './assets/glb/low-size/bird.glb',                   '0.8', '1','9','0','4.2','0','true'],
['11','Butterfly Tsar', './assets/glb/low-size/butterfly_tsar.glb',         '0.1', '-160','9','0','6.6','0','true'],
['12','LowPolyEagle',   './assets/glb/low-size/low_poly_eagle.glb',         '0.9', '100','9','0','4.7','0','true'],
['13','stylized ww1 Plane','./assets/glb/low-size/stylized_ww1_plane.glb',  '5', '100','9','0','3.2','0','false'],
['14','Stylized Plane', './assets/glb/low-size/stylized_airplane.glb',      '0.1', '-300','9','0','4.2','0','false'],
['15','Star sparrow Spaces','./assets/glb/low-size/spaceship.glb',          '0.05', '1','9','0','4.2','0','false'],
['16','Pixel Plane',    './assets/glb/low-size/pixel_plane.glb',            '0.06', '-500','9','0','6.2','0','false'],

['18','Plane with scene','./assets/glb/low-size/plane__stylized_scene.glb', '2', '-700','9','0','4.2','0','false'],
['19','Candy cruise',   './assets/glb/low-size/the_candy_cruiser.glb',      '0.09', '-800','90','0','4.2','0','false'],
['20','Ansaldo',        './assets/glb/low-size/ansaldo.glb',                '0.06', '-900','9','0','4.2','0','false'],//
['21','Dae Flying circus','./assets/glb/low-size/dae_flying_circus.glb',    '4', '-950','10','0','4.2','0','false']

];
// const axesHelper = new THREE.AxesHelper(2000 );
// scene.add( axesHelper );

let modelNumber = 19;
let objecturl = all_models[modelNumber][2];
console.log('Model Name:: '+all_models[modelNumber][1]);
let objectscale = all_models[modelNumber][3];
let objectPos_X = 1; //this should be in - of score but 0 in the end then it will reach the center
let objectPos_Y = all_models[modelNumber][5];
let objectRot_X = all_models[modelNumber][6];
let objectRot_Y = all_models[modelNumber][7];
let objectRot_Z = all_models[modelNumber][8];
let x_y_exchange = all_models[modelNumber][9];
// console.log('scale:'+objectscale+'  posx: '+objectPos_X+'  posy: '+objectPos_Y+'  rotateY: '+objectRot_Y+'  posx: ');

// const loader22 = new GLTFLoader();
// var obj;
// loader22.load(objecturl,function(glb){
    
//     glb.scene.scale.set(objectscale,objectscale,objectscale);
//     if (x_y_exchange.includes('false')){
//         glb.scene.position.set(objectPos_X,objectPos_Y,100); //last one is score
//         }else
//             {glb.scene.position.set(900,objectPos_Y,objectPos_X); //first one is score
//                 console.log('x_y_exchangef'); 
//             }
    
//     glb.scene.rotateX(objectRot_X);
//     glb.scene.rotateY(objectRot_Y);
//     glb.scene.rotateZ(objectRot_Z)
//     obj= glb.scene;
//    scene.add(obj);
// },function(error){
//     console.log("error occ");
// });















// loader2.load('/assets/glb/mew_-_flying.glb',function(glb){
    
//     mixer = new THREE.AnimationMixer(glb.scene);

//         const animationAction = mixer.clipAction(animations[0])
//         animationActions.push(animationAction)
//         animationsFolder.add(animations, 'default')
//         activeAction = animationActions[0]
    
//     cinder_castle= glb.scene;
//     // galaxy2.position.set(-140,-150,130);
//     cinder_castle.scale.set(0.1,0.1,0.1);
//     // galaxy2.scale.
//    scene.add(cinder_castle);
// },function(error){
//     console.log("error occ");
// });





function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera,tempsheetObject) {

    const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
    const halfFovY = THREE.MathUtils.degToRad(camera.fov * .5);
    const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
    // compute a unit vector that points in the direction the camera is now
    // in the xz plane from the center of the box
    const direction = (new THREE.Vector3())
      .subVectors(camera.position, boxCenter)
      .multiply(new THREE.Vector3(1, 0, 1))
      .normalize();
      camera.updateProjectionMatrix();
    // move the camera to a position distance units way from the center
    // in whatever direction the camera was from the center already
    // camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));

    // pick some near and far values for the frustum that
    // will contain the box.
    camera.near = boxSize / 200;
    camera.far = boxSize * 1000;
    // 
    var x = boxCenter.x+6;  // + to zoomout and - to zoom in
    var y = boxCenter.y;
    var z = boxCenter.z-10; //to cneter it
    
    // console.log('x:'+boxCenter.x+'\ny:'+boxCenter.y+'\nz:'+boxCenter.z);
    gsap.to( camera.position, {
        duration: 2, // seconds
        x: x,
        y: y,
        z: z,
        onUpdate: function() {
            controls.enabled = true;
            // controls.target = new THREE.Vector3(x, y, z);
            
         }
    } );
    
    gsap.to( camera.target, {
        duration: 2, // seconds
        x: x,
        y: y,
        z: z,
        onUpdate: function() {
            controls.enabled = true;
            controls.target = new THREE.Vector3(x, y, z);
            controls.update()
            
         }
    } );




    
    //  x = boxCenter.x;
    //  y = boxCenter.y;
     
    scoreBox_CSS(x,y,tempsheetObject);                       
    
    // point the camera to look at the center of the box
    // camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
  }

/***
 * 
 *                                  ADD SCORE BOX
 * 
 */
        function scoreBox_CSS (x,y,tempsheetObject){ // NOT USING X AND Y
            
            var parti_name  = tempsheetObject.Participant;
            var preach      = tempsheetObject.totalPreach;
            var m_Preach    = tempsheetObject.totalPreach_m;
            var bonus       = tempsheetObject.bonus;
            var total_score = tempsheetObject.Total;
            var elohim_aca  = (tempsheetObject.totalSign+tempsheetObject.chap_complete);

            var text2 = document.createElement('container');
            text2.style.position = 'absolute';
            //text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
            // text2.style.width = 100;
            text2.classList.add('animated-border-box-glow');
            text2.classList.add('animated-border-box');
            text2.classList.add('center-box');
           
            // text2.style.height = 100;
            // text2.style.backgroundColor = "blue";
            text2.innerHTML = "<p class='titles' > Name: <f class='score' style = 'alight-right:100%'>"+parti_name+"</f></p>";
            text2.innerHTML += "<p class='titles' > Preach: <f class='score' style = 'alight-right:100%'>"+preach+"</f></p>";
            text2.innerHTML += "<p class='titles' > M.Preach: <f class='score' style = 'alight-right:100%'>"+m_Preach+"</f></p>";
            text2.innerHTML += "<p class='titles' > Elohim Aca.: <f class='score' style = 'alight-right:100%'>"+elohim_aca+"</f></p>";
            text2.innerHTML += "<p class='titles' > Bonus: <f class='score' style = 'alight-right:100%'>"+bonus+"</f></p>";
            text2.innerHTML += "<p class='titles' > Total: <f class='score' style = 'alight-right:100%'>"+total_score+"</f></p>";
            
            text2.style.bottom = 0 + 'px';
            // text2.style.center = 0 + 'px';
            document.body.appendChild(text2);
            $("container").click(function(){
                //clicked on the box
                 //remove box
                 var container = document.querySelectorAll("container")[0];
                 if(container != null)
                 {console.log('not')
                 document.querySelectorAll("container")[0].remove();
                
                }
                });
        }

/**
 * Base 
 */

const planets = [
    {name: 'mercury', sizeRatio: 100/277, position: 15, rotation: 0.002},
    {name: 'venus', sizeRatio: 100/133, position: 20, rotation: 0.0075},
    {name: 'earth', sizeRatio: 100/103, position: 25, rotation: 0.0065},
    {name: 'mars', sizeRatio: 100/208, position: 30, rotation: 0.0025},
    {name: 'jupiter', sizeRatio: 30/9.68, position: 40, rotation: 0.0055},
    {name: 'saturn', sizeRatio: 30/11.4, position: 50, rotation: 0.004},
    {name: 'uranus', sizeRatio: 30/26.8, position: 60, rotation: 0.006},
    {name: 'neptune', sizeRatio: 30/27.7, position: 70, rotation: 0.003},
    // {name: 'galaxy', sizeRatio: 100/277, position: 75, rotation: 0.002},
]

// const orbitRadius = [15, 20, 25, 30, 40, 50, 60, 70]
const orbitRadius = [3500,3400,3300,3200,3000,2000,1000, 60, 70]
const orbitsObject3D = []
const planetsObject3D = []

/**
 * Objects
 */

//  const loader = new THREE.FontLoader(); 
//  let geometry;
//  loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {
 
//     geometry =  new THREE.TextGeometry( 'Three.js Solar System', {
//         font: font,
//         size: 80,
//         height: 20,
//         curveSegments: 12,
//         bevelEnabled: true,
//         bevelThickness: 10,
//         bevelSize: 8,
//         bevelOffset: 0,
//         bevelSegments: 5
//     } );
// } )

//  const textMesh = new THREE.Mesh(
//     geometry,
//     new THREE.MeshNormalMaterial()
// )
// scene.add(textMesh)
// textMesh.position.y = 20
// const textureLoader = new THREE.TextureLoader()

// scene.background = textureLoader.load('/textures/stars.jpg')

/**
 * AND HERE COMES THE GALAXY GLB
 */

//FOR floating stars
var sphereTab = [];

    for (var i = 0; i < 500; i++) {
        // randRadius = Math.random()*30+10;
       var lumiereS = new THREE.MeshPhongMaterial({
            emissive: '#C278F4'
        });
        sphereTab.push(new THREE.Mesh(new THREE.SphereGeometry(Math.random() * 2, 20, 20), lumiereS));
    }
    for (var i = 0; i < sphereTab.length; i++) {
        //where (x,y,z)
        sphereTab[i].position.set(Math.random() * 1200 - 500, Math.random() * 1200 - 500, Math.random() * 1200 - 500); 
  
        // console.log(Math.random() * 1200 - 500+" sdfsdfs");
        // sphereTab[i].position.set(2121,30,3121 );
        scene.add(sphereTab[i]);
    }
    
   


const orbitMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );

const saturnRing =  new THREE.Mesh(  new THREE.TorusGeometry( 5, 0.05, 16, 100), orbitMaterial );
saturnRing.rotateX( Math.PI/2.5)

const createPlanets = () => {
    
    planets.forEach((planet, index) => {
        const orbitGroup = new THREE.Group()
        const orbit = new THREE.Mesh(
            new THREE.TorusGeometry(orbitRadius[index], 0.05, 16, 100),
            orbitMaterial
        )
        
        // const texture = textureLoader.load(`/textures/${planet.name}.jpg`)
        // const planetObject = new THREE.Mesh( 
        //     new THREE.SphereGeometry( planet.sizeRatio, 32, 32 ),
        //     new THREE.MeshStandardMaterial({ map: texture}))

        // planetObject.position.x = planet.position

        // if(planet.name === 'saturn') {
        //     saturnRing.position.x = planet.position
        //     orbitGroup.add(saturnRing)
        // }
        orbitGroup.add(orbit)

        orbit.rotateZ(Math.PI /2)
        orbit.rotateY(Math.PI/2)
        orbitsObject3D.push(orbitGroup)
        // planetsObject3D.push(planetObject)
        scene.add(orbitGroup)
    })
}
const clock = new THREE.Clock();
createPlanets();


const ambientLight = new THREE.AmbientLight( '#696969' ); // soft white light

const hemisphereLight = new THREE.HemisphereLight( '#4b88c2', '#cacaca', 1 );

scene.add( ambientLight, hemisphereLight)

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.zoomSpeed = 0.5
// controls.minZoom = 200
controls.minDistance = 70
controls.maxDistance =5000

// const axesHelper = new THREE.AxesHelper(20);
// scene.add(axesHelper)

/**
 * Debug
 */



/**
 * Animate
 */

const rotateAround = 2 * Math.PI * (1/60) * (1/60);
  //score will be here as this is the orbit distance 

  


var axis = new THREE.Vector3( );
var up = new THREE.Vector3( 0, 1, 0 );
var revolveSpeed = {
    speedx1:0.000001, speedx2:0.000002, speedx3:0.000003, speedx4:0.000004, speedx5:0.000005, speedx6:0.000006, speedx7:0.000007,
};

const tick = () =>
{   //interaction manager
    interactionManager.update();

    const delta = clock.getDelta();
    mixers.forEach(function(mixer) {
        mixer.update(delta);
    });
    // if ( mixer[1] ) mixer[1].update( delta );
    modelGlb.forEach(function (model,index){
        // var pt = model_OrbitPath[index].getPoint( eat );
        // var tangent = model_OrbitPath[index].getTangent( eat ).normalize();
        // modelGlb[index].position.set(pt.x,pt.y,pt.z);
        // // calculate the axis to rotate around
        // axis.crossVectors( up, tangent ).normalize();
        // // calcluate the angle between the up vector and the tangent
        // var radians = Math.acos( up.dot( tangent ) );	
        
        if(index<10 && index>=0)
            {if(index % 2 == 0)
                {orbit_around_circle(index,revolveSpeed.speedx1/2); }
             else
                {orbit_around_circle(index,revolveSpeed.speedx6/2); }
            }
        else if(index<16 && index>=10)
            {if(index % 2 == 0)
                {orbit_around_circle(index,revolveSpeed.speedx4/2); }
            else{orbit_around_circle(index,revolveSpeed.speedx5/2);}
            }
        else if(index<30 && index>=16)
            {if(index % 2 == 0)
                {orbit_around_circle(index,revolveSpeed.speedx6/2); }
            else{orbit_around_circle(index,revolveSpeed.speedx7/2);}
            }
        else if(index<50 && index>=30)
            {if(index % 2 == 0)
                {orbit_around_circle(index,revolveSpeed.speedx2/2);  }
            else{orbit_around_circle(index,revolveSpeed.speedx3/2);}
            }
        else  
            orbit_around_circle(index,revolveSpeed.speedx6/2);  

               
        
             // speed of the orbit // the nearer they are the faster they get
            
            
    });

   


    
    // if ( mixer[2] ) mixer[2].update( delta );
    // if ( mixer[0] ) mixer[0].update( delta );
    // if ( mixer[3] ) mixer[3].update( delta );

    var timer = 0.00001 * Date.now();
    for (var i = 0, il = sphereTab.length; i < il; i++) {
        var sfere = sphereTab[i];
        sfere.position.x = 400 * Math.sin(timer + i);
        sfere.position.z = 400 * Math.sin(timer + i * 1.1);
    }

    // var axis = new THREE.Vector3(0, 1, 0).normalize();
    // if (galaxy) sun.rotateOnAxis(axis,0.01)

    //rotate the scene.background
    offset.x +=0.01;
    texture.offset = offset;
    // console.log(offset.x,offset.y);

    orbitsObject3D.forEach((group, index) => {
        group.rotation.y += planets[index].rotation
    })

    planetsObject3D.forEach((planet, index) => {
        planet.rotation.y += planets[index].rotation
    })
    
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()



function orbit_around_circle(index,speed){
    // let always_0 = always_Zero[index];
    var pt = model_OrbitPath[index].getPoint( always_Zero[index] );
    var tangent = model_OrbitPath[index].getTangent( always_Zero[index] ).normalize();
    modelGlb[index].position.set(pt.x,pt.y,pt.z);
    // calculate the axis to rotate around
    axis.crossVectors( up, tangent ).normalize();
    // calcluate the angle between the up vector and the tangent
    var radians = Math.acos( up.dot( tangent ) );	
    always_Zero[index] = (always_Zero[index] >= 1) ? 0 : always_Zero[index] += speed;
}














loadData()
function loadData (){
    let result;
    // ========================================================================================================================================================================================
    let url ="https://docs.google.com/spreadsheets/d/e/2PACX-1vQidY8rz1hBWMGH3hfskku6TDrqHKxLSCAwDiCV2lmmw-Ec5BDdycbwEvfDu5pKtKf45OeGQ81C7M3q/pub?gid=1245805841&single=true&output=csv&range=U2"          
                  fetch(url) 
                  .then(response => response.text())
                  .then(text => { //what to do with result?
                   result = text; 
                   onComplete(result);
                }); 
                }

  function getAllData(allData)
        {   allData = allData.replace(/[""]+/g,'"'); //dont' know why data has extra ""  so remove them
        allData = allData.replace('"[{','[{'); //dont' know why data has extra ["  so remove them
        allData = allData.replace('}]"','}]'); 
        
            var myobje = JSON.parse(allData);
            console.log(myobje[1].Id);
            // myobje.map(x => console.log(x.Id)); to loop it through                     
            
        }              
       





      function Listener(listener, mesh, callback) {
                        let objects = [mesh];
                        let raycaster = new THREE.Raycaster();
                        let mouse = { x: 0, y: 0 };
                        renderer.domElement.addEventListener(listener, raycast, false);
                        function raycast(e) {
                            mouse.x = (e.clientX / renderer.domElement.clientWidth) * 2 - 1;
                            mouse.y = -(e.clientY / renderer.domElement.clientHeight) * 2 + 1;
                            raycaster.setFromCamera(mouse, camera);
                            let intersects = raycaster.intersectObjects(scene.children, true);
                            let intersect = intersects[0];
                           //Click anywhere outside of object to leave focus
                        //    console.log(intersects[0].object);

                            var clickedit = 1;

                        document.body.addEventListener('click', function( event ){
                           //this will work in mobile only
                           clickedit = clickedit + 1; //handle multiple clicks but proceed only once
                           console.log(clickedit);
                          var isMesh;
                            // console.log(intersects[0].object.type)
                            try {
                                isMesh = intersects[0].object.type;
                                console.log(isMesh);
                            } catch (error) {
                                isMesh = 'no';
                                console.log(isMesh);
                            }
                            if ( isMesh !== 'Mesh' && clickedit == 2 ) {
                               
                                gsap.to( camera.position, {
                                    duration: 1, // seconds
                                    x: 10,
                                    y: 40,
                                    z: 80,
                                    onUpdate: function() {
                                        controls.enabled = true;
                                        console.log('clicked outside\n remove textbox');
                                        //center the new Jerusalem
                                        controls.target = new THREE.Vector3(0, 10, 0);
                                        controls.update();
                                        //remove box
                                        var container = document.querySelectorAll("container")[0];
                                        if(container != null)
                                        {console.log('not')
                                        document.querySelectorAll("container")[0].remove();}
                                    }
                                } );
                               
                            } else{
                               
                               
                            }
                        });
                         
                       
                                }
                    }
                    // for (let i = 0; i < scene.children.length; i++) {
                        Listener('click', scene.children[i], (e, intersect) => {
                            let object = intersect.object;
                            alert('clicked : notice 1')
                            if (object.name === 'Cone') {
                                openNav();
                            }else{ alert('clicked : notice 2')
                                
                            }
                        });
                    // }



// a simple random function
                    function randomGenerator(min, max) {
                        return Math.floor(Math.random() * (max - min) ) + min;
                      }

