export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  videos: string[] | null;
  gallery?: string[];
  forceMuted?: boolean; // If true, video audio is permanently muted (e.g., due to licensed background music)
}

export interface Testimonial {
  id: number;
  text: string;
  author: string;
  role: string;
  rating?: number;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  message: string;
}
