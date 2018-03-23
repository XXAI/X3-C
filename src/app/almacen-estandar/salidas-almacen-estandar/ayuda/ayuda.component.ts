import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html'
})
export class AyudaComponent implements OnInit {

  /**
   * Calcula el tamaño de la pantalla
   */
  tamano = document.body.clientHeight;

  constructor(router: Router) {

    /**
     * Para poder ir a las secciones de ayuda.
     **/
    router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);
        if (tree.fragment) {
          const element = document.querySelector('#' + tree.fragment);
          if (element) { element.scrollIntoView(true); }
        }
      }
    });

  }

  ngOnInit() {
  }

}
