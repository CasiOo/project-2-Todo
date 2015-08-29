/*
 * JUST A TEST IMPL. FOR TRANSITIONS, NOT CURRENTLY USED
 */

export class StandingMerger {
    
    merge(standing1, standing2) {
        if (!standing1 || !standing2)
            return standing1;
        
        standing1.id = standing2.id;
        standing1.electionId = standing2.electionId;
        standing1.measurementDate = standing2.measurementDate;
        //TODO remove removed parties
        this._mergeParties(standing1.parties, standing2.parties);
        //TODO remove removed candidate
        this._mergeCandidates(standing1.candidates, standing2.candidates);
        
        
        
        return standing1;
    }
    
    _mergeParties(parties1, parties2) {
        parties2.forEach(party2 => {
            let party1 = parties1.find(party => party.id === party2.id);
            
            if (party1) {
                // Update party
                party1.votes = party2.votes;
                party1.votePercentage = party2.votePercentage;
            }
            else {
                // Push party
                parties1.push(party2);
            }
            
            if (party2.letter === 'V') {
                console.log('Buuh ' + party1.votes);
            }
        });
    }
    
    _mergeCandidates(candidates1, candidates2) {
        candidates2.forEach(candidate2 => {
            let candidate1 = candidates1.find(candidate => candidate.id === candidate2.id);
            
            if (candidate1) {
                // Update candidate
                candidate1.votes = candidate2.votes;
                candidate1.votePercentage = candidate2.votePercentage;
            }
            else {
                // Push party
                candidates1.push(candidate2);
            }
        });
    }
}