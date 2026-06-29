export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  videos: string[] | null;
  gallery?: string[];
}

export interface Testimonial {
  id: number;
  text: string;
  author: string;
  role: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  message: string;
}
