export interface IRecommend {
  result: Result;
}

export interface Result {
  courses: Course[];
  messages: string;
  status: string;
}

export interface Course {
  done: string[];
  maintype: string;
  percent: string;
  recommend: string[];
}
