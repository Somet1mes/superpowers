let currentPhysicsID = 1;

class PhysicsBody2D {
  
  private position = new Sup.Math.Vector2();
  private velocity = new Sup.Math.Vector2();
  private acceleration = new Sup.Math.Vector2();
  
  private radius: number;
  
  private mass: number;
  private frameRate = 60;
  isMoveable = true;
  id: number;
  
  constructor(pos, mass, radius)
  {
    this.position = pos;
    this.mass = mass;
    this.radius = radius;
    this.id = currentPhysicsID;
    currentPhysicsID++;
  }

  update() {
    this.velocity.x += this.acceleration.x / this.frameRate;
    this.velocity.y += this.acceleration.y / this.frameRate;
    
    this.position.x += this.velocity.x / this.frameRate;
    this.position.y += this.velocity.y / this.frameRate;
    
    this.NullForces();
  }
  
  GetPosition()
  {
    return this.position;
  }
  
  GetMass(): number
  {
    return this.mass;
  }
  
  GetRaduis(): number
  {
    return this.radius;
  }
  
  ApplyForce(force: Sup.Math.Vector2)
  {
    this.acceleration.x += force.x / this.mass;
    this.acceleration.y += force.y / this.mass;
  }
  
  GetVelocity()
  {
    //return new Sup.Math.Vector2(this.velocity.x / this.frameRate, this.velocity.y / this.frameRate);
    return this.velocity;
  }
  
  SetVelocity(x, y)
  {
    this.velocity.x = x;
    this.velocity.y = y;
  }
  
  SetPosition(x, y)
  {
    this.position.x = x;
    this.position.y = y;
  }
  
  NullForces()
  {
    this.acceleration.x = 0;
    this.acceleration.y = 0;
  }
  
  NullForcesInDirection(x, y)
  {
    if (this.acceleration.x * x > 0)
      {
        this.acceleration.x = 0;
      }
    
    if (this.acceleration.y * y > 0)
      {
        this.acceleration.y = 0;
      }
  }
  
}
