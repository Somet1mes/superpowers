class WolrdBehavior extends Sup.Behavior {
  
  world: IWorldObject[] = [];
  cameraManActor = new Sup.Actor("Camera Man");
  player = new PlayerVehicle(this.cameraManActor);
  menu: Menu;
  menuActor = new Sup.Actor("Menu");
  menuSpriteRenderer: Sup.SpriteRenderer;
  currentMoney = 10;
  
  physicsEng = new PhysicsEngine();
  
  awake() {

    this.world.push(this.player);
    this.world = this.world.concat(CreateGround());

    this.menu = new Menu(this.menuActor);
    this.menuSpriteRenderer = new Sup.SpriteRenderer(this.menuActor, "MenuStuff/Menu2");
    this.menuActor.setPosition(0,0,1);
    
    new Sup.Camera(this.cameraManActor);
  }

  update() {
    this.cameraManActor.setPosition(this.player.GetPosition().x,this.player.GetPosition().y,50);
    this.menuActor.setPosition(this.player.GetPosition().x,this.player.GetPosition().y,1);
    
    this.world.forEach(function (worldObject) {worldObject.update()});
    
    this.physicsEng.update(this.world);
    
    if (this.menuActor.getVisible())
      {
        this.UpdateMenu();
      }
  }
  
  UpdateMenu()
  {
    this.menu.update(this.actor);
    
    if (Sup.Input.wasMouseButtonJustReleased(0))
      {
        let ray = new Sup.Math.Ray();    
        ray.setFromCamera(this.cameraManActor.camera, Sup.Input.getMousePosition());
        let hits = ray.intersectActors(this.menu.GetActors());

        // The hits are sorted by distance from closest to farthest
        for (let hit of hits) {
          Sup.log(`Actor ${hit.actor.getName()} was hit by ray at ${hit.distance}`);
          // The `hit` object also has the point coordinates and normal of the hit
          switch (hit.actor.getName())
            {
              case "ContinueButton":
                this.menuActor.setVisible(false);
            }
        }
      }
  }
}
Sup.registerBehavior(WolrdBehavior);
