import { Button } from "@/components/ui/Button";

interface PricingCardProps {
  tier: string;          // "Beginner kit"
  audience: string;      // "For new players getting started"
  price: number;
  compareAt: number;     // MSRP
  items: string[];
  featured?: boolean;
  href?: string;
  className?: string;
}

export function PricingCard({
  tier,
  audience,
  price,
  compareAt,
  items,
  featured = false,
  href = "/shop",
  className = "",
}: PricingCardProps) {
  return (
    <div
      className={`bg-surface border rounded-[16px] p-8 flex flex-col gap-6 ${
        featured ? "border-ink" : "border-hairline"
      } ${className}`}
    >
      {featured && (
        <div className="inline-flex">
          <span className="text-[11px] font-medium bg-accent text-ink px-3 py-1 rounded-full">
            Most popular
          </span>
        </div>
      )}

      <div>
        <h3 className="text-h3 text-ink mb-1">{tier}</h3>
        <p className="text-[13px] text-muted">{audience}</p>
      </div>

      <div className="flex items-baseline gap-3">
        <span className="text-h1 text-ink">${price}</span>
        <span className="text-[15px] text-muted line-through">${compareAt}</span>
        <span className="text-[12px] font-medium text-success">
          Save ${compareAt - price}
        </span>
      </div>

      <ul className="flex flex-col gap-2 border-t border-hairline pt-6">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-[13px] text-ink">
            <span className="mt-1.5 h-1 w-1 rounded-full bg-ink flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <Button href={href} variant={featured ? "primary" : "ghost"} size="md" className="w-full justify-center">
          Add to cart
        </Button>
      </div>
    </div>
  );
}
