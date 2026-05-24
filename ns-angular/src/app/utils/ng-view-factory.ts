import { ComponentRef, Injector, Type } from '@angular/core';
import { generateNativeScriptView } from '@nativescript/angular';
import { View } from '@nativescript/core';

/**
 * Renders standalone Angular components into raw NativeScript Views for slots
 * that don't accept Angular markup (e.g. iosBottomAccessory, native view
 * properties). Tracks refs by id so callers can tear them down with the host.
 */
export class NgViewFactory {
  private refs = new Map<string, ComponentRef<unknown>>();

  constructor(private parentInjector: Injector) {}

  create<T>(id: string, component: Type<T>): View {
    this.destroy(id);
    const injector = Injector.create({
      providers: [],
      parent: this.parentInjector,
    });
    const ngView = generateNativeScriptView(component, { injector });
    const ref = ngView.ref as ComponentRef<T>;
    // generateNativeScriptView's no-viewContainerRef path only attachView's the
    // hostView; it never runs initial CD. With OnPush + signals that means the
    // template stays unrendered until the first zone tick (a tap/scroll), which
    // shows up as blank text bindings on first paint. Force the initial pass.
    ref.changeDetectorRef.detectChanges();
    this.refs.set(id, ref as ComponentRef<unknown>);
    return ngView.firstNativeLikeView;
  }

  destroy(id: string): void {
    const ref = this.refs.get(id);
    if (ref) {
      ref.destroy();
      this.refs.delete(id);
    }
  }

  destroyAll(): void {
    for (const ref of this.refs.values()) {
      ref.destroy();
    }
    this.refs.clear();
  }
}
