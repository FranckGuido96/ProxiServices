export interface NewReview {
  rating: number;
  comment: string;
}

export interface PendingReview extends NewReview {
  id: string;
}