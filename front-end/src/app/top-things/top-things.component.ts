import {Component, OnInit} from '@angular/core';
import {Thing} from '../thing';
import {ThingService} from '../thing.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-top-things',
  templateUrl: './top-things.component.html',
  styleUrls: ['./top-things.component.scss']
})
export class TopThingsComponent {

  public things$: Observable<Thing[]> = this.thingService.getThings()
    .pipe(map(things => things.sort((t1, t2) => t2.scores - t1.scores).slice(0, 9)));

  constructor(private thingService: ThingService) {}
}
