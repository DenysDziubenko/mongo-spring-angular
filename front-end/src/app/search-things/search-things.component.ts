import {Component, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {ThingService} from '../thing.service';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-search-things',
  templateUrl: './search-things.component.html',
  styleUrls: ['./search-things.component.scss']
})
export class SearchThingsComponent implements OnInit {
  things$: Observable<any>;
  private searchTerms = new Subject<string>();

  constructor(private thingService: ThingService) {
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.things$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.thingService.searchThings(term)),
    );
  }

}
