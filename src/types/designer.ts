export interface Designer {
  slug: string;
  template: string;

  seo: {
    title: string;
    description: string;
    keywords: string[];
    image: string;
    canonical: string;
  };

  theme: {
    primary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  };

  profile: {
    name: string;
    nickname: string;
    role: string;
    tagline: string;
    bio: string;
    location: string;
    email: string;
    phone: string;
    website: string;
    avatar: string;
    resume: string;
  };

  socials: {
    behance: string;
    dribbble: string;
    linkedin: string;
    instagram: string;
    github: string;
  };

  sections: {
    navbar: boolean;
    sidebarIcons: boolean;
    hero: boolean;
    featuredProjects: boolean;
    designProcess: boolean;
    caseStudies: boolean;
    tools: boolean;
    testimonials: boolean;
    contact: boolean;
  };

  data: {
    navbar: {
      logoInitials: string;
      navItems: {
        label: string;
        id: string;
        required: boolean;
      }[];
    };

    hero: {
      id: string;
      greeting: string;
      title: string;
      description: string;
      CTA: string;
      image: string;
      modelImage: string;
    };

    featuredProjects: {
      id: string;
      title: string;
      description: string;
      projects: {
        title: string;
        shadowTitle: string;
        description: string;
        tags: string[];
        CTA: string;
        image: string;
        brandimage: string;
        link: string;
      }[];
    };

    designProcess: {
      id: string;
      title: string;
      description: string;
      phases: {
        title: string;
        "phase-sno": string;
        timePeriod: string;
        process: string[];
      }[];
    };

    caseStudies: {
      id: string;
      title: string;
      description: string;
      projects: {
        title: string;
        timePeriod: string;
        tags: string[];
        description: string;
        image: string;
        link: string;
      }[];
    };

    tools: {
      id: string;
      title: string;
      description: string;
      toolIcons: {
        name: string;
        icon: string;
      }[];
    };

    contact: {
      id: string;
      title: string;
      description: string;
      image: string;
      form: {
        name: {
          label: string;
          placeholder: string;
          required: boolean;
          iconImage: string;
        };
        email: {
          label: string;
          placeholder: string;
          required: boolean;
          iconImage: string;
        };
        mobile: {
          label: string;
          placeholder: string;
          required: boolean;
          iconImage: string;
        };
        submitButton: {
          text: string;
        };
      };
    };
  };
}