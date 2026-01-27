import React from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import PageHeader from "../Pageheader/PageHeader";

const TEAM_DATA = [
  {
    name: "Shehla",
    role: "PRO | Guest Relations",
    description:
      "As our Public Relations and Guest Relations specialist, Shehla is the warm, welcoming face of Capital Stay. Her exceptional communication skills, cultural awareness, and hospitality expertise ensure every guest feels valued from the moment they book to the moment they depart. Her approachable nature and professionalism strengthen client trust and enhance the guest experience.",
    image: "../assets/teams/woman.jpg?text=SHEHLA",
  },
  {
    name: "Jibran",
    role: "Guest Relations Manager",
    description:
      "With a strong background in guest experience and operations management, Jibran oversees every interaction to ensure guests receive the highest standard of care. Known for his attention to detail, fast problem-solving, and commitment to excellence, he ensures every stay runs smoothly. His leadership keeps our service levels consistent, reliable, and memorable.",
    image: "../assets/teams/man1.jpg?text=JIBRAN",
  },
  {
    name: "Abu Baker Chen",
    role: "Housekeeping Supervisor",
    description:
      "Abu Baker leads our housekeeping operations with precision and pride. His dedication to cleanliness, quality control, and team coordination ensures each property meets Capital Stay’s premium standards. With a meticulous eye and strong work ethic, he plays a critical role in delivering spotless, comfortable, and welcoming stays for every guest.",
    image: "../assets/teams/man2.jpg?text=ABU+BAKER",
  },
];

export default function TeamPage() {
  return (
    <>
      <PageHeader
        title="Meet the Team"
        description="At Capital Stay, our dedicated team works tirelessly to deliver seamless short-term rental management, exceptional guest care, and premium property standards. Get to know the professionals who make it all possible."
        backgroundImage="../assets/dining.webp"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Meet the Team", href: "" },
        ]}
      />

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h4 className="text-blue-600 font-bold uppercase tracking-widest">
              Our Creative Team
            </h4>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2">
              Team Behind Capital Stay
            </h1>
            <p className="text-gray-500 max-w-3xl mx-auto mt-4">
              Meet the dedicated professionals driving our success and delivering exceptional experiences for our guests and property owners.
            </p>
          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {TEAM_DATA.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-lg overflow-hidden relative group transition"
              >
                {/* IMAGE */}
                <div className="h-[420px] w-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover group-hover:scale-110 transition duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/600x750?text=Not+Found";
                    }}
                  />
                </div>

                {/* OVERLAY CARD */}
                <div className="-mt-20 relative z-10 mx-4 p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mt-1">{member.role}</p>
                  

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
