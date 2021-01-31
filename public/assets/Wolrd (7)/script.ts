class WolrdBehavior extends Sup.Behavior {
  
  world: IWorldObject[] = [];
  backGroundActor = new Sup.Actor("Background");
  textActor = new Sup.Actor("text");
  cameraManActor = new Sup.Actor("Camera Man");
  menu: Menu;
  menuActor = new Sup.Actor("Menu");
  menuSpriteRenderer: Sup.SpriteRenderer;
  player = new PlayerVehicle(this.cameraManActor, this.menuActor);
  wasMenuVisibleLastTick = true;
  width = 1500;
  height = 500;
  
  day = 0;
  currentMoney = 0;
  lostPeopleEnslaved = 0;
  fuelLevel = 0;
  fuelLevelCost = 4;
  
  engineLevel = 0;
  engineLevelCost = 5;
  
  accLevel = 0;
  accLevelCost = 5;
  
  turningLevel = 0;
  turningLevelCost = 15;
  
  physicsEng = new PhysicsEngine();
  
  awake() {
    Sup.log("awake");
    let sr = new Sup.SpriteRenderer(this.backGroundActor, "BackgroundTexture");
    this.backGroundActor.setPosition(0,0,-0.01);
    sr = new Sup.SpriteRenderer(this.textActor, "text");
    this.textActor.setPosition(0,0,1.01);
    
    this.world.push(this.player);
    this.world = this.world.concat(CreateGround());
    this.world = this.world.concat(CreatePeople(this.width, this.height, 100));

    this.menu = new Menu(this.menuActor);
    this.menuSpriteRenderer = new Sup.SpriteRenderer(this.menuActor, "MenuStuff/Menu2");
    this.menuActor.setPosition(0,0,1);
    
    new Sup.Camera(this.cameraManActor);
  }

  update() {
    if (Sup.Input.wasMouseButtonJustReleased(0))
      {
        this.textActor.setVisible(false);
      }
    
    this.cameraManActor.setPosition(this.player.GetPosition().x,this.player.GetPosition().y,50);
    this.menuActor.setPosition(this.player.GetPosition().x,this.player.GetPosition().y,1);
    this.textActor.setPosition(this.player.GetPosition().x,this.player.GetPosition().y,35);
    
    this.world.forEach(function (worldObject) {worldObject.update()});
    
    let peopleToBeRemoved = this.physicsEng.update(this.world);
    this.lostPeopleEnslaved += peopleToBeRemoved.length;
    
    for (var i = 0; i < peopleToBeRemoved.length; i++)
      {
        this.world[peopleToBeRemoved[i]].GetActor().destroy();
        this.world.splice(peopleToBeRemoved[i], 1);
      }
    
    if (this.menuActor.getVisible() && !this.wasMenuVisibleLastTick)
      {
        this.NewDay();
      }
    this.wasMenuVisibleLastTick = this.menuActor.getVisible();
    
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
                this.player.Reset();
                this.menuActor.setVisible(false);
                break;
              case "BuyMoreFuelButton":
                this.BuyMoreFuel(hit.actor);
                break;
              case "BuyMoreEngineButton":
                this.BuyMoreEngine(hit.actor);
                break;
              case "BuyMoreAccelerationButton":
                this.BuyMoreAcc(hit.actor);
                break;
              case "BuyMoreTurningButton":
                this.BuyMoreTurning(hit.actor);
                break;
            }
        }
      }
  }
  
  NewDay()
  {
    this.currentMoney += this.lostPeopleEnslaved;
    this.day++;
    this.world = this.world.concat(CreatePeople(this.width, this.height, this.day));
  }
  
  BuyMoreFuel(buttonActor: Sup.Actor)
  {
    if (this.currentMoney >= this.fuelLevelCost)
      {
        this.fuelLevel++;
        this.currentMoney -= this.fuelLevelCost;
        switch (this.fuelLevel)
          {
            case 1:
              this.player.maxFuel = 500;
              this.fuelLevelCost = 10;
              buttonActor.textRenderer.setText("Extend Primary Fuel Tank. " + this.fuelLevelCost + " d");
              break;
            case 2:
              this.player.maxFuel = 700;
              this.fuelLevelCost = 15;
              buttonActor.textRenderer.setText("Extend Secondary Fuel Tank. " + this.fuelLevelCost + " d");
              break;
            case 3:
              this.player.maxFuel = 1000;
              this.fuelLevelCost = 30;
              buttonActor.textRenderer.setText("Extend Both Fuel Tanks. " + this.fuelLevelCost + " d");
              break;
            case 4:
              this.player.maxFuel = 1200;
              this.fuelLevelCost = 50;
              buttonActor.textRenderer.setText("Make A Third Fuel Tank " + this.fuelLevelCost + " d");
              break;
            case 5:
              this.player.maxFuel = 1400;
              this.fuelLevelCost = 80;
              buttonActor.textRenderer.setText("Extend The Third Tank. " + this.fuelLevelCost + " d");
              break;
            default:
              this.player.maxFuel = 1500 + Math.floor((this.fuelLevel * 20) **1.3);
              this.fuelLevelCost = 80 + Math.floor((this.fuelLevel * 2) **1.3);
              buttonActor.textRenderer.setText("Why not just make even more tanks? " + this.fuelLevelCost + " d");
              break;
          }
      }
  }
  
  BuyMoreEngine(buttonActor: Sup.Actor)
  {
    if (this.currentMoney >= this.engineLevelCost)
      {
        this.engineLevel++;
        this.currentMoney -= this.engineLevelCost;
        switch (this.engineLevel)
          {
            case 1:
              this.player.maxPropellerForce = 15000;
              this.engineLevelCost = 15;
              buttonActor.textRenderer.setText("Upgrade to V8 engine" + this.engineLevelCost + " d");
              break;
            case 2:
              this.player.maxPropellerForce = 20000;
              this.engineLevelCost = 30;
              buttonActor.textRenderer.setText("Add turbo charger" + this.engineLevelCost + " d");
              break;
            case 3:
              this.player.maxPropellerForce = 25000;
              this.engineLevelCost = 50;
              buttonActor.textRenderer.setText("Make the engine bigger" + this.engineLevelCost + " d");
              break;
            case 4:
              this.player.maxPropellerForce = 30000;
              this.engineLevelCost = 80;
              buttonActor.textRenderer.setText("Upgrade to V12 engine" + this.engineLevelCost + " d");
              break;
            case 5:
              this.player.maxPropellerForce = 35000;
              this.engineLevelCost = 110;
              buttonActor.textRenderer.setText("Research better engine tech" + this.engineLevelCost + " d");
              break;
            default:
              this.player.maxPropellerForce = 35000 + Math.floor((this.engineLevel * 500) **1.3);
              this.engineLevelCost = 110 + Math.floor((this.engineLevel * 2.4) **1.3);
              buttonActor.textRenderer.setText("Research unrealistic engine tech " + this.engineLevelCost + " d");
              break;
          }
      }
  }
  
  BuyMoreAcc(buttonActor: Sup.Actor)
  {
    if (this.currentMoney >= this.accLevelCost)
      {
        this.accLevel++;
        this.currentMoney -= this.accLevelCost;
        switch (this.accLevel)
          {
            case 1:
              this.player.propellerForceIncrement += this.player.maxPropellerForce / 800;
              this.accLevelCost = 20;
              buttonActor.textRenderer.setText("Tune Engine. " + this.accLevelCost + " d");
              break;
            case 2:
              this.player.propellerForceIncrement += this.player.maxPropellerForce / 750;
              this.accLevelCost = 30;
              buttonActor.textRenderer.setText("Tune Engine more. " + this.accLevelCost + " d");
              break;
            case 3:
              this.player.propellerForceIncrement += this.player.maxPropellerForce / 700;
              this.accLevelCost = 40;
              buttonActor.textRenderer.setText("Bigger accelerator pedal. " + this.accLevelCost + " d");
              break;
            case 4:
              this.player.propellerForceIncrement += this.player.maxPropellerForce / 650;
              this.accLevelCost = 50;
              buttonActor.textRenderer.setText("Tune accelerator pedal. " + this.accLevelCost + " d");
              break;
            case 5:
              this.player.propellerForceIncrement += this.player.maxPropellerForce / 600;
              this.accLevelCost = 90;
              buttonActor.textRenderer.setText("Use accelerator rockets. " + this.accLevelCost + " d");
              break;
            default:
              this.player.propellerForceIncrement += this.player.maxPropellerForce / 500;
              this.accLevelCost = 110 + Math.floor((this.accLevel * 2.6) **1.3);
              buttonActor.textRenderer.setText("Add more accelerator rockets. " + this.accLevelCost + " d");
              break;
          }
      }
  }
  
  BuyMoreTurning(buttonActor: Sup.Actor)
  {
    if (this.currentMoney >= this.turningLevelCost)
      {
        this.turningLevel++;
        this.currentMoney -= this.turningLevelCost;
        this.player.angleIncrement += 0.005;
        this.turningLevelCost = 15 + Math.floor((this.turningLevel * 3) **2);
        buttonActor.textRenderer.setText("Upgrade turning " + this.turningLevelCost + " d");
      }
  }
  
}
Sup.registerBehavior(WolrdBehavior);
