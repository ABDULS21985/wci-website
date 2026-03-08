/**
 * Static blog data for SSG/fallback content
 * Topics focus on Women Connect International's mission:
 * - Psychosocial resilience for diaspora women
 * - Economic empowerment and digital skills
 * - Leadership development and mentoring
 * - Transparent humanitarian impact
 */

// ============================================================================
// Types
// ============================================================================

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  accentColor: string;
  postCount?: number;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogAuthor {
  id: string;
  name: string;
  slug: string;
  avatar: string;
  bio: string;
  role: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  authorId: string;
  categoryId: string;
  tagIds: string[];
  status: 'draft' | 'published' | 'archived';
  publishedAt: string;
  readingTime: number;
  viewsCount: number;
  isFeatured: boolean;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPostWithRelations extends BlogPost {
  author: BlogAuthor;
  category: BlogCategory;
  tags: BlogTag[];
}

// ============================================================================
// Blog Categories
// ============================================================================

export const blogCategories: BlogCategory[] = [
  {
    id: 'cat-resilience',
    name: 'Resilience',
    slug: 'resilience',
    description: 'Stories and insights on psychosocial resilience, healing circles, and wellness practices for African diaspora women navigating life abroad.',
    accentColor: '#C2185B',
  },
  {
    id: 'cat-empowerment',
    name: 'Empowerment',
    slug: 'empowerment',
    description: 'Resources and success stories on economic empowerment, digital skills training, and enterprise development for diaspora women.',
    accentColor: '#0D7377',
  },
  {
    id: 'cat-leadership',
    name: 'Leadership',
    slug: 'leadership',
    description: 'Perspectives on leadership development, mentoring journeys, and building confidence for women in the African diaspora.',
    accentColor: '#E8A317',
  },
  {
    id: 'cat-impact',
    name: 'Impact',
    slug: 'impact',
    description: 'Updates on humanitarian initiatives, transparent giving, and the measurable impact of WCI programs on communities.',
    accentColor: '#095456',
  },
];

// ============================================================================
// Blog Tags
// ============================================================================

export const blogTags: BlogTag[] = [
  { id: 'tag-resilience', name: 'Resilience', slug: 'resilience' },
  { id: 'tag-empowerment', name: 'Empowerment', slug: 'empowerment' },
  { id: 'tag-leadership', name: 'Leadership', slug: 'leadership' },
  { id: 'tag-impact', name: 'Impact', slug: 'impact' },
  { id: 'tag-diaspora', name: 'Diaspora', slug: 'diaspora' },
  { id: 'tag-women', name: 'Women', slug: 'women' },
  { id: 'tag-mentoring', name: 'Mentoring', slug: 'mentoring' },
  { id: 'tag-humanitarian', name: 'Humanitarian', slug: 'humanitarian' },
  { id: 'tag-healing', name: 'Healing', slug: 'healing' },
  { id: 'tag-digital-skills', name: 'Digital Skills', slug: 'digital-skills' },
  { id: 'tag-community', name: 'Community', slug: 'community' },
  { id: 'tag-wellness', name: 'Wellness', slug: 'wellness' },
];

// ============================================================================
// Blog Authors
// ============================================================================

export const blogAuthors: BlogAuthor[] = [
  {
    id: 'author-amina-osei',
    name: 'Amina Osei',
    slug: 'amina-osei',
    avatar: '/images/authors/placeholder-avatar.jpg',
    bio: 'Amina Osei is the Programs Director at Women Connect International, with over 15 years of experience in community development and psychosocial support for migrant and refugee women across the Gulf region and Africa.',
    role: 'Programs Director',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/amina-osei',
      email: 'amina.osei@womenconnectintl.org',
    },
  },
  {
    id: 'author-fatou-diallo',
    name: 'Fatou Diallo',
    slug: 'fatou-diallo',
    avatar: '/images/authors/placeholder-avatar.jpg',
    bio: 'Fatou Diallo leads WCI\'s Economic Empowerment programs, bringing a decade of experience in digital literacy, enterprise development, and skills training for women in the African diaspora.',
    role: 'Economic Empowerment Lead',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/fatou-diallo',
      email: 'fatou.diallo@womenconnectintl.org',
    },
  },
  {
    id: 'author-grace-mbeki',
    name: 'Grace Mbeki',
    slug: 'grace-mbeki',
    avatar: '/images/authors/placeholder-avatar.jpg',
    bio: 'Grace Mbeki is WCI\'s Communications and Impact Manager. She is passionate about storytelling, transparent reporting, and amplifying the voices of African women in the diaspora.',
    role: 'Communications & Impact Manager',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/grace-mbeki',
      twitter: 'https://twitter.com/grace_mbeki',
      email: 'grace.mbeki@womenconnectintl.org',
    },
  },
];

// ============================================================================
// Blog Posts
// ============================================================================

export const blogPosts: BlogPost[] = [
  {
    id: 'post-healing-circles',
    title: 'Breaking the Silence: How Healing Circles Transform Diaspora Women\'s Lives',
    slug: 'healing-circles-transform-lives',
    excerpt: 'For many African women in the diaspora, isolation and unspoken trauma are constant companions. WCI\'s healing circles create safe spaces where women share, connect, and begin the journey toward psychosocial resilience -- one circle at a time.',
    content: `## The Weight of Silence

For many African women living far from home, the challenges of migration do not end upon arrival. Isolation, cultural dislocation, language barriers, and unspoken trauma weigh heavily. In communities where discussing mental health is often stigmatized, these burdens remain invisible.

Women Connect International recognized that traditional counseling models were not always accessible or culturally appropriate for this population. That realization led to the development of our Healing Circle program -- a peer-led, community-based approach to psychosocial resilience.

### What Is a Healing Circle?

A healing circle brings together a small group of women in a safe, confidential space. Guided by a trained facilitator, participants share their experiences, listen without judgment, and support one another through structured dialogue. The circles draw on African communal traditions while incorporating evidence-based wellness practices.

Each session typically includes:

- **Opening ritual**: A grounding exercise that signals the start of a safe space
- **Storytelling round**: Participants share as much or as little as they feel comfortable with
- **Collective reflection**: The group identifies shared themes and sources of strength
- **Wellness practice**: A guided activity such as breathing exercises, journaling, or movement
- **Closing affirmation**: The group affirms each member's courage and resilience

### The Impact So Far

Since launching the Healing Circle program, WCI has facilitated over 200 sessions across Doha and online. Participant feedback has been overwhelmingly positive:

- **92%** of participants report feeling less isolated after attending regularly
- **87%** say they have developed new coping strategies
- **78%** have gone on to participate in other WCI programs, such as economic empowerment or leadership mentoring

One participant, a Ghanaian nurse working in Qatar, shared: "For the first time in five years, I did not feel alone. The circle gave me permission to speak, and that changed everything."

### Why Peer Support Works

Research consistently shows that peer-led support groups can reduce symptoms of anxiety and depression, particularly in populations that face barriers to formal mental health services. For diaspora women, the cultural familiarity and shared experience within a healing circle create a level of trust that clinical settings often cannot replicate.

WCI does not position its healing circles as a replacement for professional mental health care. Rather, they serve as a first point of connection -- a place where women can begin processing their experiences and, when needed, be referred to licensed professionals.

### Looking Ahead

In 2026, WCI plans to train 50 additional facilitators and expand the Healing Circle program to three new cities. We are also developing a digital toolkit that will enable diaspora communities worldwide to launch their own circles with WCI's guidance and support.

Breaking the silence is not easy. But in every circle, we see women finding their voices, discovering their strength, and building the resilience they need to thrive far from home.`,
    featuredImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2670&auto=format&fit=crop',
    authorId: 'author-amina-osei',
    categoryId: 'cat-resilience',
    tagIds: ['tag-resilience', 'tag-healing', 'tag-women', 'tag-diaspora', 'tag-community'],
    status: 'published',
    publishedAt: '2025-11-15T09:00:00Z',
    readingTime: 8,
    viewsCount: 1240,
    isFeatured: true,
    metaTitle: 'How Healing Circles Transform Diaspora Women\'s Lives | WCI',
    metaDescription: 'Discover how Women Connect International\'s healing circles create safe spaces for African diaspora women to build psychosocial resilience and community.',
    createdAt: '2025-11-10T10:00:00Z',
    updatedAt: '2025-11-15T09:00:00Z',
  },
  {
    id: 'post-digital-skills',
    title: 'From Survival to Enterprise: Digital Skills for Diaspora Women',
    slug: 'digital-skills-diaspora-women',
    excerpt: 'Economic independence begins with the right skills. WCI\'s digital literacy and enterprise development programs are equipping African diaspora women with the tools to move from survival mode to building sustainable livelihoods.',
    content: `## Beyond Survival

Many African women in the diaspora arrive in their host countries with professional qualifications that are not recognized, language skills that are still developing, and networks that must be built from scratch. The result is that highly capable women often find themselves in low-wage, precarious employment -- surviving, but not thriving.

Women Connect International's Economic Empowerment program addresses this gap directly. Through structured digital skills training and enterprise development workshops, we help women build the capabilities they need to create sustainable livelihoods on their own terms.

### The Digital Skills Gap

A 2024 study by the International Organization for Migration found that migrant women in the Gulf region are significantly less likely than their male counterparts to have access to digital skills training. This gap has real consequences: women without digital literacy are excluded from online marketplaces, remote work opportunities, and the financial tools that enable saving and investment.

WCI's digital skills curriculum is designed specifically for women who may have limited prior experience with technology. The program covers:

- **Digital literacy fundamentals**: Using smartphones, email, cloud storage, and productivity tools
- **Social media for business**: Building a professional presence on Instagram, Facebook, and WhatsApp Business
- **E-commerce basics**: Setting up online shops, pricing strategies, and managing orders
- **Financial management**: Mobile banking, budgeting apps, and digital payment platforms
- **Data privacy and safety**: Protecting personal information and avoiding online scams

### From Classroom to Enterprise

What makes WCI's approach distinctive is the direct pathway from training to enterprise development. Graduates of the digital skills program are invited to join our Enterprise Incubator, a 12-week program that provides:

- One-on-one mentoring from experienced business owners
- Seed funding opportunities through WCI's micro-grant program
- Access to a community of fellow women entrepreneurs
- Ongoing technical support and accountability check-ins

Since 2023, the Enterprise Incubator has supported 85 women in launching or scaling small businesses. These range from catering services and tailoring to online tutoring and graphic design.

### Success Story: Nkechi's Journey

Nkechi arrived in Doha from Nigeria five years ago to work as a domestic helper. Through WCI's digital skills program, she learned graphic design and social media marketing. Within six months, she had launched a freelance design service targeting small businesses in her community. Today, she earns three times her previous salary and employs two other women part-time.

"I never imagined I could build something of my own," Nkechi says. "WCI did not just teach me software. They taught me to believe that I could."

### What the Data Shows

An independent evaluation of WCI's Economic Empowerment program found:

- **73%** of graduates reported an increase in personal income within 12 months
- **68%** started a side business or freelance practice
- **91%** said they felt more confident managing their finances

### Scaling the Impact

In 2026, WCI plans to expand its digital skills program to reach 500 additional women, with a focus on remote and hybrid delivery models that can serve diaspora communities beyond Doha. We are also developing partnerships with technology companies to provide free software licenses and certifications to program participants.

Economic empowerment is not just about income. It is about agency, dignity, and the freedom to build a life of one's own choosing.`,
    featuredImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2670&auto=format&fit=crop',
    authorId: 'author-fatou-diallo',
    categoryId: 'cat-empowerment',
    tagIds: ['tag-empowerment', 'tag-digital-skills', 'tag-women', 'tag-diaspora'],
    status: 'published',
    publishedAt: '2025-10-28T09:00:00Z',
    readingTime: 9,
    viewsCount: 980,
    isFeatured: false,
    metaTitle: 'Digital Skills for Diaspora Women: From Survival to Enterprise | WCI',
    metaDescription: 'How WCI\'s digital literacy and enterprise development programs help African diaspora women build sustainable livelihoods and economic independence.',
    createdAt: '2025-10-20T10:00:00Z',
    updatedAt: '2025-10-28T09:00:00Z',
  },
  {
    id: 'post-transparent-impact',
    title: 'Transparent Impact: How Technology Bridges Diaspora Giving',
    slug: 'transparent-impact-technology',
    excerpt: 'Diaspora communities send billions in remittances each year, but how can donors be sure their contributions create real change? WCI\'s impact platform brings radical transparency to humanitarian giving.',
    content: `## The Trust Gap in Humanitarian Giving

African diaspora communities are among the most generous in the world. According to the World Bank, remittances to sub-Saharan Africa exceeded $50 billion in 2024. Beyond personal transfers, many diaspora members contribute to community projects, school fees for relatives, and local development initiatives.

Yet a persistent challenge remains: how can donors verify that their contributions are reaching the intended beneficiaries and creating lasting impact? Stories of mismanaged funds and unaccountable intermediaries have eroded trust, leading many potential contributors to reduce or halt their giving.

Women Connect International is addressing this challenge head-on with our Impact Platform -- a technology-driven approach to transparent humanitarian giving.

### How the Impact Platform Works

WCI's platform connects donors directly with verified programs and provides real-time visibility into how funds are used. Key features include:

- **Verified beneficiary profiles**: Each program participant has a verified profile (with their consent) showing their background, goals, and progress
- **Real-time fund tracking**: Donors can see exactly how their contribution is allocated -- down to specific program activities, materials, and support services
- **Impact metrics dashboard**: Aggregated data showing outcomes across programs, including completion rates, income changes, and participant satisfaction
- **Photo and video updates**: Regular media updates from program sites, shared directly with donors through the platform
- **Annual impact reports**: Comprehensive, independently verified reports on program outcomes and financial stewardship

### Why Transparency Matters

Research by the Charities Aid Foundation found that 73% of donors say they would give more if they could see proof of impact. For diaspora communities, where trust has been historically fragile, transparency is not a nice-to-have -- it is essential.

WCI's approach draws on the principle that accountability should flow in both directions. We are accountable to our donors for the responsible use of their funds, and we are accountable to our participants for delivering programs that genuinely improve their lives.

### Early Results

Since launching the Impact Platform in pilot mode in early 2025, WCI has seen:

- **A 40% increase** in repeat donations from existing supporters
- **85% of donors** engage with at least one impact update per month
- **92% donor satisfaction** rating in our post-giving survey
- **$180,000** raised through the platform in its first six months

### A Donor's Perspective

Kwame, a Ghanaian engineer based in London, began contributing to WCI after discovering the platform. "I've donated to organizations before and never heard back," he says. "With WCI, I can see photos from the healing circles I helped fund. I know exactly where my money went. That changes everything."

### The Road Ahead

WCI is currently enhancing the Impact Platform with several new features planned for 2026:

- **Community project funding**: Enabling diaspora groups to collectively fund specific community projects with full transparency
- **Skill-based volunteering marketplace**: Connecting diaspora professionals with WCI programs that need their expertise
- **Multilingual support**: Expanding the platform to support French, Arabic, and Portuguese in addition to English

Technology alone does not build trust. But when combined with genuine accountability, consistent communication, and a deep commitment to the communities we serve, it becomes a powerful bridge between those who want to help and those who need support.`,
    featuredImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2670&auto=format&fit=crop',
    authorId: 'author-grace-mbeki',
    categoryId: 'cat-impact',
    tagIds: ['tag-impact', 'tag-humanitarian', 'tag-diaspora', 'tag-community'],
    status: 'published',
    publishedAt: '2025-10-10T09:00:00Z',
    readingTime: 10,
    viewsCount: 1450,
    isFeatured: false,
    metaTitle: 'How Technology Bridges Diaspora Giving | WCI',
    metaDescription: 'Learn how WCI\'s impact platform brings radical transparency to humanitarian giving, connecting diaspora donors with verified programs and real-time impact data.',
    createdAt: '2025-10-05T10:00:00Z',
    updatedAt: '2025-10-10T09:00:00Z',
  },
  {
    id: 'post-leadership-journeys',
    title: 'Finding Your Voice: Leadership Journeys of Diaspora Women',
    slug: 'finding-your-voice-leadership-journeys',
    excerpt: 'Leadership is not just about titles -- it is about finding the courage to speak, the confidence to act, and the wisdom to uplift others. Three WCI mentees share their transformative journeys from silence to leadership.',
    content: `## Redefining Leadership

In many cultures, leadership is associated with authority, seniority, and formal positions. For African women in the diaspora, this narrow definition can feel exclusionary -- particularly when they are navigating unfamiliar systems, overcoming language barriers, and managing the daily pressures of life abroad.

Women Connect International's Leadership and Mentoring program takes a different approach. We define leadership as the capacity to influence positive change in one's own life and in the lives of others. This definition opens the door for every woman, regardless of her current circumstances, to see herself as a leader.

### The Mentoring Model

WCI's mentoring program pairs participants with experienced mentors who provide guidance, encouragement, and practical support over a six-month period. The program includes:

- **Monthly one-on-one sessions**: Structured conversations covering goal-setting, self-awareness, communication skills, and action planning
- **Group workshops**: Monthly group sessions on topics such as public speaking, conflict resolution, negotiation, and community organizing
- **Leadership project**: Each mentee identifies a challenge in her community and designs a small project to address it
- **Peer learning circles**: Small groups of mentees who meet independently to share progress, challenges, and encouragement
- **Graduation and ongoing community**: A celebration event followed by induction into WCI's alumni network

### Three Voices, Three Journeys

**Aisha, 34, from Somalia, living in Doha**

When Aisha joined the mentoring program, she described herself as "invisible." Working as a cleaner in a hotel, she rarely spoke up, even when her rights were being violated. Through the program, she learned to advocate for herself -- first in small ways, then more boldly.

For her leadership project, Aisha organized a rights awareness workshop for domestic workers in her building. Twenty-three women attended. "I realized that my voice matters," she says. "And when I use it, other women find theirs too."

**Blessing, 28, from Nigeria, living in Doha**

Blessing arrived in Qatar with a degree in business administration but could not find work in her field. The mentoring program helped her reframe her skills and build confidence. She now runs a small catering business and mentors two younger women through WCI's peer program.

"My mentor did not give me answers," Blessing recalls. "She asked me the right questions. That was more powerful than any advice."

**Marie, 41, from Cameroon, living in Doha**

Marie had been a teacher in Cameroon before moving to Doha to support her family. She joined WCI's program feeling disconnected from her professional identity. Through mentoring, she rediscovered her passion for education and launched a weekly tutoring session for children of migrant workers.

"Leadership is not about being in charge," Marie says. "It is about taking responsibility for something you care about."

### Program Outcomes

An independent evaluation of WCI's Leadership and Mentoring program found:

- **89%** of participants reported increased self-confidence
- **76%** took on a new leadership role within 12 months (formal or informal)
- **82%** said the program changed how they see themselves
- **94%** would recommend the program to other diaspora women

### The Ripple Effect

Perhaps the most powerful outcome of the mentoring program is what happens after graduation. Over 60% of program alumni have gone on to mentor other women -- either through WCI's formal program or informally in their communities. This creates a multiplying effect: each woman who finds her voice helps others find theirs.

### Join the Journey

WCI's next Leadership and Mentoring cohort opens for applications in early 2026. Whether you are a diaspora woman seeking to grow, or an experienced professional who wants to give back as a mentor, we invite you to be part of this transformative community.

Leadership begins with a single step: the decision to believe in your own potential.`,
    featuredImage: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2670&auto=format&fit=crop',
    authorId: 'author-amina-osei',
    categoryId: 'cat-leadership',
    tagIds: ['tag-leadership', 'tag-mentoring', 'tag-women', 'tag-diaspora', 'tag-empowerment'],
    status: 'published',
    publishedAt: '2025-09-20T09:00:00Z',
    readingTime: 10,
    viewsCount: 1100,
    isFeatured: false,
    metaTitle: 'Leadership Journeys of Diaspora Women | WCI',
    metaDescription: 'Three WCI mentees share their transformative journeys from silence to leadership through Women Connect International\'s mentoring program.',
    createdAt: '2025-09-15T10:00:00Z',
    updatedAt: '2025-09-20T09:00:00Z',
  },
];

// ============================================================================
// Utility Functions
// ============================================================================

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getPostsByCategory(categoryId: string): BlogPost[] {
  return blogPosts.filter((post) => post.categoryId === categoryId && post.status === 'published');
}

export function getPostsByTag(tagId: string): BlogPost[] {
  return blogPosts.filter((post) => post.tagIds.includes(tagId) && post.status === 'published');
}

export function getFeaturedPosts(limit: number = 3): BlogPost[] {
  return blogPosts
    .filter((post) => post.isFeatured && post.status === 'published')
    .slice(0, limit);
}

export function getRecentPosts(limit: number = 5): BlogPost[] {
  return blogPosts
    .filter((post) => post.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function getPostWithRelations(slug: string): BlogPostWithRelations | undefined {
  const post = getPostBySlug(slug);
  if (!post) return undefined;

  const author = blogAuthors.find((a) => a.id === post.authorId);
  const category = blogCategories.find((c) => c.id === post.categoryId);
  const tags = blogTags.filter((t) => post.tagIds.includes(t.id));

  if (!author || !category) return undefined;

  return {
    ...post,
    author,
    category,
    tags,
  };
}

export function getAllSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}
