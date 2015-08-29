import {EventEmitter} from 'events';
import {transient} from 'aurelia-framework';

@transient()
export class VoteStandingScheduler {
    
    constructor(timeInterval) {
        this.eventEmitter = new EventEmitter();
    }
    
    startScheduling(schedulingConfig) {
        console.log('Started scheduling with timeinterval: ' + schedulingConfig.timeInterval);
    }
    
    addUpdateListener(listener) {
        this.eventEmitter.on('update', listener);
    }
    
    removeUpdateListener(listener) {
        this.eventEmitter.off('update', listener);
    }
}

export class SchedulingConfig {
    
    constructor(timeInterval) {
        this.timeInterval = timeInterval || 3000;
    }
}