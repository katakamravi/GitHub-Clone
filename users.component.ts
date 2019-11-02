import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  gitHubUsers = [];
  userName: string;
  error = false;
  errorMessage: string;
  paginationNumbers = [];
  pagenumber: number;
  pageData: any;
  user: any;
  switchRepos = false;
  constructor(private appservice: AppService, private route: Router) {
    this.userName = '';
    this.getusersData();
    this.pagenumber = 1;

  }
  ngOnInit() {
    // Adding pagination numbers
 for (let i = 1; i <= 10; i++) {
  this.paginationNumbers.push(i);
 }
  }
  // to get all github users
  getusersData() {
    this.appservice.getAllUsers(0).subscribe((data: any) => {
      this.error = false;
      console.log(data);
      this.gitHubUsers = data;
    });
  }
  // to get the data based on username
  userSearch() {
    this.appservice.getUserBySearch(this.userName).subscribe(searchData => {
      console.log(searchData);
      this.gitHubUsers = [];
      if (Object.keys(searchData).length > 0) {
        this.error = false;
        this.gitHubUsers.push(searchData);
      }
    },
      err => {
        if (err.status === 404) {
          this.error = true;
          this.errorMessage = `No Records Found For ${this.userName}`;
        }
      })
      ;
  }
  dataAdd() {
    if (this.userName === '') {
      this.getusersData();
    }
  }
  // click event to get data based on  page number
  pagination(item) {
    this.pagenumber = item;
    this.pageData = this.pagenumber * 30;
    this.appservice.getAllUsers(this.pageData).subscribe((data: any) => {
      this.error = false;
      console.log(data);
      this.gitHubUsers = data;
    });
  }
  // click event for previous icon
  prev() {
    this.pagenumber = this.pagenumber - 1;
    this.pageData =  this.gitHubUsers[0].id - 30;
    this.pagination(this.pagenumber);
  }
  // click event for next icon
  next() {
    this.pagenumber = this.pagenumber + 1;
    this.pageData =  this.gitHubUsers[this.gitHubUsers.length - 1].id;
    this.pagination(this.pagenumber);
  }
  backToUsers() {
  this.switchRepos = false;
  }
  routeToRepos(user) {
  this.switchRepos = true;
  this.user = user;
  }
}


