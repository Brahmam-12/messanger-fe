import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.css']
})
export class OnlineComponent implements OnInit {

  constructor(private router: Router) { }
  userName = '';

  ngOnInit(): void {
  }

  goToOnline() {
    if (this.userName.trim() === '') return;
    else {
      this.router.navigate(['/chat'], { queryParams: { user: this.userName } });
    }
  }
}

