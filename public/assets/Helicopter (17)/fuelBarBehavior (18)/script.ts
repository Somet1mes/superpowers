class FuelBarBehavior extends Sup.Behavior {
  
  barActor = new Sup.Actor("bar");
  percent = 100;
  length = 5;
  awake() {
    let sr = new Sup.SpriteRenderer(this.barActor, "Helicopter/fuelBarBar");
    this.barActor.setParent(this.actor);
  }

  update() {
    this.barActor.setLocalScaleX(this.percent * this.length);
  }
}
Sup.registerBehavior(FuelBarBehavior);
