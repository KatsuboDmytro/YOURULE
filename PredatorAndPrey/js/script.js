let conditions = ["normal", "eating", "being eaten", "haunting", "being haunted",
"reproducing", "newborn", "died"];

var map = new Array(70), predators = [], preys = [];
var predatorPosition = [], preyPosition = [];
var howMuchPredators = 3, howMuchPreys = 6;

/*--------------------------------Fox-------------------------------- */
class Fox{
	constructor(id, sex) {
		this.id = id;
		this.sex = sex;
		this.speed = 1;
		this.health = 100;
		this.satiety = 20;
		this.vision = 6;
		this.damage = 10;
		this.hauntsFor = "rabbit";
	}

	static foxPosition(){
		for (let m = 0; m < map.length; m++)
		for (let n = 0; n < map.length + 1; n++){
			for(let i = 0; i < predators.length; i++){
				if(predators[i] == map[m][n]){
					predatorPosition[i] = [m, n]; //fox position
				}
			}
		}
	}

	// не дороблено!!! {
	/*static move(){
		for (let m = 0; m < map.length; m++)
		for (let n = 0; n < map.length + 1; n++){
			for(let i = 0; i < predators.length; i++){
				if(predators[i] == map[m][n]){
					predatorPosition[i] = [m, n]; //fox position
					let x = predatorPosition[0][0] + Manager.randomNumb(1,2);
					let y = predatorPosition[0][1] + Manager.randomNumb(1,2);
					[m,n] = [x,y];
				}
			}
		}
	}*/
	// }

	die(m, n){
		delete map[m][n];
	}

	foxHealth(){
		if(Predator.damage() == true) Animal.loseHealth(Manager.randomNumb(10, 20));
		else if(Predator.damage() == false) Animal.receiveHealth(1);
	}

	satiety(){

	}

	static vision(predatorPosition){
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

/*--------------------------------Rabbit-------------------------------- */
class Rabbit{
	constructor(id, sex) {
		this.id = id;
		this.sex = sex;
		this.speed = 5;
		this.health = 100;
		this.satiety = 20;
		this.vision = 6;
		this.damage = 10;
		this.hauntsFor = "apple";
	}

	static rabbitPosition(){
		for (let m = 0; m < map.length; m++)
		for (let n = 0; n < map.length + 1; n++){
			for(let i = 0; i < preys.length; i++){
				if(preys[i] == map[m][n]){
					preyPosition[i] = [m, n];
				}
			}
		}
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
}
/*--------------------------------Apple-------------------------------- */
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

/*--------------------------------Manager-------------------------------- */
class Manager{
	constructor(){
		this.ItemsInMap = map;
		this.numbOfPredators = predators;
		this.numbOfPreys = preys;
	}

	static itemsPosition(id){
		for (let i = 0; i < 70; i++)
			map[i] = new Array(70);

		for (var m = 0; m < 70; m++)
			for (var n = 0; n < 70; n++)
				map[m][n] = undefined;

		for(let k = 0; k < predators.length; k++)
			map[Manager.randomNumb(0,70)][Manager.randomNumb(0,70)] = predators[k];

		for(let k = 0; k < preys.length; k++)
			map[Manager.randomNumb(0,70)][Manager.randomNumb(0,70)] = preys[k];
	}

	static randomNumb(min, max) {
		return Math.round(Math.random() * (max - min) + min);
	}

	get numbOfAnimal(){
		return this.predators.length + this.preys.length;
	}

	static sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	static checkHealth(){
		Manager.sleep(1000).then(() => {
			for(let i = 0; i < Manager.numbOfAnimal(); i++){
				if(Fox.health <= 70) Fox.vision(i);//якщо здоров'я менше 70 - починає бачити, а до цього ходить сліпий виходить)
			}
		},1000);
	}
}

/*--------------------------------Prey-------------------------------- */
class Prey{
	constructor (id, sex) {
		this.id = id;
		this.sex = sex;
		this.speed = speed;
		this.health = health;
		this.satiety = satiety;
		this.vision = vision;
		this.damage = damage;
		this.hauntsFor = hauntsFor;
	}

  static born(id){
		let sex = ""; let child;
		for(let i = 0; i < howMuchPreys; ++i)
		{
			let k = Manager.randomNumb(1,100);
			(k > 0 && k < 50) ? sex = "woman" : (k > 50 && k < 100) ? sex = "man" : sex = undefined;
			child = new Rabbit(id, sex)
			preys.push(child);
		}
	}

	get allPreys(){
		return preys;
	}

	get numberOfPreys(){
		return preys.length;
	}
}

/*--------------------------------Predator-------------------------------- */
class Predator{
	constructor (id, sex, speed, health, satiety, vision, damage, hauntsFor) {
		this.id = id;
		this.sex = sex;
		this.speed = speed;
		this.health = health;
		this.satiety = satiety;
		this.vision = vision;
		this.damage = damage;
		this.hauntsFor = hauntsFor;
  }

  static born(id){
		let sex = ""; let child;
		for(let i = 0; i < howMuchPredators; ++i)
		{
			let k = Manager.randomNumb(1,100);
			(k > 0 && k < 50) ? sex = "woman" : (k > 50 && k < 100) ? sex = "man" : sex = undefined;
			child = new Fox(id, sex)
			predators.push(child);
		}
	}

	get allPredators(){
		return predators;
	}

	get numberOfPredators(){
		return predators.length;
	}
}


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
		if(sex == "woman") {
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
}
var manager = new Manager();

console.log(manager);
console.log(Predator.born(1));
console.log(Prey.born(2));
console.log(Manager.itemsPosition());
console.log(Fox.foxPosition());
console.log(Rabbit.rabbitPosition());
