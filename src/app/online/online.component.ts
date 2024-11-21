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
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.adjustContainerHeight();
  }

  adjustContainerHeight() {
    const mainContainer = document.getElementById('mainContainer');
    if (mainContainer) {
      const viewportHeight = window.innerHeight;
      mainContainer.style.height = `${viewportHeight}px`;
    }
  }

  goToOnline() {
    if (this.userName.trim() === '') return;
    else {
      this.router.navigate(['/chat'], { queryParams: { user: this.userName } });
    }
  }
}

