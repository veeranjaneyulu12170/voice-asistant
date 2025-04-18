export type JobStatus = 'applied' | 'interviewing' | 'offered' | 'rejected' | 'accepted';

export interface Interview {
  id: string;
  date: string;
  type: 'phone' | 'video' | 'onsite';
  notes: string;
}

export interface Attachment {
  id: string;
  type: 'resume' | 'coverLetter' | 'other';
  name: string;
  url: string;
}

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  status: JobStatus;
  dateApplied: string;
  notes: string;
  url?: string;
  salary?: string;
  location?: string;
  interviews: Interview[];
  attachments: Attachment[];
  reminders: string[];
}

export interface JobStats {
  total: number;
  byStatus: Record<JobStatus, number>;
  byMonth: Record<string, number>;
}