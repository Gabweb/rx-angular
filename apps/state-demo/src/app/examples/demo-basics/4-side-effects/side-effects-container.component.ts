import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'side-effects-container',
  template: `
    <h1>Side Effects</h1>
    <small>Parent re-renders: {{ rerenders() }}</small><br />
    <mat-form-field>
      <label>RefreshInterval</label>
      <input
        type="number"
        (input)="refreshIntervalInput$.next($event)"
        matInput/>
    </mat-form-field>

    <side-effects-start [refreshInterval]="refreshInterval$ | async">
    </side-effects-start>
  `,
})
export class SideEffectsContainerComponent {
  refreshIntervalInput$ = new Subject<Event>();
  refreshInterval$ = this.refreshIntervalInput$.pipe(
    map((e: any) => e.target.value)
  );
  numRenders = 0;
  rerenders(): number {
    return ++this.numRenders;
  }
}