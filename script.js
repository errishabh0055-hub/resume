AOS.init({
duration:1200,
once:true
});


/* Skill Chart */

const ctx=document.getElementById('skillChart');

new Chart(ctx,{

type:'radar',

data:{
labels:['Python','SQL','Power BI','Excel','EDA','Data Cleaning'],

datasets:[{
label:'Skill Level',
data:[90,85,88,80,84,86],
backgroundColor:'rgba(0,113,227,0.2)',
borderColor:'#0071e3'
}]
}

});


/* 3D HERO ANIMATION */

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({alpha:true});

renderer.setSize(window.innerWidth,window.innerHeight);

document.getElementById("hero3d").appendChild(renderer.domElement);

const geometry = new THREE.TorusGeometry(5,1.5,16,100);

const material = new THREE.MeshStandardMaterial({
color:0x0071e3,
wireframe:true
});

const torus = new THREE.Mesh(geometry,material);

scene.add(torus);

const light = new THREE.PointLight(0xffffff,1);

light.position.set(20,20,20);

scene.add(light);

camera.position.z = 15;

function animate(){

requestAnimationFrame(animate);

torus.rotation.x += 0.01;
torus.rotation.y += 0.01;

renderer.render(scene,camera);

}

animate();