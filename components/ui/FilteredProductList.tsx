"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/components/cards/ProductCard";
import type { Product, Brand } from "@/lib/products";

type SkillTag = "beginner-friendly" | "intermediate" | "advanced";
type PriceTag = "under-30" | "under-50" | "under-100";

// Item type detection — order matters (long sleeve before polo)
const ITEM_TYPES: { match: string; label: string }[] = [
  { match: "long sleeve", label: "Long Sleeve" },
  { match: "polo", label: "Polo" },
  { match: "shorts", label: "Shorts" },
  { match: "tee", label: "Tee" },
  { match: "tank", label: "Tank" },
  { match: "jacket", label: "Jacket" },
  { match: "dress", label: "Dress" },
  { match: "skirt", label: "Skirt" },
  { match: "skort", label: "Skirt" },
];

function getItemTypeLabel(product: Product): string | null {
  const lower = product.name.toLowerCase();
  for (const { match, label } of ITEM_TYPES) {
    if (lower.includes(match)) return label;
  }
  return null;
}

interface ActiveFilters {
  brands: Brand[];
  skills: SkillTag[];
  prices: PriceTag[];
  onSale: boolean;
  inStockOnly: boolean;
  isNew: boolean;
  itemTypes: string[];
}

const EMPTY: ActiveFilters = {
  brands: [],
  skills: [],
  prices: [],
  onSale: false,
  inStockOnly: false,
  isNew: false,
  itemTypes: [],
};

const SKILL_OPTIONS: { tag: SkillTag; label: string }[] = [
  { tag: "beginner-friendly", label: "Beginner" },
  { tag: "intermediate", label: "Intermediate" },
  { tag: "advanced", label: "Advanced" },
];

const PRICE_OPTIONS: { tag: PriceTag; label: string }[] = [
  { tag: "under-30", label: "Under $30" },
  { tag: "under-50", label: "Under $50" },
  { tag: "under-100", label: "Under $100" },
];

function toggle<T>(arr: T[], val: T): T[] {
  return arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
}

function Checkmark() {
  return (
    <svg viewBox="0 0 10 8" fill="none" className="w-2.5 h-2.5 shrink-0">
      <path
        d="M1 4L3.5 6.5L9 1"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckboxRow({
  label,
  count,
  checked,
  onChange,
}: {
  label: string;
  count: number;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group py-0.5">
      <div
        className={`w-4 h-4 rounded-[3px] border flex items-center justify-center shrink-0 transition-colors ${
          checked ? "bg-ink border-ink" : "border-hairline group-hover:border-ink/40"
        }`}
      >
        {checked && <Checkmark />}
      </div>
      <span className="text-[13px] text-ink flex-1 leading-none">{label}</span>
      <span className="text-[12px] text-muted">({count})</span>
    </label>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-hairline">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-3.5 cursor-pointer"
      >
        <span className="text-[13px] font-semibold text-ink">{title}</span>
        <svg
          viewBox="0 0 10 6"
          fill="none"
          className={`w-2.5 h-2.5 transition-transform ${open ? "" : "rotate-180"}`}
        >
          <path
            d="M1 5L5 1L9 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && <div className="flex flex-col gap-1 pb-4">{children}</div>}
    </div>
  );
}

interface Props {
  products: Product[];
}

export function FilteredProductList({ products }: Props) {
  const [filters, setFilters] = useState<ActiveFilters>(EMPTY);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Available options derived from the full product list
  const availableBrands = useMemo(
    () => [...new Set(products.map((p) => p.brand))].sort() as Brand[],
    [products]
  );

  const availableSkills = useMemo(
    () => SKILL_OPTIONS.filter((o) => products.some((p) => p.tags.includes(o.tag))),
    [products]
  );

  const availablePrices = useMemo(
    () => PRICE_OPTIONS.filter((o) => products.some((p) => p.tags.includes(o.tag))),
    [products]
  );

  const hasOnSale = useMemo(() => products.some((p) => !!p.compareAt), [products]);
  const hasNew = useMemo(() => products.some((p) => p.tags.includes("new")), [products]);
  const hasOutOfStock = useMemo(() => products.some((p) => !p.inStock), [products]);

  const availableItemTypes = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of products) {
      const label = getItemTypeLabel(p);
      if (label) counts.set(label, (counts.get(label) ?? 0) + 1);
    }
    return [...counts.entries()]
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count);
  }, [products]);

  // Counts from full product list (for the checkbox labels)
  const brandCounts = useMemo(() => {
    const counts = new Map<Brand, number>();
    for (const p of products) counts.set(p.brand, (counts.get(p.brand) ?? 0) + 1);
    return counts;
  }, [products]);

  const tagCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of products) for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
    return counts;
  }, [products]);

  // Filtered products
  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (filters.brands.length && !filters.brands.includes(p.brand)) return false;
      if (filters.skills.length && !filters.skills.some((s) => p.tags.includes(s))) return false;
      if (filters.prices.length && !filters.prices.some((pr) => p.tags.includes(pr))) return false;
      if (filters.onSale && !p.compareAt) return false;
      if (filters.inStockOnly && !p.inStock) return false;
      if (filters.isNew && !p.tags.includes("new")) return false;
      if (filters.itemTypes.length) {
        const label = getItemTypeLabel(p);
        if (!label || !filters.itemTypes.includes(label)) return false;
      }
      return true;
    });
  }, [products, filters]);

  const activeCount =
    filters.brands.length +
    filters.skills.length +
    filters.prices.length +
    (filters.onSale ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.isNew ? 1 : 0) +
    filters.itemTypes.length;

  const isFiltered = activeCount > 0;
  const clearAll = () => setFilters(EMPTY);

  const brandGroups = useMemo(
    () =>
      availableBrands
        .map((brand) => ({ brand, items: filtered.filter((p) => p.brand === brand) }))
        .filter((g) => g.items.length > 0),
    [filtered, availableBrands]
  );

  const showSidebar =
    availableBrands.length > 1 ||
    availableSkills.length > 0 ||
    availablePrices.length > 0 ||
    hasOnSale ||
    hasNew ||
    hasOutOfStock ||
    availableItemTypes.length > 0;

  const sidebarContent = (
    <div className="flex flex-col">
      {isFiltered && (
        <button
          onClick={clearAll}
          className="text-[12px] text-muted hover:text-ink transition-colors mb-3 underline underline-offset-2 cursor-pointer text-left"
        >
          Clear all ({activeCount})
        </button>
      )}

      {hasOutOfStock && (
        <FilterSection title="Availability">
          <CheckboxRow
            label="In Stock"
            count={products.filter((p) => p.inStock).length}
            checked={filters.inStockOnly}
            onChange={() => setFilters((f) => ({ ...f, inStockOnly: !f.inStockOnly }))}
          />
        </FilterSection>
      )}

      {(hasOnSale || hasNew) && (
        <FilterSection title="Status">
          {hasNew && (
            <CheckboxRow
              label="New"
              count={products.filter((p) => p.tags.includes("new")).length}
              checked={filters.isNew}
              onChange={() => setFilters((f) => ({ ...f, isNew: !f.isNew }))}
            />
          )}
          {hasOnSale && (
            <CheckboxRow
              label="Sale"
              count={products.filter((p) => !!p.compareAt).length}
              checked={filters.onSale}
              onChange={() => setFilters((f) => ({ ...f, onSale: !f.onSale }))}
            />
          )}
        </FilterSection>
      )}

      {availableBrands.length > 1 && (
        <FilterSection title="Brand">
          {availableBrands.map((brand) => (
            <CheckboxRow
              key={brand}
              label={brand}
              count={brandCounts.get(brand) ?? 0}
              checked={filters.brands.includes(brand)}
              onChange={() =>
                setFilters((f) => ({ ...f, brands: toggle(f.brands, brand) }))
              }
            />
          ))}
        </FilterSection>
      )}

      {availableSkills.length > 0 && (
        <FilterSection title="Level">
          {availableSkills.map((o) => (
            <CheckboxRow
              key={o.tag}
              label={o.label}
              count={tagCounts.get(o.tag) ?? 0}
              checked={filters.skills.includes(o.tag)}
              onChange={() =>
                setFilters((f) => ({ ...f, skills: toggle(f.skills, o.tag) }))
              }
            />
          ))}
        </FilterSection>
      )}

      {availablePrices.length > 0 && (
        <FilterSection title="Price">
          {availablePrices.map((o) => (
            <CheckboxRow
              key={o.tag}
              label={o.label}
              count={tagCounts.get(o.tag) ?? 0}
              checked={filters.prices.includes(o.tag)}
              onChange={() =>
                setFilters((f) => ({ ...f, prices: toggle(f.prices, o.tag) }))
              }
            />
          ))}
        </FilterSection>
      )}

      {availableItemTypes.length > 0 && (
        <FilterSection title="Item Type">
          {availableItemTypes.map(({ label, count }) => (
            <CheckboxRow
              key={label}
              label={label}
              count={count}
              checked={filters.itemTypes.includes(label)}
              onChange={() =>
                setFilters((f) => ({ ...f, itemTypes: toggle(f.itemTypes, label) }))
              }
            />
          ))}
        </FilterSection>
      )}
    </div>
  );

  return (
    <div className={showSidebar ? "flex gap-8 items-start" : ""}>
      {showSidebar && (
        <>
          {/* Desktop sidebar */}
          <aside className="hidden md:block w-52 shrink-0 pt-1">
            {sidebarContent}
          </aside>

          {/* Mobile filter toggle */}
          <div className="md:hidden w-full mb-4">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="text-[13px] font-medium border border-hairline rounded-full px-4 py-2 flex items-center gap-2 cursor-pointer hover:border-ink/40 transition-colors"
            >
              <svg viewBox="0 0 16 12" fill="none" className="w-4 h-3">
                <path
                  d="M1 1h14M4 6h8M7 11h2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              Filters{isFiltered ? ` (${activeCount})` : ""}
            </button>
            {mobileSidebarOpen && (
              <div className="mt-4 border border-hairline rounded-xl p-4">
                {sidebarContent}
              </div>
            )}
          </div>
        </>
      )}

      {/* Product grid */}
      <div className="flex-1 min-w-0">
        {isFiltered && filtered.length > 0 && (
          <p className="text-[13px] text-muted mb-6">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </p>
        )}

        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-[14px] text-muted mb-4">No products match these filters.</p>
            {isFiltered && (
              <button
                onClick={clearAll}
                className="text-[13px] font-medium text-ink underline underline-offset-2 cursor-pointer"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-16">
            {brandGroups.map(({ brand, items }) => (
              <section key={brand}>
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-hairline">
                  <h2 className="text-h2 text-ink">{brand}</h2>
                  <span className="text-[13px] text-muted">
                    {items.length} {items.length === 1 ? "product" : "products"}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {items.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
