import {inject} from 'aurelia-framework';
import {DbContext} from 'core/data-access/dbContext';
import {ElectionStandingBuilder} from 'core/data-access/electionStandingBuilder';

@inject(DbContext, ElectionStandingBuilder)
export class ElectionRepository {
    
    constructor(dbContext, electionStandingBuilder) {
        this.db = dbContext.db;
        this.electionStandingBuilder = electionStandingBuilder;
    }
    
    getElections() {
        return this.db.elections.toArray();
    }
    
    getCandidates(electionId) {
        return this.db.candidates.where('electionId').equals(electionId).toArray();
    }
    
    getParties(electionId) {
        return this.db.electionParties.where('electionId').equals(electionId).toArray();
    }
    
    getCurrentElection() {
        
    }
    
    // Search for the latest standing, equal to or before measurementDate
    getLatestElectionStanding(electionId, measurementDate = new Date()) {
        let measurementTime   = measurementDate.getTime();
        let candidatesPromise = this.getCandidates(electionId);
        let partiesPromise    = this.getParties(electionId);
        let standingPromise   = this.db.electionStandings
                                       .where('measurementDate').belowOrEqual(measurementDate) // Sorts naturally on the measurementDate index
                                       .and(standing => standing.electionId === electionId)
                                       .last();
        
        return Promise
                .all([candidatesPromise, partiesPromise, standingPromise])
                .then((values) => {
                    let [candidates, parties, standing] = values;
                    return this.electionStandingBuilder
                             .candidates(candidates)
                             .parties(parties)
                             .standing(standing)
                             .build();
                });
    }
    
    addElectionStanding(standing) {
        return this.db.electionStandings.add(standing);
    }
}