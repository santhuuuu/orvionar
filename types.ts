
export interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: string;
  videoUrl?: string;
  order: number;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  students: number;
  thumbnail: string;
  description: string;
  lessons: Lesson[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
