//import {EventEmitter} from 'events';
import {inject} from 'aurelia-framework';
import {ElectionRepository} from 'core/data-access/electionRepository';

@inject(ElectionRepository)
export class StandingScheduler {
    
    constructor(electionRepository) {
        //this.eventEmitter = new EventEmitter();
        this.electionRepository = electionRepository;
        this._tickListeners = new Map();
        this.latestSyncDate = new Date();
    }
    
    startScheduling(schedulingConfig) {
        console.log('Started scheduling with timeinterval: ' + schedulingConfig.timeInterval);
        this.schedulingConfig = schedulingConfig;
        this._scheduleTick();
    }
    
    register(fetchDataCallback, applyFetchedDataCallback) {
        this._tickListeners.set(fetchDataCallback, applyFetchedDataCallback);
    }
    
    unregister(fetchDataCallback) {
        this._tickListeners.delete(fetchDataCallback);
    }
    
    _tick() {
        this.latestSyncDate = new Date();
        let promises = this._fetchData();
        Promise.all(promises)
                .then(this._notifyApplyFetchedData.bind(this))
                .then(this._scheduleTick.bind(this));
                
        this._updateStandings();
    }
    
    _fetchData() {
        let promises = [];
        
        this._tickListeners.forEach((applyFetchedDataCallback, fetchDataCallback) => {
            promises.push(fetchDataCallback(this.latestSyncDate));
        });
        
        return promises;
    }
    
    _notifyApplyFetchedData() {
        this._tickListeners.forEach((applyFetchedDataCallback, fetchDataCallback) => {
            applyFetchedDataCallback();
        });
    }
    
    _scheduleTick() {
        setTimeout(this._tick.bind(this), this.schedulingConfig.timeInterval);
    }
    
    _updateStandings() {
        // Just for testing
        // Generate some random vote increase
        // Ugly spaghetti code, but we don't care about this part
        let self = this;
        let measurementDate = new Date();
        this.electionRepository
            .getElections()
            .then(elections => {
                elections.forEach(election => {
                    self.electionRepository
                        .getLatestElectionStanding(election.id)
                        .then(standing => {
                            let totalVotes = standing.parties.reduce((value, party) => value + party.votes, 0);
                            
                            standing.candidates.forEach(candidate => {
                                let party = standing.parties.find(party => party.id === candidate.partyId);
                                let voteIncrease = Math.floor(Math.random() * (8000 - 1000) + 1000 * (party.votes / totalVotes));
                                
                                // Update candidate votes
                                candidate.votes += voteIncrease; 
                                
                                // Update party votes
                                party.votes += voteIncrease;
                            });
                            
                            return self.electionRepository
                                       .addElectionStanding({
                                           electionId: election.id,
                                           measurementDate: measurementDate,
                                           parties: standing.parties.map(party => { 
                                               return { id: party.id, votes: party.votes };
                                           }),
                                           candidates: standing.candidates.map(candidate => { 
                                               return { id: candidate.id, votes: candidate.votes };
                                           })
                                       });
                        });
                });
            });
    }
}

export class SchedulingConfig {
    
    constructor(timeInterval) {
        this.timeInterval = timeInterval || 2500;
    }
}