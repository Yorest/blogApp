import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, createEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<blog/>', () => {
    test('render Blog ', () => {
        const blog = {
            title: 'Mejor Blog del Mundo',
            author: 'Yorest',
            url: 'https://blog.yorest.com',
            likes: 1,
            user: '21df1sf1365fsdfS2',
        };

        const myBlog = [
            {
                title: 'Mejor Blog del Mundo',
                author: 'Yorest',
                url: 'https://blog.yorest.com',
                likes: 1,
                user: '21df1sf1365fsdfS2',
            },
            {
                title: 'Mejor Blog del Mundo',
                author: 'Yorest',
                url: 'https://blog.yorest.com',
                likes: 1,
                user: '21df1sf1365fsdfS2',
            },
        ];

        const component = render(<Blog blog={blog} myBlogs={myBlog} />);
        const toogleContent =
            component.container.querySelector('.togglelement');

        expect(toogleContent).toHaveStyle('display: none');

        expect(component.container).toHaveTextContent('Mejor Blog del Mundo');
        expect(component.container).toHaveTextContent('Yorest');
    });

    test('click button view more ', () => {
        const blog = {
            title: 'Mejor Blog del Mundo',
            author: 'Yorest',
            url: 'https://blog.yorest.com',
            likes: 1,
            user: '21df1sf1365fsdfS2',
        };

        const myBlog = [
            {
                title: 'Mejor Blog del Mundo',
                author: 'Yorest',
                url: 'https://blog.yorest.com',
                likes: 1,
                user: '21df1sf1365fsdfS2',
            },
            {
                title: 'Mejor Blog del Mundo',
                author: 'Yorest',
                url: 'https://blog.yorest.com',
                likes: 1,
                user: '21df1sf1365fsdfS2',
            },
        ];

        const component = render(<Blog blog={blog} myBlogs={myBlog} />);

        const button = component.getByText('view more');
        const toogleContent =
            component.container.querySelector('.togglelement');

        expect(toogleContent).toHaveStyle('display: none');

        fireEvent.click(button);

        expect(toogleContent).toHaveStyle('display: block');

        //const myEvent = createEvent.click(node, { button: 2 })
        // fireEvent(node, myEvent)
    });

    test('click button like', () => {
        const blog = {
            title: 'Mejor Blog del Mundo',
            author: 'Yorest',
            url: 'https://blog.yorest.com',
            likes: 1,
            user: '21df1sf1365fsdfS2',
        };

        const myBlog = [
            {
                title: 'Mejor Blog del Mundo',
                author: 'Yorest',
                url: 'https://blog.yorest.com',
                likes: 1,
                user: '21df1sf1365fsdfS2',
            },
            {
                title: 'Mejor Blog del Mundo',
                author: 'Yorest',
                url: 'https://blog.yorest.com',
                likes: 1,
                user: '21df1sf1365fsdfS2',
            },
        ];

        const component = render(<Blog blog={blog} myBlogs={myBlog} />);

        const button = component.container.querySelector('.btnLike');

        const mockHandleLike = jest.fn();

        const myEvent = createEvent.click(button, {
            onClick: () => {
                mockHandleLike;
            },
        });

        fireEvent.click(button, myEvent);

        expect(mockHandleLike.mock.calls).toHaveLength(0);

        //const myEvent = createEvent.click(node, { button: 2 })
        // fireEvent(node, myEvent)
    });
});


