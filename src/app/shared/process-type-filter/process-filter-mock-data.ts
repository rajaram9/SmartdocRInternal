import { ProcessFilter } from './process-filter.interface';

export const autoFilter: ProcessFilter[] = [
    {
        title: 'Classification',
        filterItems: [
            {
                text: 'Ready For Classification',
                itemCount: 10
            },
            {
                text: 'InComplete',
                itemCount: 10
            },
            {
                text: 'Work In Progress',
                itemCount: 10
            },
            {
                text: 'Deleted',
                itemCount: 10
            },
            {
                text: 'Pause',
                itemCount: 10
            },
            {
                text: 'Completed',
                itemCount: 10
            }
        ]
    }, {
        title: 'Extraction',
        filterItems: [
            {
                text: 'Ready For Classification',
                itemCount: 10
            },
            {
                text: 'InComplete',
                itemCount: 10
            },
            {
                text: 'Work In Progress',
                itemCount: 10
            },
            {
                text: 'Deleted',
                itemCount: 10
            },
            {
                text: 'Pause',
                itemCount: 10
            },
            {
                text: 'Completed',
                itemCount: 10
            }
        ]
    }
];
