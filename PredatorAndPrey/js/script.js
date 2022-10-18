let conditions = ["normal", "eating", "being eaten", "haunting", "being haunted",
"reproducing", "newborn", "died"];

class Animal {
	constructor (type, id, sex, speed, health, satiety, vision, pregnancyTime) {
		this.type = type;
		this.id = id;
		this.sex = sex;
		this.speed = speed;
		this.health = health;
		this.satiety = satiety;
		this.vision = vision;
		this.condition = "normal";
		if(sex === "woman") {
			this.pregnancyTime = pregnancyTime;
		}
	}

	receiveHealth(amount) {
		this.health += amount;
	}

	loseHealth(amount) {
		this.health -= amount;
	}

	receiveSatiety(amount) {
		this.satiety += amount;
	}

	loseSatiety(amount) {
		this.satiety -= amount;
	}

	//кожен має різну швидкість тому щоб було чесно зміну робимо коефіцієнтом
	changeSpeed(amount) {
		this.speed = Math.round(this.speed * amount);
	}

	changeCondition(condition) {
		this.condition = condition;
	}

	//.........

}

class Predator extends Animal {
	constructor (id, sex, speed, health, satiety, vision, damage, hauntsFor) {
		super("predator", id, sex, speed, health, satiety, vision, 10, hauntsFor);
		this.damage = damage;
  }
}

class Prey extends Animal {
	constructor (id, sex, speed, health, satiety, vision, hauntedBy) {
		super("prey", id, sex, speed, health, satiety, vision, 4, hauntedBy);
	}

}

class Fox extends Predator {
	constructor(id, sex) {
		super(id, sex, 5, 100, 20, 6, 10, ["rabbit"]);
	}
}

class Rabbit extends Prey {
	constructor(id, sex) {
		super(id, sex, 3, 40, 15, 5, ["fox"]);
	}
}


