import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  NO_ERRORS_SCHEMA,
  OnDestroy,
  ViewChild,
  inject,
} from "@angular/core";
import {
  isAngularHmrRestoringRoute,
  NativeScriptCommonModule,
  PageRouterOutlet,
  RouterExtensions,
} from "@nativescript/angular";
import { Page } from "@nativescript/core";
import { NgViewFactory } from "../utils/ng-view-factory";
import { NowPlayingBarComponent } from "./now-playing-bar.component";

const TAB_OUTLETS: Array<{ outlet: string; path: string }> = [
  { outlet: "listenNowTab", path: "listen-now" },
  { outlet: "browseTab", path: "browse" },
  { outlet: "radioTab", path: "radio" },
  { outlet: "libraryTab", path: "library" },
  { outlet: "searchTab", path: "search" },
];

// Tab index survives HMR reboots via a global slot so the new TabView
// mounts on the user's previous tab (otherwise it would default back to 0).
const HMR_SELECTED_TAB_KEY = "__NS_HOME_SELECTED_TAB__";

@Component({
  selector: "ns-home",
  template: `
    <TabView
      #tabView
      [selectedIndex]="0"
      tabTextFontSize="11"
      selectedTabTextColor="#FF375F"
      (loaded)="onTabViewLoaded($event)"
      (selectedIndexChanged)="selectedIndexChange($event)"
    >
      <page-router-outlet
        *tabItem="{ title: 'Home', iconSource: 'sys://house.fill' }"
        name="listenNowTab"
      ></page-router-outlet>

      <page-router-outlet
        *tabItem="{ title: 'New', iconSource: 'sys://square.grid.2x2.fill' }"
        name="browseTab"
      ></page-router-outlet>

      <page-router-outlet
        *tabItem="{
          title: 'Radio',
          iconSource: 'sys://dot.radiowaves.left.and.right',
        }"
        name="radioTab"
      ></page-router-outlet>

      <page-router-outlet
        *tabItem="{
          title: 'Library',
          iconSource: 'sys://music.note.square.stack.fill',
        }"
        name="libraryTab"
      ></page-router-outlet>

      <page-router-outlet
        *tabItem="{
          title: 'Search',
          iconSource: 'sys://magnifyingglass',
          role: 'search',
        }"
        name="searchTab"
      ></page-router-outlet>
    </TabView>
  `,
  imports: [NativeScriptCommonModule, PageRouterOutlet],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild("tabView", { read: ElementRef }) tabViewElement!: ElementRef;

  private injector = inject(Injector);
  private page = inject(Page);
  private router = inject(RouterExtensions);
  private viewFactory = new NgViewFactory(this.injector);
  private initialized: Record<string, boolean> = {};
  private restoreTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    this.page.actionBarHidden = true;
  }

  onTabViewLoaded(args: { object: any }) {
    const tabView = args?.object;
    if (!tabView) return;
    // Guard against re-mount: NS fires `loaded` every time the view enters
    // the tree (incl. iOS scene activation). HMR also rebuilds HomeComponent,
    // which gives a fresh TabView identity — so this flag is per-instance,
    // not per-process, and resets naturally each HMR cycle.
    if (tabView.__nsAccessoryMounted) return;
    tabView.__nsAccessoryMounted = true;

    // Render NowPlayingBar into the TabView's iosBottomAccessory slot. We
    // wire this in `(loaded)` rather than `ngAfterViewInit` because
    // Angular's view-init hook can fire BEFORE the native UITabBarController
    // is fully attached — empirically the accessory occasionally renders
    // blank after an HMR cycle when set that early. `loaded` fires once
    // the NS view is in the tree and iOS has its viewControllers wired up,
    // which is the same timing Vue's `@loaded` and Solid's `onMount` land
    // at (both of those have shipped this pattern without the blank-after-
    // HMR symptom).
    const accessory = this.viewFactory.create(
      "nowPlayingBar",
      NowPlayingBarComponent,
    );

    tabView.iosBottomAccessory = accessory;
    tabView.iosTabBarMinimizeBehavior = "onScrollDown";
  }

  ngAfterViewInit() {
    const tabView: any = this.tabViewElement?.nativeElement;
    if (!tabView) return;

    this.initTab(tabView.selectedIndex ?? 0);

    // Restore the previously-selected tab AFTER the route replay has had
    // a chance to land content into every outlet. If we set
    // `tabView.selectedIndex` (or use [selectedIndex]="N") too early — at
    // input-binding or ngAfterViewInit time — the visible tab is the
    // user's previous one but its Frame hasn't received its Page yet, and
    // iOS rendering of the subsequent page push on the visible tab is
    // unreliable (content stays blank until the user taps a different tab
    // and back). Polling the restoring window covers that race: the
    // window stays open across the replay's NavigationEnd plus a 1s grace
    // period, by which time every captured outlet has activated.
    if (isAngularHmrRestoringRoute()) {
      const persisted = (globalThis as any)[HMR_SELECTED_TAB_KEY];
      if (
        typeof persisted === "number" &&
        persisted !== tabView.selectedIndex
      ) {
        const apply = () => {
          if (isAngularHmrRestoringRoute()) {
            this.restoreTimer = setTimeout(apply, 100);
            return;
          }
          if (tabView.selectedIndex !== persisted) {
            tabView.selectedIndex = persisted;
          }
        };
        this.restoreTimer = setTimeout(apply, 100);
      }
    }
  }

  selectedIndexChange(args: any) {
    const tabView = args?.object;
    if (!tabView) return;
    // While the HMR replay is settling the TabView fires its own
    // selectedIndexChanged events (initial input pass, route replay's outlet
    // activation re-driving UITabBarController). Recording any of those
    // would clobber the persisted slot with framework-driven noise — only
    // user-driven changes after the restore window closes should update it.
    if (!isAngularHmrRestoringRoute()) {
      (globalThis as any)[HMR_SELECTED_TAB_KEY] = tabView.selectedIndex;
    }
    this.initTab(tabView.selectedIndex);
  }

  private initTab(index: number) {
    const entry = TAB_OUTLETS[index];
    if (!entry || this.initialized[entry.outlet]) return;
    // During HMR route replay the framework will navigate to the captured
    // URL itself; firing a default navigation here would clobber the
    // restored outlet state and produce a non-recoverable white screen
    // (most visible when the active tab is the one being edited).
    if (isAngularHmrRestoringRoute()) return;
    this.initialized[entry.outlet] = true;
    this.router.navigate(["/", { outlets: { [entry.outlet]: [entry.path] } }], {
      animated: false,
    });
  }

  ngOnDestroy() {
    this.viewFactory.destroyAll();
    if (this.restoreTimer !== undefined) {
      clearTimeout(this.restoreTimer);
      this.restoreTimer = undefined;
    }
  }
}
