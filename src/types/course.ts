import { IMyDocument } from '~models/utils';

export enum ELevel {
  NONE,
  ALL_LEVELS,
  BEGINNER,
  INTERMEDIATE,
  EXPERT,
}

export enum ELanguage {
  NONE,
  VIETNAMESE,
  ENGLISH,
}

export enum EApprovalsStatus {
  NONE,
  ACCEPT,
  DENY,
  WATTING,
}

export enum ECourseStatus {
  NONE,
  WATTING,
  OPEN,
  CLOSE,
  FULL_ACCESS,
}

