import {inject} from 'aurelia-framework';
import {HeadToHeadRepository} from 'components/head-to-head/HeadToHeadRepository';

@inject(HeadToHeadRepository)
export class HeadToHeadService {
    
    constructor(repository) {
        this.repository = repository;
    }
    
    getLatestStanding(party1Id, party2Id, electionId) {
        return this.repository
                   .getLatestStanding(party1Id, party2Id, electionId);
    }
}