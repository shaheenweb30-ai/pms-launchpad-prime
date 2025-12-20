import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Menu, X, Search, Calendar, User, ArrowRight, Tag } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { useLanguageNavigation } from '@/hooks/useLanguageNavigation';

const Blog = () => {
  const { t, i18n } = useTranslation();
  const { getLocalizedPath } = useLanguageNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const isRTL = i18n.language === 'ar';

  const categories = [
    { key: "all", labelKey: "blog.allCategories" },
    { key: "Property Management", labelKey: "blog.propertyManagement" },
    { key: "Technology", labelKey: "blog.technology" },
    { key: "Tips & Tricks", labelKey: "blog.tipsTricks" },
    { key: "Industry News", labelKey: "blog.industryNews" },
    { key: "Case Studies", labelKey: "blog.caseStudies" }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Features Every Property Management Software Should Have",
      excerpt: "Discover the must-have features that can transform your property management workflow and help you stay ahead of the competition.",
      author: "Shaheen Eied Al Kadri",
      date: "March 15, 2024",
      category: "Property Management",
      readTime: "5 min read",
      image: "📊"
    },
    {
      id: 2,
      title: "How AI is Revolutionizing Property Management",
      excerpt: "Explore how artificial intelligence is changing the landscape of property management, from predictive maintenance to automated tenant screening.",
      author: "Michael Chen",
      date: "March 10, 2024",
      category: "Technology",
      readTime: "8 min read",
      image: "🤖"
    },
    {
      id: 3,
      title: "5 Tips for Streamlining Rent Collection",
      excerpt: "Learn proven strategies to make rent collection faster, easier, and more efficient for both property managers and tenants.",
      author: "Emily Rodriguez",
      date: "March 5, 2024",
      category: "Tips & Tricks",
      readTime: "6 min read",
      image: "💰"
    },
    {
      id: 4,
      title: "The Future of Smart Buildings in Property Management",
      excerpt: "How IoT devices and smart building technology are creating new opportunities for property managers to enhance tenant experience.",
      author: "David Kim",
      date: "February 28, 2024",
      category: "Technology",
      readTime: "7 min read",
      image: "🏢"
    },
    {
      id: 5,
      title: "Property Management Trends to Watch in 2024",
      excerpt: "Stay ahead of the curve with our comprehensive overview of the latest trends shaping the property management industry this year.",
      author: "Shaheen Eied Al Kadri",
      date: "February 20, 2024",
      category: "Industry News",
      readTime: "10 min read",
      image: "📈"
    },
    {
      id: 6,
      title: "How PropertyFlow Helped a Small Business Scale to 100+ Properties",
      excerpt: "A real-world case study showing how one property management company used PropertyFlow to grow from 10 to 100+ properties.",
      author: "Emily Rodriguez",
      date: "February 15, 2024",
      category: "Case Studies",
      readTime: "12 min read",
      image: "📚"
    },
    {
      id: 7,
      title: "Best Practices for Tenant Communication",
      excerpt: "Effective communication strategies that can improve tenant satisfaction and reduce conflicts in your property management business.",
      author: "David Kim",
      date: "February 10, 2024",
      category: "Tips & Tricks",
      readTime: "6 min read",
      image: "💬"
    },
    {
      id: 8,
      title: "Understanding Property Management Regulations in 2024",
      excerpt: "A comprehensive guide to the latest regulations and compliance requirements that property managers need to know.",
      author: "Shaheen Eied Al Kadri",
      date: "February 5, 2024",
      category: "Industry News",
      readTime: "9 min read",
      image: "📋"
    },
    {
      id: 9,
      title: "Maximizing ROI with Data-Driven Property Management",
      excerpt: "Learn how to leverage data analytics to make better decisions, optimize operations, and increase your property portfolio's return on investment.",
      author: "Michael Chen",
      date: "January 30, 2024",
      category: "Property Management",
      readTime: "8 min read",
      image: "📊"
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === null || 
      selectedCategory === "all" || 
      post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`min-h-screen bg-white ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to={getLocalizedPath('/')} className={`flex items-center ${isRTL ? 'flex-row-reverse space-x-reverse space-x-3 order-3' : 'space-x-3'}`}>
              <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center text-white font-medium text-lg">
                P
              </div>
              <span className="text-2xl font-light tracking-tight font-google-sans">PropertyFlow</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse space-x-12 order-2' : 'space-x-12'}`}>
              <Link to={getLocalizedPath('/about')} className="text-gray-500 hover:text-black transition-colors font-light">{t('homepage.footer.about')}</Link>
              <Link to={getLocalizedPath('/pricing')} className="text-gray-500 hover:text-black transition-colors font-light">{t('homepage.footer.pricing')}</Link>
              <Link to={getLocalizedPath('/careers')} className="text-gray-500 hover:text-black transition-colors font-light">{t('homepage.footer.careers')}</Link>
              <Link to={getLocalizedPath('/blog')} className="text-gray-500 hover:text-black transition-colors font-light">{t('homepage.footer.blog')}</Link>
              <Link to={getLocalizedPath('/contact')} className="text-gray-500 hover:text-black transition-colors font-light">{t('homepage.footer.contact')}</Link>
            </nav>

            {/* Auth Buttons */}
            <div className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse space-x-6 order-1' : 'space-x-6'}`}>
              <LanguageSwitcher />
              <Link to={getLocalizedPath('/signin')}>
                <Button variant="ghost" className="text-gray-500 hover:text-black font-light">
                  {t('homepage.footer.signIn')}
                </Button>
              </Link>
              <Link to={getLocalizedPath('/signup')}>
                <Button className="px-6">
                  {t('homepage.hero.startTrial')}
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <Link to={getLocalizedPath('/about')} className="text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setIsMenuOpen(false)}>{t('homepage.footer.about')}</Link>
                <Link to={getLocalizedPath('/pricing')} className="text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setIsMenuOpen(false)}>{t('homepage.footer.pricing')}</Link>
                <Link to={getLocalizedPath('/careers')} className="text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setIsMenuOpen(false)}>{t('homepage.footer.careers')}</Link>
                <Link to={getLocalizedPath('/blog')} className="text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setIsMenuOpen(false)}>{t('homepage.footer.blog')}</Link>
                <Link to={getLocalizedPath('/contact')} className="text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setIsMenuOpen(false)}>{t('homepage.footer.contact')}</Link>
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  <div className="px-2">
                    <LanguageSwitcher />
                  </div>
                  <Link to={getLocalizedPath('/signin')} onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className={`w-full ${isRTL ? 'justify-end' : 'justify-start'} text-gray-600 hover:text-gray-900`}>
                      {t('homepage.footer.signIn')}
                    </Button>
                  </Link>
                  <Link to={getLocalizedPath('/signup')} onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      {t('homepage.hero.startTrial')}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Back Button */}
          <Link to={getLocalizedPath('/')}>
            <Button 
              variant="ghost" 
              className={`mb-8 text-gray-500 hover:text-black font-light ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <ArrowLeft className={`h-4 w-4 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
              {t('pricing.backToHome')}
            </Button>
          </Link>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extralight text-black mb-6 tracking-tight font-google-sans">
              {t('blog.latestPosts')}
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed mb-8">
              {t('blog.subtitle')}
            </p>
            
            {/* Search Bar */}
            <div className={`max-w-2xl mx-auto relative mb-8 ${isRTL ? 'rtl' : 'ltr'}`}>
              <Search className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400`} />
              <Input
                type="text"
                placeholder={t('blog.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-6 rounded-full font-light text-lg`}
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key === "all" ? null : category.key)}
                  className={`px-6 py-2 rounded-full font-light transition-colors ${
                    (selectedCategory === null && category.key === "all") || selectedCategory === category.key
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {t(category.labelKey)}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Posts */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 font-light text-lg">{t('blog.noArticles')}</p>
              <Button 
                variant="ghost" 
                className="mt-4 font-light"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                }}
              >
                {t('blog.clearFilters')}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article 
                  key={post.id}
                  className="bg-white rounded-3xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-colors group cursor-pointer"
                >
                  <div className="aspect-video bg-gray-100 flex items-center justify-center text-6xl">
                    {post.image}
                  </div>
                  <div className="p-6">
                    <div className={`flex items-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Tag className="h-4 w-4 text-gray-400" />
                      <span className="text-xs text-gray-500 font-light">{post.category}</span>
                    </div>
                    <h2 className="text-xl font-light text-black mb-3 group-hover:text-gray-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed font-light text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className={`flex items-center justify-between text-xs text-gray-500 font-light mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex items-center ${isRTL ? 'flex-row-reverse space-x-reverse space-x-4' : 'gap-4'}`}>
                        <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''} gap-1`}>
                          <User className="h-3 w-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''} gap-1`}>
                          <Calendar className="h-3 w-3" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                    <button className={`flex items-center text-black font-light text-sm hover:text-gray-600 transition-colors group/btn ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {t('blog.readMore')}
                      <ArrowRight className={`h-4 w-4 ${isRTL ? 'mr-2 rotate-180 group-hover/btn:-translate-x-1' : 'ml-2 group-hover/btn:translate-x-1'} transition-transform`} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Load More / Pagination */}
          {filteredPosts.length > 0 && filteredPosts.length === blogPosts.length && (
            <div className="mt-12 text-center">
              <Button variant="outline" className="rounded-full font-light px-8">
                {t('blog.loadMore')}
              </Button>
            </div>
          )}

          {/* Newsletter Signup */}
          <section className="mt-20">
            <div className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100 text-center">
              <h3 className="text-2xl font-light text-black mb-4">{t('blog.newsletter.title')}</h3>
              <p className="text-gray-600 leading-relaxed font-light mb-6 max-w-2xl mx-auto">
                {t('blog.newsletter.subtitle')}
              </p>
              <div className={`max-w-md mx-auto flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Input
                  type="email"
                  placeholder={t('blog.newsletter.emailPlaceholder')}
                  className="flex-1 rounded-full font-light"
                />
                <Button className="rounded-full font-light px-8">
                  {t('blog.newsletter.subscribe')}
                </Button>
              </div>
            </div>
          </section>

          {/* Back to Home Button */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <Link to={getLocalizedPath('/')}>
              <Button className={`w-full md:w-auto px-8 py-3 rounded-full font-light ${isRTL ? 'flex-row-reverse' : ''}`}>
                {t('pricing.backToHome')}
                <ArrowLeft className={`h-4 w-4 rotate-180 ${isRTL ? 'mr-2' : 'ml-2'}`} />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className={`flex items-center ${isRTL ? 'flex-row-reverse space-x-reverse space-x-3' : 'space-x-3'} mb-6`}>
                <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-black font-medium text-lg">
                  P
                </div>
                <span className="text-2xl font-light tracking-tight font-google-sans">PropertyFlow</span>
              </div>
              <p className="text-gray-400 max-w-sm font-light leading-relaxed">
                {t('homepage.footer.description')}
              </p>
            </div>
            
            <div>
              <h3 className="font-light mb-6 text-white">{t('homepage.footer.product')}</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors font-light">{t('homepage.footer.features')}</a></li>
                <li><Link to={getLocalizedPath('/pricing')} className="hover:text-white transition-colors font-light">{t('homepage.footer.pricing')}</Link></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors font-light">{t('homepage.footer.howItWorks')}</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-light mb-6 text-white">{t('homepage.footer.company')}</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link to={getLocalizedPath('/about')} className="hover:text-white transition-colors font-light">{t('homepage.footer.about')}</Link></li>
                <li><Link to={getLocalizedPath('/blog')} className="hover:text-white transition-colors font-light">{t('homepage.footer.blog')}</Link></li>
                <li><Link to={getLocalizedPath('/careers')} className="hover:text-white transition-colors font-light">{t('homepage.footer.careers')}</Link></li>
                <li><Link to={getLocalizedPath('/contact')} className="hover:text-white transition-colors font-light">{t('homepage.footer.contact')}</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-light mb-6 text-white">{t('homepage.footer.support')}</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link to={getLocalizedPath('/help')} className="hover:text-white transition-colors font-light">{t('homepage.footer.helpCenter')}</Link></li>
                <li><a href="#faq" className="hover:text-white transition-colors font-light">{t('homepage.faq.title')}</a></li>
                <li><Link to={getLocalizedPath('/signin')} className="hover:text-white transition-colors font-light">{t('homepage.footer.signIn')}</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className={`flex flex-col md:flex-row justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="text-gray-400 text-sm mb-4 md:mb-0 font-light">
                {t('homepage.footer.copyright')}
              </div>
              
              <div className={`flex ${isRTL ? 'space-x-reverse space-x-8' : 'space-x-8'} text-gray-400 text-sm`}>
                <Link to={getLocalizedPath('/privacy')} className="hover:text-white transition-colors font-light">{t('homepage.footer.privacy')}</Link>
                <Link to={getLocalizedPath('/terms')} className="hover:text-white transition-colors font-light">{t('homepage.footer.terms')}</Link>
                <Link to={getLocalizedPath('/cookies')} className="hover:text-white transition-colors font-light">{t('homepage.footer.cookies')}</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Blog;

