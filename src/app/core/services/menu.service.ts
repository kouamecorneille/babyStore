import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  addBodyClass(className: string) {
    this.renderer.addClass(document.body, className);
  }

  removeBodyClass(className: string) {
    this.renderer.removeClass(document.body, className);
  }
}
