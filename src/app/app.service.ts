import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  httpheaders: any;
  constructor(private http: HttpClient) {
    this.httpheaders = {
      Accept: 'application/vnd.github.cloak-preview'
    };
  }
  // https://api.github.com/search/users?q=a&page=2
  getAllUsers(page) {
    // this.headers('GET');
    const url = `https://api.github.com/users?since=${page}`;
    return this.http.get(url, { headers: this.httpheaders });
  }
  getUserBySearch(obj) {
    const url = `https://api.github.com/users/${obj}`;
    return this.http.get(url, { headers: this.httpheaders });
  }
  getUsersSearch(obj, pageNo) {
    const url = `https://api.github.com/search/users?q=${obj}&page=${pageNo}`;
    return this.http.get(url, { headers: this.httpheaders });
  }
  getReposByUser(url) {
   // const url = `https://api.github.com/users/${obj}`;
    return this.http.get(url, { headers: this.httpheaders });
  }
}
