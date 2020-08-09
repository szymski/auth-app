import React from 'react';

export const Page = (props: { title: string, children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props}>
        <h1>{props.title}</h1>
        {props.children}
    </div>
);
