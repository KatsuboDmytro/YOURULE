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

	static randomNumb(min, max) {
		return Math.random() * (max - min) + min;
	}

	static receiveHealth(amount) {
		this.health += amount;
		if(this.health >= 100) this.health = 100;
	}

	static loseHealth(amount) {
		this.health -= amount;
		if(this.health <= 0) this.health = 0;
	}

	static receiveSatiety(amount) {
		this.satiety += amount;
		if(this.satiety >= 100) this.satiety = 100;
	}

	static loseSatiety(amount) {
		this.satiety -= amount;
		if(this.satiety <= 0) this.satiety = 0;
	}

	//кожен має різну швидкість тому щоб було чесно зміну робимо коефіцієнтом
	static changeSpeed(amount) {
		this.speed = Math.round(this.speed * amount);
	}

	static changeCondition(condition) {
		this.condition = condition;
	}

	//.........

}
/*--------------------------------Predators-------------------------------- */
class Predator extends Animal {
	constructor (id, sex, speed, health, satiety, vision, damage, hauntsFor) {
		super("predator", id, sex, speed, health, satiety, vision, 10, hauntsFor);
		this.damage = damage;
  }
	
	static speed(speed){
		Animal.changeSpeed(speed);
	}

	static damage(dmg){
		Animal.loseHealth(dmg);
	}

	static vision(){

	}
	//......
}
/*-----------Fox-----------*/
class Fox extends Predator {
	constructor(id, sex) {
		super(id, sex, 5, 100, 20, 6, 10, ["rabbit"]);
	}

	born(){
		var bornedFoxes = 0;
		bornedFoxes++;
		var fox = new Fox(bornedFoxes);
	}

	die(){
		bornedFoxes--;
		delete Fox.bornedFoxes;
	}

	foxHealth(){
		if(Predator.damage() == true) Animal.loseHealth(Animal.randomNumb(10, 20));
		else if(Predator.damage() == false) Animal.receiveHealth(1);
	}

	satiety(){

	}

	vision(){

	}
	//......
}

/*--------------------------------Preys-------------------------------- */
class Prey extends Animal {
	constructor (id, sex, speed, health, satiety, vision, hauntedBy) {
		super("prey", id, sex, speed, health, satiety, vision, 4, hauntedBy);
	}

	static speed(speed){
		Animal.changeSpeed(speed);
	}

}

class Rabbit extends Prey {
	constructor(id, sex) {
		super(id, sex, 3, 40, 15, 5, ["fox"]);
	}

	born(){
		var bornedRabbits = 0;
		bornedRabbits++;
		var fox = new Fox(bornedRabbits);
	}

	die(){
		bornedRabbits--;
		delete Fox.bornedRabbits;
	}

	rabbitHealth(){
		if(Predator.damage() == true) Animal.loseHealth(Animal.randomNumb(20, 40));
	}

	satiety(){
		if(Apple.vision() == true) Apple.eatTheApple();
	}

	vision(){

	}
	//......
}

class Apple{
	constructor(id){
		this.id = id;
	}

	static vision(){

	}

	static eatTheApple(){
		Animal.receiveHealth(10);
	}
}

/*	Помітка*/
//	static - щоб клас можна було використовувати в інших класах