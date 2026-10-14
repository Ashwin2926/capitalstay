
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import PageHeader from "../Pageheader/PageHeader";
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
  image?: string;
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

const TEAM_DATA: TeamMember[] = [
  {
    name: "Shehla",
    role: "PRO | Guest Relations",
    description:
      "As our Public Relations and Guest Relations specialist, Shehla is the warm, welcoming face of Capital Stay. Her exceptional communication skills, cultural awareness, and hospitality expertise ensure every guest feels valued from the moment they book to the moment they depart. Her approachable nature and professionalism strengthen client trust and enhance the guest experience.",
  },
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

      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-medium text-gray-900 mb-4">
              World-class management, <em className="italic text-blue-600">local heart</em>
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              From DTCM compliance to 24/7 guest support, our team handles every detail
              of your holiday home with precision. Our experts are dedicated to maximizing
              your rental ROI while maintaining 5-star guest satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM_DATA.map((member, index) => (
              <div key={index} className="group relative">
                <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-lg">
                  {member.image ? (
                    <img
                      src={member.image}
                      // 3. IMAGE SEO: Descriptive Alt Text including Role and Location
                      alt={`${member.name} - ${member.role} at Capital Stay Dubai`}
                      className="h-full w-full object-cover object-top group-hover:scale-110 transition duration-700"
                      loading="lazy"
                    />
                  ) : (
                    // Initials avatar for members without a photo
                    <div
                      role="img"
                      aria-label={`${member.name} - ${member.role} at Capital Stay Dubai`}
                      className="h-full w-full flex items-start justify-center pt-[22%] bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900"
                    >
                      <span className="flex h-36 w-36 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/30 backdrop-blur-sm font-display text-6xl font-medium tracking-wide text-white group-hover:scale-105 transition duration-700">
                        {getInitials(member.name)}
                      </span>
                    </div>
                  )}
                </div>

                {/* OVERLAY CARD */}
                <div className="-mt-20 relative z-10 mx-4 p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mt-1">{member.role}</p>
                  
                  {/* Bio snippet for accessibility and SEO context */}
                  <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                    {member.description}
                  </p>

                  {/* SOCIAL ICONS */}
                  <div className="flex items-center gap-4 mt-4">
                    {[FaFacebookF, FaLinkedinIn].map(
                      (Icon, i) => (
                        <button
                          key={i}
                          className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white transition"
                        >
                          <Icon size={15} />
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}