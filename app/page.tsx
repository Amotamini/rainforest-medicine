import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import Upcoming from "@/components/site/Upcoming";
import Invitation from "@/components/site/Invitation";
import Gathering from "@/components/site/Gathering";
import Setting from "@/components/site/Setting";
import Lineage from "@/components/site/Lineage";
import Plants from "@/components/site/Plants";
import Teachers from "@/components/site/Teachers";
import Founder from "@/components/site/Founder";
import Book from "@/components/site/Book";
import Testimonials from "@/components/site/Testimonials";
import Intentions from "@/components/site/Intentions";
import Conservation from "@/components/site/Conservation";
import Apply from "@/components/site/Apply";
import Footer from "@/components/site/Footer";
import { site } from "@/lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: site.name,
      alternateName: site.fullName,
      email: site.email,
      url: "https://rainforestmedicine.net",
      description:
        "Experiential ceremonial gatherings for personal, community and planetary renewal, held in the living plant-medicine traditions of the upper Amazon.",
      founder: {
        "@type": "Person",
        name: "Jonathon Sparrow Miller Weisberger",
        jobTitle: "Ethnobotanist & Author",
      },
      location: {
        "@type": "Place",
        name: "Ocean Forest Ecolodge",
        address: {
          "@type": "PostalAddress",
          addressRegion: "Osa Peninsula",
          addressCountry: "Costa Rica",
        },
      },
    },
    {
      "@type": "Event",
      name: "The Celestial Summer of the Cicadas",
      startDate: "2027-01-24",
      endDate: "2027-01-31",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: "Ocean Forest Ecolodge",
        address: {
          "@type": "PostalAddress",
          addressRegion: "Osa Peninsula",
          addressCountry: "Costa Rica",
        },
      },
      offers: {
        "@type": "Offer",
        price: "2700",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "Event",
      name: "Cocoterra Rainforest Camping",
      startDate: "2027-02-02",
      endDate: "2027-02-07",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: "Ocean Forest Ecolodge",
        address: {
          "@type": "PostalAddress",
          addressRegion: "Osa Peninsula",
          addressCountry: "Costa Rica",
        },
      },
      offers: {
        "@type": "Offer",
        price: "999",
        priceCurrency: "USD",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main>
        <Hero />
        <Upcoming />
        <Invitation />
        <Gathering />
        <Setting />
        <Lineage />
        <Plants />
        <Teachers />
        <Founder />
        <Book />
        <Testimonials />
        <Intentions />
        <Conservation />
        <Apply />
      </main>
      <Footer />
    </>
  );
}
