import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { ContactCard } from "@/components/pages/contact/ContactCard";
import { SocialCard } from "@/components/pages/contact/SocialCard";
import { CONTACT_CHANNELS } from "@/lib/config/contact";

export function SocialMasonry() {
  return <section id="contact-socials"><div className="mx-auto grid w-full max-w-5xl gap-4 px-6 py-12 md:grid-cols-2"><ContactCard /><SocialCard {...CONTACT_CHANNELS.github} icon={<GithubLogoIcon size={30} />} description="Public software, applied AI experiments, and technical project work." /><SocialCard {...CONTACT_CHANNELS.linkedin} icon={<LinkedinLogoIcon size={30} />} description="Professional profile, experience, and engineering conversations." /></div></section>;
}
