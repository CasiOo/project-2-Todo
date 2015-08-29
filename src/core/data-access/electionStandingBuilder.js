import {transient} from 'aurelia-framework';

@transient()
export class ElectionStandingBuilder {
   
    candidates(candidates) {
        this._candidates = candidates;
        return this;
    }
   
    parties(parties) {
        this._parties = parties;
        return this;
    }
   
    standing(standing) {
        this._standing = standing;
        return this;
    }
   
    build() {
        let partiesMap = new Map();
        let candidatesMap = new Map();
        this._parties.forEach(party => partiesMap.set(party.id, party));
        this._candidates.forEach(candidate => candidatesMap.set(candidate.id, candidate));
        
        return {
            id: this._standing.id,
            electionId: this._standing.electionId,
            measurementDate: new Date(this._standing.measurementDate),
            totalVotes: this._standing.parties.reduce((votes, party) => votes + party.votes, 0),
            parties: this._standing.parties.map(party => {
                return Object.assign(party, partiesMap.get(party.id));
            }),
            candidates: this._standing.candidates.map(candidate => {
                return Object.assign(candidate, candidatesMap.get(candidate.id));
            })
        };
    }
}