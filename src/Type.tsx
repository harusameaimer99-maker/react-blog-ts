
export interface Submission {
  id: string;
  title: string;
  createdAt: string;
  content: string; 
}


export interface SubmissionResponse {
  posts: Submission[];
}


export interface PostDetailResponse {
  post: Submission;
}


export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

