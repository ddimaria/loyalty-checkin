import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from './../environments/environment';

@Injectable()
export class AppService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public static getInitialState(): any {
    return {
      authenticated: false,
      data: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        checkins: [],
        points: 0,
        error: '',
      }
    };
  }

  public login(phone: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/+1${phone}`);
  }

  public register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/`, data);
  }
}
