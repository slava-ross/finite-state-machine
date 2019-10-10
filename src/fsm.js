class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor( config ) {
        this.currState = config.initial;
        this.states = config.states;
        this.histArray = [ this.currState ];
        this.histPointer = 0;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.currState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState( state ) {
        if ( state in this.states ) {
            this.currState = state;
            this.histArray.push( state );
            this.histPointer = this.histArray.length - 1;
        } else {
            throw new Error();
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger( event ) {
        if ( event in this.states[ this.currState ].transitions ) {
            this.currState = this.states[ this.currState ].transitions[ event ];
            if ( this.histPointer === this.histArray.length - 1 ) {
                this.histArray.push( this.currState );
                this.histPointer++;
            } else {
                this.histArray.splice( this.histPointer + 1, this.histArray.length );
                this.histArray.push( this.currState );
                this.histPointer = this.histArray.length - 1;
            }
        } else {
            throw new Error();
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.currState = 'normal';
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates( event ) {
        let stateArr = [];

        for ( let state in this.states ) {
            if ( event in this.states[ state ].transitions || typeof event === 'undefined' ) {
                stateArr.push( state );
            }
        }
        return stateArr;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if ( this.histPointer === 0 ) {
            return false;
        } else {
            this.histPointer--;
            this.currState = this.histArray[ this.histPointer ];
            return true;            
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if ( this.histPointer === this.histArray.length - 1 ) {
            return false;
        } else {
            this.histPointer++;
            this.currState = this.histArray[ this.histPointer ];
            return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.histArray.splice( 0,this.histArray.length );
        this.histArray = [ this.currState ];
        this.histPointer = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
