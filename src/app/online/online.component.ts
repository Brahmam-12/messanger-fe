import { Component, OnInit, HostListener } from '@angular/core';
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
    this.adjustContainerHeight();
    window.addEventListener('resize', this.adjustContainerHeight.bind(this));
  }

  event: any
  mainContainer: any
  viewportHeight: any

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    console.log(event)  
    this.event = event
    this.adjustContainerHeight();
  }

  adjustContainerHeight() {
    this.mainContainer = document.getElementById('mainContainer');
    if (this.mainContainer) {
      this.viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
      this.mainContainer.style.height = `${this.viewportHeight}px`;
      document.body.style.height = `${this.viewportHeight}px`;
    }
  }

  goToOnline() {
    if (this.userName.trim() === '') return;
    else {
      this.router.navigate(['/chat'], { queryParams: { user: this.userName } });
    }
  }
}

