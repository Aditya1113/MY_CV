import mdiGroup from '../assets/images/mdi-group.jpg';
import mdiBuilding from '../assets/images/mdi-building.jpg';
import mdiCampus from '../assets/images/mdi-campus.jpg';
import mdiILove from '../assets/images/mdi-ilove.jpg';

const buildingData = {
  1: {
    title: 'LEVEL 1: Apprentice Scholar',
    subtitle: 'Class X (CBSE) - 2015',
    icon: '\u{1F3EB}',
    iconBg: '#00B894',
    xp: 1000,
    content: {
      xpBarWidth: '100%',
      stats: [
        { label: 'Institution', value: 'Our Lady of Fatima Hr. Sec. School, Aligarh' },
        { label: 'Score', value: 'Perfect 10/10 CGPA', color: '#00B894' },
        { label: 'XP Gained', value: '+1,000 Points', color: '#C8A951' },
        { label: 'Status', value: '\u2705 CLEARED', color: '#00B894' },
      ],
    },
  },
  2: {
    title: 'LEVEL 2: Science Strategist',
    subtitle: 'Class XII (CBSE) - 2017',
    icon: '\u{1F4DA}',
    iconBg: '#0984E3',
    xp: 1500,
    content: {
      xpBarWidth: '91%',
      stats: [
        { label: 'Institution', value: 'St. Fidelis School, Aligarh' },
        { label: 'Score', value: '91.00% in PCM Stream', color: '#0984E3' },
        { label: 'XP Gained', value: '+1,500 Points', color: '#C8A951' },
        { label: 'Cumulative', value: '2,500 Points' },
        { label: 'Status', value: '\u2705 CLEARED', color: '#00B894' },
      ],
    },
  },
  3: {
    title: 'LEVEL 3: Data Analyst',
    subtitle: 'BSc. Honours Statistics - DU (2020)',
    icon: '\u{1F4CA}',
    iconBg: '#6C3BAA',
    xp: 2500,
    content: {
      xpBarWidth: '81.3%',
      stats: [
        { label: 'Institution', value: 'Shaheed Rajguru College, DU' },
        { label: 'Score', value: '8.13 / 10 CGPA', color: '#6C3BAA' },
        { label: 'XP Gained', value: '+2,500 Points', color: '#C8A951' },
        { label: 'Cumulative', value: '5,000 Points' },
      ],
      skills: ['Statistics', 'Data Analysis', 'Mathematics'],
    },
  },
  4: {
    title: 'LEVEL 4: Master Architect',
    subtitle: 'MCA - ABES Engineering College (2022)',
    icon: '\u{1F4BB}',
    iconBg: '#E17055',
    xp: 3500,
    content: {
      xpBarWidth: '89.5%',
      stats: [
        { label: 'Institution', value: 'ABES Engineering College, Ghaziabad' },
        { label: 'Score', value: '8.95 / 10 CGPA', color: '#E17055' },
        { label: 'XP Gained', value: '+3,500 Points', color: '#C8A951' },
        { label: 'Cumulative', value: '8,500 Points' },
      ],
      skills: ['React.js', 'Redux', 'JavaScript', 'Material UI', 'Jest', 'REST APIs'],
    },
  },
  5: {
    title: 'LEVEL 5: Product & Strategy Elite',
    subtitle: "PGDM '26 - MDI Gurgaon",
    icon: '\u{1F3C6}',
    iconBg: '#D63031',
    xp: 4000,
    photos: [mdiILove, mdiGroup, mdiBuilding, mdiCampus],
    content: {
      xpBarWidth: '65%',
      stats: [
        { label: 'Institution', value: 'MDI Gurgaon' },
        { label: 'Program', value: 'PGDM (Management)' },
        { label: 'XP Gained', value: '+4,000 Points', color: '#C8A951' },
        { label: 'Status', value: '\u23F3 IN PROGRESS', color: '#D63031' },
      ],
      skills: ['Product Strategy', 'CIRCLES', 'RICE', 'Kano', 'North Star Metrics'],
    },
  },
  6: {
    title: 'Work Experience Power-Up',
    subtitle: 'Magic Software Pvt. Ltd. | 27 Months',
    icon: '\u26A1',
    iconBg: '#6C3BAA',
    xp: 3500,
    content: {
      xpBarWidth: '100%',
      stats: [
        { label: 'Role', value: 'Associate Software Engineer' },
        { label: 'Duration', value: "June '22 - Sep '24" },
        { label: 'XP Boost', value: '+3,500 Points', color: '#C8A951' },
      ],
      abilitiesTitle: '\u26A1 Special Abilities',
      abilities: [
        { icon: '\u{1F680}', text: 'Velocity Surge: AI coding assistants', stat: '+30% TEAM VELOCITY' },
        { icon: '\u26A1', text: 'Optimization Mastery: Code-splitting & bundles', stat: '+35% PERFORMANCE' },
        { icon: '\u{1F6E1}\uFE0F', text: 'Bug Shield: Jest & Redux optimization', stat: '-30% BUGS | -25% DEBUG' },
        { icon: '\u{1F52C}', text: 'Efficiency Spell: Streamlined APIs', stat: '-20% API OVERHEAD' },
        { icon: '\u{1F451}', text: 'Guild Leadership: Mentored 6 devs', stat: '6 DEVS MENTORED' },
        { icon: '\u{1F3C6}', text: '100% on-time delivery from US stakeholders', stat: '100% ON-TIME' },
      ],
    },
  },
  7: {
    title: 'Leadership Power-Ups',
    subtitle: 'Positions of Responsibility',
    icon: '\u{1F451}',
    iconBg: '#E84393',
    xp: 2700,
    content: {
      xpBarWidth: '100%',
      sections: [
        {
          heading: '\u{1F4B0} Treasurer, Photography Club',
          xpLabel: '+1,200 XP',
          items: [
            { icon: '\u{1F4F7}', text: 'Led 17-member team, 25+ workshops, \u20B913,000 sponsorships (+32.5%)' },
          ],
        },
        {
          heading: '\u{1F4DC} Editor, Newspaper',
          xpLabel: '+900 XP',
          items: [
            { icon: '\u270D\uFE0F', text: 'Engaged 1,000+ readers through editorial content' },
          ],
        },
        {
          heading: '\u{1F30E} Expedition Coordinator',
          xpLabel: '+600 XP',
          items: [
            { icon: '\u{1F30E}', text: 'Led 14-member team, 4+ expeditions' },
          ],
        },
      ],
    },
  },
  8: {
    title: 'Achievement & Skill Badges',
    subtitle: 'Certifications & Awards',
    icon: '\u{1F3C5}',
    iconBg: '#C8A951',
    xp: 2000,
    content: {
      xpBarWidth: '100%',
      achievements: [
        { icon: '\u{1F3C5}', text: 'Olympiad Champion: National Rank 2 English & Math Olympiad' },
        { icon: '\u{1F6E0}\uFE0F', text: 'Product Frameworks: CIRCLES, RICE, Kano, North Star' },
        { icon: '\u{1F4CA}', text: 'Data Viz: Tableau & KPMG Data Analytics modules' },
        { icon: '\u{1F310}', text: 'Linguist: A1-level German (80 hours)' },
        { icon: '\u{1F52C}', text: 'Research: CSIR-CDRI Certificate of Merit & LOR' },
      ],
    },
  },
  9: {
    title: 'Passive Traits & Special Perks',
    subtitle: 'Character Interests',
    icon: '\u{1F3A8}',
    iconBg: '#00B894',
    xp: 800,
    content: {
      xpBarWidth: '100%',
      traits: [
        { icon: '\u{1F3A8}', name: 'Mandala Crafting', desc: 'Geometric art, symmetry & detail', stat: '+15 FOCUS & PRECISION' },
        { icon: '\u{1F363}', name: 'Culinary Alchemy', desc: '5+ international cuisines', stat: '+15 ADAPTABILITY & CREATIVITY' },
        { icon: '\u270D\uFE0F', name: 'Poetic Versatility', desc: '4+ years poetry writing', stat: '+10 STORYTELLING' },
      ],
    },
  },
};

export default buildingData;
