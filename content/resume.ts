/**
* Next Resume Pro v2.0.0
* Author: Kushalitha Maduranga
* Year: 2026
*
* License:
* - Code (TypeScript, JavaScript, build scripts): MIT License
* - UI / Design (CSS, layout, visual components): CC BY 4.0
* 	Attribution Required
*
* Repository:
* https://github.com/Kushalitha
*/

export const resume = {
  title: 'Professional Experience',
  timeline: [
    {
      company: 'Self-Employed',
      role: 'Professional Photographer',
      start: '2015',
      end: 'Present',
      details: [
        'Portrait and landscape photography for private and commercial clients',
        'Curate and deliver high-resolution galleries and print-ready files',
        'Manage client bookings, retouching pipelines, and gallery hosting'
      ]
    },
    {
      company: 'Freelance / Contract Roles',
      role: 'Frontend Web Developer',
      start: '2019',
      end: 'Present',
      details: [
        'Build responsive websites and single-page applications using React and Next.js',
        'Implement TypeScript-based component libraries and design systems',
        'Integrate photography portfolios with headless CMS and GitHub data'
      ]
    },
    {
      company: 'Pixel Studio NZ',
      role: 'Junior Web Developer',
      start: '2017',
      end: '2019',
      details: [
        'Assisted in frontend development and cross-browser testing',
        'Worked on client galleries and CMS integrations',
        'Optimised images and implemented accessible UI components'
      ]
    }
  ],

  education: [
    {
      school: 'University of Studies',
      degree: 'Bachelor of Creative Media',
      year: '2012 - 2015',
      details: ['Focused on visual communication and digital media', 'Graduated with Honours, Dean’s List in final year']
    },
    {
      school: 'Design Institute',
      degree: 'Certificate in Graphic Design',
      year: '2010 - 2011',
      details: ['Practical design foundation and print workflows']
    }
  ],

  skills: {
    developer: [
      { name: 'JavaScript', percent: 95 },
      { name: 'TypeScript', percent: 90 },
      { name: 'React', percent: 92 },
      { name: 'Next.js', percent: 90 },
      { name: 'HTML/CSS', percent: 98 }
    ],
    design: [
      { name: 'Web Design', percent: 85 },
      { name: 'Print Design', percent: 70 },
      { name: 'Logo Design', percent: 80 },
      { name: 'Graphic Design', percent: 88 }
    ],
    photography: [
      { name: 'Portrait', percent: 95 },
      { name: 'Landscape', percent: 92 },
      { name: 'Studio Lighting', percent: 88 }
    ]
  },

  certificates: [
    {
      title: 'Psychology of International Design',
      issuer: 'GoldenGrid',
      date: '19 April 2018',
      id: 'XXXX',
      details: ['Membership ID: XXXX', 'Completed a module on design psychology and user behaviour']
    },
    {
      title: 'Advanced Photography Workshop',
      issuer: 'PhotoPro Academy',
      date: '12 March 2019',
      id: 'PP-2019-07',
      details: ['Advanced lighting techniques and post-processing workflow']
    }
  ]
};
