import {
  Engine,
  Scene,
  FreeCamera,
  Light,
  Vector3,
  HemisphericLight,
  MeshBuilder,
} from 'babylonjs';
import 'babylonjs-loaders';

export default class App {
  private canvas: HTMLCanvasElement;
  private engine: Engine;
  private scene: Scene | undefined;
  private camera: FreeCamera | undefined;
  private light: Light | undefined;

  constructor() {
    // Create canvas and engine
    this.canvas = this.createCanvas();
    this.engine = new Engine(this.canvas, true);
    this.scene = undefined;
    this.camera = undefined;
    this.light = undefined;

    // Resize canvas to window size on load.
    window.onload = () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    };
    // Listen for browser/canvas resize events
    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.engine.resize();
    });

    this.createScene();
  }

  private createCanvas(): HTMLCanvasElement {
    const _canvas: HTMLCanvasElement = document.createElement('canvas');

    //create the canvas html element and attach it to the webpage
    _canvas.id = 'gameCanvas';
    document.body.appendChild(_canvas);

    return _canvas;
  }

  private createScene(): void {
    // Create a scene
    this.scene = new Scene(this.engine);
    // Create a camera
    this.camera = new FreeCamera(
      'freeCamera',
      new Vector3(-10, 5, 3),
      this.scene
    );
    // Attach the camera to the canvas, this allows us to give input to the camera.
    this.camera.attachControl(this.canvas, false);
    // Point camera at origin.
    this.camera.setTarget(new Vector3(0, 0, 0));
    // Create a light for the scene.
    this.light = new HemisphericLight(
      'skyLight',
      new Vector3(0, 1, 0),
      this.scene
    );
    // Create sphere shape and place it above ground
    const sphere = MeshBuilder.CreateSphere(
      'sphere',
      { segments: 16, diameter: 2 },
      this.scene
    );
    const ground = MeshBuilder.CreateGround(
      'groundPlane',
      { width: 6, height: 6, subdivisions: 2 },
      this.scene
    );

    // Game loop
    this.engine.runRenderLoop(() => {
      this.scene?.render();
    });
  }
}
