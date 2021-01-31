class LostPerson implements IWorldObject {
  private actor: Sup.Actor;
  private physicsBody: PhysicsBody2D;
  
  constructor(width, height)
  {
    this.actor = new Sup.Actor("lostPerson");
    this.physicsBody = new PhysicsBody2D(new Sup.Math.Vector2(0,0),2000, 2);
    this.physicsBody.isMoveable = true;
    this.physicsBody.isLostPerson = true;
    
    let x = Math.random() * width - width/2;
    let y = Math.random() * height - height/2;
    this.physicsBody.SetPosition(x, y);
    
    let num = Math.ceil(Math.random() * 9);
    let sr = new Sup.SpriteRenderer(this.actor, "persons/lostPerson" + num);
  }

  update() {
    this.actor.setPosition(this.physicsBody.GetPosition());
  }
  
  GetPhysicsBody2D()
  {
    return this.physicsBody;
  }
  
  GetActor()
  {
    return this.actor;
  }
}
