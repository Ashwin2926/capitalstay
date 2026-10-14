
import { useState } from "react";
import PageHeader from "../Pageheader/PageHeader";
import TeamSpotlight from "./TeamSpotlight";
import { useSeo } from "../../hooks/useSeo"; 

 
const TeamSchema = ({ members }: { members: typeof TEAM_DATA }) => (
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "mainEntity": members.map(member => ({
        "@type": "Person",
        "name": member.name,
        "jobTitle": member.role,
        "description": member.description,
        "worksFor": {
          "@type": "LocalBusiness",
          "name": "Capital Stay UAE"
        }
      }))
    })}
  </script>
);

type TeamMember = {
  name: string;
  role: string;
  description: string;
  image: string;
};

const TEAM_DATA: TeamMember[] = [
  {
    name: "Jibran",
    role: "Guest Relations Manager",
    description:
      "With a strong background in guest experience and operations management, Jibran oversees every interaction to ensure guests receive the highest standard of care. Known for his attention to detail, fast problem-solving, and commitment to excellence, he ensures every stay runs smoothly. His leadership keeps our service levels consistent, reliable, and memorable.",
    image: "/assets/teams/jibran.webp",
  },
  {
    name: "Abu Baker Chen",
    role: "Housekeeping Supervisor",
    description:
      "Abu Baker leads our housekeeping operations with precision and pride. His dedication to cleanliness, quality control, and team coordination ensures each property meets Capital Stay’s premium standards. With a meticulous eye and strong work ethic, he guarantees that every home is guest-ready and maintained to perfection.",
    image: "/assets/teams/abu.webp",
  },
];

export default function TeamPage() {
  // 1. DYNAMIC SEO METADATA
  // Targets "Expertise" (E-E-A-T) which is a major ranking signal for Dubai Real Estate in 2026.
  useSeo({
    title: "Expert Property Management Team in Dubai",
    description: "Meet the professional team at Capital Stay UAE. DTCM-licensed specialists in guest relations, housekeeping, and high-yield property management.",
    keywords: "Dubai property management team, professional Airbnb hosts Dubai, Capital Stay staff, guest relations specialists Dubai"
  });

  return (
    <>
      {/* 2. STRUCTURED DATA INJECTION */}
      <TeamSchema members={TEAM_DATA} />

     
      <PageHeader
        title="Meet the Team"
        description="At Capital Stay, our dedicated team works tirelessly to deliver seamless short-term rental management, exceptional guest care, and premium property standards. Get to know the professionals who make it all possible."
        backgroundImage="../assets/dining.webp"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Meet the Team", href: "" },
        ]}
      />

      <section className="py-10 md:py-14 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-8 md:mb-10 max-w-2xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-medium text-gray-900 mb-3">
              World-class management, <em className="italic text-blue-600">local heart</em>
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              From DTCM compliance to 24/7 guest support, our team handles every detail
              of your holiday home with precision. Our experts are dedicated to maximizing
              your rental ROI while maintaining 5-star guest satisfaction.
            </p>
          </div>

          {/* Phones: story-style spotlight */}
          <div className="sm:hidden">
            <TeamSpotlight members={TEAM_DATA} />
          </div>

          <div className="hidden sm:grid grid-cols-2 items-stretch gap-4 md:gap-6">
            {TEAM_DATA.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  const [expanded, setExpanded] = useState(false);
  const bioId = `bio-${member.name.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <article className="group flex flex-col lg:flex-row overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
      {/* PHOTO: portrait on top on phones, column beside the bio from lg up */}
      <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto lg:w-52 shrink-0 overflow-hidden bg-gray-100">
        <img
          src={member.image}
          // 3. IMAGE SEO: Descriptive Alt Text including Role and Location
          alt={`${member.name} - ${member.role} at Capital Stay Dubai`}
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* DETAILS */}
      <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-5 lg:p-6">
        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-blue-600 leading-snug">
          {member.role}
        </p>
        <h3 className="mt-1 font-display text-lg sm:text-2xl font-medium leading-tight text-gray-900">
          {member.name}
        </h3>
        <span aria-hidden="true" className="mt-2 sm:mt-3 h-px w-8 sm:w-10 bg-blue-600/40" />
        <p
          id={bioId}
          className={`mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed text-gray-600 ${expanded ? "" : "line-clamp-3 sm:line-clamp-none"}`}
        >
          {member.description}
        </p>
        {/* Bio is clamped on phones only */}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls={bioId}
          className="mt-1.5 self-start rounded py-1 text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:hidden"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      </div>
    </article>
  );
}
