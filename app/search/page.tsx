"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { properties as dummyProperties } from "@/lib/dummyData";
import PropertyCard from "@/components/PropertyCard";
import FilterSidebar, { Filters } from "@/components/FilterSidebar";

import { SlidersHorizontal, X } from "lucide-react";

type Property = {
  id: number | string;
  tag: string;
  tagColor: string;
  image: string;
  price: string;
  bhk: string;
  location: string;
  area: string;
  rawType?: string;
  rawBhk?: number | null;
  rawPrice?: number;
};

const categoryTitles: Record<string, string> = {
  buy: "Properties for Sale",
  rent: "Properties for Rent",
  pg: "PG / Co-living Spaces",
  commercial: "Commercial Properties",
  "new-projects": "New Projects",
  plots: "Plots & Land",
};

const categoryToType: Record<string, string> = {
  buy: "BUY",
  rent: "RENT",
  pg: "PG",
  commercial: "COMMERCIAL",
  plots: "PLOT",
};

function SearchContent() {
  const searchParams = useSearchParams();

  const category = searchParams.get("type");
  const query = searchParams.get("q")?.toLowerCase() || "";

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [realProperties, setRealProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<Filters>({
    type: [],
    bhk: [],
    budget: [],
  });

  // Load real properties from API
  useEffect(() => {
    fetch("/api/properties/public")
      .then((res) => res.json())
      .then((data) => {
        setRealProperties(data.properties || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // If arriving from a header category link, pre-set the type filter
  useEffect(() => {
    if (category && categoryToType[category]) {
      setFilters((prev) => ({
        ...prev,
        type: [categoryToType[category]],
      }));
    }
  }, [category]);

  // Combine real properties + dummy properties
  const allProperties = useMemo(
    () => [...realProperties, ...dummyProperties],
    [realProperties]
  );

  // Apply all search/filter logic
  const filteredProperties = useMemo(() => {
    return allProperties.filter((p) => {
      // Keyword search — match against bhk/type text and location
      if (query) {
        const searchable =
          `${p.bhk} ${p.location} ${p.rawType || ""}`.toLowerCase();

        if (!searchable.includes(query)) return false;
      }

      // Property type filter
      if (
        filters.type.length > 0 &&
        !filters.type.includes(p.rawType || "")
      ) {
        return false;
      }

      // BHK filter
      if (filters.bhk.length > 0) {
        const bhk = p.rawBhk || 0;

        const matchesBhk = filters.bhk.some((b) => {
          if (b === "4") return bhk >= 4;
          return bhk === Number(b);
        });

        if (!matchesBhk) return false;
      }

      // Budget filter
      if (filters.budget.length > 0) {
        const price = p.rawPrice || 0;

        const matchesBudget = filters.budget.some((range) => {
          const [min, max] = range.split("-").map(Number);

          return price >= min && price <= max;
        });

        if (!matchesBudget) return false;
      }

      return true;
    });
  }, [allProperties, filters, query]);

  const heading =
    category && categoryTitles[category]
      ? categoryTitles[category]
      : "Properties in India";

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-xl md:text-2xl font-bold text-brand-slate">
            {heading}
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            {loading
              ? "Loading..."
              : `${filteredProperties.length} results found`}
          </p>
        </div>

        {/* Mobile filter button */}
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="lg:hidden flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>

      {/* Main search layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Desktop filters */}
        <aside className="hidden lg:block">
          <FilterSidebar filters={filters} onChange={setFilters} />
        </aside>

        {/* Property results */}
        <div>
          {filteredProperties.length === 0 && !loading ? (
            <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center text-gray-500">
              No properties match these filters. Try adjusting your search.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filters */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFiltersOpen(false)}
          />

          {/* Filter panel */}
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-brand-sky/40 p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-brand-slate">
                Filters
              </h3>

              <button onClick={() => setMobileFiltersOpen(false)}>
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <FilterSidebar
              filters={filters}
              onChange={setFilters}
            />
          </div>
        </div>
      )}
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-sm text-gray-500">
            Loading properties...
          </div>
        </main>
      }
    >
      <SearchContent />
    </Suspense>
  );
}