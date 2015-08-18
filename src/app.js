import 'normalize.css';
import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';
import 'google/material-design-lite';

export class App {
  configureRouter(config, router){
    config.title = 'Quiz - jstogether';
    config.map([
      { route: ['', 'home'], name: 'home', moduleId: 'components/home/home', nav: false },
	  { route: ['quiz'], name: 'quiz', moduleId: 'components/quiz/quiz', nav: false },
	  { route: ['result'], name: 'result', moduleId: 'components/result/result', nav: false }
    ]);

    this.router = router;
  }
}