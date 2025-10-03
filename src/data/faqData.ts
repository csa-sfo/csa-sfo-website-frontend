export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const homepageFAQs: FAQItem[] = [
  {
    id: "what-is-csa-sfo",
    question: "What is CSA San Francisco (CSA SFO)?",
    answer: "CSA San Francisco is the Bay Area chapter of the Cloud Security Alliance. We connect cybersecurity and IT professionals to share knowledge, network, and advance best practices in cloud security."
  },
  {
    id: "who-can-join-csa-sfo",
    question: "Who can join CSA SFO?",
    answer: "Anyone interested in cloud security can join — including engineers, architects, CISOs, compliance specialists, students, and career changers in cybersecurity."
  },
  {
    id: "csa-sfo-events",
    question: "How often does CSA SFO host events?",
    answer: "We host monthly meetings plus workshops, webinars, and joint events with groups like OWASP. Annual summits and training sessions are also offered."
  },
  {
    id: "csa-sfo-cost",
    question: "Is CSA San Francisco membership free?",
    answer: "Yes. Local chapter membership and events are free, supported by sponsors. Global CSA membership is optional and offers extra resources and certifications."
  },
  {
    id: "csa-sfo-meetings",
    question: "Where are CSA SFO meetings held?",
    answer: "Meetings take place across San Francisco, Silicon Valley, and San Jose at sponsor offices, universities, and tech hubs. Virtual options are also available."
  },
  {
    id: "career-benefits",
    question: "How can CSA SFO help my cybersecurity career?",
    answer: "Members gain career benefits like networking with hiring managers, mentorship, certification guidance, job postings, and speaking opportunities to boost visibility."
  },
  {
    id: "speaker-opportunities",
    question: "Can I present at CSA SFO events?",
    answer: "Yes, we welcome speakers on cloud security best practices, compliance, AI security, DevSecOps, and more. Submit a proposal through our website."
  },
  {
    id: "csa-membership-difference",
    question: "What's the difference between CSA global and local membership?",
    answer: "Local membership is free and covers chapter events. Global CSA membership ($95/year) includes whitepapers, certification discounts, and voting rights."
  },
  {
    id: "cloud-certifications",
    question: "What cloud security certifications are recommended?",
    answer: "Popular certifications include CCSK, CCSP, CISSP, AWS Security Specialty, Azure Security Engineer, Google Cloud Security Engineer, and CompTIA Cloud+."
  },
  {
    id: "networking-opportunities",
    question: "What networking does CSA San Francisco offer?",
    answer: "We provide networking before and after meetings, LinkedIn community discussions, mentorship pairings, job referrals, and industry mixers with other groups."
  },
  {
    id: "cloud-trends",
    question: "What cloud security trends does CSA SFO cover?",
    answer: "We focus on Zero Trust, AI/ML security, multi-cloud, Kubernetes, DevSecOps, compliance automation, IAM, and cloud-native security tools."
  },
  {
    id: "sponsors",
    question: "Who sponsors CSA San Francisco?",
    answer: "We're supported by cybersecurity vendors, cloud providers, consulting firms, universities, and local tech companies. Sponsorship opportunities are available."
  },
  {
    id: "virtual-events",
    question: "Does CSA SFO host virtual events?",
    answer: "Yes. We offer webinars, hybrid meetings, and recorded sessions so members can participate anywhere in the Bay Area and beyond."
  },
  {
    id: "student-programs",
    question: "Does CSA SFO support students and early-career professionals?",
    answer: "Yes, we offer mentorship, internships, career guidance, study groups, scholarships, and free access to events for students and newcomers."
  },
  {
    id: "job-market",
    question: "What is the cloud security job market in the Bay Area?",
    answer: "San Francisco has one of the world's strongest markets, with roles in DevSecOps, compliance, and architecture. Salaries range $120K–$300K+."
  },
  {
    id: "learning-resources",
    question: "What learning resources does CSA SFO provide?",
    answer: "We share expert talks, recorded sessions, study groups, industry whitepapers, hands-on workshops, and best-practice guides for cloud security."
  },
  {
    id: "stay-updated",
    question: "How can I stay updated on CSA SFO activities?",
    answer: "Check csasfo.com, join our LinkedIn group, subscribe to our newsletter, and follow our social media channels for the latest updates."
  },
  {
    id: "volunteer",
    question: "How can I volunteer with CSA San Francisco?",
    answer: "Volunteers help with events, speaker curation, social media, sponsorship outreach, and leadership roles. It's a great way to build skills and network."
  },
  {
    id: "cloud-best-practices",
    question: "What are essential cloud security best practices?",
    answer: "We promote Zero Trust, MFA, encryption, continuous monitoring, incident response planning, audits, IAM, and regular employee security training."
  },
  {
    id: "industry-connections",
    question: "How does CSA SFO connect with other security organizations?",
    answer: "We collaborate with OWASP, ISC2, universities, and local security meetups, hosting joint events and advocating for global cloud security standards."
  }
];

export default homepageFAQs;
