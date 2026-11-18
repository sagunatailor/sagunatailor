/* Work history — one entry per record in the crate. Edit freely.
   accent = sleeve colour, logo = brand image, imgs = gallery shown in the drawer. */
window.WORK = [
  { key: 'asos', no: '01', name: 'ASOS', role: 'Front-End Engineer', dates: 'May 2025 — Present', accent: '#E11D74',
    logo: 'images/logos/asos.png', url: 'https://www.asos.com/',
    paras: [
      'Building reusable components and enhancing customer journeys on one of the UK’s largest fashion platforms, working to TDD/BDD, SOLID, DRY and KISS principles alongside UX, analytics and architecture teams.',
      'I migrated legacy Redux implementations to Redux Toolkit, supported the move of automated tests from Cypress to Playwright, built the Filters pull-out menu and Guided search carousel, set up Optimizely A/B tests, and worked with screen readers to keep the site at AAA accessibility.'],
    tags: ['React', 'Redux Toolkit', 'Node.js', 'Playwright', 'Jest', 'Optimizely', 'GitHub Actions', 'Docker', 'Figma'],
    imgs: [['images/asos1.png', 'ASOS Filters pull-out menu'], ['images/asos-guided-search.jpg', 'ASOS Guided search carousel of image tiles on the Women\u2019s Tops page']] },

  { key: 'bmj', no: '02', name: 'British Medical Journal', role: 'Front-End Web Developer', dates: 'Jan 2018 — Nov 2024', accent: '#0E7C66',
    logo: 'images/logos/bmj-logo.png', url: 'https://www.bmj.com/',
    paras: [
      'Often the sole front-end resource, I built and maintained BMJ Learning, BMJ OnExamination, Best Practice and The BMJ — deploying with AWS, GitHub Actions and Jenkins, and writing Jest and Cypress tests for every React component I shipped.',
      'I moved fluidly between agile teams and toolchains (Gulp, Grunt, SASS, LESS, React, Dart), ran stand-ups, retros and knowledge shares, onboarded new developers, and partnered with a digital agency in India to build the new BMJ OnExamination mobile app in Flutter and Dart.'],
    tags: ['React', 'SASS / LESS', 'Jest', 'Cypress', 'AWS', 'Jenkins', 'Flutter', 'Dart'],
    imgs: [['images/bmj/bmj1.jpg', 'BMJ website'], ['images/bmj/bmj2.jpg', 'BMJ Learning'], ['images/bmj/bmj3.jpg', 'BMJ Best Practice'], ['images/bmj/bmj4.jpg', 'BMJ website module'], ['images/bmj/bmj5.png', 'BMJ website feature'], ['images/bmj/oe1.png', 'BMJ OnExamination app'], ['images/bmj/oe2.png', 'BMJ OnExamination app screen'], ['images/bmj/oe3.png', 'BMJ OnExamination app screen'], ['images/bmj/oe4.png', 'BMJ OnExamination app screen'], ['images/bmj/oe5.png', 'BMJ OnExamination app screen']] },

  { key: 'bwin', no: '03', name: 'Bwin.Party', role: 'Front-End Web Developer', dates: 'Oct 2011 — Nov 2017', accent: '#2447B8',
    logo: 'images/logos/bwin-logo.png', url: 'https://www.foxybingo.com/',
    paras: [
      'Maintained and developed over 32 bingo sites — including Foxy Bingo, Cheeky Bingo and Mirror Bingo — and migrated more than ten of them into Adobe CQ5 CMS.',
      'I translated PSD wireframes into mobile-responsive sites and landing pages, coordinated with localisation teams to deliver multilingual sites, and liaised comfortably with technical and non-technical stakeholders in an Agile Scrum environment.'],
    tags: ['HTML / CSS', 'JavaScript', 'Adobe CQ5', 'Responsive design', 'Localisation', 'Agile Scrum'],
    imgs: [1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => ['images/bwin/bwin' + n + '.jpg', 'Bwin bingo site ' + n]) },

  { key: 'concep', no: '04', name: 'Concep', role: 'Front-End Web Developer', dates: 'May 2011 — Oct 2011', accent: '#F4B400',
    logo: 'images/logos/concep-logo.png',
    paras: ['Sole front-end developer coding corporate websites and microsites in Umbraco from PSD designs, owning projects from production to delivery. Built email marketing campaigns on turnarounds as tight as three hours, tested across email clients and browsers with Litmus.'],
    tags: ['Umbraco', 'HTML / CSS', 'Email campaigns', 'Litmus'],
    imgs: [1, 2, 3, 4].map(n => ['images/concep/concep' + n + '.jpg', 'Concep project ' + n]) },

  { key: 'bmt', no: '05', name: 'BMT Group', role: 'Front-End Web Developer', dates: 'Jul 2010 — May 2011', accent: '#C9301A',
    logo: 'images/logos/bmt-logo.png', url: 'https://www.bmt.org/',
    paras: ['Managed all 32 subsidiary company websites plus the intranet through the group CMS — building new areas and microsites, converting print magazines to online formats, managing domain registrations and producing optimised imagery and banners for the web.'],
    tags: ['CMS', 'HTML / CSS', 'Image optimisation'],
    imgs: [1, 2, 3, 4].map(n => ['images/bmt/bmt' + n + '.jpg', 'BMT Group project ' + n]) },

  { key: 'orange', no: '06', name: 'Orange', role: 'Contract Front-End Web Developer', dates: 'May 2010 — Jul 2010', accent: '#C2410C',
    logo: 'images/logos/orange-logo.png', url: 'https://www.orange.com/en',
    paras: ['Worked remotely converting Photoshop wireframes into pixel-perfect, W3C-compliant pages for the Help & Support section of the Orange mobile site, tested rigorously across Chrome, Safari, Firefox and IE 6/7.'],
    tags: ['XHTML / CSS', 'W3C standards', 'Cross-browser'],
    imgs: [1, 2, 3].map(n => ['images/orange/orange' + n + '.jpg', 'Orange Help and Support page ' + n]) },

  { key: 'group', no: '07', name: 'the group', role: 'Contract Web Developer', dates: 'Mar 2010 — May 2010', accent: '#6D3FC6',
    logo: 'images/logos/the-group-logo.jpg',
    paras: ['Built online annual reports for Barclays, Centrica, Aviva, Prudential and Kingfisher in XHTML and CSS — to strict AAA W3C and WCAG standards, cross-browser compatible, on extremely tight deadlines.'],
    tags: ['XHTML / CSS', 'WCAG AAA', 'Annual reports'],
    imgs: [1, 2].map(n => ['images/the-group/the-group' + n + '.jpg', 'Online annual report ' + n]) },

  { key: 'capita', no: '08', name: 'Capita', role: 'Web Developer', dates: 'Feb 2005 — Dec 2009', accent: '#1D1633',
    logo: 'images/logos/capita-logo.png', url: 'https://www.capita.com/',
    paras: ['Managed the company intranet with one other developer — liaising with clients to scope, develop and maintain content, building microsites, preparing graphics in Fireworks, and running one-on-one training sessions for department heads.'],
    tags: ['XHTML / CSS', 'Intranet', 'Graphics', 'Training'],
    imgs: [1, 2, 3, 4, 5, 6].map(n => ['images/capita/capita' + n + '.jpg', 'Capita project ' + n]) },

  { key: 'early', no: '09', name: 'Early career', role: 'Harvey Nichols & EDF Energy', dates: '2003 — 2004', accent: '#C98F55',
    logo: 'images/logos/harvey-logo.jpg',
    paras: ['Where it all began — Systems Support Analyst at Harvey Nichols and Data Input Specialist at EDF Energy, straight out of a BSc (Hons) in Multimedia Computing.'],
    tags: ['Systems support', 'Data input'], imgs: [] }
];
