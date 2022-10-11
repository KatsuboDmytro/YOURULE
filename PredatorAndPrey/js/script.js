class Animals {
	constructor () {
		arguments
		this.Predator = Predator;
		this.Prey = Prey;
	}
}

class Predator extends Animals {
	constructor () {
		arguments
		this.wolf = wolf;
		this.bear = bear;
		this.fox = fox;
		this.lynx = lynx;
  }
}
/*
	speed: 3/1sec
	vision: 4
	damage: 40
	eating: floak - deer, boark, horse; single - rabbit
	satisfied: 5sec after eating
	hunger: -3hp every 1sec
	reproduction: eat +75, health +80, single wolf
	fertilization: 2sec
	die: eat >10 or health >10  or after reproduction 5sec
	born: after 3sec fertilization, 5sec near parent -> adult wolf
*/
class Wolf extends Predator {
	constructor () {
		arguments
		super(wolf);
  }
	generateRandomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	healthBar(damage){
		let health = 100;
		health -= damage;
	}

	eatBar(eat){
		let eatProgtress = 0;
		eatProgtress += eat;
	}

	speed(){
		setInterval(function () {
			return generateRandomIntegerInRange(2, 3);
		}, 1000);
	};

	vision(){
		if(this.wolf) dosmth;//??
	}

	damage(){
		if(this.wolf.position == this.deer.position) this.deer.healthBar(40);
	}

	eating(){
		if(this.vision()){
			if(this.wolf.position/*??*/ == this.deer.position && this.deer){
				this.damage();
				this.reproduction(eat);
			}
		}
	}

	satisfied(){
		if(this.eating()) dosmth;//delay 5 sec
	}

	hunger(){
		if(!this.eating) //more than 5sec
			eatBar(3); //every 1 sec
	}

	reproduction(){
		if(eatBar() > 75 && healthBar() > 80 && this.wolf)
		/*let newWolf = new Wolf();*/dosmth;
	}
	
	fertilization(){
		//wait 2 sec
	}

	die(){
		if(eatBar <= 10 || healthBar <= 10 || /*after*/this.reproduction) delete this.wolf;
	}

	born(){//born: after 3sec fertilization, 5sec near parent -> adult wolf
		if(/*after*/this.fertilization){
			this.newWolf.position -= this.wolf.position;
		}
	}

	grewUp(){
		if(/*5sec near his parent*/this.newWolf) this.newWolf == this.wolf;
	}
}

class Prey extends Animals {
	constructor () {
		arguments
		this.deer = deer;
		this.boar = boar;
		this.rabbit = rabbit;
		this.horse = horse;
  }
}
/*
	speed: 3/1.5sec
	vision: 3
	damage: 10
	eating: apple
	satisfied: 5sec after eating
	hunger: -3hp every 1sec
	reproduction: eat +75, health +70, single deer
	fertilization: 2sec
	die: eat >10 or health >10  or after reproduction 5sec
	born: after 3sec fertilization, 5sec near parent -> adult deer
*/