function Moves() {
	this.isBetterThan = [];
	this.isWorseThan = [];
};

(function() {
	this.greaterThan = function(other) {
		return other.name in this.isBetterThan;
	};
	this.lessThan = function(other) {
		return other.name in this.isWorseThan;
	};
	this.equal = function(other) {
		return this.name === other.name;
	};
}).call(Moves.prototype);


function Rock() {
	Moves.call(this);
};
Rock.prototype = Object.create(Moves.prototype);
Rock.prototype.constructor = Rock;
(function() {
	this.isBetterThan = ['Scissors'];
	this.isWorseThan = ['Paper'];
}).call(Rock.prototype);

function Paper() {
	Moves.call(this);
};
Paper.prototype = Object.create(Moves.prototype);
Paper.prototype.constructor = Paper;
(function() {
	this.isBetterThan = ['Rock'];
	this.isWorseThan = ['Scissors'];
}).call(Paper.prototype);

function Scissors() {
	Moves.call(this);
};
Scissors.prototype = Object.create(Moves.prototype);
Scissors.prototype.constructor = Scissors;
(function() {
	this.isBetterThan = ['Paper'];
	this.isWorseThan = ['Rock'];
}).call(Scissors.prototype);

console.log("====moves.js====")
console.log(Moves.name);
console.log('r' in ['a','b','c']);
console.log("====END====")