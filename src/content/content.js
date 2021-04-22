import { readable } from 'svelte/store';

export const content = new readable([
    {
        'header': 'Experience',
        'links': [
            {
                'uuid': '6d42dcd7-4369-478a-9bac-94e4e58fcec1',
                'location': '5df8deb0-0ab1-4825-9e0c-8dae222a8543',
                'subheader': 'Royal Bank of Canada',
                'date': 'May 2020 — August 2020',
                'description': 'Planned and implemented a solution for tracking key performance indicators using Node.JS, SQL, and Azure to increase the effectiveness of decision making by team leaders. Developed APIs for virtual visa debit inquiry and application to improve the modularity of visa debit implementation. Thoroughly researched the viability of using the Elastic Stack to monitor PTB/CIS data for improved tracking and understanding of client trends across the bank.',
                'type': 'internal',
                'link': null
            },
            {
                'uuid': '7d387dca-604c-4c88-a67c-5e08d2fb7b39',
                'location': 'bf7d87de-4130-4c4d-9398-bf6957de0625',
                'subheader': 'Mitel Networks',
                'date': 'July 2019 — August 2019',
                'description': 'Developed an end-to-end framework using Node.JS and Protractor to assist in the creation and execution of end-to-end tests, thus speeding up application iteration time. Developed automated end-to-end tests using the previously described framework to catch regressions and improve the quality of future releases.',
                'type': 'internal',
                'link': null
            }
        ]
    },
    {
        'header': 'Education',
        'links': [
            {
                'uuid': 'eb5a0bef-73dd-41f4-a1b2-b3b37e6a8217',
                'location': 'bf7d87de-4130-4c4d-9398-bf6957de0625',
                'subheader': 'Carleton University',
                'date': 'September 2019 — Present',
                'description': 'Overall CGPA: 11.2/12 (A). Major CGPA: 11.67/12 (A+). Minor in business and minor in statistics.',
                'type': 'internal',
                'link': null
            }
        ]
    },
    {
        'header': 'Achievements',
        'links': [
            {
                'uuid': '88a8ae98-96d7-4931-836a-6ec2308cdbf7',
                'location': '5df8deb0-0ab1-4825-9e0c-8dae222a8543',
                'subheader': 'Innovation Challenge',
                'date': 'May 2020 — August 2020',
                'description': 'Planned and prototyped a density tracking solution to reduce the health risks associated with RBC’s back to work initiative. Worked effectively with a team of interns and collaborated with employees from teams such as privacy, risk, and security. Presented solution to multiple members of senior management and wrote a detailed handoff package for future use.',
                'type': 'internal',
                'link': null
            },
            {
                'uuid': 'b4b818ee-3aca-43d1-b118-21c192b007d0',
                'location': 'bf7d87de-4130-4c4d-9398-bf6957de0625',
                'subheader': 'cuHacking 2020',
                'date': 'January 2020',
                'description': 'Planned, designed, and implemented a solution for tracking user sentiment around specific topics on Twitter to provide teams with a better understanding of public sentiment. Developed a frontend user interface with Angular to ensure simplicity and ease of use. Communicated effectively with a team of 3 other students to ensure quick development and MVP completion within 24 hours. https://devpost.com/software/cuhacking-2020-q7g5hd',
                'type': 'internal',
                'link': null
            }
        ]
    },
    {
        'header': 'Projects',
        'links': [
            {
                'uuid': 'b6175eb3-ae09-4d41-a320-b418ad5674fe',
                'location': 'bf7d87de-4130-4c4d-9398-bf6957de0625',
                'subheader': 'Personal Website',
                'date': 'April 2021 — Present',
                'description': 'Personal website developed with Svelte.js and Three.js. Deployed on AWS using Pulumi.',
                'type': 'internal',
                'link': null
            },
            {
                'uuid': '6df1a3ec-3526-460a-b732-ae11e91394fd',
                'location': 'bf7d87de-4130-4c4d-9398-bf6957de0625',
                'subheader': 'Smarticle News',
                'date': 'January 2019 — June 2019',
                'description': 'Planned, designed, and developed a tool to aggregate and sort news articles based on story to simplify the lives of those who wish to understand the world around them. Developed the frontend and backend systems using the MEAN stack to further develop technical skills used in industry today.',
                'type': 'internal',
                'link': null
            }
        ]
    },
    {
        'header': 'Links',
        'links': [
            {
                'uuid': 'b672455d-9371-4536-bf2d-b5b14b765b38',
                'location': null,
                'subheader': 'LinkedIn',
                'type': 'external',
                'link': 'www.linkedin.com/in/matt-hobbs'
            },
            {
                'uuid': 'bf5f5408-1bb3-428e-ac46-d3fb201ca898',
                'location': null,
                'subheader': 'GitHub',
                'type': 'external',
                'link': 'www.github.com/MatthewDHobbs'
            },
            {
                'uuid': '5e0a1e90-e4dd-4498-888e-56414a7d18a9',
                'location': null,
                'subheader': 'Dribbble',
                'type': 'external',
                'link': 'www.dribbble.com/MatthewHobbs'
            }
        ]
    }
]);
