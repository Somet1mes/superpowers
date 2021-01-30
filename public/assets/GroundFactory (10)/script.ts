
function CreateGround(): IWorldObject[]
{
  let groundObjects: Terrain[] = [];
  //groundObjects.push(new Terrain(0,-3,0.5));

  //make florr
  let radius = 0.5
  for (var i = -100; i < 100; i++)
    {
      groundObjects.push(new Terrain(i*radius ,-10,radius));
    }

  return groundObjects;
}
