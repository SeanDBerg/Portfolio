export interface CaseStudy {
  id: string;
  title: string;
  summary: string;
  impact: string[];
  stack: string[];
  modalContent: {
    title: string;
    subtitle: string;
    situation: string[];
    whatIDid: {
      category: string;
      items: string[];
    }[];
    results: string[];
    whatThisShows: string[];
  };
}
export const caseStudies: CaseStudy[] = [
  {
    id: "inventory-management-portal",
    title: "Inventory Management Portal",
    summary: "Inherited 35 sheet inventory system and rebuilt into two governed databases powering ops web apps and automated reporting.",
    impact: [
      "Consolidated 35 sheets into Product + Sales DBs",
      "Removed all ImportRange dependencies",
      "Enabled over 60,000 SKUs across verticals"
    ],
    stack: ["Firestore", "BigQuery", "Shopify", "Stripe", "Google Workspace"],
    modalContent: {
      title: "Inventory Management Portal Upgrade",
      subtitle: "Stabilized spreadsheet inventory business and evolved it into unified product and sales platform.",
      situation: [
        "The company ran inventory and orders on a dense network of Google Sheets. About 35 files, averaging 10 tabs each, with heavy ImportRange and ArrayFormula linking. Many tables were 20 to 70 columns wide and exceeded 40,000 rows.",
        "The system became fragile at this scale. Slow recalculation, cascading formula breakage, conflicting product data versions, and manual reconciliation for leadership metrics. The team needed stability and better throughput without interrupting operations."
      ],
      whatIDid: [
        {
          category: "Stabilized",
          items: [
            "Mapped existing workflows with product and sales ops to preserve live processes.",
            "Collapsed sheet lattice into two canonical databases. Product DB and Sales DB.",
            "Eliminated all cross file ImportRange dependencies. 100% localized management.",
            "Standardized identifiers and schemas across verticals."
          ]
        },
        {
          category: "Automated",
          items: [
            "Built role specific web apps for product ops and sales ops on top of new master data.",
            "Implemented reliable bidirectional integrations. Shopify, Stripe, Google Workspace, Firestore, BigQuery, and proprietary internal apps."
          ]
        },
        {
          category: "Extended",
          items: [
            "Added automated reporting suite after consolidation.",
            "Published stable BigQuery models that simplified Looker Studio creation and maintenance."
          ]
        }
      ],
      results: [
        "Reliable foundation supporting over 60,000 SKUs across multiple verticals.",
        "Removed primary failure mode of legacy system. ImportRange webs and brittle formulas.",
        "Shifted teams from spreadsheet maintenance to purpose built operational apps.",
        "Reporting moved from manual rollups to automated KPIs and clean Looker inputs.",
        "Delivered weekly releases with total engagement cost of approximately $4,000."
      ],
      whatThisShows: [
        "I inherit high stakes legacy ops systems, stabilize them fast, and modernize incrementally.",
        "I upgrade without forcing workflow disruption or rip and replace migrations.",
        "I build full stack platforms that integrate cleanly with existing tools."
      ]
    }
  },
  {
    id: "behavioral-health-suite",
    title: "Behavioral Health Intake & Compliance Suite",
    summary: "Modernized patchwork of intake, operations, and legal workflows into unified automation layer feeding EHR and legal systems.",
    impact: [
      "Automated multi step patient intake and EHR handoff",
      "Connected Jotform, Monday, and EHR into one intake workflow",
      "Collected, parsed, and evaluated legal documents with AI",
      "Built external contractor portal for secure collaboration"
    ],
    stack: ["Jotform", "Monday.com", "EHR APIs", "Email", "OCR", "AI (Gemini)", "Web Apps"],
    modalContent: {
      title: "Behavioral Health Intake & Compliance Suite",
      subtitle: "Unified patient intake, operations, and legal workflows into single automation layer on top of existing behavioral health tools.",
      situation: [
        "Organizations handled sensitive behavioral health workflows using mix of forms, email, spreadsheets, and partially configured tools. New patient intake spread across ad hoc forms and manual emails. Internal operations tracked in Jotform and Monday.com, with no reliable sync to EHR. Legal and law enforcement workflows driven by unstructured email attachments and manual filing.",
        "Common pattern. High volume, strict regulatory requirements, and critical work held together by staff effort rather than cohesive system."
      ],
      whatIDid: [
        {
          category: "Autonomous Intake",
          items: [
            "Inherited. Manual intake steps, partial tools, and inconsistent communication with benefits teams.",
            "Stabilized. Mapped real world intake process with intake coordinators and benefits staff. Standardized key data elements and identifiers needed by EHR.",
            "Automated. Built autonomous intake manager that guides new patients, coordinates with benefits teams, and prepares clean, structured payload for EHR."
          ]
        },
        {
          category: "Operations Integration",
          items: [
            "Inherited. Jotform and Monday.com were both in use but behaved like separate systems. Data was re keyed, and EHR updates depended on manual effort.",
            "Stabilized. Mapped fields between Jotform, Monday, and EHR. Standardized identifiers so records lined up across all three.",
            "Automated. New intakes flow automatically from Jotform into Monday boards and on into EHR. Status and handoffs tracked centrally."
          ]
        },
        {
          category: "Compliance & Legal",
          items: [
            "Inherited. Legal interactions arrived via email. Staff manually filed attachments and updated tracking sheets.",
            "Stabilized. Implemented reliable capture from designated mailboxes. Organized documents by client and matter in consistent structure.",
            "Automated. Applied OCR and AI evaluation (Gemini) to classify and extract data. Updated central compliance database. Delivered secure contractor portal."
          ]
        }
      ],
      results: [
        "Intake, operations, and legal workflows orchestrated instead of improvised.",
        "Staff spend more time handling clinical and exception work, less time on data entry and file wrangling.",
        "EHR and legal systems receive consistent, structured data from single automation layer.",
        "Organizations kept core tools (Jotform, Monday, EHR, email) while gaining robust engine that ties them together."
      ],
      whatThisShows: [
        "I approach complex problems as suite of focused modules.",
        "I build robust automation layers on top of existing toolsets.",
        "I turn fragile manual processes into auditable, compliant pipelines."
      ]
    }
  },
  {
    id: "real-estate-deal-flow",
    title: "Real Estate Deal Flow & Engagement Suite",
    summary: "Automated property evaluation, outreach, and rental onboarding on top of existing CRM and communications tools.",
    impact: [
      "Evaluates properties and matches them to best fit contacts in sales CRM",
      "Sends scheduled, tailored text offers automatically",
      "Orchestrates rental onboarding tasks across internal staff and customers"
    ],
    stack: ["Follow Up Boss", "Twilio", "Google Workspace", "Web Apps"],
    modalContent: {
      title: "Real Estate Deal Flow & Engagement Suite",
      subtitle: "Optimized path from property evaluation and offers to rental onboarding, using client existing CRM and communication stack.",
      situation: [
        "Real estate teams had right tools. CRM, texting platforms, internal staff. Workflows between them were largely manual. New properties evaluated in spreadsheets or one off tools. Prospects and investors lived in CRM but were not consistently matched to opportunities. Offer texts written and sent by hand, with inconsistent follow up. Once property accepted, onboarding as rental relied on scattered email threads and informal checklists.",
        "Result. Missed opportunities, inconsistent outreach, and variable onboarding experiences."
      ],
      whatIDid: [
        {
          category: "Investment Communicator",
          items: [
            "Inherited. CRM (Follow Up Boss) full of contacts and history, plus Twilio based texting setup. Property data and evaluation lived elsewhere. Matching properties to right contacts was manual.",
            "Stabilized. Defined what best fit means for property contact match using fields already in CRM. Standardized how offers, campaigns, and statuses are represented.",
            "Automated. Built service that ingests and evaluates properties, identifies best fit contacts, schedules customized text offers via Twilio, and writes communication history back into Follow Up Boss."
          ]
        },
        {
          category: "Rental Management Portal",
          items: [
            "Inherited. Onboarding involved many steps. Inspections, documentation, internal setup, and owner communications. Handled via email and shared docs with no single view of progress.",
            "Stabilized. Mapped full onboarding process from acceptance to go live. Clarified roles and responsibilities across staff so tasks could be assigned systematically.",
            "Automated. Implemented Rental Management Portal that tracks status, creates and assigns tasks automatically, sends structured onboarding steps to customers, and provides overview of all properties in onboarding."
          ]
        }
      ],
      results: [
        "Property opportunities matched to right prospects automatically instead of relying on manual sorting.",
        "Offer texts go out on controlled, trackable schedule, with full visibility inside CRM.",
        "Staff no longer maintain personal onboarding checklists. Tasks generated and tracked centrally.",
        "Customers receive clearer, more consistent onboarding experience."
      ],
      whatThisShows: [
        "I build tools that plug into existing ecosystems (CRM + Twilio) rather than replacing them.",
        "I automate complex matching logic to drive revenue.",
        "I unify internal operations and customer facing workflows into single pipeline."
      ]
    }
  },
  {
    id: "contractor-financial-operations",
    title: "Contractor & Financial Operations Suite",
    summary: "Brought order to contractor projects and accrual reporting. Connected operational status with accounting and automated reporting.",
    impact: [
      "Consolidated multiple contractor project portals",
      "Linked project status to accrual based financial reporting",
      "Added task management for operational and support work"
    ],
    stack: ["Web Apps", "Accounting Exports/APIs", "Reporting/BI", "Google Workspace"],
    modalContent: {
      title: "Contractor & Financial Operations Suite",
      subtitle: "Connected contractor project status with accrual based financial reporting and operational tasking. Used portals and reporting built around existing accounting data.",
      situation: [
        "Organizations managing many contractor projects had same pattern. Project status and contractor work tracked in disparate portals, spreadsheets, and emails. Accrual reporting done inside or around accounting system, often manually. Leadership asking which projects are actually on track and what should be accrued this period.",
        "Operations and accounting were each doing their jobs, but there was no shared system that tied project progress to financial reality."
      ],
      whatIDid: [
        {
          category: "Contractor Project Management Portals",
          items: [
            "Inherited. Multiple ad hoc tools for tracking contractor projects. Scattered portals, spreadsheets, and internal documents. Status, documentation, and changes hard to see in one place.",
            "Stabilized. Mapped full lifecycle of contractor project. Standardized key fields and milestones needed by both operations and accounting.",
            "Automated. Built project management portals that track status, milestones, and deliverables. Captured contract terms in structured way. Provided single view for operations and leadership."
          ]
        },
        {
          category: "Accrual & Reporting Engine",
          items: [
            "Inherited. Accounting teams calculated accruals with limited visibility into real time project status, often relying on manual updates.",
            "Stabilized. Defined clear linkage between project stages and milestones and accrual rules. Harmonized data from project portals and accounting exports.",
            "Automated. Implemented accrual reporting layer that uses project status to compute accrued amounts. Generates reports tailored for accounting and finance. Surfaces discrepancies automatically."
          ]
        },
        {
          category: "Task Manager for Orders & Support",
          items: [
            "Inherited. Operational tasks and support work around projects handled via email and informal to do lists, with limited tracking.",
            "Stabilized. Identified recurring task types linked to projects and orders. Clarified who should own which task categories.",
            "Automated. Deployed custom task manager that creates tasks from project events, assigns owners automatically, and provides queue for teams to work their tasks."
          ]
        }
      ],
      results: [
        "Contractor project status visible and standardized across portals.",
        "Accrual reporting driven by real project data, not just periodic spreadsheets.",
        "Finance gets clearer, more timely view of what should be accrued and where exposure lies.",
        "Operational and support tasks tracked in dedicated system instead of being lost in email."
      ],
      whatThisShows: [
        "I bridge operations and accounting by designing systems that both sides can trust.",
        "I inherit existing tools and data (portals, accounting systems, exports) and build cohesive workflows around them.",
        "I create portals and tasking layers that turn project and financial operations into unified, measurable system."
      ]
    }
  }
];
