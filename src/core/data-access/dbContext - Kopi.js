import {inject} from 'aurelia-framework';
import Dexie from 'dexie';
import schemaDefinition from 'core/data-access/election-schema.1.json!';

@inject(schemaDefinition)
export class DbContext {
    
    constructor(schemaDefinition) {
        this.db = new Dexie('ElectionDatabase'); 
        this.db
            .version(1)
            .stores(schemaDefinition);
        
        // Populate the database with some start-up data
        this.db.on('populate', this.populateData.bind(this));
        this.db.open();
    }
    
    populateData() {
        var db = this.db;
        addParties();
        addPoliticians();
        addElections();
        addElectionStandings();
        console.log('End');
        
        function addParties() {
            db.parties.add({ name: 'Venstre', shortName: 'Venstre', letter: 'V', color: '#234263' });
            db.parties.add({ name: 'Socialdemokraterne', shortName: 'Soc.dem.', letter: 'A', color: '#b32722' });
            db.parties.add({ name: 'Dansk Folkeparti', shortName: 'DF', letter: 'O', color: '#f5d040' });
            db.parties.add({ name: 'Enhedslisten', shortName: 'Enhl.', letter: 'Ø', color: '#ef801a' });
            db.parties.add({ name: 'Liberal Alliance', shortName: 'Lib. Al.', letter: 'I', color: '#22c8d1' });
            db.parties.add({ name: 'Kristendemokraterne', shortName: 'Krist.dem.', letter: 'K', color: '#8e8a76' });
        }
        
        function addPoliticians() {
            db.politicians.add({ partyId: 1, name: 'Lars Løkke Rasmussen', shortName: 'Lars Løkke' });
            db.politicians.add({ partyId: 2, name: 'Helle Thorning-Schmidt', shortName: 'Helle Thorning' });
            db.politicians.add({ partyId: 3, name: 'Kristian Thulesen Dahl', shortName: 'Kristian Thulesen' });
            db.politicians.add({ partyId: 4, name: 'Johanne Schmidt-Nielsen', shortName: 'Johanne Schmidt' });
            db.politicians.add({ partyId: 5, name: 'Anders Samuelsen', shortName: 'Anders Samuelsen' });
            db.politicians.add({ partyId: 6, name: 'Stig Grenov', shortName: 'Stig Grenov' });
        }
        
        function addElections() {
            /*
            var start = new Date();
            var end = new Date(start);
            end.setFullYear(end.getFullYear() + 1);
            
            db.elections.add({ 
                period: {
                    start: start.getTime(),
                    end: end.getTime()
                },
                title: 'Folketingsvalg 2015',
                // Array of party id and top candidate id
                parties: [
                    { id: 1, topCandidateId: 1 },
                    { id: 2, topCandidateId: 2 },
                    { id: 3, topCandidateId: 3 },
                    { id: 4, topCandidateId: 4 },
                    { id: 5, topCandidateId: 5 },
                    { id: 6, topCandidateId: 6 }
                ],
                // Array of candidate id's
                candidates: [1, 2, 3, 4, 5, 6]
            });
            */
        }
        
        function addElectionStandings() {
            // var measurementDate = new Date();
            // db.electionStandings.add({
                // electionId: 1,
                // measurementDate: measurementDate.getTime(),
                // votes: [
                    // { partyId: 1, votes: 685188 },
                    // { partyId: 2, votes: 924940 },
                    // { partyId: 3, votes: 741746 },
                    // { partyId: 4, votes: 274463 },
                    // { partyId: 5, votes: 265129 },
                    // { partyId: 6, votes:  29077 }
                // ]
            // });
        }
    }
}