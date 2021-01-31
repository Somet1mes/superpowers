class PlayerVehicle implements IWorldObject {
  
  private frameRate = 60;
  private actor: Sup.Actor;
  private physicsBody: PhysicsBody2D;
  private spriteRenderer: Sup.SpriteRenderer;
  maxPropellerForce: number; // N
  propellerForceIncrement: number; // N/frame
  private drivingForce: Sup.Math.Vector2;
  private propellerForce: number = 0;
  private angle: number = 0;
  angleIncrement = 0.01; //radians per tick
  private radius: number = 3;
  maxFuel: number = 300
  private fuel: number = this.maxFuel; //Liters
  fuelConsumption: number = 1; // liters per kilo newton second
  private fuelActor: Sup.Actor = new Sup.Actor("fuelActor");
  private topHeight = 19;
  private powerBarActor: Sup.Actor = new Sup.Actor("powerBar");
  private menuActor: Sup.Actor;
  frameMass: number = 600;
  
  constructor(cameraMan: Sup.Actor, menuActor: Sup.Actor) {
    this.menuActor = menuActor;
    
    this.actor = new Sup.Actor("PlayerVehicle");
    this.spriteRenderer = new Sup.SpriteRenderer(this.actor, "Helicopter/Helicopter1");
    this.actor.setPosition(0,0,0);
    this.physicsBody = new PhysicsBody2D(new Sup.Math.Vector2(0,0), this.frameMass, this.radius);
    this.physicsBody.isPlayer = true;
    
    this.maxPropellerForce = 12000;
    this.propellerForceIncrement =  this.maxPropellerForce / 200;
    this.drivingForce = new Sup.Math.Vector2(0,8000);
    
    let sr = new Sup.SpriteRenderer(this.fuelActor, "Helicopter/fuelBar");
    this.fuelActor.addBehavior(FuelBarBehavior);
    this.fuelActor.setPosition(0,this.topHeight,-50);
    this.fuelActor.setParent(cameraMan);
    
    sr = new Sup.SpriteRenderer(this.powerBarActor, "Helicopter/powerBar");
    this.powerBarActor.addBehavior(PowerBarBehavior);
    this.powerBarActor.setPosition(-5,this.topHeight,-50);
    this.powerBarActor.setParent(cameraMan);
  }

  update() {
    this.actor.setPosition(this.physicsBody.GetPosition());
    this.HandleUserInput();
    
    this.fuel -= this.fuelConsumption * 1/this.frameRate * Math.abs(this.propellerForce) / 1000;
    this.physicsBody.SetMass(this.frameMass + this.fuel);
    if (this.fuel <= 0)
      {
        this.Reset();
      }
    this.fuelActor.getBehavior(FuelBarBehavior).percent = this.fuel / this.maxFuel;
    
    this.powerBarActor.getBehavior(PowerBarBehavior).percent = this.propellerForce / this.maxPropellerForce;
  }
  
  Reset()
  {
    this.physicsBody.SetPosition(1,-142);
    this.physicsBody.SetVelocity(0,0);
    this.angle = 0;
    this.propellerForce = 0;
    this.fuel = this.maxFuel;
    this.menuActor.setVisible(true);
  }
  
  HandleUserInput()
  {
    if (Sup.Input.isKeyDown("LEFT"))
      {
        this.angle += this.angleIncrement;
      }
    
    if (Sup.Input.isKeyDown("RIGHT"))
      {
        this.angle -= this.angleIncrement;
      }
    
    if (Sup.Input.isKeyDown("UP"))
      {
        this.propellerForce += this.propellerForceIncrement;
      }
    
    if (Sup.Input.isKeyDown("DOWN"))
      {
        this.propellerForce -= this.propellerForceIncrement;
      }
    
    this.actor.setOrientation(new Sup.Math.Quaternion(0,0,Math.sin(this.angle/2), Math.cos(this.angle/2)));
    this.propellerForce = Sup.Math.clamp(this.propellerForce, -this.maxPropellerForce, this.maxPropellerForce);
    
    this.drivingForce.x = this.propellerForce * Math.cos(this.angle + Math.PI/2);
    this.drivingForce.y = this.propellerForce * Math.sin(this.angle + Math.PI/2);
    
    this.physicsBody.ApplyForce(new Sup.Math.Vector2(this.drivingForce.x, this.drivingForce.y));
  }
  
  GetPhysicsBody2D()
  {
    return this.physicsBody;
  }
  
  GetPosition()
  {
    return this.actor.getPosition();
  }
  
  GetActor()
  {
    return this.actor;
  }
}
