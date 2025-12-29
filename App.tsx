import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ShoppingBag, Layers, ArrowRight, Star, 
  ChevronRight, ExternalLink, Filter, Search, Grid, List, Zap, Cpu, Cable
} from 'lucide-react';
import { Category, Product, ViewState, DemoProject } from './types';
import { PRODUCTS, DEMOS } from './constants';
import ChatWidget from './components/ChatWidget';

// --- Sub-components placed in App.tsx for simplicity of the "single file" request where possible, 
// though separate files are usually better. Ideally these would be in components/ ---

const Navbar = ({ 
  currentView, 
  onChangeView 
}: { 
  currentView: ViewState['type']; 
  onChangeView: (view: ViewState) => void; 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', value: 'HOME' as const },
    { label: 'Products', value: 'CATALOG' as const },
    { label: 'Manufacturing & QA', value: 'DEMOS' as const },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => onChangeView({ type: 'HOME' })}>
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-2">
              <Cpu className="w-5 h-5 text-white fill-current" />
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">Surja Electronics</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => onChangeView({ type: item.value })}
                className={`text-sm font-medium transition-colors ${
                  currentView === item.value 
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
                key={item.value}
                onClick={() => {
                  onChangeView({ type: item.value });
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                   currentView === item.value 
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

const ProductCard: React.FC<{ product: Product; onClick: () => void }> = ({ product, onClick }) => (
  <div 
    onClick={onClick}
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

const DemoCard: React.FC<{ demo: DemoProject; onClick: () => void }> = ({ demo, onClick }) => (
  <div onClick={onClick} className="group cursor-pointer">
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

// --- Views ---

const HomeView = ({ onChangeView }: { onChangeView: (view: ViewState) => void }) => {
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
              onClick={() => onChangeView({ type: 'CATALOG' })}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/30"
            >
              Browse Catalogue
            </button>
            <button 
              onClick={() => onChangeView({ type: 'DEMOS' })}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm rounded-full font-semibold transition-all"
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
            onClick={() => onChangeView({ type: 'CATALOG' })}
            className="text-indigo-600 font-medium hover:text-indigo-700 flex items-center"
          >
            View all products <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.slice(0, 3).map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={() => onChangeView({ type: 'PRODUCT_DETAIL', productId: product.id })} 
            />
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
              onClick={() => onChangeView({ type: 'DEMOS' })}
              className="text-indigo-600 font-medium hover:text-indigo-700 flex items-center"
            >
              View all demos <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DEMOS.slice(0, 3).map(demo => (
              <DemoCard 
                key={demo.id} 
                demo={demo} 
                onClick={() => onChangeView({ type: 'DEMOS' })} 
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const CatalogView = ({ onChangeView }: { onChangeView: (view: ViewState) => void }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.filter(p => {
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
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={() => onChangeView({ type: 'PRODUCT_DETAIL', productId: product.id })} 
            />
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

const DemosView = ({ onChangeView }: { onChangeView: (view: ViewState) => void }) => {
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
          const relatedProducts = PRODUCTS.filter(p => demo.relatedProductIds.includes(p.id));
          
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
                        onClick={() => onChangeView({ type: 'PRODUCT_DETAIL', productId: p.id })}
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

const ProductDetailView = ({ productId, onBack }: { productId: string; onBack: () => void }) => {
  const product = PRODUCTS.find(p => p.id === productId);

  if (!product) return <div>Product not found</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Detail Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={onBack} className="flex items-center text-slate-500 hover:text-indigo-600 transition-colors mb-6">
          <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Back to Catalogue
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200">
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-3 gap-4">
               {/* Use the main image as the first thumbnail, and placeholder variants for others */}
               {[0, 1, 2].map(i => (
                 <div key={i} className="aspect-square rounded-xl bg-slate-100 overflow-hidden border border-slate-200 opacity-60 hover:opacity-100 cursor-pointer transition-opacity">
                   <img 
                      src={i === 0 ? product.imageUrl : `https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=300&auto=format&fit=crop`} 
                      className="w-full h-full object-cover" 
                      alt={`View ${i + 1}`} 
                    />
                 </div>
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

const Footer = () => (
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
        <h4 className="text-white font-semibold mb-4">Newsletter</h4>
        <div className="flex gap-2">
          <input 
            type="email" 
            placeholder="Enter email" 
            className="bg-slate-800 border-none rounded-lg px-3 py-2 text-sm w-full focus:ring-1 focus:ring-indigo-500"
          />
          <button className="bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-indigo-500">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [viewState, setViewState] = useState<ViewState>({ type: 'HOME' });

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [viewState]);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar currentView={viewState.type} onChangeView={setViewState} />
      
      <main className="flex-grow">
        {viewState.type === 'HOME' && (
          <HomeView onChangeView={setViewState} />
        )}
        {viewState.type === 'CATALOG' && (
          <CatalogView onChangeView={setViewState} />
        )}
        {viewState.type === 'DEMOS' && (
          <DemosView onChangeView={setViewState} />
        )}
        {viewState.type === 'PRODUCT_DETAIL' && (
          <ProductDetailView 
            productId={viewState.productId} 
            onBack={() => setViewState({ type: 'CATALOG' })} 
          />
        )}
      </main>

      <Footer />
    </div>
  );
}