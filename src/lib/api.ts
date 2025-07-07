// src/lib/api.ts

import { Post, User, CarSpecs, BlogPost, CarData } from './types';

const API_BASE = 'https://jsonplaceholder.typicode.com';

// Car-themed titles to match your figma
const carTitles = [
  "A Review Of Cars With Advanced Infotainment Systems",
  "A Deep Dive Into Sports Cars", 
  "Reviewing Cars With The Best Resale Value",
  "Electric Vehicles: The Future of Transportation",
  "Luxury Car Features That Define Modern Driving",
  "Hybrid Technology: Bridging Gas and Electric",
  "Performance Cars: Speed Meets Engineering",
  "SUVs vs Sedans: Which is Right for You?",
  "Classic Revival: Revisiting Iconic Cars Through Modern Reviews",
  "Maintenance Tips for Long-lasting Vehicles"
];

// Generate comprehensive car specs
const generateCarSpecs = (): CarSpecs => {
  const specs = [
    {
      modelYear: '2024', fuelType: 'Electric', topSpeed: '155 mph', price: '$65,000',
      engine: 'Dual Motor Electric', transmission: 'Single Speed', horsepower: '402 hp', torque: '486 lb-ft'
    },
    {
      modelYear: '2023', fuelType: 'Gasoline', topSpeed: '180 mph', price: '$45,000', 
      engine: 'V6 3.0L Turbo', transmission: '8-Speed Automatic', horsepower: '365 hp', torque: '384 lb-ft'
    },
    {
      modelYear: '2024', fuelType: 'Hybrid', topSpeed: '112 mph', price: '$35,000',
      engine: '2.5L Hybrid', transmission: 'CVT', horsepower: '219 hp', torque: '163 lb-ft'
    },
    {
      modelYear: '2023', fuelType: 'Gasoline', topSpeed: '200 mph', price: '$85,000',
      engine: 'V8 5.0L', transmission: '6-Speed Manual', horsepower: '526 hp', torque: '429 lb-ft'
    },
    {
      modelYear: '2024', fuelType: 'Diesel', topSpeed: '145 mph', price: '$55,000',
      engine: 'I6 3.0L Diesel', transmission: '8-Speed Automatic', horsepower: '280 hp', torque: '479 lb-ft'
    }
  ];
  
  return specs[Math.floor(Math.random() * specs.length)];
};

// Simple placeholder images that should always work
const generateCarImage = (id: number): string => {
  const imageId = 100 + (id % 50);
  return `https://picsum.photos/seed/car${imageId}/800/600`;
};

const calculateReadTime = (text: string): string => {
  const wordsPerMinute = 200;
  const words = text.split(' ').length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} Min Read`;
};

const categories = ['Car Reviews', 'Maintenance Tips', 'Car Modifications', 'Driving Tips', 'Electric Vehicles'];

export async function fetchPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${API_BASE}/posts`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

export async function fetchPost(id: number): Promise<Post> {
  try {
    const response = await fetch(`${API_BASE}/posts/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
}

export async function fetchUser(id: number): Promise<User> {
  try {
    const response = await fetch(`${API_BASE}/users/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await fetchPosts();
    const users = await Promise.all(
      Array.from(new Set(posts.map(post => post.userId))).map(userId => fetchUser(userId))
    );
    
    return posts.map((post, index) => ({
      ...post,
      title: carTitles[index % carTitles.length],
      author: users.find(user => user.id === post.userId)!,
      imageUrl: generateCarImage(post.id),
      specs: generateCarSpecs(),
      readTime: calculateReadTime(post.body),
      category: categories[index % categories.length],
      featured: index === 0 // First post is featured
    }));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
}

export async function fetchBlogPost(id: number): Promise<BlogPost> {
  try {
    const post = await fetchPost(id);
    const author = await fetchUser(post.userId);
    
    return {
      ...post,
      title: id === 1 ? "Classic Revival: Revisiting Iconic Cars Through Modern Reviews" : carTitles[(id - 1) % carTitles.length],
      author,
      imageUrl: generateCarImage(post.id),
      specs: generateCarSpecs(),
      readTime: calculateReadTime(post.body),
      category: categories[(id - 1) % categories.length]
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
}