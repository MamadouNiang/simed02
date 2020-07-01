import { Component } from '@angular/core';
import { Poll, PollForm, PollVote } from './types';
import { PollService } from './poll service/poll.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showForm = false;
  ActivePoll: Poll = null;

  polls = this.ps.getPolls();

  constructor(private ps: PollService) {}

  ngOnInit() {
    this.ps.onEvent('PollCreated').subscribe(() => {
      this.polls = this.ps.getPolls();
    });
  }
//tiger deny lion shop glory shiver tiger burden mail mandate canyon neither
  setActivePoll(poll) {
    this.ActivePoll = null;
    setTimeout(() => {
      this.ActivePoll = poll;
    }, 100);
  }

  handlePollCreate(poll: PollForm) {
    this.ps.createPoll(poll);
  }

  handlePollVote(pollVoted: PollVote) {
    this.ps.vote(pollVoted.id, pollVoted.vote);
  }
}
