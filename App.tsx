import React, { useState, useEffect, useContext, createContext } from 'react';
import { 
  Menu, X, ShoppingBag, Layers, ArrowRight, Star, 
  ChevronRight, ExternalLink, Filter, Search, Grid, List, Zap, Cpu, Cable,
  Lock, Plus, Trash, CheckCircle
} from 'lucide-react';
import { Category, Product, DemoProject, ViewState } from './types';
import { INITIAL_PRODUCTS, DEMOS } from './constants';
import ChatWidget from './components/ChatWidget';

// --- Navigation Context ---

type NavigationContextType = {
  currentView: ViewState;
  navigate: (view: ViewState) => void;
};

const NavigationContext = createContext<NavigationContextType>({
  currentView: { type: 'HOME' },
  navigate: () => {},
});

const useNavigation = () => useContext(NavigationContext);

// --- Helper Components ---

const ScrollToTop = () => {
  const { currentView } = useNavigation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);
  return null;
};

// --- Sub-components ---

const Navbar = ({ isAdmin }: { isAdmin: boolean }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentView, navigate } = useNavigation();

  const navItems: { label: string; view: ViewState }[] = [
    { label: 'Home', view: { type: 'HOME' } },
    { label: 'Products', view: { type: 'CATALOG' } },
    { label: 'Manufacturing & QA', view: { type: 'DEMOS' } },
  ];

  if (isAdmin) {
    navItems.push({ label: 'Admin Dashboard', view: { type: 'ADMIN_DASHBOARD' } });
  }

  const isActive = (view: ViewState) => {
    return currentView.type === view.type;
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <button onClick={() => navigate({ type: 'HOME' })} className="flex items-center cursor-pointer">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-2">
              <Cpu className="w-5 h-5 text-white fill-current" />
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">Surja Electronics</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.view)}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.view) 
                    ? 'text-indigo-600' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors">
              Contact OEM Sales
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  navigate(item.view);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                   isActive(item.view) 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { navigate } = useNavigation();
  return (
    <div 
      onClick={() => navigate({ type: 'PRODUCT_DETAIL', productId: product.id })}
      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-semibold text-slate-700 uppercase tracking-wider">
          {product.category}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>
          <span className="font-semibold text-slate-900">${product.price.toFixed(2)} <span className="text-xs font-normal text-slate-400">/unit (est)</span></span>
        </div>
        <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-1">{product.description}</p>
        <div className="flex items-center text-indigo-600 font-medium text-sm mt-auto">
          View Specs <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

const DemoCard: React.FC<{ demo: DemoProject }> = ({ demo }) => {
  const { navigate } = useNavigation();
  return (
    <div onClick={() => navigate({ type: 'DEMOS' })} className="group cursor-pointer">
      <div className="relative rounded-2xl overflow-hidden mb-4 aspect-video">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
        <img 
          src={demo.imageUrl} 
          alt={demo.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-4 left-4 z-20">
          <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded mb-2 inline-block">Factory Insight</span>
        </div>
      </div>
      <h3 className="font-bold text-lg text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
        {demo.title}
      </h3>
      <p className="text-slate-500 text-sm line-clamp-2">{demo.description}</p>
    </div>
  );
};

// --- Views ---

const HomeView = ({ products }: { products: Product[] }) => {
  const { navigate } = useNavigation();
  return (
    <div className="space-y-20 pb-20">
      {/* Hero */}
      <section className="relative bg-slate-900 text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <span className="text-indigo-400 font-semibold tracking-wider uppercase mb-4">Leading ODM Manufacturer</span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Surja Electronics<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Precision in Every Circuit</span>
          </h1>
          <p className="max-w-2xl text-slate-300 text-lg md:text-xl mb-10 leading-relaxed">
            Your partner for high-quality electronics manufacturing. From braided cables and smart remotes to custom PCB assembly, we bring your concepts to mass production.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => navigate({ type: 'CATALOG' })}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/30 flex items-center justify-center"
            >
              Browse Catalogue
            </button>
            <button 
              onClick={() => navigate({ type: 'DEMOS' })}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm rounded-full font-semibold transition-all flex items-center justify-center"
            >
              Factory Tours
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">ODM Solutions</h2>
            <p className="text-slate-500 mt-2">White-label products ready for your brand.</p>
          </div>
          <button 
            onClick={() => navigate({ type: 'CATALOG' })}
            className="text-indigo-600 font-medium hover:text-indigo-700 flex items-center"
          >
            View all products <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 3).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Featured Demos */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Manufacturing Excellence</h2>
              <p className="text-slate-500 mt-2">See our production lines and quality assurance in action.</p>
            </div>
            <button 
              onClick={() => navigate({ type: 'DEMOS' })}
              className="text-indigo-600 font-medium hover:text-indigo-700 flex items-center"
            >
              View all demos <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DEMOS.slice(0, 3).map(demo => (
              <DemoCard key={demo.id} demo={demo} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const CatalogView = ({ products }: { products: Product[] }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Product Catalogue</h1>
          <p className="text-slate-500">Explore our range of OEM/ODM ready electronics and components.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
           {/* Search */}
           <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search components..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === 'All' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          All
        </button>
        {Object.values(Category).map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-slate-500">
          <p>No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

const DemosView = ({ products }: { products: Product[] }) => {
  const { navigate } = useNavigation();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Manufacturing Showcase</h1>
        <p className="text-slate-500 text-lg">
          Explore our production capabilities, quality assurance testing, and successful client integrations.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {DEMOS.map((demo, idx) => {
          const relatedProducts = products.filter(p => demo.relatedProductIds.includes(p.id));
          
          return (
            <div key={demo.id} className={`flex flex-col lg:flex-row gap-8 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="w-full lg:w-1/2">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-lg relative group">
                  <img src={demo.imageUrl} alt={demo.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-white/20 backdrop-blur border border-white/50 text-white px-6 py-3 rounded-full font-medium">
                      Watch Full Video
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 space-y-6">
                <div>
                   <span className="text-indigo-600 font-semibold text-sm tracking-wide uppercase mb-2 block">{demo.date}</span>
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">{demo.title}</h2>
                  <p className="text-slate-600 leading-relaxed text-lg">{demo.description}</p>
                </div>
                
                <div className="border-t border-slate-200 pt-6">
                  <h4 className="text-sm font-semibold text-slate-900 mb-3">Featured Components:</h4>
                  <div className="flex flex-wrap gap-4">
                    {relatedProducts.map(p => (
                      <div 
                        key={p.id} 
                        onClick={() => navigate({ type: 'PRODUCT_DETAIL', productId: p.id })}
                        className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100 p-2 pr-4 rounded-xl border border-slate-200 cursor-pointer transition-colors"
                      >
                        <img src={p.imageUrl} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{p.name}</p>
                          <p className="text-slate-500 text-xs">${p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ProductDetailView = ({ products }: { products: Product[] }) => {
  const { currentView, navigate } = useNavigation();
  const productId = currentView.type === 'PRODUCT_DETAIL' ? currentView.productId : null;
  const product = products.find(p => p.id === productId);

  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    if (product) {
      setActiveImage(product.imageUrl);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Product not found</h2>
        <button 
          onClick={() => navigate({ type: 'CATALOG' })}
          className="text-indigo-600 font-medium flex items-center hover:underline"
        >
          <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Back to Catalogue
        </button>
      </div>
    );
  }

  // Define some diverse mock images to simulate a gallery
  const galleryImages = [
    product.imageUrl,
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Detail Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={() => navigate({ type: 'CATALOG' })} className="flex items-center text-slate-500 hover:text-indigo-600 transition-colors mb-6">
          <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Back to Catalogue
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm relative">
              <img 
                src={activeImage || product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover transition-opacity duration-300" 
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
               {galleryImages.map((img, idx) => (
                 <button 
                   key={idx} 
                   onClick={() => setActiveImage(img)}
                   className={`aspect-square rounded-xl bg-slate-100 overflow-hidden border-2 transition-all duration-200 ${
                     activeImage === img 
                       ? 'border-indigo-600 ring-2 ring-indigo-100 opacity-100' 
                       : 'border-slate-200 opacity-60 hover:opacity-100 hover:border-indigo-300'
                   }`}
                 >
                   <img 
                      src={img} 
                      className="w-full h-full object-cover" 
                      alt={`View ${idx + 1}`} 
                    />
                 </button>
               ))}
            </div>
          </div>

          {/* Right: Info */}
          <div>
            <div className="mb-6">
              <span className="text-indigo-600 font-semibold tracking-wide uppercase text-sm bg-indigo-50 px-3 py-1 rounded-full">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-2">{product.name}</h1>
              <p className="text-xl text-slate-500 font-medium">{product.tagline}</p>
            </div>

            <div className="flex items-end gap-4 mb-8">
              <span className="text-3xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
              <span className="text-slate-500 mb-1">/ unit (Wholesale Estimate)</span>
            </div>

            <p className="text-slate-600 leading-relaxed text-lg mb-8">
              {product.description}
            </p>

            <div className="flex gap-4 mb-10">
              <button className="flex-1 bg-slate-900 text-white py-4 rounded-xl font-semibold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
                Request Sample
              </button>
              <button className="px-6 py-4 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
                Bulk Quote
              </button>
            </div>

            <div className="space-y-8">
              {/* Features List */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-indigo-500" /> Key Features
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-slate-600 bg-slate-50 px-3 py-2 rounded-lg">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specs Table */}
              <div>
                 <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-500" /> Technical Specifications
                </h3>
                <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <tbody>
                      {Object.entries(product.specs).map(([key, val], idx) => (
                        <tr key={key} className={idx !== Object.entries(product.specs).length - 1 ? 'border-b border-slate-200' : ''}>
                          <th className="px-6 py-3 font-medium text-slate-900 bg-slate-100/50 w-1/3">{key}</th>
                          <td className="px-6 py-3 text-slate-600">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* AI Widget */}
      <ChatWidget product={product} />
    </div>
  );
};

// --- Admin Views ---

const AdminLoginView = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { navigate } = useNavigation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      onLoginSuccess();
      navigate({ type: 'ADMIN_DASHBOARD' });
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
            <Lock className="w-6 h-6 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">Admin Access</h2>
        <p className="text-center text-slate-500 mb-8">Login to manage Surja Electronics catalogue</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter password"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button 
            type="submit" 
            className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
          >
            Login
          </button>
          <button 
            type="button" 
            onClick={() => navigate({ type: 'HOME' })}
            className="w-full bg-white text-slate-600 py-3 rounded-lg font-semibold hover:bg-slate-50 border border-slate-200 transition-colors"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

const AdminDashboardView = ({ onAddProduct, isAdmin }: { onAddProduct: (p: Product) => void; isAdmin: boolean }) => {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    tagline: '',
    description: '',
    price: 0,
    category: Category.CONSUMER_ELECTRONICS,
    imageUrl: '',
    features: [],
    specs: {}
  });
  
  const [featureInput, setFeatureInput] = useState('');
  const [specKey, setSpecKey] = useState('');
  const [specValue, setSpecValue] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const { navigate } = useNavigation();

  useEffect(() => {
    if (!isAdmin) {
      navigate({ type: 'ADMIN_LOGIN' });
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null; 
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...(prev.features || []), featureInput.trim()]
      }));
      setFeatureInput('');
    }
  };

  const handleAddSpec = () => {
    if (specKey.trim() && specValue.trim()) {
      setFormData(prev => ({
        ...prev,
        specs: { ...(prev.specs || {}), [specKey.trim()]: specValue.trim() }
      }));
      setSpecKey('');
      setSpecValue('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.price && formData.category) {
      const newProduct: Product = {
        id: `p${Date.now()}`,
        name: formData.name || 'Untitled',
        tagline: formData.tagline || '',
        description: formData.description || '',
        price: Number(formData.price),
        category: formData.category as Category,
        imageUrl: formData.imageUrl || 'https://via.placeholder.com/800x600?text=No+Image',
        features: formData.features || [],
        specs: formData.specs || {}
      };
      
      onAddProduct(newProduct);
      setSuccessMsg(`Product "${newProduct.name}" added successfully!`);
      
      // Reset form
      setFormData({
        name: '',
        tagline: '',
        description: '',
        price: 0,
        category: Category.CONSUMER_ELECTRONICS,
        imageUrl: '',
        features: [],
        specs: {}
      });
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
        <Layers className="w-8 h-8 text-indigo-600" /> Admin Dashboard
      </h1>
      
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <h2 className="text-xl font-semibold mb-6">Add New Product</h2>
        
        {successMsg && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl flex items-center gap-2">
            <CheckCircle className="w-5 h-5" /> {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
              <input name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tagline</label>
              <input name="tagline" value={formData.tagline} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} rows={3} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Price (USD)</label>
              <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500">
                {Object.values(Category).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
              <input name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} placeholder="https://..." className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Features Manager */}
            <div className="bg-slate-50 p-4 rounded-xl">
              <label className="block text-sm font-medium text-slate-700 mb-2">Features</label>
              <div className="flex gap-2 mb-3">
                <input 
                  value={featureInput} 
                  onChange={(e) => setFeatureInput(e.target.value)} 
                  placeholder="Add a feature..." 
                  className="flex-1 px-3 py-2 border rounded-lg text-sm"
                />
                <button type="button" onClick={handleAddFeature} className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700"><Plus className="w-4 h-4" /></button>
              </div>
              <ul className="space-y-1">
                {formData.features?.map((f, i) => (
                  <li key={i} className="text-sm bg-white px-2 py-1 rounded border flex justify-between items-center">
                    {f}
                    <button type="button" onClick={() => setFormData(prev => ({...prev, features: prev.features?.filter((_, idx) => idx !== i)}))} className="text-red-500"><X className="w-3 h-3" /></button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specs Manager */}
            <div className="bg-slate-50 p-4 rounded-xl">
              <label className="block text-sm font-medium text-slate-700 mb-2">Specifications</label>
              <div className="flex gap-2 mb-3">
                <input value={specKey} onChange={(e) => setSpecKey(e.target.value)} placeholder="Key (e.g. Weight)" className="flex-1 px-3 py-2 border rounded-lg text-sm" />
                <input value={specValue} onChange={(e) => setSpecValue(e.target.value)} placeholder="Value (e.g. 50g)" className="flex-1 px-3 py-2 border rounded-lg text-sm" />
                <button type="button" onClick={handleAddSpec} className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700"><Plus className="w-4 h-4" /></button>
              </div>
              <div className="space-y-1">
                {Object.entries(formData.specs || {}).map(([k, v]) => (
                  <div key={k} className="text-sm bg-white px-2 py-1 rounded border flex justify-between items-center">
                    <span><b>{k}:</b> {v}</span>
                    <button type="button" onClick={() => {
                        const newSpecs = {...formData.specs};
                        delete newSpecs[k];
                        setFormData(prev => ({...prev, specs: newSpecs}));
                    }} className="text-red-500"><X className="w-3 h-3" /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-lg">
              Add Product to Catalogue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Footer = () => {
  const { navigate } = useNavigation();
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center text-white mb-4">
             <Cpu className="w-5 h-5 fill-current mr-2" />
             <span className="font-bold text-xl">Surja Electronics</span>
          </div>
          <p className="text-sm text-slate-400">
            Premier Electronics ODM Manufacturer. Innovation, Quality, and Scale.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Solutions</h4>
          <ul className="space-y-2 text-sm">
            <li>Custom Cables</li>
            <li>PCB Assembly</li>
            <li>Box Build</li>
            <li>IoT Integration</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>About Surja</li>
            <li>Quality Control</li>
            <li>Certifications</li>
            <li>Contact OEM Sales</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Internal</h4>
          <div className="flex flex-col gap-2 items-start">
            <p className="text-xs text-slate-500">Employee access only.</p>
            <button 
              onClick={() => navigate({ type: 'ADMIN_LOGIN' })}
              className="text-slate-400 hover:text-white text-sm flex items-center gap-1 transition-colors"
            >
              <Lock className="w-3 h-3" /> Admin Login
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>({ type: 'HOME' });

  const navigate = (view: ViewState) => {
    setCurrentView(view);
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts([...products, newProduct]);
  };

  let content;
  switch (currentView.type) {
    case 'HOME':
      content = <HomeView products={products} />;
      break;
    case 'CATALOG':
      content = <CatalogView products={products} />;
      break;
    case 'PRODUCT_DETAIL':
      content = <ProductDetailView products={products} />;
      break;
    case 'DEMOS':
      content = <DemosView products={products} />;
      break;
    case 'ADMIN_LOGIN':
      content = <AdminLoginView onLoginSuccess={() => setIsAdmin(true)} />;
      break;
    case 'ADMIN_DASHBOARD':
      content = <AdminDashboardView onAddProduct={handleAddProduct} isAdmin={isAdmin} />;
      break;
    default:
      content = <HomeView products={products} />;
  }

  return (
    <NavigationContext.Provider value={{ currentView, navigate }}>
      <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
        <ScrollToTop />
        <Navbar isAdmin={isAdmin} />
        
        <main className="flex-grow">
          {content}
        </main>

        <Footer />
      </div>
    </NavigationContext.Provider>
  );
}