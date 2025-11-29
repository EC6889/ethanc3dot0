import { ExperienceItem, ProjectItem, SkillMetric } from './types';
import { History, Network } from 'lucide-react';

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skill', href: '#skills' },
  { label: 'Project', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const RESUME_CONTENT = `ETHAN C. | CX OPERATIONS MANAGER & STRATEGIST
Location: Kuala Lumpur, Malaysia
Email: gmeal6889@gmail.com
LinkedIn: linkedin.com/in/echia6889

PROFESSIONAL PROFILE
Practical CX Leader with 15+ years of experience running contact centers in Hospitality and Logistics. I focus on bridging the gap between daily operations and technical systems. My expertise lies in supporting high-performance teams, setting up support platforms (Zendesk/Salesforce), and fixing processes to make things run smoother for both agents and customers.

CORE COMPETENCIES
- CX Operations Management
- Team Leadership & Coaching
- System Configuration (SaaS/CRM)
- Process Improvement
- Incident Management
- Vendor & Budget Management
- Operational Reporting
- Stakeholder Collaboration

TECHNICAL PROFICIENCY
- Core Platforms: Zendesk, Genesys Cloud, Salesforce, Cisco UCCX
- Productivity: Google Workspace, Apps Script, Looker Studio
- Collaboration: Lark, Slack, Microsoft Teams
- Integration: Zapier, Webhooks, REST API, Postman
- Hospitality: SiteMinder, Opera PMS, SISTIC

PROFESSIONAL EXPERIENCE

Ninja Van (2024 – Mar 2025) | Shipper Support Manager
- Managed daily support operations (Voice, Chat, Email) for logistics shippers, ensuring the team met response targets even during peak seasons.
- Introduced daily huddles and weekly reviews to keep the team aligned on performance and fix issues quickly.
- Built clearer escalation channels with Operations, Product, and Finance to help resolve stuck parcels for key shippers faster.
- Updated SOPs to reduce confusion and strengthened Quality Assurance (QA) to help agents provide more consistent answers.
- Improved IVR menus and routing rules to help VIP shippers reach the right agents without long wait times.
- Set up real-time dashboards using Google Looker so the team could track backlog and staffing needs without manual spreadsheets.

Klook Travel (2018 – 2022) | CEG System Manager / Operations Manager
- Designed routing flows across all channels to ensure tickets reached the right agents based on language and skill level.
- Cleaned up workflows and knowledge base tags to stop tickets from bouncing between teams unnecessarily.
- Used data from weekly reviews to guide hiring decisions, coaching focus, and system adjustments.
- Oversaw vendor relationships for phone and support systems; monitored license usage to keep costs within budget.
- Set up monitoring alerts and backup plans to keep support running smoothly during technical outages.

Melco Crown Entertainment (2009 – 2017) | Service Quality Manager / Assistant Manager
- Led the Service Quality team, building a QA framework that matched the hotel's luxury brand standards.
- Organized regular coaching and calibration sessions to improve agent consistency and compliance scores.
- Managed the Reservations and Ticketing teams, adjusting staff schedules to ensure calls were answered promptly.

EARLY CAREER FOUNDATION
- Shell Malaysia (2007 – 2009): Support Schedule Lead – Handled 24/7 workforce scheduling and safety compliance.
- Fifth Media (2005 – 2007): Support Executive – Provided technical troubleshooting and product demos for clients.
- Genting Group (2003 – 2005): Team Leader – Supervised daily call center shifts and coached agents on quality.

KEY PROJECTS & ACHIEVEMENTS
- Ninja Van Order Automation: Created a Google Sheets script to automatically check addresses and phone numbers, saving the team from doing it manually.
- Klook Zendesk Migration: Helped lead the switch to Zendesk, setting up the system and getting it ready for global launch in 3 months.
- Klook Cost Optimization: Reviewed phone line and license usage, helping the department better forecast and control monthly spending.
- Klook Slack-to-Lark Migration: Managed the switch to Lark for the CX team, setting up automated alerts to help workflows.
- Melco Center Centralization: Helped combine operations for sister properties, standardizing procedures to save costs.
- Melco Multi-Hotel Pre-Opening: Built the central knowledge base and conducted training for new property launches.

LANGUAGES
English (Native), Cantonese (Native), Mandarin (Intermediate), Bahasa (Intermediate), French (Beginner)
`;

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'ninja-van',
    company: 'Ninja Van',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Ninja_Van_Logo.svg/512px-Ninja_Van_Logo.svg.png',
    localLogo: '/assets/photos/ninjavan.png',
    isWordmark: true,
    location: 'Subang Jaya, Malaysia',
    logoInitials: 'NV',
    techStack: ['Salesforce', 'Google Workspace', 'Google Looker'],
    channels: ['Chat', 'Email', 'Call', 'WhatsApp'],
    positions: [
      {
        title: 'Shipper Support Manager',
        period: '2024 – Mar 2025',
        content: [
          {
            category: 'Team & Operations',
            bullets: [
              'Led daily support operations across chat, email, and voice, maintaining SLA consistency during peak demand through agile staffing and dynamic queue management.',
              'Introduced daily huddles and weekly performance reviews to drive operational transparency, accountability, and rapid issue resolution.',
              'Established robust cross-functional escalation pathways with Operations, Product, and Finance to accelerate resolution for high-value shipper incidents.',
            ],
          },
          {
            category: 'Process Improvement',
            bullets: [
              'Updated SOPs to streamline complex workflows and strengthened QA frameworks to drive higher First Contact Resolution (FCR) and service consistency.',
              'Optimized IVR structures and routing logic to accurately capture intent and prioritize VIP segments, significantly reducing Average Speed of Answer (ASA).',
            ],
          },
          {
            category: 'Data & Tools',
            bullets: [
              'Deployed real-time Looker dashboards to replace manual reporting, enabling data-driven decisions for backlog management and staffing.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'klook',
    company: 'Klook Travel',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Klook_Travel_Technology_Logo.svg/512px-Klook_Travel_Technology_Logo.svg.png',
    localLogo: '/assets/photos/klook.png',
    isWordmark: true,
    location: 'Kuala Lumpur, Malaysia',
    logoInitials: 'KT',
    techStack: ['Zendesk', 'Genesys', 'Lark', 'Zapier'],
    channels: ['Chat', 'Email', 'Call', 'Line', 'Kakao Talk'],
    positions: [
      {
        title: 'CEG System Manager',
        period: '2021 – 2022',
        content: [
          {
            category: 'System & Routing',
            bullets: [
              'Designed intelligent routing flows across omnichannel touchpoints (chat, email, voice, social), aligning agent skills and SLAs with business tiers.',
              'Optimized workflow logic and knowledge base taxonomy to minimize ticket bounces and unnecessary transfers.',
            ],
          },
          {
            category: 'Vendor & Stability',
            bullets: [
              'Managed strategic vendor relationships for telephony and CX platforms, implementing rigorous license tracking to optimize operational costs.',
              'Built comprehensive monitoring alerts and business continuity plans to ensure system resilience during technical outages.',
            ],
          },
        ],
      },
      {
        title: 'CEG Operations Manager',
        period: '2018 – 2020',
        content: [
          {
            category: 'Team & Operations',
            bullets: [
              'Managed hybrid operations across in-house teams and outsourced BPO partners, ensuring consistent service delivery and adherence to global standards.',
              'Led end-to-end talent management for a 100+ agent workforce, overseeing hiring strategies, mentorship programs, and performance coaching.',
              'Established service governance frameworks, utilizing weekly business review (WBR) data to drive hiring strategy, coaching focus, and system enhancements.',
              'Managed response protocols during peak travel seasons to keep response times stable.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'melco',
    company: 'Melco Crown Ent.',
    logo: 'https://companieslogo.com/img/orig/MLCO-9a64a706.png',
    localLogo: '/assets/photos/melco.png',
    isWordmark: true,
    location: 'Macau',
    logoInitials: 'MC',
    techStack: ['SiteMinder', 'Cisco UCCX', 'Opera PMS'],
    channels: ['Email', 'Call', 'Fax'],
    positions: [
      {
        title: 'Service Quality Manager',
        period: '2014 – 2017',
        content: [
          {
            category: 'Quality Assurance',
            bullets: [
              "Led the Service Quality division, developing a comprehensive QA framework aligned with Forbes 5-Star Hotel Standards.",
              'Directed regular coaching and calibration sessions to drive agent consistency and elevate compliance scores.',
              'Conducted rigorous internal audits and mystery shopper simulations to identify service gaps and drive continuous improvement.',
              'Worked closely with Hotel Ops to align call center protocols with on-property guest experience standards.',
              'Spearheaded initiatives to optimize the reservation journey, resulting in higher conversion rates and reduced guest complaints.',
            ],
          },
        ],
      },
      {
        title: 'Contact Centre Asst Manager',
        period: '2009 – 2013',
        content: [
          {
            category: 'Operations',
            bullets: [
              'Directed Reservations and Ticketing operations, optimizing workforce scheduling to ensure prompt answer rates and service levels.',
              'Collaborated with Revenue Management to standardize up-selling scripts for agents.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'earlier-days',
    company: 'Earlier Days',
    logo: '', // No logo for this one
    localLogo: '',
    isWordmark: false,
    location: 'Various',
    logoInitials: 'ED',
    techStack: ['Avaya', 'Oracle', 'Microsoft Office'],
    channels: ['Email', 'Call'],
    positions: [
      {
        title: 'Support Schedule Lead',
        companyOverride: 'Shell Malaysia',
        localLogoOverride: '/assets/photos/shell.png',
        locationOverride: 'Kuala Lumpur, Malaysia',
        techStackOverride: ['SAP', 'Microsoft Office'],
        idSuffix: '02',
        period: '2007 – 2009',
        content: [
          {
            bullets: [
              'Managed 24/7 workforce scheduling and ensured strict adherence to HSSE safety protocols.',
              'Mentored new schedulers and ensured the team had the supplies they needed.',
            ],
          },
        ],
      },
      {
        title: 'Support Executive',
        companyOverride: 'Fifth Media',
        localLogoOverride: '/assets/photos/fifthmedia.png',
        locationOverride: 'Kuala Lumpur, Malaysia',
        techStackOverride: ['Microsoft Office'],
        idSuffix: '01',
        period: '2005 – 2007',
        content: [
          {
            bullets: [
              'Delivered expert technical troubleshooting and conducted high-impact product demonstrations for potential investors.',
              'Helped build internal knowledge bases for the team.',
            ],
          },
        ],
      },
      {
        title: 'Team Leader',
        companyOverride: 'Genting Group',
        localLogoOverride: '/assets/photos/genting.png',
        locationOverride: 'Kuala Lumpur, Malaysia',
        techStackOverride: ['Siebel', 'Microsoft Office'],
        idSuffix: '03',
        period: '2003 – 2005',
        content: [
          {
            bullets: [
              'Supervised daily contact center operations, managing workforce allocation and coaching agents to drive quality improvements.',
              'Conducted weekly call monitoring and coached agents to improve quality.',
            ],
          },
        ],
      },
    ],
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'p1',
    title: 'Order Creation Automation',
    company: 'Ninja Van',
    period: '2024 – 2025',
    location: 'Kuala Lumpur',
    category: 'Automation',
    description:
      'Developed a custom automation solution using Google Sheets and Apps Script with REST API integration to validate addresses and phone numbers, eliminating 90% of manual data entry work.',
    metrics: ['90% Efficiency Gain', 'Automated Validation'],
    tech: ['Google Workspace', 'Google Apps Script', 'REST API'],
  },
  {
    id: 'p2',
    title: 'Zendesk Migration',
    company: 'Klook Travel',
    period: '2018 – 2022',
    location: 'Kuala Lumpur',
    category: 'Infrastructure',
    description:
      'Led a US$1.18M company-wide platform migration project, delivering complete system configuration and deployment in just 3 months.',
    metrics: ['US$1.18M Budget', '3-Month Delivery'],
    tech: ['Zendesk', 'System Architecture', 'Migration'],
  },
  {
    id: 'p3',
    title: 'Cost Optimization',
    company: 'Klook Travel',
    period: '2018 – 2022',
    location: 'Kuala Lumpur',
    category: 'Finance Ops',
    description:
      'Audited telephony systems and software licenses, then restructured usage patterns and implemented monthly forecasting models to strengthen budget control and reduce operational expenses.',
    metrics: ['OpEx Optimized', 'Forecast Accuracy'],
    tech: ['Data Analysis', 'Forecasting'],
  },
  {
    id: 'p4',
    title: 'Slack to Lark Transformation',
    company: 'Klook Travel',
    period: '2018 – 2022',
    location: 'Kuala Lumpur',
    category: 'Workflow',
    description:
      "Orchestrated the CX team's migration from Slack to Lark, including development of automated webhook integrations to streamline cross-team workflows and notifications.",
    metrics: ['Team-wide Adoption', 'Webhook Automation'],
    tech: ['Lark', 'Slack', 'Webhook'],
  },
  {
    id: 'p5',
    title: 'Contact Center Centralization',
    company: 'Melco Crown Entertainment',
    period: '2009 – 2017',
    location: 'Macau / KL',
    category: 'Ops Strategy',
    description:
      'Consolidated contact center operations across multiple hotel properties, standardizing processes and procedures to streamline operations and reduce costs.',
    metrics: ['Multi-Property SOPs', 'Cost Efficiency'],
    tech: ['Workforce Mgmt'],
  },
  {
    id: 'p6',
    title: 'Multi-Hotel Pre-Opening',
    company: 'Melco Crown Entertainment',
    period: '2009 – 2017',
    location: 'Macau / KL',
    category: 'Training',
    description:
      'Developed a centralized knowledge repository and delivered comprehensive product training across multiple new hotel property openings.',
    metrics: ['Centralized Knowledge Hub', 'Multi-Property Training'],
    tech: ['Knowledge Mgmt', 'Training'],
  },
];

export const SKILLS_METRICS: SkillMetric[] = [
  { subject: 'CX Strategy', A: 95, fullMark: 100 },
  { subject: 'Tech Impl', A: 85, fullMark: 100 },
  { subject: 'Ops Excellence', A: 90, fullMark: 100 },
  { subject: 'Data Analysis', A: 75, fullMark: 100 },
  { subject: 'Crisis Mgmt', A: 80, fullMark: 100 },
  { subject: 'Governance', A: 85, fullMark: 100 },
];

export const TECH_STACK = [
  {
    name: 'Zendesk',
    logo: 'https://cdn.simpleicons.org/zendesk/03363D',
    localLogo: '/assets/photos/zendesk.png',
  },
  {
    name: 'Genesys',
    logo: 'https://cdn.simpleicons.org/genesys/FF4F1F',
    localLogo: '/assets/photos/genesyscloud.png',
  },
  {
    name: 'Salesforce',
    logo: 'https://cdn.simpleicons.org/salesforce/00A1E0',
    localLogo: '/assets/photos/salesforce.png',
  },
  {
    name: 'Cisco UCCX',
    logo: 'https://cdn.simpleicons.org/cisco/1BA0D7',
    localLogo: '/assets/photos/placeholder.png',
  },
  {
    name: 'Google Workspace',
    logo: 'https://www.gstatic.com/images/branding/product/1x/google_workspace_512dp.png',
    localLogo: '/assets/photos/googleworkspace.png',
  },
  {
    name: 'Google Apps Script',
    logo: 'https://cdn.simpleicons.org/googleappsscript/4285F4',
    localLogo: '/assets/photos/googleappsscript.png',
  },
  {
    name: 'Google Looker',
    logo: 'https://cdn.simpleicons.org/looker/4285F4',
    localLogo: '/assets/photos/googlelookerstudio.png',
  },
  {
    name: 'Lark',
    logo: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/09/78/45/09784570-a67c-9f1e-1066-84c79d1cb815/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg',
    localLogo: '/assets/photos/lark.png',
  },
  {
    name: 'Slack',
    logo: 'https://cdn.simpleicons.org/slack/4A154B',
    localLogo: '/assets/photos/placeholder.png',
  },
  {
    name: 'SiteMinder',
    logo: 'https://cdn.worldvectorlogo.com/logos/siteminder.svg',
    localLogo: '/assets/photos/siteminder.png',
  },
  {
    name: 'Zapier',
    logo: 'https://cdn.simpleicons.org/zapier/FF4F00',
    localLogo: '/assets/photos/zapier.png',
  },
  {
    name: 'Webhook',
    logo: 'https://cdn.worldvectorlogo.com/logos/webhooks.svg',
    localLogo: '/assets/photos/placeholder.png',
  },
  {
    name: 'REST API',
    logo: '',
    localLogo: '',
    icon: Network,
  },
  {
    name: 'SISTIC',
    logo: 'https://is1-ssl.mzstatic.com/image/thumb/Purple112/v4/92/17/26/92172669-025e-2264-809d-58992842637f/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg',
    localLogo: '/assets/photos/sistic.png',
  },
  {
    name: 'SAP',
    logo: 'https://cdn.simpleicons.org/sap/0FAAFF',
    localLogo: '/assets/photos/sap.svg',
  },
  {
    name: 'Oracle',
    logo: 'https://cdn.simpleicons.org/oracle/F80000',
    localLogo: '/assets/photos/oracle.svg',
  },
  {
    name: 'Avaya',
    logo: 'https://cdn.simpleicons.org/avaya/CC092F',
    localLogo: '/assets/photos/avaya.svg',
  },
  {
    name: 'Siebel',
    logo: 'https://cdn.simpleicons.org/oracle/F80000', // Siebel is an Oracle product
    localLogo: '/assets/photos/siebel.svg',
  },
  {
    name: 'Microsoft Office',
    logo: 'https://cdn.simpleicons.org/microsoftoffice/D83B01',
    localLogo: '/assets/photos/office.png',
  },
];
