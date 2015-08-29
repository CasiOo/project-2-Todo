import {bindable, customElement, inject} from 'aurelia-framework';
import {HeadToHeadService} from 'components/head-to-head/headToHeadService';
import {StandingScheduler} from 'core/election-standing/standingScheduler';

// TODO learn how to bind custom attributes properly....
@bindable({
    name: 'electionId',
    attribute: 'electionId',
    defaultValue: 1
})
@bindable({
    name: 'party1Id',
    attribute: 'party1Id',
    defaultValue: 1
})
@bindable({
    name: 'party2Id',
    attribute: 'party2Id',
    defaultValue: 2
})
@customElement('head-to-head-standing')
@inject(HeadToHeadService, StandingScheduler)
export class HeadToHeadStanding {

    constructor(standingService, standingScheduler, schedulingConfig) {
        this.tmpStanding = null;
        this.standing = null;
        this.standingService = standingService;
        this.standingScheduler = standingScheduler;
        this._fetchStanding(standingScheduler.latestSyncDate)
            .then(this._applyFetchedStanding.bind(this));
            
        standingScheduler.register(this._fetchStanding.bind(this), this._applyFetchedStanding.bind(this));
    }
    
    formatPercentage(percentage) {
        if (!this.standing) return 0;
        return percentage.toFixed(1);
    }
    
    votesToBarWidth(votes) {
        if (!this.standing) return 0;
        
        let partyVoteTotal = this.standing.party1.votes + this.standing.party2.votes;
        return (votes / partyVoteTotal * 100).toFixed(1);
    }
    
    // Scheduling
    _fetchStanding(syncDate) {
        return this.standingService
                   .getLatestStanding(this.party1Id, this.party2Id, this.electionId, syncDate)
                   .then(this._onStandingFetched.bind(this));
    }
    
    _onStandingFetched(standing) {
        this.tmpStanding = standing;
    }
    
    _applyFetchedStanding() {
        this.standing = this.tmpStanding;
    }
}