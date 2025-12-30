import React, { useState, useEffect, useContext, createContext, useMemo } from 'react';
import { 
  Menu, X, Layers, ArrowRight, Star, Search, Cpu, Plus, Minus
} from 'lucide-react';
import { Category, Product, ViewState } from './types';
import { INITIAL_PRODUCTS } from './constants';
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

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentView, navigate } = useNavigation();

  const navItems: { label: string; view: ViewState }[] = [
    { label: 'Home', view: { type: 'HOME' } },
    { label: 'Products', view: { type: 'CATALOG' } },
  ];

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
            <span className="font-bold text-xl text-slate-900 tracking-tight">Suraj Electra</span>
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
          <span className="font-semibold text-slate-900">₹{product.price.toFixed(2)} <span className="text-xs font-normal text-slate-400">/unit (est)</span></span>
        </div>
        <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-1">{product.description}</p>
        <div className="flex items-center text-indigo-600 font-medium text-sm mt-auto">
          View Specs <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
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
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <span className="text-indigo-400 font-semibold tracking-wider uppercase mb-4">Leading ODM + OEM Manufacturer</span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Suraj Electra<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Precision in Every Circuit</span>
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
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">ODM + OEM Solutions</h2>
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
    </div>
  );
};

const CatalogView = ({ products }: { products: Product[] }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Helper to count items per category
  const getCount = (cat: Category | 'All') => {
    if (cat === 'All') return products.length;
    return products.filter(p => p.category === cat).length;
  };

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
        {['All', ...Object.values(Category)].map((cat) => {
          const isSelected = selectedCategory === cat;
          const count = getCount(cat as Category | 'All');
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat as Category | 'All')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border flex items-center ${
                isSelected 
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50'
              }`}
            >
              {cat}
              <span className={`ml-2 text-xs py-0.5 px-2 rounded-full font-semibold ${
                isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
           <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
           <h3 className="text-lg font-medium text-slate-900">No products found</h3>
           <p className="text-slate-500 mb-6">Try adjusting your search or filters.</p>
           <button 
             onClick={() => {setSelectedCategory('All'); setSearchQuery('');}}
             className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-medium hover:bg-indigo-200 transition-colors"
           >
             Clear all filters
           </button>
        </div>
      )}
    </div>
  );
};

const ProductDetailView = ({ products }: { products: Product[] }) => {
  const { currentView, navigate } = useNavigation();
  const productId = currentView.type === 'PRODUCT_DETAIL' ? currentView.productId : null;
  const product = products.find(p => p.id === productId);

  const [activeImage, setActiveImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Memoize gallery images to prevent recreation on every render
  const galleryImages = useMemo(() => {
    if (!product) return [];
    // Start with the main image
    const images = [product.imageUrl];
    // Add additional images if they exist
    if (product.additionalImages && product.additionalImages.length > 0) {
      images.push(...product.additionalImages);
    }
    return images;
  }, [product]);

  useEffect(() => {
    if (product) {
      setActiveImage(product.imageUrl);
    }
  }, [product]);

  // Auto-slide effect
  useEffect(() => {
    if (galleryImages.length <= 1) return;

    const intervalId = setInterval(() => {
      setActiveImage(current => {
        const currentIndex = galleryImages.indexOf(current);
        const nextIndex = (currentIndex + 1) % galleryImages.length;
        return galleryImages[nextIndex];
      });
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(intervalId);
  }, [galleryImages, activeImage]); // activeImage dependency ensures timer resets on manual interaction

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

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

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
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm relative group">
              <img 
                src={activeImage || product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover transition-all duration-500 ease-in-out" 
              />
              {/* Progress bar for auto-slide visualization (optional but nice touch) */}
              <div className="absolute bottom-0 left-0 h-1 bg-indigo-600/50 w-full animate-[loading_4s_linear_infinite]" key={activeImage}></div>
            </div>
            {galleryImages.length > 1 && (
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
            )}
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
              <span className="text-3xl font-bold text-slate-900">₹{product.price.toFixed(2)}</span>
              <span className="text-slate-500 mb-1">/ unit (Wholesale Estimate)</span>
            </div>

            <p className="text-slate-600 leading-relaxed text-lg mb-8">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              {/* Quantity Selector */}
              <div className="flex items-center bg-slate-50 rounded-xl border border-slate-200 h-[58px]">
                 <button 
                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
                   className="w-12 h-full flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-l-xl transition-colors"
                 >
                   <Minus className="w-4 h-4" />
                 </button>
                 <div className="w-12 text-center font-bold text-slate-900">{quantity}</div>
                 <button 
                   onClick={() => setQuantity(quantity + 1)}
                   className="w-12 h-full flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-r-xl transition-colors"
                 >
                   <Plus className="w-4 h-4" />
                 </button>
              </div>

              <button className="flex-1 bg-slate-900 text-white py-4 rounded-xl font-semibold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
                Request Sample {quantity > 1 ? `(${quantity})` : ''}
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

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map(related => (
              <ProductCard key={related.id} product={related} />
            ))}
          </div>
        </div>
      )}
      
      {/* AI Widget */}
      <ChatWidget product={product} />
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center text-white mb-4">
             <Cpu className="w-5 h-5 fill-current mr-2" />
             <span className="font-bold text-xl">Suraj Electra</span>
          </div>
          <p className="text-sm text-slate-400">
            Premier Electronics ODM + OEM Manufacturer. Innovation, Quality, and Scale.
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
            <li>About Suraj</li>
            <li>Quality Control</li>
            <li>Certifications</li>
            <li>Contact OEM Sales</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);

  const [currentView, setCurrentView] = useState<ViewState>({ type: 'HOME' });

  const navigate = (view: ViewState) => {
    setCurrentView(view);
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
    default:
      content = <HomeView products={products} />;
  }

  return (
    <NavigationContext.Provider value={{ currentView, navigate }}>
      <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
        <ScrollToTop />
        <Navbar />
        
        <main className="flex-grow">
          {content}
        </main>

        <Footer />
      </div>
    </NavigationContext.Provider>
  );
}