/*
 * Repository implemented, so we can switch between Indexeddb and REST solution
 * The current implementation uses Indexeddb
 */

import {inject} from 'aurelia-framework';
import {ElectionRepository} from 'core/data-access/electionRepository';

@inject(ElectionRepository)
export class PartyListStandingRepository {

    constructor(electionRepository) {
        this.electionRepository = electionRepository;
    }
    
    getLatestStanding(electionId, measurementDate = new Date()) {
        return this.electionRepository
                   .getLatestElectionStanding(electionId, measurementDate)
                   .then(this._electionStandingToListStanding.bind(this));
    }
    
    _electionStandingToListStanding(electionStanding) {
        electionStanding.parties = electionStanding.parties.sort((party1, party2) => party2.votes - party1.votes );
        electionStanding.parties = electionStanding.parties.map(party => {
            party.votePercentage = party.votes / electionStanding.totalVotes * 100;
            return party;
        });
        
        return electionStanding;
    }
}