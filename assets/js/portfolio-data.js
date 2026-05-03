/**
 * Portfolio content — edit this file to update the site.
 *
 * CERTIFICATIONS: append objects to `certifications`. Each item:
 *   title       — name of the credential (required)
 *   issuer      — organization (optional)
 *   date        — display string e.g. "Oct 2018" (optional)
 *   location    — city / country (optional)
 *   summary     — short description (optional)
 *   credentialUrl — link to verify / badge (optional)
 *   link        — same as credentialUrl (optional; either key works)
 *
 * EDUCATION: same shape; shown under a separate heading.
 *
 * SOCIAL:
 *   linkedin — public profile URL (Contact + footer)
 *   telegramUsername — public @handle without @; powers t.me links + Telegram contact form
 */
window.PORTFOLIO_DATA = {
  social: {
    linkedin: "https://www.linkedin.com/in/xo25me",
    telegramUsername: "@suduer",
  },

  certifications: [
    {
      title: "Cyber Security Analyst",
      issuer: "Ariel University & Cybint Solutions",
      date: "Oct 2018",
      location: "Ari'el, Israel",
      summary:
        "Information and communication technologies — programming, cybersecurity, pentesting, malware analysis, network forensics, incident response, and related areas.",
    },
    {
      title: "GitHub Copilot",
      issuer: "Microsoft",
      date: "Oct 2018",
      link: "https://learn.microsoft.com/en-us/users/exodustesfayegebre-5314/credentials/5201f1b6be2fce09?ref=https%3A%2F%2Fwww.linkedin.com%2F",
      location: "Ari'el, Israel",
      summary:
        "Information and communication technologies — programming, cybersecurity, pentesting, malware analysis, network forensics, incident response, and related areas.",
    },
    {
      title: "Andela React Learning Program",
      issuer: "Andela",
      date: "Oct 2018",
      link: "https://credsverse.com/credentials/4ea80678-b6df-45c1-b476-8b58713755e5",
      location: "Ari'el, Israel",
      summary:
        "A 12-week program that teaches you the basics of React and how to build a web application using React.",
    },
  ],

  education: [
    {
      title: "BSc, Electrical and Computer Engineering",
      issuer: "Haramaya University",
      date: "Jun 2017",
      location: "Harar, Ethiopia",
      summary:
        "Computing, OOP, databases, applied mathematics, SCADA, DSP, electronics, and related engineering coursework.",
    },
  ],
};
