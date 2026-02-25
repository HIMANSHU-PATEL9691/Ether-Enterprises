import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { products, categories, brands } from '@/data/products';
import ProductCard from '@/components/ProductCard';

const resolutions = ['2MP', '4MP', '5MP', '8MP'];
const types = ['indoor', 'outdoor'] as const;
const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'best-selling', label: 'Best Selling' },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedResolution, setSelectedResolution] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const filtered = useMemo(() => {
    let result = [...products];
    if (selectedCategory) result = result.filter(p => p.category === selectedCategory);
    if (selectedBrand) result = result.filter(p => p.brand === selectedBrand);
    if (selectedType) result = result.filter(p => p.type === selectedType);
    if (selectedResolution) result = result.filter(p => p.resolution === selectedResolution);

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'best-selling': result.sort((a, b) => (b.bestSelling ? 1 : 0) - (a.bestSelling ? 1 : 0)); break;
      default: result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return result;
  }, [selectedCategory, selectedBrand, selectedType, selectedResolution, sortBy]);

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedBrand('');
    setSelectedType('');
    setSelectedResolution('');
    setSearchParams({});
  };

  const hasFilters = selectedCategory || selectedBrand || selectedType || selectedResolution;

  const FilterChip = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
        active ? 'gradient-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            {selectedCategory ? categories.find(c => c.id === selectedCategory)?.name || 'Shop' : 'All Products'}
          </h1>
          <p className="text-muted-foreground">{filtered.length} products found</p>
        </motion.div>

        {/* Sort + Filter Toggle */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-secondary/80 transition-colors"
          >
            <Filter className="w-4 h-4" /> Filters {hasFilters && '•'}
          </button>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-secondary text-secondary-foreground px-4 py-2.5 rounded-xl text-sm font-medium border-none outline-none"
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="gradient-card border border-border rounded-xl p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold">Filters</h3>
              {hasFilters && (
                <button onClick={clearFilters} className="text-xs text-primary hover:underline flex items-center gap-1">
                  <X className="w-3 h-3" /> Clear All
                </button>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-2">Category</p>
                <div className="flex flex-wrap gap-2">
                  <FilterChip label="All" active={!selectedCategory} onClick={() => { setSelectedCategory(''); setSearchParams({}); }} />
                  {categories.map(c => (
                    <FilterChip key={c.id} label={c.name} active={selectedCategory === c.id} onClick={() => { setSelectedCategory(c.id); setSearchParams({ category: c.id }); }} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Brand</p>
                <div className="flex flex-wrap gap-2">
                  <FilterChip label="All" active={!selectedBrand} onClick={() => setSelectedBrand('')} />
                  {brands.map(b => (
                    <FilterChip key={b} label={b} active={selectedBrand === b} onClick={() => setSelectedBrand(b)} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Type</p>
                <div className="flex flex-wrap gap-2">
                  <FilterChip label="All" active={!selectedType} onClick={() => setSelectedType('')} />
                  {types.map(t => (
                    <FilterChip key={t} label={t === 'indoor' ? 'Indoor' : 'Outdoor'} active={selectedType === t} onClick={() => setSelectedType(t)} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Resolution</p>
                <div className="flex flex-wrap gap-2">
                  <FilterChip label="All" active={!selectedResolution} onClick={() => setSelectedResolution('')} />
                  {resolutions.map(r => (
                    <FilterChip key={r} label={r} active={selectedResolution === r} onClick={() => setSelectedResolution(r)} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No products found matching your filters.</p>
            <button onClick={clearFilters} className="text-primary mt-2 hover:underline">Clear filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
