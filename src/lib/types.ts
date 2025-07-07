// src/lib/types.ts

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface CarSpecs {
  modelYear: string;
  fuelType: string;
  topSpeed: string;
  price: string;
  engine: string;
  transmission: string;
  horsepower: string;
  torque: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface BlogPost extends Post {
  author: User;
  imageUrl: string;
  specs: CarSpecs;
  readTime: string;
  category: string;
  featured?: boolean;
}

export interface CarData {
  id: number;
  make: string;
  model: string;
  year: number;
  color: string;
  price: string;
  image: string;
  description: string;
}