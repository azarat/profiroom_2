import { Component, OnInit, Input } from '@angular/core';
import { freelancerCheckpointConst } from './consts/frelancer-checkpoints.const';

@Component({
  selector: 'app-freelacer-achives',
  templateUrl: './freelacer-achives.component.html',
  styleUrls: ['./freelacer-achives.component.scss']
})
export class FreelacerAchivesComponent implements OnInit {

  @Input() achivements;

  public ranks = freelancerCheckpointConst;
  public currentRank: number;
  public prevRank: number;
  public nextRank: number;
  public moveTo: string = null;

  constructor() { }

  ngOnInit() {
    this.checkNeibourRanks();
  }

  private checkNeibourRanks() {
    this.currentRank = this.achivements.rank_id;
    this.prevRank = this.currentRank === 0 ? null : this.currentRank - 1;
    this.nextRank = this.currentRank === 4 ? null : this.currentRank + 1;
  }

  public moveCards(type: string) {
    this.moveTo = type;
  }


}
