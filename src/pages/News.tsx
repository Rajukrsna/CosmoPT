import React, { useState, useEffect } from 'react';
import { ExternalLink, Calendar, Clock, TrendingUp, Rocket, Satellite, Globe } from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  publishedDate: string;
  source: string;
  category: 'mission' | 'discovery' | 'technology' | 'research';
  imageUrl: string;
  readTime: string;
}

// Mock space news data - in a real app, this would come from a space news API
const mockNewsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'James Webb Space Telescope Discovers Most Distant Galaxy Ever Observed',
    summary: 'The James Webb Space Telescope has identified JADES-GS-z13-0, a galaxy that existed just 325 million years after the Big Bang, breaking previous distance records and providing unprecedented insights into the early universe.',
    publishedDate: '2025-01-15',
    source: 'NASA',
    category: 'discovery',
    imageUrl: 'https://images.pexels.com/photos/87009/earth-soil-creep-moon-lunar-surface-87009.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '4 min read'
  },
  {
    id: '2',
    title: 'SpaceX Successfully Launches Artemis III Crew Module Test',
    summary: 'SpaceX conducted a successful uncrewed test flight of the Artemis III crew module, demonstrating key life support systems and heat shield performance ahead of the planned Moon landing mission.',
    publishedDate: '2025-01-14',
    source: 'SpaceX',
    category: 'mission',
    imageUrl: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '3 min read'
  },
  {
    id: '3',
    title: 'Mars Perseverance Rover Confirms Ancient Microbial Life Evidence',
    summary: 'NASA\'s Perseverance rover has discovered compelling evidence of ancient microbial life in rock samples from Jezero Crater, marking a potential breakthrough in the search for life beyond Earth.',
    publishedDate: '2025-01-13',
    source: 'NASA JPL',
    category: 'discovery',
    imageUrl: 'https://images.pexels.com/photos/73873/mars-mars-rover-space-travel-robot-73873.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '5 min read'
  },
  {
    id: '4',
    title: 'European Space Agency Announces New Lunar Gateway Modules',
    summary: 'ESA has revealed plans for advanced habitation and laboratory modules for the Lunar Gateway station, featuring cutting-edge life support systems and scientific equipment for long-duration lunar missions.',
    publishedDate: '2025-01-12',
    source: 'ESA',
    category: 'technology',
    imageUrl: 'https://images.pexels.com/photos/2159/flight-sky-earth-space.jpg?auto=compress&cs=tinysrgb&w=800',
    readTime: '6 min read'
  },
  {
    id: '5',
    title: 'Breakthrough in Fusion Propulsion Could Revolutionize Deep Space Travel',
    summary: 'Researchers at MIT have achieved a major breakthrough in fusion-powered spacecraft propulsion, potentially reducing travel time to Mars from 9 months to just 6 weeks.',
    publishedDate: '2025-01-11',
    source: 'MIT',
    category: 'technology',
    imageUrl: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=800',
    readTime: '4 min read'
  },
  {
    id: '6',
    title: 'China\'s Tianwen-3 Mission to Return First Mars Samples to Earth',
    summary: 'China National Space Administration has announced the successful launch of Tianwen-3, aiming to be the first mission to return Martian soil samples to Earth by 2028.',
    publishedDate: '2025-01-10',
    source: 'CNSA',
    category: 'mission',
    imageUrl: 'https://images.pexels.com/photos/6985001/pexels-photo-6985001.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '3 min read'
  },
  {
    id: '7',
    title: 'Hubble Telescope Captures Spectacular Supernova Explosion in Nearby Galaxy',
    summary: 'The Hubble Space Telescope has captured stunning images of a Type Ia supernova in the Whirlpool Galaxy, providing valuable data about stellar evolution and cosmic distance measurements.',
    publishedDate: '2025-01-09',
    source: 'NASA Hubble',
    category: 'discovery',
    imageUrl: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '4 min read'
  },
  {
    id: '8',
    title: 'International Space Station to Get Revolutionary 3D Printing Laboratory',
    summary: 'NASA and ESA are collaborating on a new 3D printing facility for the ISS that will enable astronauts to manufacture complex tools and spare parts using recycled materials.',
    publishedDate: '2025-01-08',
    source: 'NASA',
    category: 'technology',
    imageUrl: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=800',
    readTime: '5 min read'
  }
];

export const News: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All News', icon: TrendingUp },
    { id: 'mission', name: 'Missions', icon: Rocket },
    { id: 'discovery', name: 'Discoveries', icon: Globe },
    { id: 'technology', name: 'Technology', icon: Satellite },
    { id: 'research', name: 'Research', icon: Globe },
  ];

  useEffect(() => {
    // Simulate API loading
    const loadNews = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setArticles(mockNewsArticles);
      setLoading(false);
    };

    loadNews();
  }, []);

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'mission': return Rocket;
      case 'discovery': return Globe;
      case 'technology': return Satellite;
      case 'research': return Globe;
      default: return TrendingUp;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'mission': return 'bg-purple-600/20 text-purple-400 border-purple-500/30';
      case 'discovery': return 'bg-green-600/20 text-green-400 border-green-500/30';
      case 'technology': return 'bg-blue-600/20 text-blue-400 border-blue-500/30';
      case 'research': return 'bg-orange-600/20 text-orange-400 border-orange-500/30';
      default: return 'bg-gray-600/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return formatDate(dateString);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Space News Feed
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Stay updated with the latest discoveries, missions, and breakthroughs from space agencies around the world.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-white/20 text-white border border-white/30'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 animate-pulse">
                <div className="bg-gray-600 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-600 h-4 rounded mb-2"></div>
                <div className="bg-gray-600 h-4 rounded mb-4 w-3/4"></div>
                <div className="bg-gray-600 h-16 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Featured Article */}
            {filteredArticles.length > 0 && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-12 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center space-x-4 mb-4">
                      <span className={`px-3 py-1 rounded-full border text-sm font-medium ${getCategoryColor(filteredArticles[0].category)}`}>
                        Featured
                      </span>
                      <span className="text-gray-400 text-sm">{filteredArticles[0].source}</span>
                    </div>
                    
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
                      {filteredArticles[0].title}
                    </h2>
                    
                    <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                      {filteredArticles[0].summary}
                    </p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-400 mb-6">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{getTimeAgo(filteredArticles[0].publishedDate)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{filteredArticles[0].readTime}</span>
                      </div>
                    </div>
                    
                    <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-red-600 px-6 py-3 rounded-xl font-semibold hover:from-orange-700 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-orange-500/25">
                      <span>Read Full Article</span>
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="relative">
                    <img
                      src={filteredArticles[0].imageUrl}
                      alt={filteredArticles[0].title}
                      className="w-full h-64 lg:h-80 object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
                  </div>
                </div>
              </div>
            )}

            {/* News Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.slice(1).map((article) => {
                const CategoryIcon = getCategoryIcon(article.category);
                return (
                  <article
                    key={article.id}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                  >
                    <div className="relative">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full border text-xs font-medium ${getCategoryColor(article.category)}`}>
                          <CategoryIcon className="inline h-3 w-3 mr-1" />
                          {article.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center space-x-4 text-xs text-gray-400 mb-3">
                        <span>{article.source}</span>
                        <span>•</span>
                        <span>{getTimeAgo(article.publishedDate)}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-white mb-3 leading-tight group-hover:text-orange-300 transition-colors">
                        {article.title}
                      </h3>
                      
                      <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                        {article.summary}
                      </p>
                      
                      <button className="inline-flex items-center space-x-1 text-orange-400 hover:text-orange-300 font-medium text-sm transition-colors group-hover:text-orange-300">
                        <span>Read more</span>
                        <ExternalLink className="h-3 w-3" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {filteredArticles.length === 0 && !loading && (
              <div className="text-center py-12">
                <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No articles found</h3>
                <p className="text-gray-400">Try selecting a different category to see more news.</p>
              </div>
            )}
          </>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Get the latest space news delivered directly to your inbox. Never miss a breakthrough discovery or mission update.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            <button className="bg-gradient-to-r from-orange-600 to-red-600 px-6 py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};