
export interface Project {
  slug: string;
  title: string;
  tag: string;
  client: string;
  expertise: string[];
  date: string;
  coverImage: string;
  images: string[];
  description: string;
  mission: string;
  liveUrl?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  category: 'Design' | 'Technology' | 'Product' | 'Manager';
  avatar: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  company: string;
  avatar: string;
}

export interface Plan {
    name: string;
    price: string;
    description: string;
    features: string[];
}

export interface AddOn {
    name: string;
    price: string;
    description: string;
    applicableTo?: string[]; // which plans it applies to
}
