export interface Poll extends PollForm {
  id: number; //12
  results: number[]; //[0,1,2,3,2,2,2,2,]
  voted: boolean;
}

export interface PollForm {
  question: string; //wich days of week you like most?
  options: string[]; //['lundi,....]
  thumbnail: string; //http:image,png
}

export interface PollVote {
  id: number;
  vote: number;
}

export interface Voter {
  id: string; //hash
  voted: number[]; //[12]
}
