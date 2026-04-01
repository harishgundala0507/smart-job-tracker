import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchMockApplications = async () => {
  try {
    // The PRD requests using https://dummyjson.com/products as mock job listings
    const response = await apiClient.get('/products?limit=10');
    
    // Transform products into dummy job applications
    return response.data.products.map((product, index) => {
      // Create some random varying statuses and platforms
      const statuses = ['Applied', 'Interviewing', 'Offer', 'Rejected'];
      const platforms = ['LinkedIn', 'Company Career Page', 'Referral', 'Indeed'];
      const locations = ['Remote', 'New York, NY', 'San Francisco, CA', 'London, UK', 'Berlin, Germany'];
      
      return {
        id: product.id.toString(),
        company: product.brand || 'Tech Corp',
        role: `${product.title} Engineer`,
        location: locations[index % locations.length],
        salary: product.price * 1000,
        platform: platforms[index % platforms.length],
        status: statuses[index % statuses.length],
        appliedDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
        interviewDate: index % 3 === 0 ? new Date(Date.now() + Math.floor(Math.random() * 5000000000)).toISOString() : null,
        notes: product.description,
        bookmarked: index % 4 === 0
      };
    });
  } catch (error) {
    console.error("Error fetching mock applications", error);
    return [];
  }
};

export const getCompanyLogo = (domain) => {
  // PRD requests using clearbit logo API
  return `https://logo.clearbit.com/${domain}`;
};
