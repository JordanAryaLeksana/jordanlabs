import { DiscordLogoIcon, GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon, TiktokLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { ContactCard } from "@/components/pages/contact/ContactCard";
import { SocialCard } from "@/components/pages/contact/SocialCard";
import { CONTACT_CHANNELS } from "@/lib/config/contact";

export function SocialMasonry() {
  return <section id="contact-socials"><div className="mx-auto grid w-full max-w-5xl gap-4 px-6 py-12 md:grid-cols-2 lg:grid-cols-3"><ContactCard /><SocialCard {...CONTACT_CHANNELS.github} icon={<GithubLogoIcon size={30} />} description="Public software, applied AI experiments, and technical project work." className="lg:row-span-2" /><SocialCard {...CONTACT_CHANNELS.linkedin} icon={<LinkedinLogoIcon size={30} />} description="Professional profile, experience, and engineering conversations." /><SocialCard {...CONTACT_CHANNELS.instagram} icon={<InstagramLogoIcon size={30} />} description="A future space for visual notes and personal updates." /><SocialCard {...CONTACT_CHANNELS.tiktok} icon={<TiktokLogoIcon size={30} />} description="Short-form profile link is waiting to be configured." className="lg:min-h-72" /><SocialCard {...CONTACT_CHANNELS.discord} icon={<DiscordLogoIcon size={30} />} description="Discord username or profile link has not been configured yet." /></div></section>;
}
