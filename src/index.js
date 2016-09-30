import registerHeroElement from './js/hero-element.js';
import RedsiftHero from './js/hero.js';

(function() {
  if ('registerElement' in document
      && 'import' in document.createElement('link')
      && 'content' in document.createElement('template')) {
    // platform is good!
    // register the element per default:
    registerHeroElement();
  } else {
    // polyfill the platform!
    var e = document.createElement('script');
    e.src = '/js/CustomElements.min.js';
    document.body.appendChild(e);

    window.addEventListener('WebComponentsReady', function(e) {
      // register the element per default:
      registerHeroElement();
    });
  }
})();

export {
  registerHeroElement,
  RedsiftHero
}
