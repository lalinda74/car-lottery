import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private router: Router) {
    let sessionID = localStorage.getItem('sessionID');
    if (sessionID === null) {
      sessionID = this.generateSessionID();
      localStorage.setItem('sessionID', sessionID);
    }
    this.router.navigate(['/contact']);
  }

  /**
   * Generate an unique session ID
   * @returns Session ID
   */
  generateSessionID (): string {
    return Math.random().toString(36).substr(2, 9);
  };
}
