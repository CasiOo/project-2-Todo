/*
 * Repository implemented, so we can switch between Indexeddb and REST solution
 * The current implementation uses Indexeddb
 */

import {inject} from 'aurelia-framework';
import {ElectionRepository} from 'core/data-access/electionRepository';

@inject(ElectionRepository)
export class HeadToHeadRepository {

    constructor(electionRepository) {
        this.electionRepository = electionRepository;
    }
    
    getLatestStanding(party1Id, party2Id, electionId, measurementDate = new Date()) {
        let self = this;
        return this.electionRepository
                   .getLatestElectionStanding(electionId, measurementDate)
                   .then(standing => self._electionStandingToHeadToHeadStanding(party1Id, party2Id, standing));
    }
    
    _electionStandingToHeadToHeadStanding(party1Id, party2Id, electionStanding) {
        let votesTotal = electionStanding.parties.reduce((value, party) => value + party.votes, 0);
        let party1 = electionStanding.parties.find(party => party.id === party1Id);
        let party2 = electionStanding.parties.find(party => party.id === party2Id);
        
        return {
            votesTotal: votesTotal,
            party1: {
                votes: party1.votes,
                votePercentage: party1.votes / votesTotal * 100,
                color: party1.color
            },
            party2: {
                votes: party2.votes,
                votePercentage: party2.votes / votesTotal * 100,
                color: party2.color
            }
        };
    }
}