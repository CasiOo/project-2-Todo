import {inject} from 'aurelia-framework';
import {VoteStandingScheduler, SchedulingConfig} from 'core/vote-standing/voteStandingScheduler';

@inject(VoteStandingScheduler, SchedulingConfig)
export class VoteStandingStore {

    constructor(voteStandingScheduler, schedulerConfig) {
        //this._latestVoteStanding = null;
        this._latestVoteStanding = {
            topPoliticans: [
                {
                    id: 1,
                    firstName: 'Lars',
                    fullName: 'Lars Løkke Rasmussen',
                    partyColor: '#005392',
                    votePercentage: '80%'
                },
                {
                    id: 2,
                    firstName: 'Helle',
                    fullName: 'Helle Thorning',
                    partyColor: '#f04d46',
                    votePercentage: '50%'
                }
            ]
        };
        voteStandingScheduler.addUpdateListener(this.onSchedulerUpdate);
        voteStandingScheduler.startScheduling(schedulerConfig);
    }

    onSchedulerUpdate(voteStanding) {
        console.log('Scheduler update!');
        this._latestVoteStanding = voteStanding;
        
    }

    get latestVoteStanding() {
        return this._latestVoteStanding;
    }
}