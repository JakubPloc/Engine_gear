import "./styles.css"; // keep this here!

// naimportujte vše co je potřeba z BabylonJS
import {
  Engine,
  Scene,
  UniversalCamera,
  MeshBuilder,
  StandardMaterial,
  DirectionalLight,
  Vector3,
  Axis,
  Space,
  SceneLoader,
  DeviceOrientationCamera
} from "@babylonjs/core";
import "@babylonjs/inspector";

//canvas je grafické okno, to rozáhneme přes obrazovku
const canvas = document.getElementById("renderCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const engine = new Engine(canvas, true);

//scéna neměnit
var scene = new Scene(engine);
// Default Environment

//vytoření kamery v pozici
const camera = new DeviceOrientationCamera(
  "kamera",
  new Vector3(1000, 1000, 0),
  scene
);

//zaměřit kameru do středu
camera.setTarget(new Vector3(0, 1, 0));

//spojení kamery a grafikcého okna
camera.attachControl(canvas, true);

//světlo
const light1 = new DirectionalLight(
  "DirectionalLight",
  new Vector3(-1, -1, -1),
  scene
);

var motor = MeshBuilder.CreateCylinder("motor", { diameter: 0.00001 });
SceneLoader.ImportMesh("", "public/", "Engine_G.obj", scene, function (
  noveModely
) {
  motor = noveModely[0];
  motor.scaling = new Vector3(1, 1, 1);
});

var gear = MeshBuilder.CreateCylinder("gear", { diameter: 0.00001 });
SceneLoader.ImportMesh("", "public/", "Gear.obj", scene, function (
  noveModely2
) {
  gear = noveModely2[0];
  gear.scaling = new Vector3(1, 1, 1);
});
//animace
scene.registerAfterRender(function () {
  gear.rotate(Axis.X, Space.WORLD);
});

// povinné vykreslování
engine.runRenderLoop(function () {
  scene.render();
});
const environment1 = scene.createDefaultEnvironment({
  enableGroundShadow: true
});
// zde uděláme VR prostředí
const xrHelper = scene.createDefaultXRExperienceAsync({
  // define floor meshes
  floorMeshes: [environment1.ground]
});
