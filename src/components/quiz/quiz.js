import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class Quiz {

    constructor(router) {
        this.router = router;
    }

    onSubmitAnswerClick() {
    
    }
    
    activate() {
        console.log('active');
    }
    
    attached() {
        // Register our components with MDL
        componentHandler.upgradeDom();
    }
}