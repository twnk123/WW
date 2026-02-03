export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedIn?: string;
  order: number; // For display ordering
}

export const teamMembers: TeamMember[] = [
  // Leadership
  {
    name: 'Marko Vodopivec',
    role: 'Founder & Technical Lead',
    bio: 'Marko founded WHITEWEAVER to solve a problem he saw too many times: founders wasting months building MVPs nobody wants. With a background in full-stack development and a track record of launching products from zero to paying customers, he leads the technical execution while ensuring every line of code serves a real business goal. His approach is simple—validate first, build second, launch fast.',
    image: '/team/marko-vodopivec.webp',
    linkedIn: 'https://www.linkedin.com/in/marko-vodopivec-a2a662160/',
    order: 1
  },
  {
    name: 'Daniel (Jaekyung) Lee',
    role: 'Head of Product Strategy & UX',
    bio: 'Daniel brings years of high-level product strategy experience to WHITEWEAVER, helping founders avoid the #1 MVP killer: building the wrong thing. He has worked with established companies on product design, user research, and go-to-market strategy. His expertise ensures our clients do not just get a working product—they get a product people actually want to pay for. Before we write a single line of code, Daniel validates the market, defines the ICP, and maps out a strategy that turns ideas into revenue.',
    image: '/team/daniel-lee.webp', // Placeholder - you'll need to provide this
    linkedIn: undefined,
    order: 2
  },

  // Engineering Team
  {
    name: 'Gonçalo Santos',
    role: 'Junior Software Engineer',
    bio: 'Gonçalo specializes in building scalable, production-ready applications that handle real-world complexity. With expertise in modern web technologies and cloud infrastructure, he ensures every MVP we ship is built to grow. His focus is on writing clean, maintainable code that founders can scale without rewrites when they hit product-market fit.',
    image: '/team/goncalo-santos.webp',
    linkedIn: 'https://www.linkedin.com/in/gon%C3%A7alo-azevedo-santos-387473211',
    order: 3
  },
  {
    name: 'Roberto Fernandes',
    role: 'Full-Stack Engineer',
    bio: 'Roberto bridges the gap between frontend polish and backend reliability. He builds features that look great and perform flawlessly under pressure. With a keen eye for user experience and a deep understanding of system architecture, Roberto ensures our MVPs deliver both speed and quality—no compromises.',
    image: '/team/roberto-fernandes.webp',
    linkedIn: 'https://www.linkedin.com/in/roberto-fernandes-9609bb269',
    order: 4
  },
  {
    name: 'João Fernandes',
    role: 'Software Engineer',
    bio: 'João focuses on rapid prototyping and iterative development, turning ideas into working features faster than most teams can plan them. His strength is in quickly validating technical feasibility and building core functionality that gets products to market in weeks, not months. When founders need speed without sacrificing quality, João delivers.',
    image: '/team/joao-fernandes.webp',
    linkedIn: 'https://www.linkedin.com/in/joaofernandes351',
    order: 5
  }
];
