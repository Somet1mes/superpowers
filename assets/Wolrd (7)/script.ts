class WolrdBehavior extends Sup.Behavior {
  
  world: IWorldObject[] = [];
  player = new PlayerVehicle();
  cameraManActor = new Sup.Actor("Camera Man");
  physicsEng = new PhysicsEngine();
  
  awake() {

    this.world.push(this.player);
    this.world = this.world.concat(CreateGround());

    new Sup.Camera(this.cameraManActor);
    this.cameraManActor.setPosition(0, 0, 100);
  }

  update() {
    //this.cameraManActor.setPosition(0,0,this.cameraManActor.getPosition().z + 0.01);
    
    this.world.forEach(function (worldObject) {worldObject.update()});
    
    this.physicsEng.update(this.world);
    
  }
}
Sup.registerBehavior(WolrdBehavior);
