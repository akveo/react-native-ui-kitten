import { Directive, ElementRef, Inject, Input, OnDestroy, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { takeWhile, publish, refCount, filter, tap, debounce } from 'rxjs/operators';
import { NB_WINDOW, NbLayoutScrollService } from '@nebular/theme';
import { NgdVisibilityService } from '../../../@theme/services';

const OBSERVER_OPTIONS = { rootMargin: '-100px 0px 0px' };

@Directive({
  selector: '[ngdFragment]',
})
export class NgdFragmentTargetDirective implements OnInit, OnDestroy {

  private readonly marginFromTop = 120;
  private isCurrentlyViewed: boolean = false;
  private isScrolling: boolean = false;
  private alive = true;

  @Input() ngdFragment: string;
  @Input() ngdFragmentClass: string;
  @Input() ngdFragmentSync: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    @Inject(NB_WINDOW) private window,
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId,
    private visibilityService: NgdVisibilityService,
    private scrollService: NbLayoutScrollService,
  ) {}

  ngOnInit() {
    this.activatedRoute.fragment
      .pipe(
        publish(null),
        refCount(),
        takeWhile(() => this.alive),
        filter(() => this.ngdFragmentSync),
      )
      .subscribe((fragment: string) => {
        if (fragment && this.ngdFragment === fragment) {
          this.selectFragment();
        } else {
          this.deselectFragment();
        }
      });

    this.visibilityService.isTopmostVisible(this.el.nativeElement, OBSERVER_OPTIONS)
      .pipe(takeWhile(() => this.alive))
      .subscribe((isTopmost: boolean) => {
        this.isCurrentlyViewed = isTopmost;
        if (isTopmost) {
          this.updateUrl();
        }
      });

    this.scrollService.onScroll()
      .pipe(
        takeWhile(() => this.alive),
        tap(() => this.isScrolling = true),
        debounce(() => timer(100)),
      )
      .subscribe(() => this.isScrolling = false);
  }

  selectFragment() {
    this.ngdFragmentClass && this.renderer.addClass(this.el.nativeElement, this.ngdFragmentClass);

    const shouldScroll = !this.isCurrentlyViewed || !this.isScrolling;
    if (shouldScroll) {
      this.window.scrollTo(0, this.el.nativeElement.offsetTop - this.marginFromTop);
    }
  }

  deselectFragment() {
    this.renderer.removeClass(this.el.nativeElement, this.ngdFragmentClass);
  }

  updateUrl() {
    const urlFragment = this.activatedRoute.snapshot.fragment;
    const alreadyThere = urlFragment && urlFragment.includes(this.ngdFragment);
    if (!alreadyThere) {
      this.router.navigate([], { fragment: this.ngdFragment, replaceUrl: true });
    }
  }

  ngOnDestroy() {
    this.alive = false;
    this.visibilityService.unobserve(this.el.nativeElement, OBSERVER_OPTIONS);
  }
}
