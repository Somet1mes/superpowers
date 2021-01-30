class Terrain implements IWorldObject {
  
  private actor: Sup.Actor;
  private physicsBody: PhysicsBody2D;
  private spriteRenderer: Sup.SpriteRenderer;
  
  constructor(x, y, radius) {
    this.actor = new Sup.Actor("terrainObject");
    this.spriteRenderer = new Sup.SpriteRenderer(this.actor, "Ground1");
    this.actor.setPosition(0,0,0);
    this.physicsBody = new PhysicsBody2D(new Sup.Math.Vector2(x,y), 1000000, radius);
    this.physicsBody.isMoveable = false;
    this.actor.setPosition(this.physicsBody.GetPosition());
  }

  update() {
    
  }
  
  GetPhysicsBody2D()
  {
    return this.physicsBody;
  }
}

