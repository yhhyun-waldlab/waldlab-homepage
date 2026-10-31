import type { LegalSection } from "@/content/legal-terms-en";

export const PRIVACY_INTRO_EN =
  'Wald Lab Inc. ("Company") values your privacy and complies with the Personal Information Protection Act of the Republic of Korea and relevant global regulations. This Privacy Policy informs users how personal data is collected, handled, and protected.';

export const PRIVACY_SECTIONS_EN: LegalSection[] = [
  {
    title: "Article 1 (Purpose of Data Processing)",
    paragraphs: [
      "The Company processes minimal personal information strictly for the following purposes:",
      "1. Customer Inquiries: Handling business partnerships, solution introduction requests, product inquiries, and feedback received via email.",
      "2. Technical Stability: Ensuring web server security, preventing abusive access, and analyzing access traffic logs.",
    ],
  },
  {
    title: "Article 2 (Categories of Personal Data Collected)",
    paragraphs: [
      "1. Inquiries: Email addresses and any identifying details (e.g., name, company name, phone number) included in correspondence.",
      "2. Automatically Collected Information: IP addresses, access timestamps, browser specifications, OS environment, and service usage logs.",
    ],
  },
  {
    title: "Article 3 (Retention and Processing Period)",
    paragraphs: [
      "The Company retains personal data only as long as necessary to fulfill the intended purposes or as required by applicable laws:",
      "1. Inquiry Records: Retained for up to 3 years to ensure customer service continuity and dispute resolution.",
      "2. Server Access Logs: Retained for 3 months pursuant to the Protection of Communications Secrets Act.",
    ],
  },
  {
    title: "Article 4 (Destruction of Personal Information)",
    paragraphs: [
      "The Company promptly destroys personal information once the retention period has expired or the data is no longer necessary. Digital records are permanently erased using unrecoverable technical methods.",
    ],
  },
  {
    title: "Article 5 (Provision and Entrustment to Third Parties)",
    paragraphs: [
      "The Company does not share, disclose, or entrust personal data to third parties without prior user consent, except where required by statutory obligations.",
    ],
  },
  {
    title: "Article 6 (Rights of Data Subjects)",
    paragraphs: [
      "Users may request access to, rectification, deletion, or cessation of the processing of their personal data at any time by contacting the Company at info@waldlab.kr.",
    ],
  },
  {
    title: "Article 7 (Privacy Officer Contact)",
    paragraphs: [
      "For inquiries or concerns regarding personal information, please contact:",
      "- Data Protection Officer: Wald Lab Inc.",
      "- Contact: info@waldlab.kr ",
    ],
  },
  {
    title: "Article 8 (Amendments)",
    paragraphs: [
      "This Privacy Policy may be updated to reflect changes in regulatory standards or company policies. Any revisions will be announced via the Site.",
    ],
  },
];
