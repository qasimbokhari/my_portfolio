export interface ProjectImage {
  folder: string;
  filename: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  thumbnail: ProjectImage;
  videos: string[] | null;
  gallery?: ProjectImage[];
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
