//simple puzzle game roguelike that uses delegation and displays output in the
//console logs

var Level = {
  rightboundary: 40,//size of the 1d level
  init() {
  	this.monsters = [];
    this.player = undefined;
  },
  pregen() {//simple puzzle, three walls, three switches and stairs
    var wall = Object.create(Wall);
    wall.init(15);
    var secondwall = Object.create(Wall);
    secondwall.init(16);
    var thirdwall = Object.create(Wall);
    thirdwall.init(17);
    var _switch = Object.create(Switch);
    _switch.init(10);
    _switch.linkWall(wall);
    _switch.pushSwitch();
    var _switch2 = Object.create(Switch);
    _switch2.init(11);
    _switch2.linkWall(secondwall);
    var _switch3 = Object.create(Switch);
    _switch3.init(12);
    _switch3.linkWall(thirdwall);
    var stairs = Object.create(Stairs);
    stairs.init(39);
    this.addMonster(wall);
    this.addMonster(secondwall);
    this.addMonster(thirdwall);
    this.addMonster(_switch);
    this.addMonster(_switch2);
    this.addMonster(_switch3);
    this.addMonster(stairs);
  },
  printBoard() {
  	var dungeon = [];
  	for (var i = 0; i < this.rightboundary; i++) {
    	let nomonster = true;
    	//simple first thing that was added gets displayed
    	for (var m = 0; m < this.monsters.length; m++) {
      	if (this.monsters[m].x === i) {
        	dungeon.push(this.monsters[m].character);
          nomonster = false;
          break;
        }
        
      }
      if (nomonster) {
      	dungeon.push(".");
      }
    }
  	console.log(dungeon.join(""));
  },
  addMonster(m) {
  	if (Object.getPrototypeOf(m) === Player) {
    	this.player = m;
    }
  	this.monsters.push(m);
  },
  moveEntity(e, xdiff) {
    var canmove = true;
    if (e.x + xdiff < 0 || e.x + xdiff >= this.rightboundary) canmove = false;
    for (var m = 0; m < this.monsters.length; m++) {
        if (this.monsters[m] !== e && this.monsters[m].x === e.x + xdiff) {
            canmove = this.monsters[m].onCollision() && canmove;//collide with all entities
        }    
    }
    if (canmove) {
        e.x += xdiff;
    }
  }
};

//base Entity, onCollision will be shadowed
var Entity = {
    x: -1,
    onCollision() {
        return true;
    },
    init(x) {
        this.x = x;
    }
}

var Player = {
	character: '@',
    x: 0
};
Object.setPrototypeOf(Player, Entity);

//blocks movement
var Wall = {
	character: "#",
  priority: 7,
  onCollision() {
    return (this.character === ".");//wall may be changed
  }
}
Object.setPrototypeOf(Wall, Entity);

//the switch can manipulate the wall that is assigned to it
var Switch = {
	character: "/",
  priority: 6,
  linkWall(wall) {
  	this.wall = wall;
  },
  pushSwitch() {
    if (this.wall) {
  		if (this.wall.character === "#") {
    		this.wall.character = ".";
    		this.character = "\\";
    	}
  		else {
    		this.wall.character = "#";
    		this.character = "/";
    	}
    }
  },
  onCollision() {
  	this.pushSwitch();
    return true;
  }
};
Object.setPrototypeOf(Switch, Entity);
//win condition
var Stairs = {
    character: ">",
    onCollision() {
        console.log("YOU WIN!");
    }
};
Object.setPrototypeOf(Stairs, Entity);

//initialize level
var next_level = Object.create(Level);
next_level.init();
var rogue = Object.create(Player);
rogue.init(0);
next_level.addMonster(rogue);
next_level.pregen();

next_level.printBoard();
//simple controls to prevent repeated event firing and allow event hooking
//uses duck typing to check for a bound event
//binds itself to change itself / call other events on events
var Controls = {
    keysdown: {},
    init() {
        document.addEventListener('keydown', (function(event) {
            const key = event.keyCode;
            if (this.keysdown[key]) {
                return;
            }
            this.keysdown[key] = true;
            if (this["onKey" + key]) {
                this["onKey" + key]();
            }
        }).bind(this));
        document.addEventListener('keyup', (function(event) {
            this.keysdown[event.keyCode] = undefined;
        }).bind(this));
    }
};

//Left and right move the rogue
var MovementControls = Object.create(Controls);
MovementControls.onKey37 = function() { next_level.moveEntity(rogue, -1);  next_level.printBoard();}
MovementControls.onKey39 = function() { next_level.moveEntity(rogue, 1); next_level.printBoard();}
MovementControls.init();