'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

export function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [type, setType] = useState<string>('all');
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (type !== 'all') params.append('type', type);
    if (location) params.append('location', location);
    
    router.push(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-2 p-2 bg-white rounded-full shadow-lg">
        <Input
          type="text"
          placeholder="Search destinations, activities..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Service Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="stays">Stays</SelectItem>
            <SelectItem value="tours">Tours</SelectItem>
            <SelectItem value="vehicles">Vehicles</SelectItem>
            <SelectItem value="wellness">Wellness</SelectItem>
            <SelectItem value="tickets">Tickets</SelectItem>
            <SelectItem value="products">Products</SelectItem>
          </SelectContent>
        </Select>
        
        <Input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full md:w-[200px]"
        />
        
        <Button type="submit" className="w-full md:w-auto">
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>
    </form>
  );
}


