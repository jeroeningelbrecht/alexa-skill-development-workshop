const WELCOME_MESSAGE = 'Welcome to High Low guessing game.  You have played 0 times.  Would you like to play?';
const GREAT = 'Great! Try saying a number to start the game';
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

module.exports.starthandlers = Alexa.createStateHandler(states.START, {

	Start(){
		this.emit(':ask', WELCOME_MESSAGE);
	}

});
