import {inject} from 'aurelia-framework';
import Dexie from 'dexie';
import schemaDefinition from 'core/data-access/election-schema.1.json!';

@inject(schemaDefinition)
export class DbContext {
    
    constructor(schemaDefinition) {
        // Only used when we're populating data
        this.startUpDate = new Date();
        this.db = new Dexie('ElectionDatabase'); 
        this.db
            .version(1)
            .stores(schemaDefinition);
        
        // Populate the database with some start-up data
        this.db.on('populate', this._populateData.bind(this));
        this.db.open();
    }
    
    _populateData() {
        var startUpDate = this.startUpDate;
        var db = this.db;
        addElections();
        addElectionParties();
        addCandidates();
        addElectionStandings();
        console.log('Populate data complete');
        
        function addElections() {
            let start = startUpDate;
            let end = new Date(start);
            end.setFullYear(end.getFullYear() + 1);
            
            db.elections.add({ 
                period: {
                    start: start.getTime(),
                    end: end.getTime()
                },
                title: 'Folketingsvalg 2015'
            });
        }
        
        function addElectionParties() {
            db.electionParties.add({ electionId: 1, name: 'Venstre', shortName: 'Venstre', letter: 'V', color: '#234263' });
            db.electionParties.add({ electionId: 1, name: 'Socialdemokraterne', shortName: 'Soc.dem.', letter: 'A', color: '#b32722' });
            db.electionParties.add({ electionId: 1, name: 'Dansk Folkeparti', shortName: 'DF', letter: 'O', color: '#f5d040' });
            db.electionParties.add({ electionId: 1, name: 'Enhedslisten', shortName: 'Enhl.', letter: 'Ø', color: '#ef801a' });
            db.electionParties.add({ electionId: 1, name: 'Liberal Alliance', shortName: 'Lib. Al.', letter: 'I', color: '#22c8d1' });
            db.electionParties.add({ electionId: 1, name: 'Kristendemokraterne', shortName: 'Krist.dem.', letter: 'K', color: '#8e8a76' });
        }
        
        function addCandidates() {
            db.candidates.add({ electionId: 1, partyId: 1, name: 'Lars Løkke Rasmussen', shortName: 'Lars Løkke', isTopCandidate: true });
            db.candidates.add({ electionId: 1, partyId: 2, name: 'Helle Thorning-Schmidt', shortName: 'Helle Thorning', isTopCandidate: true });
            db.candidates.add({ electionId: 1, partyId: 3, name: 'Kristian Thulesen Dahl', shortName: 'Kristian Thulesen', isTopCandidate: true });
            db.candidates.add({ electionId: 1, partyId: 4, name: 'Johanne Schmidt-Nielsen', shortName: 'Johanne Schmidt', isTopCandidate: true });
            db.candidates.add({ electionId: 1, partyId: 5, name: 'Anders Samuelsen', shortName: 'Anders Samuelsen', isTopCandidate: true });
            db.candidates.add({ electionId: 1, partyId: 6, name: 'Stig Grenov', shortName: 'Stig Grenov', isTopCandidate: true });
        }
        
        function addElectionStandings() {
            var measurementDate = startUpDate;
            
            db.electionStandings.add({
                electionId: 1,
                measurementDate: measurementDate.getTime(),
                parties: [
                    { id: 1, votes: 100000 },
                    { id: 2, votes: 150000 },
                    { id: 3, votes: 140000 },
                    { id: 4, votes: 40000 },
                    { id: 5, votes: 35000 },
                    { id: 6, votes:  10000 }
                ],
                candidates: [
                    // { id: 1, votes: 685188 },
                    // { id: 2, votes: 924940 },
                    // { id: 3, votes: 741746 },
                    // { id: 4, votes: 274463 },
                    // { id: 5, votes: 265129 },
                    // { id: 6, votes:  29077 }
                    { id: 1, votes: 100000 },
                    { id: 2, votes: 150000 },
                    { id: 3, votes: 140000 },
                    { id: 4, votes: 40000 },
                    { id: 5, votes: 35000 },
                    { id: 6, votes:  5000 }
                ]
            });
        }
    }
}