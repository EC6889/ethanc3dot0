// Skipping edit to check types.ts first

import { Network, Users, Cpu, TrendingUp, Globe, Award, BookOpen, Star } from 'lucide-react';

export const NAV_LINKS = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skill', href: '#skills' },
    { label: 'Project', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

export const HERO_CONTENT = {
    roles: [
        'CX_OPERATIONS_LEADER',
        'PLATFORM_ARCHITECT',
        'WORKFLOW_STRATEGIST',
        'AUTOMATION_ENGINEER',
    ],
    name: "ETHAN C.",
    title: "CX Operations Leader | Strategic & Tech | Hospitality → FinTech → Logistics",
    bio: "I've built and led support teams of 100+ agents, delivered $1M+ platform migrations, and cut manual work by 90% through automation. From Forbes 5-Star hotels to high-growth startups, I turn customer pain points into operational wins."
}

export const RESUME_CONTENT = `ETHAN C. | CX OPERATIONS MANAGER & STRATEGIST
Location: Kuala Lumpur, Malaysia
Email: gmeal6889@gmail.com
LinkedIn: linkedin.com/in/echia6889

PROFESSIONAL PROFILE
CX Operations leader with extensive experience across hospitality, travel tech, logistics, and contact centers. Proven success in managing large-scale operations and leading enterprise-grade platform migrations. Focuses on modernizing operations through automation, scaling CX systems, and driving consistent, measurable service performance improvements.

CORE COMPETENCIES
- CX Operations Management
- Team Leadership & Coaching
- System Configuration (SaaS/CRM)
- Process Improvement
- Incident Management
- Vendor & Budget Management
- Performance Analytics
- Stakeholder Collaboration

TECHNICAL PROFICIENCY
- Core Platforms: Zendesk, Genesys Cloud, Salesforce, Cisco UCCX
- Productivity: Google Workspace, Apps Script, Looker Studio
- Collaboration: Lark, Slack, Microsoft Teams, Zoom
- Integration: Zapier, Webhooks, REST API, Postman
- Hospitality: SiteMinder, Opera PMS, SISTIC

PROFESSIONAL EXPERIENCE

Ninja Van (2024 – Mar 2025) | Shipper Support Manager
- Led daily support operations across chat, email, and voice, maintaining SLA consistency during peak demand through agile staffing and dynamic queue management.
- Introduced daily huddles and weekly performance reviews, enhancing operational transparency and enabling rapid issue resolution.
- Established cross-functional escalation pathways with Operations, Product, and Finance teams, accelerating resolution for high-value shipper incidents.
- Revamped SOPs and QA frameworks, improving First Contact Resolution (FCR) and service consistency.
- Optimized IVR structures and routing logic, reducing Average Speed of Answer (ASA) for VIP segments.
- Deployed real-time Looker dashboards, replacing manual reporting with data-driven staffing and backlog management tools.

Klook Travel (2018 – 2022) | CEG System Manager / Operations Manager
- Designed optimal routing logic across omnichannel touchpoints (chat, email, voice, social), aligning agent skills with SLAs by business tier.
- Optimized workflow logic and knowledge base taxonomy, reducing ticket reopen rates and resolution times.
- Managed strategic vendor relationships for telephony and CX platforms, implementing license tracking to control operational costs.
- Developed business continuity plans ensuring system resilience during technical outages.
- Managed hybrid operations with in-house teams and outsourced BPO partners, ensuring consistent service delivery against global standards.
- Built and led a 100+ agent workforce, overseeing recruitment, onboarding, and performance coaching.
- Drove BPO performance through Weekly Business Reviews, ensuring SLA compliance.
- Led Voice of Customer (VoC) initiatives, collaborating with stakeholders to improve CSAT scores.

Melco Crown Entertainment (2009 – 2017) | Service Quality Manager / Assistant Manager
- Led the Service Quality division, developing a QA framework aligned with Forbes 5-Star Hotel standards.
- Directed coaching and calibration sessions, ensuring agent consistency and elevating compliance scores.
- Conducted internal audits and mystery shopper simulations, identifying service gaps and driving continuous improvement.
- Collaborated with Hotel Operations to align call center protocols with on-property guest experience standards.
- Optimized the reservation journey, achieving higher conversion rates and reducing guest complaints.
- Managed reservation and ticketing operations, ensuring accuracy in order entry.
- Handled escalated complaints and issues, ensuring prompt and effective resolution.
- Collaborated closely with Revenue Management to enhance occupancy and conversion rates.

EARLY CAREER FOUNDATION
- Shell Malaysia (2007 – 2009): Support Schedule Lead – Managed 24/7 workforce scheduling with strict adherence to HSSE protocols.
- Fifth Media (2005 – 2007): Support Executive – Delivered technical troubleshooting and built knowledge bases.
- Genting Group (2003 – 2005): Team Leader – Supervised daily call center shifts and maintained single-digit abandonment rates.

EDUCATION
- Taylor's University: Diploma in Hotel Management

AWARDS & RECOGNITION
- Best Contact Centre (HKCCA)
- Melco Courage Award
- Forbes 5-Star Rating (7 Consecutive Years)

LANGUAGES
English (Native/Professional), Cantonese (Native), Mandarin (Intermediate), Bahasa (Intermediate), French (Beginner)
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
                headlineAchievement: 'Built automation solution eliminating 90% of manual data entry',
                content: [
                    {
                        category: 'Operations',
                        bullets: [
                            'Led daily support operations across chat, email, and voice, maintaining SLA consistency during peak demand through agile staffing and dynamic queue management.',
                            'Introduced daily huddles and weekly performance reviews, enhancing operational transparency and enabling rapid issue resolution.',
                            'Established cross-functional escalation pathways with Operations, Product, and Finance teams, accelerating resolution for high-value shipper incidents.',
                        ],
                    },
                    {
                        category: 'Process Improvement',
                        bullets: [
                            'Revamped SOPs and QA frameworks, improving First Contact Resolution (FCR) and service consistency.',
                            'Optimized IVR structures and routing logic, reducing Average Speed of Answer (ASA) for VIP segments.',
                            'Deployed real-time Looker dashboards, replacing manual reporting with data-driven staffing and backlog management tools.',
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
                headlineAchievement: 'Led $1.18M Zendesk migration, completed across all channels in 3 months',
                content: [
                    {
                        category: 'System & Routing',
                        bullets: [
                            'Designed optimal routing logic across omnichannel touchpoints (chat, email, voice, social), aligning agent skills with SLAs by business tier.',
                            'Optimized workflow logic and knowledge base taxonomy, reducing ticket reopen rates and resolution times.',
                        ],
                    },
                    {
                        category: 'Vendor & Stability',
                        bullets: [
                            'Managed strategic vendor relationships for telephony and CX platforms, implementing license tracking to control operational costs.',
                            'Developed business continuity plans ensuring system resilience during technical outages.',
                        ],
                    },
                ],
            },
            {
                title: 'CEG Operations Manager',
                period: '2018 – 2020',
                headlineAchievement: 'Built and managed 100+ agent workforce across in-house and BPO teams',
                content: [
                    {
                        category: 'Team Management',
                        bullets: [
                            'Managed hybrid operations with in-house teams and outsourced BPO partners, ensuring consistent service delivery against global standards.',
                            'Built and led a 100+ agent workforce, overseeing recruitment, onboarding, and performance coaching.',
                            'Drove BPO performance through Weekly Business Reviews, ensuring SLA compliance.',
                            'Led Voice of Customer (VoC) initiatives, collaborating with stakeholders to improve CSAT scores.',
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
        awards: [
            { title: 'Best Contact Centre', issuer: 'Hong Kong Call Centre Association' },
            { title: 'Forbes 5-Star Rating', issuer: 'Forbes Travel Guide (7 Years)' },
            { title: 'Melco Courage Award', issuer: 'Melco Crown Entertainment' }
        ],
        positions: [
            {
                title: 'Service Quality Manager',
                period: '2014 – 2017',
                headlineAchievement: 'Achieved Forbes 5-Star rating for 7 consecutive years',
                content: [
                    {
                        category: 'Quality Assurance',
                        bullets: [
                            "Led the Service Quality division, developing a QA framework aligned with Forbes 5-Star Hotel standards.",
                            'Directed coaching and calibration sessions, ensuring agent consistency and elevating compliance scores.',
                            'Conducted internal audits and mystery shopper simulations, identifying service gaps and driving continuous improvement.',
                            'Collaborated with Hotel Operations to align call center protocols with on-property guest experience standards.',
                            'Optimized the reservation journey, achieving higher conversion rates and reducing guest complaints.',
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
                            'Managed reservation and ticketing operations, ensuring accuracy in order entry.',
                            'Handled escalated complaints and issues, ensuring prompt and effective resolution.',
                            'Collaborated closely with Revenue Management to enhance occupancy and conversion rates.',
                            'Monitored VIP reservations, ensuring all requests including limousine arrangements were accurately fulfilled.',
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
                            'Managed 24/7 workforce scheduling with strict adherence to HSSE (Health, Safety, Security, Environment) protocols.',
                            'Handled urgent fuel delivery requests, ensuring all gas stations remained stocked.',
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
                            'Delivered technical troubleshooting and product demonstrations for potential investors.',
                            'Built internal and external-facing knowledge bases to support technical troubleshooting.',
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
                headlineAchievement: 'Maintained single-digit call abandonment rates',
                content: [
                    {
                        bullets: [
                            'Supervised and coached a team of customer service agents, ensuring performance aligned with KPIs.',
                            'Maintained a single-digit call abandonment rate by adjusting workforce allocation to manage incoming call traffic.',
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
        challenge: 'Manual address verification was causing delays, high error rates, and redundant data entry work.',
        solution: 'Designed and built a custom automation solution using Google Sheets, Apps Script, and REST API integration for address and phone validation.',
        result: '90% reduction in manual data entry, with measurably improved data accuracy and operational efficiency.',
        metrics: ['90% Less Manual Work', 'API Integration'],
        tech: ['Google Workspace', 'Google Apps Script', 'REST API'],
    },
    {
        id: 'p2',
        title: 'Zendesk Migration',
        company: 'Klook Travel',
        period: '2018 – 2022',
        location: 'Kuala Lumpur',
        category: 'Infrastructure',
        challenge: 'Legacy systems were fragmented, expensive to maintain, and lacked unified reporting capabilities.',
        solution: 'Led a $1.18M platform migration from legacy systems to Zendesk, completing configuration and launch across all channels (voice, email, chat, social) in just 3 months.',
        result: 'Delivered enhanced routing capabilities, unified reporting, and measurable improvements in agent efficiency.',
        metrics: ['US$1.18M Project', '3-Month Delivery'],
        tech: ['Zendesk', 'System Architecture', 'Migration'],
    },
    {
        id: 'p3',
        title: 'Cost Optimization',
        company: 'Klook Travel',
        period: '2018 – 2022',
        location: 'Kuala Lumpur',
        category: 'Finance Ops',
        challenge: 'Rising operational costs due to unchecked software licenses and inefficient telephony usage.',
        solution: 'Restructured phone line and software license allocation using monthly forecasting models.',
        result: 'Achieved tighter budget control and significantly reduced operational expenses.',
        metrics: ['OpEx Reduced', 'Forecast Accuracy'],
        tech: ['Data Analysis', 'Forecasting'],
    },
    {
        id: 'p4',
        title: 'Slack to Lark Transformation',
        company: 'Klook Travel',
        period: '2018 – 2022',
        location: 'Kuala Lumpur',
        category: 'Workflow',
        challenge: 'Disjointed team communication and lack of integrated workflow tools.',
        solution: 'Orchestrated the CX team\'s migration from Slack to Lark, including development of automated webhook integrations.',
        result: 'Streamlined cross-team workflows and centralized notifications, improving response times.',
        metrics: ['100% Adoption', 'Automated Alerts'],
        tech: ['Lark', 'Slack', 'Webhook'],
    },
    {
        id: 'p5',
        title: 'Contact Center Centralization',
        company: 'Melco Crown Entertainment',
        period: '2009 – 2017',
        location: 'Macau / KL',
        category: 'Ops Strategy',
        challenge: 'Fragmented operations across multiple hotel properties led to inconsistent service and higher costs.',
        solution: 'Consolidated contact center operations across 5 hotel properties, standardizing processes to streamline workflows.',
        result: 'Reduced operating costs while maintaining consistent service quality across all properties.',
        metrics: ['5 Properties', 'Unified SOPs'],
        tech: ['Workforce Mgmt', 'Process Design'],
    },
    {
        id: 'p6',
        title: 'Multi-Hotel Pre-Opening',
        company: 'Melco Crown Entertainment',
        period: '2009 – 2017',
        location: 'Macau / KL',
        category: 'Training',
        challenge: 'New hotel properties required staff to be fully trained and operationally ready from day one.',
        solution: 'Created a centralized knowledge base to support pre-opening operations. Designed and delivered training programs tailored to Forbes 5-Star standards.',
        result: 'Equipped agents to deliver exceptional service immediately upon launch.',
        metrics: ['Forbes Standards', '0-Day Readiness'],
        tech: ['Knowledge Mgmt', 'Training'],
    },
];

export const AWARDS_DATA: AwardItem[] = [
    {
        id: 'a1',
        title: 'Best Contact Centre',
        issuer: 'Hong Kong Call Centre Association (HKCCA)',
        description: 'Recognized for operational excellence and service quality.',
        icon: Award,
    },
    {
        id: 'a2',
        title: 'Forbes 5-Star Rating',
        issuer: 'Forbes Travel Guide',
        year: '7 Consecutive Years',
        description: 'Achieved and maintained the highest industry standard for service excellence.',
        icon: Star,
    },
    {
        id: 'a3',
        title: 'Melco Courage Award',
        issuer: 'Melco Crown Entertainment',
        description: 'Internal recognition for leadership and resilience in challenging operations.',
        icon: Award,
    },
];

export const EDUCATION_DATA: EducationItem[] = [
    {
        id: 'e1',
        degree: 'Diploma in Hotel Management',
        institution: "Taylor's University",
        location: 'Malaysia',
        period: 'Graduated',
        icon: BookOpen,
    },
];

export const SKILLS_METRICS: SkillMetric[] = [
    { subject: 'CX Strategy', A: 95, fullMark: 100 },
    { subject: 'Tech Impl', A: 90, fullMark: 100 },
    { subject: 'Ops Excellence', A: 95, fullMark: 100 },
    { subject: 'Data Analysis', A: 85, fullMark: 100 },
    { subject: 'Auto-mation', A: 90, fullMark: 100 },
    { subject: 'Leadership', A: 95, fullMark: 100 },
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

export const LANGUAGES_DATA = [
    { name: 'English', code: 'EN_US', level: 'Native', score: 4, color: 'cyan' },
    { name: 'Cantonese', code: 'ZH_HK', level: 'Native', score: 4, color: 'cyan' },
    { name: 'Mandarin', code: 'ZH_CN', level: 'Intermediate', score: 3, color: 'blue' },
    { name: 'Bahasa', code: 'MS_MY', level: 'Intermediate', score: 3, color: 'blue' },
    { name: 'French', code: 'FR_FR', level: 'Beginner', score: 1, color: 'purple' },
];

export const MODULES_DATA = [
    {
        icon: Users,
        title: 'Team Leadership',
        desc: 'Managing multi-tier teams & driving stakeholder alignment.',
        color: 'blue',
    },
    {
        icon: Cpu,
        title: 'System Config',
        desc: 'Setup & maintenance of Zendesk, Genesys & AI tools.',
        color: 'cyan',
    },
    {
        icon: TrendingUp,
        title: 'Process Opt.',
        desc: 'Removing friction to improve SLA performance.',
        color: 'purple',
    },
    {
        icon: Globe,
        title: 'Omnichannel',
        desc: 'Unified strategy across Voice, Chat, Email & Social.',
        color: 'blue',
    },
];
