import {Component, OnInit} from '@angular/core';
import {Thing} from '../thing';
import {ThingService} from '../thing.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-things',
  templateUrl: './things.component.html',
  styleUrls: ['./things.component.scss']
})
export class ThingsComponent implements OnInit {

  public things: Thing[] = [];

  constructor(private thingService: ThingService) {
  }

  ngOnInit() {
    this.getThings();
  }

  getThings(): void {
    this.thingService.getThings()
      .pipe(map(things => things.sort((t1, t2) => t2.scores - t1.scores)))
      .subscribe(things => this.things = things);
  }

  add(name: string, score: string, description: string): void {
    name = name.trim();
    const scores = +score.trim();
    description = description.trim();
    if (!name) {
      return;
    }
    this.thingService.addThing({name, scores, description} as Thing)
      .subscribe(thing => {
        this.things.push(thing);
        this.things = this.things.sort((t1, t2) => t2.scores - t1.scores);
      });

  }

  delete(thing: Thing): void {
    this.things = this.things.filter(t => t !== thing);
    this.thingService.deleteThing(thing).subscribe();
  }

}
