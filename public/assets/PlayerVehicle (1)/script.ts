class PlayerVehicle implements IWorldObject {
  
  private actor: Sup.Actor;
  private physicsBody: PhysicsBody2D;
  private spriteRenderer: Sup.SpriteRenderer;
  private baseDrivingForce: number;
  private propellerForceIncrement: number;
  private drivingForce: Sup.Math.Vector2;
  private propellerForce: number = 0;
  private angle: number = 0;
  private angleIncrement = 0.01; //radians per tick
  private radius: number = 3;
  
  constructor() {
    this.actor = new Sup.Actor("PlayerVehicle");
    this.spriteRenderer = new Sup.SpriteRenderer(this.actor, "Helicopter1");
    this.actor.setPosition(0,0,0);
    this.physicsBody = new PhysicsBody2D(new Sup.Math.Vector2(0,0), 1000, this.radius);
    
    this.baseDrivingForce = 12000;
    this.propellerForceIncrement =  this.baseDrivingForce / 200;
    this.drivingForce = new Sup.Math.Vector2(0,8000);
  }

  update() {
    this.actor.setPosition(this.physicsBody.GetPosition());
    this.HandleUserInput();
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
    this.propellerForce = Sup.Math.clamp(this.propellerForce, -this.baseDrivingForce, this.baseDrivingForce);
    
    this.drivingForce.x = this.propellerForce * Math.cos(this.angle + Math.PI/2);
    this.drivingForce.y = this.propellerForce * Math.sin(this.angle + Math.PI/2);
    
    this.physicsBody.ApplyForce(new Sup.Math.Vector2(this.drivingForce.x, this.drivingForce.y));
  }
  
  GetPhysicsBody2D()
  {
    return this.physicsBody;
  }
}
