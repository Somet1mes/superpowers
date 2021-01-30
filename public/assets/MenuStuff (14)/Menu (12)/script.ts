class Menu {
  
  currentMoneyDisplay = new Sup.Actor("currentMoneyDisplay");
  actorList: Sup.Actor[] = [];
  
  menuHeight = 19;
  
  constructor(parent)
  {
    let textRend = new Sup.TextRenderer(this.currentMoneyDisplay);
    this.currentMoneyDisplay.textRenderer.setFont("font1");
    this.currentMoneyDisplay.textRenderer.setText("Man Hours Available: 0");
    this.currentMoneyDisplay.setParent(parent);
    this.currentMoneyDisplay.setLocalPosition(0,this.menuHeight,0);
    this.actorList.push(this.currentMoneyDisplay);
    
    let newActor = new Sup.Actor("ContinueButton", parent);
    textRend = new Sup.TextRenderer(newActor, "Continue", "font1");
    this.actorList.push(newActor);
  }

  update(worldActor: Sup.Actor) {
    this.currentMoneyDisplay.textRenderer.setText("Man Hours Available: " + worldActor.getBehavior(WolrdBehavior).currentMoney);
  }
  
  GetActors()
  {
    return this.actorList;
  }
}
