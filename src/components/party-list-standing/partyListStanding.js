import {bindable, customElement, inject} from 'aurelia-framework';
import {PartyListStandingService} from 'components/party-list-standing/partyListStandingService';
// import {StandingMerger} from 'components/party-list-standing/standingMerger';
import {StandingScheduler, SchedulingConfig} from 'core/election-standing/standingScheduler';

@bindable({
    name: 'electionId',
    attribute: 'electionId',
    defaultValue: 1
})
@customElement('party-list-standing')
@inject(PartyListStandingService, StandingScheduler, SchedulingConfig)
export class PartyListStanding {

    constructor(partyListStandingService, standingScheduler, schedulingConfig) {
        this.tmpStanding = null;
        this.standing = null;
        this.highestVotes = 0; // Used to make the vote-bar widths relative to each other
        this.partyListStandingService = partyListStandingService;
        this.standingScheduler = standingScheduler;
        this._fetchStanding(standingScheduler.latestSyncDate)
            .then(this._applyFetchedStanding.bind(this));
            
        standingScheduler.register(this._fetchStanding.bind(this), this._applyFetchedStanding.bind(this));
        // TODO Start scheduling on app startup
        standingScheduler.startScheduling(schedulingConfig);
    }
    
    formatVotes(votes) {
        return votes.toLocaleString();
    }
    
    formatPercentage(percentage) {
        return percentage.toFixed(1);
    }
    
    votesToBarWidth(votes) {
        return (votes / this.highestVotes * 100).toFixed(1);
    }
    
    // Scheduling
    _fetchStanding(syncDate) {
        return this.partyListStandingService
                   .getLatestStanding(this.electionId, syncDate)
                   .then(this._onStandingFetched.bind(this));
    }
    
    _onStandingFetched(standing) {
        this.tmpStanding = standing;
    }
    
    _applyFetchedStanding() {
        if (this.tmpStanding.parties.length > 0)
            this.highestVotes = this.tmpStanding.parties[0].votes;
        
        this.standing = this.tmpStanding;
    }
}