import {
  AfterViewInit,
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Injector,
  NO_ERRORS_SCHEMA,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import { ComponentPortal, NativeScriptCommonModule, NativeScriptDomPortalOutlet } from '@nativescript/angular';
import { GridLayout, Page } from '@nativescript/core';
import { ListenNowComponent } from '../screens/listen-now.component';
import { BrowseComponent } from '../screens/browse.component';
import { RadioComponent } from '../screens/radio.component';
import { LibraryComponent } from '../screens/library.component';
import { SearchComponent } from '../screens/search.component';
import { NowPlayingBarComponent } from './now-playing-bar.component';

@Component({
  selector: 'ns-home',
  template: `
    <TabView
      #tabView
      [selectedIndex]="0"
      tabTextFontSize="11"
      selectedTabTextColor="#FF375F"
    >
      <Frame *tabItem="{ title: 'Home', iconSource: 'sys://house.fill' }">
        <Page>
          <ActionBar title="Listen Now" iosLargeTitle="true">
            <ActionItem icon="sys://person.crop.circle.fill" (loaded)="setRightPos($event)"></ActionItem>
          </ActionBar>
          <ns-listen-now></ns-listen-now>
        </Page>
      </Frame>

      <Frame *tabItem="{ title: 'New', iconSource: 'sys://square.grid.2x2.fill' }">
        <Page>
          <ActionBar title="New" iosLargeTitle="true">
            <ActionItem icon="sys://person.crop.circle.fill" (loaded)="setRightPos($event)"></ActionItem>
          </ActionBar>
          <ns-browse></ns-browse>
        </Page>
      </Frame>

      <Frame *tabItem="{ title: 'Radio', iconSource: 'sys://dot.radiowaves.left.and.right' }">
        <Page>
          <ActionBar title="Radio" iosLargeTitle="true">
            <ActionItem icon="sys://person.crop.circle.fill" (loaded)="setRightPos($event)"></ActionItem>
          </ActionBar>
          <ns-radio></ns-radio>
        </Page>
      </Frame>

      <Frame *tabItem="{ title: 'Library', iconSource: 'sys://music.note.square.stack.fill' }">
        <Page>
          <ActionBar title="Library" iosLargeTitle="true">
            <ActionItem icon="sys://person.crop.circle.fill" (loaded)="setRightPos($event)"></ActionItem>
          </ActionBar>
          <ns-library></ns-library>
        </Page>
      </Frame>

      <Frame *tabItem="{ title: 'Search', iconSource: 'sys://magnifyingglass', role: 'search' }">
        <Page>
          <ActionBar title="Search" iosLargeTitle="true"></ActionBar>
          <ns-search></ns-search>
        </Page>
      </Frame>
    </TabView>
  `,
  imports: [
    NativeScriptCommonModule,
    ListenNowComponent,
    BrowseComponent,
    RadioComponent,
    LibraryComponent,
    SearchComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('tabView', { read: ElementRef }) tabViewElement!: ElementRef;

  private injector = inject(Injector);
  private appRef = inject(ApplicationRef);
  private page = inject(Page);
  private portalOutlet?: NativeScriptDomPortalOutlet;

  constructor() {
    this.page.actionBarHidden = true;
  }

  setRightPos(args: any) {
    const obj = args?.object;
    if (obj?.ios) obj.ios.position = 'right';
  }

  ngAfterViewInit() {
    const tabView: any = this.tabViewElement?.nativeElement;
    if (!tabView) return;

    // Render NowPlayingBar into a real NS GridLayout via NS Angular's portal
    // outlet (same pattern NativeDialog uses for modals). This gives the bar
    // a stable NS parent in the view tree, which is what solid/vue end up
    // with implicitly — without it, shared-transition cleanup after an
    // interactive dismiss can blank the accessory.
    const accessory = new GridLayout();
    this.portalOutlet = new NativeScriptDomPortalOutlet(
      accessory,
      // ComponentFactoryResolver is still accepted by the outlet on this
      // Angular version; it falls back to the component's own factory.
      this.injector.get(ComponentFactoryResolver),
      this.appRef,
      this.injector
    );
    this.portalOutlet.attach(new ComponentPortal(NowPlayingBarComponent));

    tabView.iosBottomAccessory = accessory;
    tabView.iosTabBarMinimizeBehavior = 'onScrollDown';
  }

  ngOnDestroy() {
    this.portalOutlet?.dispose();
    this.portalOutlet = undefined;
  }
}
