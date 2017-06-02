const WELCOME_MESSAGE = 'Welcome to High Low guessing game.  You have played 0 times.  Would you like to play?';
const GREAT = 'Great! Try saying a number to start the game';
const BYE = 'Ok, see you next time!';
const TOO_LOW = ' is too low';
const TOO_HIGH = ' is too high';
const CORRECT = ' is correct! Would you like to play a new game?';

let speech = '';

const Alexa = require('alexa-sdk');

const states = {
    START: '_START',
    GUESSING: '_GUESSING',
};


module.exports.handlers = {
    LaunchRequest() {
    	this.handler.state = states.START;
        this.emitWithState('Start');
    },
    Unhandled() {
        this.handler.state = states.START;
        this.emitWithState('Start');
    }
    
};

module.exports.starthandlers = Alexa.CreateStateHandler(states.START, {

	Start(){
		this.emit(':ask', WELCOME_MESSAGE);
	},

	'AMAZON.YesIntent' : function(){
		this.handler.state = states.GUESSING;
		this.emitWithState('Start');
	},

	'AMAZON.NOIntent' : function() {
		this.emit(':tell', BYE);
	},
	Unhandled() {
        this.handler.state = states.START;
        this.emitWithState('Start');
    }

});

module.exports.guesshandlers = Alexa.CreateStateHandler(states.GUESSING, {
	Start(){
		this.attributes.numberToGuess = 5;
		this.emit(':ask', GREAT);
	},

	'NumberGuessIntent' : function() {
		var number = parseInt(this.event.request.intent.slots.number.value);
		if(number == this.attributes.numberToGuess) {
			this.emit(':tell', CORRECT);
		} else if(number < this.attributes.numberToGuess) {
			this.emit(':ask', number + TOO_LOW);
		} else {
			this.emit(':ask', number + TOO_LOW);
		}
	},

	Unhandled() {
        this.handler.state = states.START;
        this.emitWithState('Start');
    }
});
