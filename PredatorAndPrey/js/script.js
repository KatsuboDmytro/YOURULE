let conditions = ["normal", "eating", "being eaten", "haunting", "being haunted",
"reproducing", "newborn", "died"];

var animalCount = 0, bornedFoxes = 0;

class Manager{
	constructor(){
		this.map = [];
		this.foxes = [];
		this.rabbits = [];
	}

	static randomNumb(min, max) {
		return Math.random() * (max - min) + min;
	}

	static addAnimal(animal){
		this.map.push(animal);
	}

	static amountOfAnimals(){
		console.log("Alive animals = " + animalCount);
	}

	static checkHealth(){
		setInterval(()=>{
			for(let i = 0; i < this.animals.length; i++){
				if(Fox.health <= 70) Fox.vision(i);//якщо здоров'я менше 70 - починає бачити, а до цього ходить сліпий виходить)
			}
		},1000);
	}
}

var manager = new Manager();

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
//червоний флажок після переносу randomNumb в Manager
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

	/*кожен має різну швидкість тому щоб було чесно зміну робимо коефіцієнтом*/
	static changeSpeed(amount) {
		this.speed = Math.round(this.speed * amount);
	}

	static changeCondition(condition) {
		this.condition = condition;
	}

	/*.........*/

}
/*--------------------------------Predators-------------------------------- */
class Predator extends Animal {
	constructor (id, sex, speed, health, satiety, vision, damage, hauntsFor) {
		super("predator", id, sex, speed, health, satiety, vision, damage, hauntsFor);//замість 10 поставив damage, боо видававло помилку
		this.damage = 10;
  }

	static damage(dmg){
		Animal.loseHealth(dmg);
	}

	static vision(){

	}
	/*......*/
}

/*-----------Fox-----------*/
class Fox extends Predator {
	constructor(id, sex) {
		super(id, sex, 5, 100, 20, 6, 10, ["rabbit"]);
	}

	born(){//в анімал, краще хай тут залишається, бо воно для кожної тварини робить ++
		animalCount++;
		bornedFoxes++;
		var fox = new Fox(animalCount, "woman");
		manager.addAnimal(fox);
	}

	die(){
		bornedFoxes--;
		delete Fox.bornedFoxes;
	}

	foxHealth(){
		if(Predator.damage() == true) Animal.loseHealth(Manager.randomNumb(10, 20));
		else if(Predator.damage() == false) Animal.receiveHealth(1);
	}

	satiety(){

	}

	vision(predatorPosition){
		let vision = 3;
		for(let i = 0; i < Manager.foxes.length; i++){//ітеруємось по довжині масиву усіх лисиць
			if(Manager.foxes[predatorPosition] == i){//знаходимо потрібну лисичку
				for(let k = predatorPosition; k < predatorPosition + vision; k++){//дивимось на три кроки вперед від позиції лисички
					if(k == Manager.rabbits[k]) delete Manager.rabbits[k];//якщо бачимо кролика - їмо
					else if(k != Manager.rabbits[k]){//якщо не бачимо
						for(let g = predatorPosition; g < predatorPosition - vision; g++){//обертаємо голову і шукаємо там поїсти
							if(g == Manager.rabbits[g]) delete Manager.rabbits[g];//якщо є - їмо
						}
					}
					else Manager.foxes[predatorPosition]++;//йдемо вперед якщо нічого ніде не побачили
				}
			}
		}
	}
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
		if(Predator.damage() == true) Animal.loseHealth(Manager.randomNumb(20, 40));
	}

	satiety(){
		if(Apple.vision() == true) Apple.eatTheApple();
	}

	vision(){

	}
	/*......-*/
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
/*	static - щоб клас можна було використовувати в інших класах*/