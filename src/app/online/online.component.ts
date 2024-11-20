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

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.adjustMainContainerHeight();
  }

  ngOnInit(): void {
    this.adjustMainContainerHeight();
  }

  goToOnline() {
    if (this.userName.trim() === '') return;
    else {
      this.router.navigate(['/chat'], { queryParams: { user: this.userName } });
    }
  }
  mainContainer: any
  viewportHeight: any
  keyboardHeight: any

  private adjustMainContainerHeight() {
    this.mainContainer = document.querySelector('.container') as HTMLElement;

    this.viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;

    this.keyboardHeight = window.innerHeight - this.viewportHeight;
  

    if (this.keyboardHeight > 0) {
      this.mainContainer.style.height = `calc(100vh - ${this.keyboardHeight}px)`;
    } else {
      this.mainContainer.style.height = 'calc(100vh - 2px)';
    }
  }
}

