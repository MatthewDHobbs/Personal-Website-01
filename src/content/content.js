import { readable } from 'svelte/store';

export const content = new readable([
    {
        'header': 'Experience',
        'links': [
            {
                'uuid': '6d42dcd7-4369-478a-9bac-94e4e58fcec1',
                'location': 'Toronto, Canada',
                'subheader': 'Royal Bank of Canada',
                'type': 'internal',
                'link': null
            },
            {
                'uuid': '7d387dca-604c-4c88-a67c-5e08d2fb7b39',
                'location': 'Ottawa, Canada',
                'subheader': 'Mitel Networks',
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
                'location': 'Ottawa, Canada',
                'subheader': 'Carleton University',
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
                'location': 'Toronto, Canada',
                'subheader': 'Innovation Challenge',
                'type': 'internal',
                'link': null
            },
            {
                'uuid': 'b4b818ee-3aca-43d1-b118-21c192b007d0',
                'location': 'Ottawa, Canada',
                'subheader': 'cuHacking 2020',
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
                'location': 'Ottawa, Canada',
                'subheader': 'Personal Website',
                'type': 'internal',
                'link': null
            },
            {
                'uuid': '04387df5-5017-4d51-9e8c-e8a7e0031dd8',
                'location': 'Ottawa, Canada',
                'subheader': 'Feedbank',
                'type': 'internal',
                'link': null
            },
            {
                'uuid': '6df1a3ec-3526-460a-b732-ae11e91394fd',
                'location': 'Ottawa, Canada',
                'subheader': 'Smarticle News',
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