import { Component, OnInit } from '@angular/core';
import { ArbitrationService } from './services/arbitration.service';

@Component({
  selector: 'app-arbitration-page',
  templateUrl: './arbitration-page.component.html',
  styleUrls: ['./arbitration-page.component.scss']
})
export class ArbitrationPageComponent implements OnInit {

  public arbitrationList: any[];
  public messages: any[] = null;
  public dealInArbitration: any;

  public arbitrForm : {
    deal_id: number,
    vinner_id: number,
    loser_id: number,
    messageText: string
  } = {
    deal_id: null,
    vinner_id: null,
    loser_id: null,
    messageText: null
  }
  constructor(
    private arbitrationService: ArbitrationService
  ) { }

  ngOnInit() {
    this.getArbitrationList();
  }

  private getArbitrationList() {
    this.arbitrationService.getArbitrationsList()
    .subscribe((res: any) => {
      this.arbitrationList = res;
      console.log(res)
    })
  }

  public openDeal(deal: any) {
    this.arbitrationService.lookOnDeal(deal.roomId)
    .subscribe((res: any) => {
      this.messages = res;
      this.dealInArbitration = deal;
      this.arbitrForm.deal_id = deal.id;
    })
  }
  public WinerIs(id: number) {
    this.arbitrForm.vinner_id = id;
    this.arbitrForm.loser_id = this.arbitrForm.vinner_id === this.dealInArbitration.freelancer_id?
    this.dealInArbitration.customer_id : this.dealInArbitration.freelancer_id;
  }
  public closeDeal() {
    this.messages = null;
    this.dealInArbitration  = null;
  }

  public makeArbitration() {
    console.log(this.arbitrForm)

    this.arbitrationService.makeArbitration(this.arbitrForm)
    .subscribe(res=> {
      if(res === 'ok') {
        this.arbitrationList = this.arbitrationList.filter((el) => {
          return el.deal_id !== this.arbitrForm.deal_id;
        });
        this.closeDeal();
      }
    });

  }

}
