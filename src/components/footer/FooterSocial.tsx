import Link from "next/link";

export default function FooterSocial() {
  return (
    <>
      <div className="social-widget text-center text-md-end">
        <div className="social-style1">
          <Link className="text-white me-2 fw500 fz17" href="/">
            Follow us
          </Link>
          <Link href={"https://www.facebook.com/profile.php?id=61563072631626&mibextid=ZbWKwL"}>
            <i className="fab fa-facebook-f list-inline-item" />
          </Link>
          <Link href={"https://x.com/blackhardsgames?t=G1rhbNM1jk4LWh4kChgPzg&s=09"}>
            <i className="fab fa-twitter list-inline-item" />
          </Link>
          <Link href={"https://www.instagram.com/blackhards.games?igsh=cnA0enB4ZmZoZzhi"}>
            <i className="fab fa-instagram list-inline-item" />
          </Link>
          <Link href={"https://www.linkedin.com/company/blackhards"}>
            <i className="fab fa-linkedin-in list-inline-item" />
          </Link>
        </div>
      </div>
    </>
  );
}
