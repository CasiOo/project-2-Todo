// CSS can be imported (through Aurelia require) through HTML, but we choose to import them here
import 'normalize.css';
//import 'bootstrap';
//import 'bootstrap/css/bootstrap.css!';
import 'dogfalo/materialize';

export class App {
  configureRouter(config, router){
    config.title = 'Vote - jstogether';
    config.map([
      { route: ['', 'home'], name: 'home', moduleId: 'components/home/home', nav: false }
    ]);

    this.router = router;
  }
}