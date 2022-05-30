import { Component, OnInit } from '@angular/core';
import { LotteryService } from '../../services/lottery.service';

@Component({
  selector: 'cl-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  lotteryCount = 0;

  constructor(private lotteryService: LotteryService) { }

  ngOnInit(): void {
    this.getLotteriesCount();
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

}
