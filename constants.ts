import { ExperienceItem, ProjectItem, SkillMetric } from './types';

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
    logo: 'https://logo.clearbit.com/ninjavan.co',
    localLogo: '/assets/photos/ninjavan.png',
    location: 'Kuala Lumpur, Malaysia',
    logoInitials: 'NV',
    techStack: ['Salesforce', 'Google Workspace', 'Google Looker'],
    positions: [
      {
        title: 'Shipper Support Manager',
        period: '2024 – Mar 2025',
        content: [
          {
            category: 'Team & Operations',
            bullets: [
              'Managed daily support operations across chat, email, and voice. Kept response times stable during busy periods by actively adjusting staffing.',
              'Introduced daily team huddles and weekly reviews to keep everyone on the same page and fix performance issues quickly.',
              'Worked with Ops, Product, and Finance to build better escalation paths for solving high-value shipper issues.',
            ],
          },
          {
            category: 'Process Improvement',
            bullets: [
              'Updated SOPs to remove bottlenecks and tightened up QA checks to ensure agents were giving consistent answers.',
              'Tweaked the IVR and routing logic so VIP shippers could get to an agent faster.',
            ],
          },
          {
            category: 'Data & Tools',
            bullets: [
              'Set up real-time dashboards in Looker to replace manual reporting, helping us make faster decisions on backlog and staffing.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'klook',
    company: 'Klook Travel',
    logo: 'https://logo.clearbit.com/klook.com',
    localLogo: '/assets/photos/klook.png',
    location: 'Kuala Lumpur, Malaysia',
    logoInitials: 'KT',
    techStack: ['Zendesk', 'Genesys', 'Lark', 'Zapier'],
    positions: [
      {
        title: 'CEG System Manager',
        period: '2021 – 2022',
        content: [
          {
            category: 'System & Routing',
            bullets: [
              'Designed routing flows to ensure tickets reached the right agents based on language and skill, rather than just sitting in a general queue.',
              'Cleaned up workflows and knowledge base tags to stop tickets from bouncing between teams unnecessarily.',
            ],
          },
          {
            category: 'Vendor & Stability',
            bullets: [
              'Oversaw vendor relationships for phone and support systems; tracked license usage to keep costs within budget.',
              'Set up monitoring alerts and backup plans to keep support running smoothly during technical outages.',
            ],
          },
        ],
      },
      {
        title: 'CEG Operations Manager',
        period: '2018 – 2020',
        content: [
          {
            category: 'Performance Management',
            bullets: [
              'Defined service targets and used data from weekly reviews to guide hiring decisions, coaching focus, and system adjustments.',
              'Managed response protocols during peak travel seasons to keep response times stable.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'melco',
    company: 'Melco Crown Entertainment',
    logo: 'https://logo.clearbit.com/melco-resorts.com',
    localLogo: '/assets/photos/melco.png',
    location: 'Macau / KL',
    logoInitials: 'MC',
    techStack: ['SiteMinder', 'Cisco UCCX', 'Opera PMS'],
    positions: [
      {
        title: 'Service Quality Manager',
        period: '2014 – 2017',
        content: [
          {
            category: 'Quality Assurance',
            bullets: [
              "Led the Service Quality team, building a QA framework that matched the hotel's luxury brand standards.",
              'Organized regular coaching and calibration sessions to improve agent consistency and compliance scores.',
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
              'Managed the Reservations and Ticketing teams, adjusting staff schedules to ensure calls were answered promptly.',
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
    logo: '', // No single logo for group
    location: 'Malaysia',
    logoInitials: 'ED',
    techStack: [],
    positions: [
      {
        title: 'Support Schedule Lead',
        companyOverride: 'Shell Malaysia',
        period: '2007 – 2009',
        content: [
          {
            bullets: [
              'Handled 24/7 workforce scheduling and ensured the team followed safety (HSSE) protocols.',
              'Mentored new schedulers and ensured the team had the supplies they needed.',
            ],
          },
        ],
      },
      {
        title: 'Support Executive',
        companyOverride: 'Fifth Media',
        period: '2005 – 2007',
        content: [
          {
            bullets: [
              'Provided technical troubleshooting and conducted product demos for potential investors.',
              'Helped build internal knowledge bases for the team.',
            ],
          },
        ],
      },
      {
        title: 'Team Leader',
        companyOverride: 'Genting Group',
        period: '2003 – 2005',
        content: [
          {
            bullets: [
              'Supervised daily call center shifts and managed workforce allocation.',
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
      'Built a custom Google Sheets + Apps Script solution with API integration for address and phone validation, reducing manual processing load by 90%.',
    metrics: ['90% Manual Work Reduced', 'Auto-Validation'],
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
      'Led a US$1.18M platform migration, delivering full configuration and global go-live within a condensed 3-month timeline.',
    metrics: ['US$1.18M Project', '3 Months Turnaround'],
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
      'Audited and restructured telephony and license usage; instituted monthly forecasting models to tighten budget control.',
    metrics: ['OpEx Reduction', 'Budget Control'],
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
      'Managed the migration of communication platforms for the CX unit. Developed automated webhook triggers to streamline workflows.',
    metrics: ['Company-wide Adoption', 'Automated Webhooks'],
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
      'Consolidated operations for sister properties, standardizing SOPs to achieve economy of scale and cost stabilization.',
    metrics: ['Standardized SOPs', 'Cost Stabilization'],
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
      'Built the centralized knowledge base and delivered comprehensive product and policy training for new property launches.',
    metrics: ['Knowledge Base', 'Cross-property Training'],
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
  },
  {
    name: 'SISTIC',
    logo: 'https://is1-ssl.mzstatic.com/image/thumb/Purple112/v4/92/17/26/92172669-025e-2264-809d-58992842637f/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg',
    localLogo: '/assets/photos/sistic.png',
  },
];
