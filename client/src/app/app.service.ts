import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from './../environments/environment';

@Injectable()
export class AppService {
  private readonly apiUrl = (environment as any).apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Login to the service
   *
   * @param {string} phone The phone number
   * @return {Observable<any>}
   */
  public login(phone: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/+1${phone}`);
  }

  /**
   * Register a user
   *
   * @param {object} data The data packet of user information
   * @return {Observable<any>}
   */
  public register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/`, data);
  }
}
