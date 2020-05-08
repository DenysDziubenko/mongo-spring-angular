import {Injectable} from '@angular/core';
import {Thing} from './thing';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable()
export class ThingService {

  private thingsUrl = 'api/things';

  constructor(
    private http: HttpClient) {
  }

  getThings(): Observable<Thing[]> {
    return this.http.get<Thing[]>(this.thingsUrl);
  }

  getThing(id: string): Observable<Thing> {
    return this.http.get<Thing>(`${this.thingsUrl}/${id}`);
  }

  updateThing(thing: Thing): Observable<any> {
    return this.http.put(this.thingsUrl, thing, httpOptions);
  }

  addThing(thing: Thing): Observable<Thing> {
    return this.http.post<Thing>(this.thingsUrl, thing, httpOptions);
  }

  deleteThing(thing: Thing | number): Observable<Thing> {
    const id = typeof thing === 'number' ? thing : thing.id;
    return this.http.delete<Thing>(`${this.thingsUrl}/${id}`, httpOptions);
  }

  searchThings(term: string): Observable<Thing[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Thing[]>(this.thingsUrl + `?name=${term}`);
  }
}

