import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss']
})
export class ReposComponent implements OnInit {
  reposData = [];
  pagenumber: number;
  userrepos: any;
  paginationNumbers = [];
@Input() set repos(data: any) {
  console.log(data);
  this.userrepos = data.repos_url;
  this.getRepos(1);
}
  constructor(private appService: AppService) {
    this.pagenumber = 1;
  }

  ngOnInit() {
    for (let i = 1; i <= 10; i++) {
      this.paginationNumbers.push(i);
     }
  }
 // event to get repositories based on user
  getRepos(pageNo) {
    const url = `${this.userrepos}?page=${pageNo}`;
    this.appService.getReposByUser(url).subscribe((reposRes: any) => {
      console.log(reposRes);
      this.reposData = reposRes;
      if (this.reposData.length < 30) {
        for (let i = this.paginationNumbers.length ; i >= 0 ; i--) {
          if (this.pagenumber <= this.paginationNumbers[i]) {
            this.paginationNumbers.splice(this.paginationNumbers[i], 1);
         }
        }
      }
    });
  }
  // click event to get data based on  paage number
  pagination(item) {
    this.pagenumber = item;
  //  this.pageData = this.pagenumber * 30;
    this.getRepos(this.pagenumber);
  }
   // click event for previous icon
  prev() {
    this.pagenumber = this.pagenumber - 1;
    this.getRepos(this.pagenumber);
  }
   // click event for next icon
  next() {
    this.pagenumber = this.pagenumber + 1;
    this.getRepos(this.pagenumber);
  }
}
