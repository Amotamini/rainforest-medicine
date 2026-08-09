/**
 * All site copy in one place. Drawn faithfully from rainforestmedicine.net —
 * reworded for the rebuild in a reverent, grounded voice. No medical or
 * health claims are made about the plant medicines; the forest, the
 * traditions, and the people are the protagonists.
 */

export const site = {
  name: "Rainforest Medicine Gatherings",
  fullName: "Rainforest Medicine Gatherings",
  email: "info@rainforestmedicine.net",
  location: "Ocean Forest Ecolodge · Osa Peninsula, Costa Rica",
  amazonUrl:
    "https://www.amazon.com/Rainforest-Medicine-Preserving-Indigenous-Biodiversity/dp/158394608X",
  yageDrinkerPdf:
    "https://rainforestmedicine.net/wp-content/uploads/2018/11/The-Yage-Drinker.pdf",
  conservationUrl: "https://www.4biodiversity.org/",
  /**
   * REMOVED FROM THE FOOTER 2026-08-09. guayusatea.com is no longer theirs — it
   * is parked on HugeDomains with a "this domain is for sale" page. Linking it
   * sent visitors from a plant-medicine site to a domain broker. Kept here, not
   * deleted, because Jonathon needs to be asked whether he wants the domain
   * back or the Guayusa Tea House page on 4biodiversity.org linked instead.
   * Do not put it back on the page without checking it resolves.
   */
  guayusaUrl: "https://www.guayusatea.com/",
  spotifyShow: "https://open.spotify.com/show/3pDptpM8S7ZlBFNgG7qjRY",
  youtubePlaylist: "https://www.youtube.com/playlist?list=PLF8zIucJH_rqJ-H0XS0OxLmbRV8uLJn2x",
  heroVideoSrc: "", // empty = still image fallback. Set to an /videos/*.mp4 path when Ryan's film lands.
};

/**
 * Every section on the page, in the order it appears, with the label each
 * section actually carries. If a section is added, moved or removed, this list
 * moves with it — it is the page's table of contents, not a selection from it.
 */
export const nav = [
  { label: "Upcoming Gatherings", href: "#upcoming", hint: "Three gatherings, what each includes, and how to reserve" },
  { label: "The Invitation", href: "#invitation", hint: "Why these gatherings are held" },
  { label: "The Gathering", href: "#gathering", hint: "What the days hold" },
  { label: "The Setting", href: "#setting", hint: "Ocean Forest Ecolodge, on the Osa Peninsula" },
  { label: "The Lineage", href: "#lineage", hint: "The Secoya tradition and the elders who carried it" },
  { label: "The Plants", href: "#plants", hint: "Yagé and the garden around it" },
  { label: "The Teachers", href: "#teachers", hint: "The people who carry this work" },
  { label: "The Guide", href: "#founder", hint: "Jonathon Miller Weisberger" },
  { label: "The Book", href: "#book", hint: "Rainforest Medicine, and where to find it" },
  { label: "Testimonials", href: "#testimonials", hint: "In the words of people who came" },
  { label: "Intentions", href: "#intentions", hint: "Why we gather" },
  { label: "Reciprocity", href: "#conservation", hint: "Where the money goes" },
  { label: "Taking Part", href: "#apply", hint: "How to join, and what to read first" },
];

export const hero = {
  eyebrow: "The Upper Amazon, Ecuador · Osa Peninsula, Costa Rica",
  title: "Rainforest Medicine Gatherings",
  subtitle:
    "Experiential ceremonial gatherings for personal, community and planetary renewal — held in the living plant-medicine traditions of the upper Amazon.",
  nextLabel: "Next gathering",
  nextLine: "Napo-Galeras Wilderness Expedition · November 22 – 30, 2026 · Napo Province, Ecuador",
  cta: "Reserve your place",
  ctaHref: "#upcoming",
};

export const invitation = {
  eyebrow: "The Invitation",
  heading: "For personal, community and planetary renewal",
  body: [
    "For countless generations, the time-tested plant-medicine traditions of the rainforest have been a source of vitality and inspiration to the Indigenous families of the upper Amazon.",
    "A Rainforest Medicine Gathering opens a space for that heritage to be met with reverence — an appropriately guided ceremonial experience that invites a person to awaken to their own vitality, to gain a deeper perspective on life, and to encounter the marvelous cultural and biological diversity of the Amazon.",
  ],
};

export const gathering = {
  eyebrow: "The Gathering",
  heading: "A communion of ancient friends",
  body: [
    "We gather to learn and experience timeless rainforest plant-medicine traditions — held in accordance with the millenary, time-tested way of the “Multicolored People,” at a wilderness rainforest and oceanfront setting on Costa Rica's Osa Peninsula.",
    "The days hold ceremony and rest, the forest and the sea, simple natural meals, and the company of those who carry this way of life. People come from across the world and leave as a community of ancient friends.",
  ],
};

export const lineage = {
  eyebrow: "The Lineage",
  heading: "The Multicolored People's communion with the always-new ones",
  body: [
    "This is the ceremonial science of the Secoya — the Siekopai, whose name means “God's Multicolored People” — of the upper Amazon regions of Ecuador and Peru. It was received generations ago and carried by the elders: the torchbearers of a tradition whose importance is only beginning to be understood.",
    "The great-hearted elders were raised in the wilderness, in a life woven through with ceremony. Among them was Maestro Cesáreo Piaguaje, a Siekopai elder who lived beyond a hundred years and whose friendship with this work began in 1994. The elders who taught here have now passed to the other side. What they gave, they gave completely, and it is carried today by those they taught.",
    "Today geopolitical borders, the encroachment of extraction, and the long impact of colonization imperil the culture and ancestral lands of the Secoya. To gather is, in part, to help keep this living heritage alive.",
  ],
  quote:
    "They shared visions and sacred designs too spectacular to be acquired in any other way — other than by sitting with them through the timelessness of the cool nights of yagé.",
  quoteAttr: "From the Secoya tradition",
};

export const book = {
  eyebrow: "The Book",
  title: "Rainforest Medicine",
  subtitle: "Preserving Indigenous Science and Biodiversity in the Upper Amazon",
  author: "by Jonathon Sparrow Miller Weisberger",
  body: [
    "Chronicling the practices, legends and wisdom of the vanishing traditions of the upper Amazon, this book reveals the region's Indigenous approach to living in harmony with the natural world — with in-depth essays on plant-based medicine and Indigenous science from four distinct Amazonian societies: deep-forest and urban, lowland rainforest and mountain.",
    "It's illustrated with botanical and cultural drawings by Secoya elder and traditional healer Agustín Payaguaje and by the author, and includes previously unpublished paintings by Pablo César Amaringo (1938–2009), the acclaimed Peruvian visionary artist renowned for his depictions of the world seen through ayahuasca.",
  ],
  cta: "Find the book on Amazon",
};

export const plants = {
  eyebrow: "The Plants",
  heading: "Sacred wisdom plants",
  body: [
    "At the center of the tradition is yagé — also known as ayahuasca — a rainforest vine, prepared together with the leaves of a companion plant. The brew is made on site in a remote jungle setting, in strict obedience to the ancestral methods passed down to the Siekopai people of the upper Amazon.",
    "Around it grows a whole garden the elders knew and tended by name, kept today as they kept it. Flower baths, incense cleansing and renewal ceremonies are carried out according to traditional ways — each plant used as it has been for countless generations.",
  ],
  list: [
    { name: "Yagé · Ayahuasca", latin: "Banisteriopsis caapi", note: "“The vine of the soul.”" },
    { name: "Yagé'ocó · Yají", latin: "Diplopterys cabrerana", note: "The leaf prepared with the vine." },
    { name: "Guayusa", latin: "Ilex guayusa", note: "A dawn tea of the eastern forests." },
    { name: "Sanango", latin: "Tabernaemontana sananho", note: "A plant of the ancestral garden." },
    { name: "Achiote", latin: "Bixa orellana", note: "Seed of adornment and ceremony." },
    { name: "Copal", latin: "Dacryodes peruviana", note: "Fragrant resin for cleansing smoke." },
  ],
};

export const setting = {
  eyebrow: "The Setting",
  heading: "Where the rainforest meets the sparkling ocean",
  body: [
    "The gatherings are held at the Ocean Forest Ecolodge — also known as Guaria de Osa — on Costa Rica's treasured Osa Peninsula, a place renowned for its vast diversity of plant and animal life.",
    "It's tucked perfectly between a pristine beach, an ethnobotanical and permaculture garden, and the thriving rainforest. You'll find yoga, therapeutic massage and wellness, comfortable open-air accommodations, and three natural meals a day — while the birds, plants and wildlife abound, sing and play.",
  ],
  features: [
    "Pristine beach & headland",
    "Ethnobotanical garden",
    "Open-air accommodations",
    "Three natural meals daily",
    "Yoga & wellness",
    "Hand-built ceremonial temple",
  ],
};

export const teachers = {
  eyebrow: "The Teachers",
  heading: "The people who carry this work",
  intro:
    "Gatherings are held by a small team who have been part of this work for years. Who is present varies from one gathering to the next \u2014 write to us and we will tell you who will be there for yours.",
  list: [
    {
      name: "Scott Crawford",
      role: "Group facilitator \u00b7 Aloha spirit",
      bio: "On the plant-medicine path and a supporter of Jonathon's work since they became friends in 1993. A practitioner of Hawaiian cultural and spiritual traditions, knowledgeable in the medicinal and other uses of tropical plants, and a dedicated community organiser around food security, ocean management and land conservation. Scott serves the Rainforest Medicine Councils as a group facilitator \u2014 holding communication and scheduling, leading activities, meeting participants' needs, and helping in the ceremonies.",
    },
    {
      name: "Bern Wisenberg",
      role: "Group facilitator",
      bio: "A peacemaker and energy guide in service of life. Bern joins gatherings as a people person and a facilitator, helping participants unpack and integrate the experience. He has long been drawn to the transcendental experience and its role in society.",
    },
    {
      name: "Benjamin Mamallacta",
      role: "Kichwa storyteller \u00b7 Rainforest guide",
      bio: "A Kichwa native of Archidona, in Napo Province, upper Amazonian Ecuador. A skilled jungle guide and wilderness survival expert with a keen eye for wildlife and birds, and an avid storyteller who recounts the myths and legends of his people with absolute fluidity. Known as Iji, \u201cGrasshopper\u201d. Founder of the Ungi Ethnobotanical gardens outside Tena, where he and his family have produced and distributed medicinal plants and fruit trees since 1995.",
    },
    {
      name: "Walter Grefa",
      role: "Kichwa chef \u00b7 Rainforest guide",
      bio: "A Kichwa native of Archidona, in Amazonian Ecuador. A skilled chef who creates remarkable dishes from the foods he gathers in the forest, with over a decade cooking at Amazonian lodges \u2014 and a highly skilled rainforest guide.",
    },
    {
      name: "Gerard Artesona",
      role: "Integration therapist",
      bio: "A psychotherapist specialising in integration therapy and counselling, with a private practice in Oakland, California. His experience serving the mental-health needs of patients in hospital settings, alongside a therapeutic approach that bridges Western psychology and entheogenic ritual and practice, supports people on their healing journeys. He has taught yoga and mindfulness, primarily with transitional-age youth and formerly gang-involved inmates, and has embraced the healing potential of plant medicines for over ten years.",
    },
    {
      name: "Rosie Peacock",
      role: "Psychedelic integration coach",
      bio: "A Psychedelic Integration Coach, Positive Psychologist and Coaching Psychologist (MSc), and a yoga and meditation teacher from the UK. Her work in wellbeing and psychedelics has been featured in OK! Magazine, The Metro, Planet Mindful, Thrive Global and elsewhere.",
    },
  ] as { name: string; role: string; bio: string }[],
};

export const founder = {
  eyebrow: "The Guide",
  name: "Jonathon “Sparrow” Miller Weisberger",
  role: "Ethnobotanist · Author · Facilitator",
  body: [
    "Jonathon has spent more than twenty-seven years immersed in studying and applying the wisdom of time-tested world-heritage traditions — working alongside Secoya and Siekopai elders since 1994, and on the Osa Peninsula since 2000.",
    "He's the author of Rainforest Medicine, and takes great joy in facilitating experiential education: processes that help people meet these traditions with the respect they ask for, and find wellness and renewal on every level of their being.",
  ],
};

/**
 * Supplied by Jonathon, 2026-08-09. Published in the participants' own words.
 * Two edits only, both mechanical: the spelling of Jonathon's name is corrected
 * where a writer wrote "Jonathan", and Dr Santander's licence number, clinic
 * name and website are not published. Nothing else is trimmed or softened.
 */
export const testimonials = {
  eyebrow: "Testimonials",
  heading: "In the words of people who came",
  items: [
    {
      quote:
        "I came into this retreat after a year of trauma feeling stuck, but with a spirit of openness to hear the wisdom I couldn't get anywhere else. This experience systematically took away the veils that had kept me from seeing the truth of things. The preparation and the journey into the rainforest — hiking, taking boats, fasting — felt just as important as the ceremony itself. It showed my own willingness to be moved by the experience. Being at the lodge was wonderful and simple. The food was fantastic and easy on my sensitive digestive system, with plenty of quiet time to sit in a hammock and take in nature. In our small group, we built deep connections and learned from one another's journeys. I reached very deep parts of myself and beyond that I don't know how I would have accessed without the medicine. Jonathon is incredible — an expert ethnobotanist with so much knowledge to share. It has been a truly wonderful experience.",
      name: "Jim Cunningham",
      role: "Family therapist",
    },
    {
      quote:
        "Eleven years ago, a mysterious pull brought me to my first ceremony here with no idea what to expect — and it became the heartbeat of my life. Working with Jonathon opened my eyes to a profound way of becoming alive through traditional plant medicine, guided by teachings far wiser and more ancient than anything I could have imagined. Jonathon is an extraordinary guide: hilarious, joyful, and sacred to the bone in his transmission of the Secoya traditions. Returning as often as I can over the past decade, this practice has integrated into my very cells, changing how I live and connecting me to a living, universal intelligence. I recommend this experience to anyone ready to receive something truly sacred.",
      name: "Liz Heron",
      role: "Family therapist and counsellor",
    },
    {
      quote:
        "Aloha, my name is David Santander. I'm a Doctor of Traditional Chinese Medicine and acupuncturist. I've attended three council gatherings under the incredibly skilled and highly experienced supervision and facilitation of Jonathon Sparrow Miller Weisberger. I cannot understate how much these council gatherings have changed my life. It's one of the most efficient, effective, and magical forms of medicine that I've ever encountered. I truly appreciate and respect Jonathon's 30+ years of experience and expertise, and I'm really able to trust in the experience and ceremonial guardrails knowing how much experience he has. Jonathon has been very accommodating to everyone's individual needs, fears, and questions every time I go. Each ceremony feels like a lifetime of therapy. Each day spent at Ocean Forest Ecolodge and at the ceremony lodge is a blessing for your soul, spirit, and mind.",
      name: "Dr David Santander",
      role: "Doctor of Traditional Chinese Medicine · Hawai'i",
    },
    {
      quote:
        "This 10-day retreat went far beyond my expectations and changed my life. I felt safe, held, and deeply connected — to nature, to myself, and to a true soul family. I healed things inside myself that wouldn't have been possible without the medicine. I am endlessly grateful to the plants, the Secoya tradition, the Winepai, and Jonathon's profound wisdom and care. From the beautiful lodge, delicious food, and herb baths to the plant walks and priceless views, I returned home glowing, fearless, clear-minded, and expanded in my voice. I recommend this council to anyone wanting to truly heal.",
      name: "Joelle",
      role: "",
    },
    {
      quote:
        "Traveling into the Napo-Galeras wilderness with Jonathon was a true adventure and a wonderful experience, full of unexpected beauty and challenges. Connecting with the spirit of the jungle and spending time in nature during and around the ceremonies still resonates with me today. I would highly recommend it to anyone who feels the call.",
      name: "Charles Buckingham",
      role: "Napo-Galeras, Ecuadorian Amazon",
    },
  ] as { quote: string; name: string; role: string }[],
};

export const intentions = {
  eyebrow: "Intentions",
  heading: "Why we gather",
  items: [
    "To offer renewal of body, mind and spirit through the rainforest plant-medicine traditions.",
    "To experience the ancient origins and living importance of these traditions, as carried by the Secoya elders for centuries.",
    "To meet the teaching of the Secoya wisdom keepers — given by the traditional elders, and carried forward by those who sat with them.",
    "To experience tropical biodiversity in a remote rainforest and ocean wilderness where birds, plants and wildlife abound.",
    "To meet mindful fellow travelers, and to inspire change in oneself, in community and on the planet.",
    "To take an intrepid inward journey — and to shift fear into curiosity.",
    "To magnify one's sense of wonder.",
    "To become a better friend to oneself.",
  ],
};

export const conservation = {
  eyebrow: "Reciprocity",
  heading: "Conservation & cultural heritage",
  body: [
    "Joining a gathering is taking part in something larger than a retreat. Since 1994 this work has supported communities in the upper Amazon, and since 2000 the Osa Peninsula of Costa Rica. The means generated go toward three intertwined spheres of care.",
  ],
  spheres: [
    {
      title: "Cultural Heritage Revalidation",
      text: "Supporting Siekopai families, their ancestral lodges, and the documentation of myth and language — so the tradition is carried forward by the young.",
    },
    {
      title: "Rainforest & Wildlife Conservation",
      text: "Protecting forest and coast — including a marine-turtle initiative on Rincón de San Josecito beach, where more than a hundred nests are guarded each year.",
    },
    {
      title: "Restoration of Degraded Lands",
      text: "Reforestation alongside Andean communities through long-running efforts such as “Dressing the Mountains in Green.”",
    },
  ],
  cta: "See the conservation work",
};

export type Gathering = {
  id: string;
  title: string;
  dates: string;
  place: string;
  price: string;
  deposit: string;
  places: string;
  ceremonies: string[];
  includes: string[];
  notIncluded: string[];
  bookUrl: string;
  note?: string;
};

export const gatherings = {
  eyebrow: "Upcoming Gatherings",
  heading: "Three gatherings",
  intro:
    "Each gathering is limited to twelve people. A deposit holds your place. Read the preparation before you book — it is published here in full, and some conditions and medications are not compatible with these ceremonies.",
  upcoming: [
    {
      id: "napo-galeras-2026",
      title: "Napo-Galeras Wilderness Expedition",
      // Matches the WeTravel listing, which is where the money changes hands.
      // Jonathon's own event page still says November 20 to 29 and needs fixing.
      dates: "November 22 – 30, 2026",
      place: "Pusuno River & Napo-Galeras · Napo Province, Ecuador",
      price: "$2,700",
      deposit: "$500 deposit holds your place",
      places: "12 places",
      ceremonies: [
        "One to two ceremonies of yagé at the wilderness camp",
        "One to two sunrise renewal ceremonies",
      ],
      includes: [
        "Seven nights camping in the upper Ecuadorian Amazon",
        "Wilderness camp at the base of the Napo-Galeras massif, reached on a full day's walk",
        "The Pusuno River, its limestone chasms and waterfalls",
        "Round trip private chartered bus from Quito, and porter service for gear",
        "All camp meals, cooked by Kichwa chef Walter Grefa",
        "Guided by Jonathon, who wrote about this massif in chapter eight of Rainforest Medicine",
      ],
      notIncluded: [
        "Flights, airport transfers and the hotel in Quito",
        "Meals on the road in and out",
        "The Papallacta hot springs cabin, an extra fee shared among the group",
        "Ceremonial limpias, offered as an extra option",
      ],
      bookUrl:
        "https://www.wetravel.com/trips/nov-22-30-2026-ecuador-upper-amazon-wilderness-immersion-ocean-forest-ecolodge-70966045",
      note: "This one is an expedition before it is a retreat, and it is meant for the fit and adventurous. A four hour drive from Quito, a two hour hike on the first day, then eight to ten hours on the second, carrying your own pack. Returning participants receive fifteen percent off when booking three months ahead.",
    },
    {
      id: "cicadas-2027",
      title: "The Celestial Summer of the Cicadas",
      dates: "January 24 – 31, 2027",
      place: "Ocean Forest Ecolodge · Osa Peninsula, Costa Rica",
      price: "$2,700",
      deposit: "$500 deposit holds your place",
      places: "12 places",
      ceremonies: [
        "Two traditional ceremonies of yagé, brewed on site",
        "Two sunrise renewal ceremonies",
        "Three rainforest floral baths",
      ],
      includes: [
        "Seven nights in oceanfront shared lodging where the jungle meets the sea",
        "Three dieta-friendly meals a day",
        "Guided ethnobotanical plant walks through the gardens and the forest",
        "Rainforest trails, beach hikes and the jade green Rio Claro",
        "Yoga, Qigong and wellness sessions",
      ],
      notIncluded: [
        "Transfers to and from the lodge",
        "Hotels in San José on the way in or out",
        "A private bungalow, which is available as an add-on",
      ],
      bookUrl:
        "https://www.wetravel.com/trips/jan-24-31-2027-costa-rica-rainforest-retreat-ocean-forest-ecolodge-9423952809",
    },
    {
      id: "cocoterra-2027",
      title: "Cocoterra Rainforest Camping",
      dates: "February 2 – 7, 2027",
      place: "Cocoterra Rainforest Permaculture Project · Osa Peninsula, Costa Rica",
      price: "$999",
      deposit: "$333 deposit holds your place",
      places: "12 places",
      ceremonies: [
        "Two ceremonies of yagé at the campsite, old school",
        "Two sunrise renewal ceremonies",
      ],
      includes: [
        "Five nights camping in the heart of the forest",
        "Dieta-friendly meals",
        "Daily waterfall immersion",
        "Guided ethnobotanical plant walks and rainforest trails",
        "Swimming in the jade green Rio Claro",
        "Long slow walks beneath the towering trees, and time set aside for fasting and rest",
      ],
      notIncluded: [
        "Transfers to and from the site",
        "Hotels in San José on the way in or out",
      ],
      bookUrl:
        "https://www.wetravel.com/trips/costa-rica-feb-2-7-2026-at-the-cocoterra-ocean-forest-ecolodge-2965444516",
      note: "Held in early February, when the vines of yagé are in peak flower and the cicadas are at full shrill. It follows the January gathering for those who want to go deeper, and newcomers are welcome.",
    },
  ] as Gathering[],
  cta: "Reserve your place",
  ctaNote: "Booking and deposits are handled on WeTravel",
};

export const apply = {
  eyebrow: "Taking Part",
  heading: "How to join",
  steps: [
    { n: "01", title: "Choose your gathering", text: "Three are open. They are not the same experience, and the pages above say how they differ." },
    { n: "02", title: "Read the preparation", text: "The full protocol is published on this site. Read it before you book, not after." },
    { n: "03", title: "Reserve your place", text: "A deposit holds it. Booking and payment are handled on WeTravel." },
    { n: "04", title: "The dieta begins", text: "Preparation starts two weeks before you arrive. We walk it with you." },
  ],
  ageNote:
    "Participants are 18 and over. Younger people are welcome when accompanied by a parent or guardian.",
  healthNote:
    "Some medical conditions and medications are not compatible with these ceremonies. The full preparation protocol is published openly on this site, and if anything in it gives you pause, write to us before you book rather than after.",
  cta: "See the gatherings",
  ctaHref: "#upcoming",
  secondaryCta: "Questions before you book",
};

export const footer = {
  blessing: "May the forest, and the ones who've kept its wisdom, be honored.",
  links: [
    { label: "The Book", href: site.amazonUrl, external: true },
    { label: "Conservation · 4biodiversity.org", href: site.conservationUrl, external: true },
  ],
};
