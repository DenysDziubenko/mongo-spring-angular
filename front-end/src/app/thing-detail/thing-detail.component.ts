import {Component, OnInit, Input} from '@angular/core';
import {Thing} from '../thing';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ThingService} from '../thing.service';
import {flatMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-thing-detail',
  templateUrl: './thing-detail.component.html',
  styleUrls: ['./thing-detail.component.scss']
})
export class ThingDetailComponent {

  public thing$: Observable<Thing> = this.route.paramMap
    .pipe(flatMap(paramMap => this.thingService.getThing(paramMap.get('id'))));

  constructor(
    private route: ActivatedRoute,
    private thingService: ThingService,
    private location: Location
  ) {
  }

  save(thing: Thing): void {
    this.thingService.updateThing(thing).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
