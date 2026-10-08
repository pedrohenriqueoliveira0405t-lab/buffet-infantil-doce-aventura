import { brand, contact, numbers, packages, rating, seo } from "@/content/site";
import { formatPrice } from "./format";
import { siteUrl } from "./site-url";

/** JSON-LD LocalBusiness + EventVenue, montado a partir de `site.ts`. */
export function buildLocalBusinessJsonLd() {
  const prices = packages.items.map((item) => item.priceFrom);

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EventVenue"],
    "@id": `${siteUrl}/#buffet`,
    name: brand.name,
    description: seo.description,
    url: siteUrl,
    image: `${siteUrl}/opengraph-image`,
    logo: `${siteUrl}${brand.logo.src}`,
    telephone: contact.phoneInternational,
    priceRange: `${formatPrice(Math.min(...prices))} – ${formatPrice(Math.max(...prices))}`,
    foundingDate: String(numbers.foundedYear),
    maximumAttendeeCapacity: numbers.maxGuests,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      addressLocality: contact.address.city,
      addressRegion: contact.address.state,
      addressCountry: contact.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: contact.geo.latitude,
      longitude: contact.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: contact.visitHours.days,
        opens: contact.visitHours.opens,
        closes: contact.visitHours.closes,
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating.value,
      reviewCount: rating.count,
      bestRating: 5,
    },
    areaServed: contact.areaServed.map((city) => ({ "@type": "City", name: city })),
    sameAs: [contact.instagramUrl],
  };
}

/** Serializa o JSON-LD escapando "<" para evitar injeção de HTML. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
