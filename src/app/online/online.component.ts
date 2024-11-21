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
    window.addEventListener('resize', this.adjustContainerHeight);
  }

  event: any
  mainContainer: any
  viewportHeight: any

  viewportHeight1: any
  keyboardHeight: any
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.event = event
    this.adjustContainerHeight();
  }

  adjustContainerHeight() {
    this.mainContainer = document.getElementById('mainContainer');
    if (this.mainContainer) {
      this.viewportHeight = window.innerHeight;
      // this.mainContainer.style.height = `${this.viewportHeight}px`;
      this.mainContainer.style.height = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    }
    this.viewportHeight1 = window.visualViewport ? window.visualViewport.height : window.innerHeight;
 
    this.keyboardHeight = window.innerHeight - this.viewportHeight1;

  }

  goToOnline() {
    if (this.userName.trim() === '') return;
    else {
      this.router.navigate(['/chat'], { queryParams: { user: this.userName } });
    }
  }
}

