import MobileRail from "../ui/MobileRail";
import ReadMore from "../ui/ReadMore";
import type { SpotlightMember } from "./TeamSpotlight";

/** Phone layout: light editorial cards with arched portraits, auto-gliding rail. */
export default function TeamArches({ members }: { members: SpotlightMember[] }) {
  return (
    <MobileRail label="Our team" slideClassName="w-[84%]" desktopClassName="md:grid-cols-2 md:gap-6">
      {members.map((m) => (
        <article key={m.name} className="flex flex-col items-center rounded-[28px] bg-[#fbf9f4] px-5 pb-6 pt-6 text-center ring-1 ring-[#e9e2d3]">
          {/* Arched portrait with a hairline gold frame */}
          <div className="relative w-[78%]">
            <div aria-hidden="true" className="absolute -inset-2 rounded-t-full rounded-b-[18px] border border-[#c8a96a]/60" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-full rounded-b-[14px] bg-slate-200">
              <img
                src={m.image}
                alt={`${m.name} - ${m.role} at Capital Stay Dubai`}
                className="h-full w-full object-cover object-top"
                loading="lazy"
              />
            </div>
          </div>

          <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.26em] text-[#9a7b3f]">{m.role}</p>
          <h3 className="mt-1.5 font-display text-[2rem] font-medium leading-none text-slate-900">{m.name}</h3>
          <span aria-hidden="true" className="my-4 flex items-center gap-2 text-[#c8a96a]">
            <span className="h-px w-8 bg-current" />
            <span className="size-1 rotate-45 bg-current" />
            <span className="h-px w-8 bg-current" />
          </span>
          <ReadMore collapsedHeight={92}>
            <p className="text-[13px] leading-relaxed text-slate-600">{m.description}</p>
          </ReadMore>
        </article>
      ))}
    </MobileRail>
  );
}
