import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class Home {

    constructor(router) {
        this.router = router;
        this.party1Id = 1;
        this.party2Id = 2;
    }
    
    attached() {

    }
}