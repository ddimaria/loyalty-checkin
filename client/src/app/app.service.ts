import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from './../environments/environment';

export interface ICheckins {
  phone: string;
  date: string;
}

export interface IUser {
  phone: string;
  firstName: string;
  lastName: string;
  email: string;
  checkins: ICheckins[];
  points: number;
}

@Injectable()
export class AppService {
  private readonly apiUrl = (environment as any).apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Login to the service
   *
   * @param {string} phone The phone number
   * @return {Observable<IUser[]>}
   */
  public login(phone: string): Observable<IUser[]> {
    return <Observable<IUser[]>>this.http.get(`${this.apiUrl}/users/+1${phone}`);
  }

  /**
   * Register a user
   *
   * @param {object} data The data packet of user information
   * @return {Observable<IUser[]>}
   */
  public register(data: any): Observable<IUser[]> {
    return <Observable<IUser[]>>this.http.post(`${this.apiUrl}/users/`, data);
  }
}
