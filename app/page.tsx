import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import Invitation from "@/components/site/Invitation";
import Gathering from "@/components/site/Gathering";
import Lineage from "@/components/site/Lineage";
import Book from "@/components/site/Book";
import Plants from "@/components/site/Plants";
import Setting from "@/components/site/Setting";
import Intentions from "@/components/site/Intentions";
import Conservation from "@/components/site/Conservation";
import Founder from "@/components/site/Founder";
import Gatherings from "@/components/site/Gatherings";
import Footer from "@/components/site/Footer";
import { site } from "@/lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.fullName,
  alternateName: site.name,
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
        <Invitation />
        <Gathering />
        <Lineage />
        <Book />
        <Plants />
        <Setting />
        <Intentions />
        <Conservation />
        <Founder />
        <Gatherings />
      </main>
      <Footer />
    </>
  );
}
