import { trigger, animate, transition, style, query, group, animateChild } from '@angular/animations';

export const fadeInAnimation = trigger('fadeInAnimation', [
    transition('* => *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%'
            })
        ], { optional: true }),  // Make the query optional
        query(':enter', [style({ opacity: '0' })], { optional: true }),  // Make the query optional
        query(':leave', animateChild(), { optional: true }),  // Make the query optional
        group([
            query(':leave', [animate('.2s ease-in-out', style({ opacity: '0' }))], { optional: true }),  // Make the query optional
            query(':enter', [animate('.2s ease-in-out', style({ opacity: '1' }))], {
                delay: 300,
                optional: true,  // Make the query optional
            }),
        ]),
        query(':enter', animateChild(), { optional: true }),  // Make the query optional
    ])
]);
