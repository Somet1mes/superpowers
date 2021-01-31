class Menu {
  
  currentMoneyDisplay: Sup.Actor;
  peopleEnslavedText: Sup.Actor;
  currentDayText: Sup.Actor;
  currentFuelText: Sup.Actor;
  currentPowerText: Sup.Actor;
  currentAccText: Sup.Actor;
  actorList: Sup.Actor[] = [];
  tr: Sup.TextRenderer;
  
  menuHeight = 19;
  
  constructor(parent: Sup.Actor)
  {
    this.currentMoneyDisplay = new Sup.Actor("currentMoneyDisplay", parent);
    let textRend = new Sup.TextRenderer(this.currentMoneyDisplay, "Man Hours Available: 0", "font1");
    this.currentMoneyDisplay.setLocalPosition(0,this.menuHeight,0);
    
    this.peopleEnslavedText = new Sup.Actor("PeopleEnslavedText", parent);
    textRend = new Sup.TextRenderer(this.peopleEnslavedText, "Lost People Found: 0", "font1");
    this.peopleEnslavedText.setLocalPosition(-24, this.menuHeight, 0);
    
    this.currentDayText = new Sup.Actor("currentDayText", parent);
    textRend = new Sup.TextRenderer(this.currentDayText, "currentDayText", "font1");
    this.currentDayText.setLocalPosition(20, this.menuHeight, 0);
    
    this.currentFuelText = new Sup.Actor("currentFuelText", parent);
    textRend = new Sup.TextRenderer(this.currentFuelText, "currentFuelText", "font1");
    this.currentFuelText.setLocalPosition(20, this.menuHeight - 2, 0);
    
    this.currentPowerText = new Sup.Actor("currentPowerText", parent);
    textRend = new Sup.TextRenderer(this.currentPowerText, "currentPowerText", "font1");
    this.currentPowerText.setLocalPosition(20, this.menuHeight - 4, 0);
    
    this.currentAccText = new Sup.Actor("currentAccText", parent);
    textRend = new Sup.TextRenderer(this.currentAccText, "currentPowerText", "font1");
    this.currentAccText.setLocalPosition(20, this.menuHeight - 6, 0);
    
    
    let newActor = new Sup.Actor("ContinueButton", parent);
    textRend = new Sup.TextRenderer(newActor, "Continue", "font1");
    newActor.setLocalPosition(0,-this.menuHeight + 4,0);
    newActor.textRenderer.setSize(50);
    newActor.textRenderer.setColor(0,0,255);
    this.actorList.push(newActor);
    
    newActor = new Sup.Actor("BuyMoreFuelButton", parent);
    textRend = new Sup.TextRenderer(newActor, "Build secondary fuel tank. 4 d", "font1");
    newActor.setLocalPosition(-20,this.menuHeight - 8,0);
    this.actorList.push(newActor);
    
    newActor = new Sup.Actor("BuyMoreEngineButton", parent);
    textRend = new Sup.TextRenderer(newActor, "Upgrade to V6 engine. 5 d", "font1");
    newActor.setLocalPosition(-20,this.menuHeight - 11,0);
    this.actorList.push(newActor);
    
    newActor = new Sup.Actor("BuyMoreAccelerationButton", parent);
    textRend = new Sup.TextRenderer(newActor, "Upgrade Acceleration. 7 d", "font1");
    newActor.setLocalPosition(-20,this.menuHeight - 14,0);
    this.actorList.push(newActor);
    
    newActor = new Sup.Actor("BuyMoreTurningButton", parent);
    textRend = new Sup.TextRenderer(newActor, "Upgrade Turning. 15 d", "font1");
    newActor.setLocalPosition(-20,this.menuHeight - 17,0);
    this.actorList.push(newActor);
    
    newActor = new Sup.Actor("UpgradesText", parent);
    textRend = new Sup.TextRenderer(newActor, "Upgrades:", "font1");
    newActor.setLocalPosition(-20,this.menuHeight - 4,0);
    newActor.textRenderer.setSize(50);
    this.actorList.push(newActor);

  }

  update(worldActor: Sup.Actor) {

    this.currentMoneyDisplay.textRenderer.setText("Man Days Available: " + worldActor.getBehavior(WolrdBehavior).currentMoney + " d");
    this.currentDayText.textRenderer.setText("Day: " + worldActor.getBehavior(WolrdBehavior).day);
    this.currentFuelText.textRenderer.setText("Fuel: " + worldActor.getBehavior(WolrdBehavior).player.maxFuel + " L");
    this.currentPowerText.textRenderer.setText("Max Engine Power: " + worldActor.getBehavior(WolrdBehavior).player.maxPropellerForce + " N");
    this.currentAccText.textRenderer.setText("Engine Acceleration: " + wolrdActor.getBehavior(WolrdBehavior).player.propellerForceIncrement * 60 + " N/s");
    
    if (worldActor.getBehavior(WolrdBehavior).lostPeopleEnslaved < 50)
      {
        this.peopleEnslavedText.textRenderer.setText("Lost People Found: " + worldActor.getBehavior(WolrdBehavior).lostPeopleEnslaved);
      }
    else
      {
        this.peopleEnslavedText.textRenderer.setText("Lost People Enslaved: " + worldActor.getBehavior(WolrdBehavior).lostPeopleEnslaved);
      }
    
  }
  
  GetActors()
  {
    return this.actorList;
  }
}
