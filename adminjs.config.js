import { Adapter, Resource, Database } from '@adminjs/sql'
import AdminJS from 'adminjs'


AdminJS.registerAdapter({
    Database,
    Resource,
})

const db = await new Adapter('mysql2', {
    host: 'localhost',
    port: 3306,
    user: 'slave',
    password: 'password',
    database: 'usof',
}).init()

export const admin = new AdminJS({
    resources: [
        {
            resource: db.table('users'),
            options: {
                properties: {
                    password: { isVisible: false },
                },
            },
        },
        {
            resource: db.table('posts'),
            options: {},
        },
        {
            resource: db.table('categories'),
            options: {},
        },
        {
            resource: db.table('comments'),
            options: {},
        },
        {
            resource: db.table('likes'),
            options: {},
        },
        {
            resource: db.table('comment_likes'),
            options: {},
        },
        {
            resource: db.table('posts_categories'),
            options: {},
        },
        {
            resource: db.table('post_images'),
            options: {},
        },
        {
            resource: db.table('users_favourites'),
            options: {},
        },
        {
            resource: db.table('users_subscriptions'),
            options: {},
        },
    ],
    rootPath: '/admin',
    branding: {
        companyName: 'USOF Admin',
        softwareBrothers: false,
    },
});
