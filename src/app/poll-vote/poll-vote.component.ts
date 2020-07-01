import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import ApexCharts from 'apexcharts';
import { PollVote } from '../types';

@Component({
  selector: 'app-poll-vote',
  templateUrl: './poll-vote.component.html',
  styleUrls: ['./poll-vote.component.scss'],
})
export class PollVoteComponent implements AfterViewInit {
  voteForm: FormGroup;
  @Input() voted: boolean;
  @Input() options: string[];
  @Input() results: number[];
  @Input() questions: string[];
  @Input() id: number;

  @Output() pollVoted: EventEmitter<PollVote> = new EventEmitter();

  // options = ['Lundi', 'Mardi', 'Mecredi', 'Jeudi', 'Vendredi'];
  constructor(private fb: FormBuilder) {
    this.voteForm = this.fb.group({
      selected: this.fb.control('', [Validators.required]),
    });
  }

  ngAfterViewInit(): void {
    if (this.voted) {
      this.generateChart();
    }
  }

  submitForm() {
    const pollVoted: PollVote = {
      id: this.id,
      vote: this.voteForm.get('selected').value,
    };

    this.pollVoted.emit(pollVoted);
  }

  generateChart() {
    const options: ApexCharts.ApexOptions = {
      series: [
        {
          data: this.results,
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          columnWidth: '45px',
          distributed: true,
        },
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: this.options,
      },
    };

    const chart = new ApexCharts(
      document.getElementById('poll-results'),
      options
    );
    chart.render();
  }
}
