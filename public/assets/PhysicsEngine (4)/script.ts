function sign(num)
{
  if (num >= 0)
    {
      return 1;
    }
  if (num < 0)
    {
      return -1;
    }
}

class PhysicsEngine {
  
  gravity = -9.8;
  airResistance = 50; //kg m^-1
  maxRejectionVelocity = 0.1;
  
  constructor()
  {
    
  }

  update(physicsBodies: IWorldObject[]) {
    for (var i = 0; i < physicsBodies.length; i++)
      {
        let body = physicsBodies[i].GetPhysicsBody2D();
        
        if (body.isMoveable)
          {
            body.ApplyForce(new Sup.Math.Vector2(0, this.gravity * body.GetMass()));
            body.ApplyForce(new Sup.Math.Vector2(this.airResistance * (body.GetVelocity().x **2) * sign(body.GetVelocity().x) * -1, this.airResistance * (body.GetVelocity().y **2) * sign(body.GetVelocity().y) * -1));
            
            this.HandleCollisions(body, i, physicsBodies);
          }
        
        body.update();
      }
  }
  
  HandleCollisions(body: PhysicsBody2D, bodyIndex, physicsBodies: IWorldObject[])
  {
    for (var i = 0; i < physicsBodies.length; i ++)
      {
        if (i != bodyIndex)
          {
            let body2 = physicsBodies[i].GetPhysicsBody2D();
            let distance = Math.sqrt((body.GetPosition().x - body2.GetPosition().x) ** 2 + (body.GetPosition().y - body2.GetPosition().y) ** 2);
            let ratio = distance / (body.GetRaduis() + body2.GetRaduis());
            if (ratio < 1)
              {
                body.NullForcesInDirection((body2.GetPosition().x - body.GetPosition().x), (body2.GetPosition().y - body.GetPosition().y));
                let rejectionVelocity = (1 - ratio) * this.maxRejectionVelocity;
                if (Math.abs((body2.GetPosition().x - body.GetPosition().x)) > Math.abs((body2.GetPosition().y - body.GetPosition().y)))
                  {
                    body.SetVelocity( ((body2.GetPosition().x - body.GetPosition().x)/distance * rejectionVelocity),
                      ((body2.GetPosition().y - body.GetPosition().y) / distance * rejectionVelocity) + body.GetVelocity().y);
                  }
                else
                  {
                    body.SetVelocity( ((body2.GetPosition().x - body.GetPosition().x)/distance * rejectionVelocity) + body.GetVelocity().x,
                      ((body2.GetPosition().y - body.GetPosition().y) / distance * rejectionVelocity));
                  }
              }
          }
      }
  }
}
