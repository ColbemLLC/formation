import StickerSlapFooter, { type Social } from "@/packages/ui/sticker-slap-footer";
import { LOGIN_URL } from "./links";

// Fill in your real profile URLs. Allowed kinds: linkedin, instagram, tiktok, x, youtube, dribbble.
const SOCIALS: Social[] = [];

export function Footer() {
  return (
    <StickerSlapFooter
      wordmark="colbe"
      homeHref="/"
      navLabel="login"
      navHref={LOGIN_URL}
      chatHref=""
      jobsLabel="legal"
      jobs={[
        { title: "terms of use", href: "/terms-of-use" },
        { title: "terms of service", href: "/terms-of-service" },
        { title: "community guidelines", href: "/community-guidelines" },
      ]}
      officeLabel="colbe"
      address={["web, api and", "windows editor"]}
      mapLabel=""
      contactLabel="follow us"
      email=""
      note=""
      socials={SOCIALS}
      credits={[]}
    />
  );
}