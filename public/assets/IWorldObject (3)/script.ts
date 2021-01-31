interface IWorldObject {
  
  GetPhysicsBody2D(): PhysicsBody2D;
  
  update(): void;
  
  GetActor(): Sup.Actor;
  
}
