import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LotteryService } from 'src/app/core/services/lottery.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'cl-lottery-success',
  templateUrl: './lottery-success.component.html',
  styleUrls: ['./lottery-success.component.scss'],
})
export class LotterySuccessComponent implements OnInit, OnDestroy {
  name = '';
  userID = null;
  lotteryCount = 0;
  showContent = false;

  storeSub!: Subscription;

  constructor(
    private lotteryService: LotteryService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getLotteriesCount();
    this.getLotteryID();
  }

  /**
   * Get lottery ID from route parameters
   */
  getLotteryID(): void {
    this.route.params.subscribe((params: Params) => {
      this.userID = params['userID'];
      this.getLotteryData(params['lotteryID']);
    });
  }

  /**
   * Get lottery data from backend
   * @param lotterID Lottery ID
   */
  getLotteryData(lotterID: number): void {
    this.lotteryService.getLotteryData(lotterID).subscribe(
      (response: any) => {
        this.name = response.firstName + ' ' + response.middleName;
        this.showContent = true;
        // this.clearToken();
      },
      (error) => {
        this.openSnackBar('An error occurred getting data. Please try again.', 'close');
        this.router.navigate(['/contact']);
      }
    );
  }

  /**
   * Clear localstorage
   */
  clearToken(): void {
    this.authService.removeToken();
  }

  /**
   * Get lotteries count
   */
  getLotteriesCount(): void {
    this.lotteryService.getLotteryCount().subscribe(
      (data: number) => {
        this.lotteryCount = data;
      },
      (error: any) => {
        console.log('an error occurred');
      }
    );
  }

  /**
   * Open notification message
   * @param message content
   * @param action action name
   */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['cl-message'],
    });
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
