import { Scroll as Scroll } from '@redsift/ui-rs-core';
import heroTmpl from '../templates/hero.tmpl';

class RedsiftHero {
  constructor(el, opts) {
    this.locators = {
      hero: '.hero',
      heroContainer: '.hero__container',
      heroContent: '.hero__content',
      heroHeader: '.hero__header',
      heroHeaderContent: '.hero__header__content',
      heroStickyHeader: '.hero-sticky-header',
      heroStickyHeaderActive: '.hero-sticky-header--active',
      scrollDownArrow: '#smooth'
    }

    this.downArrowHtml = '<div class="down-arrow"></div>';
    this.hasStickyHeader = false;

    this._setupElement(el, heroTmpl, opts);
  }

  setHeader(text) {
    this.$headerContent.innerHTML = text;
  }

  setBgClass(bgClass) {
    this.$hero.className += ` ${bgClass}`;
  }

  enableStickyHeader(flag, triggerElSelector) {
      // NOTE: Do NOT use cached element here. For the first run these elements
      // are only cached after this feature is handled!

      if (flag) {
          let $header = document.querySelector(this.locators.heroHeader),
              $hero = document.querySelector(this.locators.hero);

          if ($header) {
            $header.classList.remove(this.locators.heroHeader.substr(1));
            $header.classList.add(this.locators.heroStickyHeader.substr(1));
            $hero.parentNode.parentNode.appendChild($header);
          } // else the sticky-header is already present on the page

          if (triggerElSelector && triggerElSelector != '') {
              try {
                  // TODO: change toggleClass signature to provide element list instead of selector
                  //       for '.content' to be more flexible (i.e. provide first element after hero
                  //       without having to know the name)
                  Scroll.toggleClass(
                      this.locators.heroStickyHeader,
                      this.locators.heroStickyHeaderActive.substr(1),
                      // FIXXME: replace hardcoded '.content' with something appropriate (based on aboves TODO)!
                      triggerElSelector
                  );
              } catch (err) {
                  console.log('[redsift-ui/hero] Error enabling sticky header. Did you specify a valid element name for the "sticky-header" attribute?');
              }
          }

          this.hasStickyHeader = true;
      } else {
          let $header = document.querySelector(this.locators.heroStickyHeader),
              $hero = document.querySelector(this.locators.hero);

          if ($header) {
              $header.classList.add(this.locators.heroHeader.substr(1));
              $header.classList.remove(this.locators.heroStickyHeader.substr(1));
              $hero.insertBefore($header, $hero.firstChild);

              // TODO: remove toggleClass callback!

              this.hasStickyHeader = false;
          }
      }
  }

  enableScrollFeature(flag, scrollTarget) {
    if (flag) {
      this.$scrollFeature = this._createScrollFeatureElement(scrollTarget);
      this.$container.appendChild(this.$scrollFeature);

      let offset = this._getStickyHeaderHeight();
      Scroll.initSmooth(this.locators.scrollDownArrow, -offset);
    } else if (this.$scrollFeature && this.$scrollFeature.parentNode) {
      this.$scrollFeature.parentNode.removeChild(this.$scrollFeature);
    }
  }

  //----------------------------------------------------------
  // Private API:
  //----------------------------------------------------------

  _setupElement(el, heroTmpl, opts) {
    // Get the user provided inner block of the element, replace the elements
    // content with the hero tree and insert the content at the correct place.
    let userTmpl = el.innerHTML;
    el.innerHTML = heroTmpl;

    let content = document.querySelector(this.locators.heroContent);
    content.innerHTML = userTmpl;

    // NOTE: handle sticky header before caching, as this.$header is set
    // differently depending this feature:
    if (opts.hasStickyHeader) {
      this.enableStickyHeader(true, opts.stickyHeaderTrigger);
    }

    this._cacheElements(opts.hasStickyHeader);

    if (opts.header) {
      this.setHeader(opts.header);
    }

    if (opts.bgClass) {
      this.setBgClass(opts.bgClass);
    }

    if (opts.scrollTarget) {
      this.enableScrollFeature(true, opts.scrollTarget);
    }
  }

  _createScrollFeatureElement(scrollTarget) {
    let a = document.createElement('a');

    a.id = this.locators.scrollDownArrow.substr(1);
    a.href = scrollTarget;
    a.innerHTML = this.downArrowHtml;

    // FIXXME: If the arrow is on the same height as the header it is not
    // clickable due to the z-index.

    return a;
  }

  _getStickyHeaderHeight() {
      let height = 0;

      try {
          if (this.hasStickyHeader) {
              height = this.$header.getBoundingClientRect().height
          }
      } catch (err) {
          console.log('[redsift-ui/hero] Error enabling sticky header. Did you specify a valid element name for the "sticky-header" attribute?');
      }
  }

  // TODO: implement generic caching functionality, e.g. this.querySelector(selector, useCache)
  _cacheElements(hasStickyHeader) {
    this.$hero = document.querySelector(this.locators.hero);
    if (hasStickyHeader) {
      this.$header = document.querySelector(this.locators.heroStickyHeader);
    } else {
      this.$header = document.querySelector(this.locators.heroHeader);
    }
    this.$headerContent = document.querySelector(this.locators.heroHeaderContent);
    this.$container = document.querySelector(this.locators.heroContainer);
    this.$content = document.querySelector(this.locators.heroContent);
    this.$scrollFeature = undefined;
  }
}

export default RedsiftHero;
