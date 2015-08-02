function Moves() {};
(function() {
	this.greaterThan = function(other) {
		return this.isBetterThan.indexOf(other.constructor.name) > -1;
	};
	this.lessThan = function(other) {
		return this.isWorseThan.indexOf(other.constructor.name) >- 1;
	};
	this.equal = function(other) {
		return this.constructor.name === other.constructor.name;
	};
}).call(Moves.prototype);


function Rock() {
	this.isBetterThan = [Scissors.name];
	this.isWorseThan = [Paper.name];
};
Rock.prototype = Object.create(Moves.prototype);
Rock.prototype.constructor = Rock;

function Paper() {
	this.isBetterThan = [Rock.name];
	this.isWorseThan = [Scissors.name];
};
Paper.prototype = Object.create(Moves.prototype);
Paper.prototype.constructor = Paper;

function Scissors() {
	this.isBetterThan = [Paper.name];
	this.isWorseThan = [Rock.name];
};
Scissors.prototype = Object.create(Moves.prototype);
Scissors.prototype.constructor = Scissors;
