import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Home } from '.';
import userEvent from '@testing-library/user-event';

const handlers = [
  rest.get('*jsonplaceholder.typicode.com*', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title1',
          body: 'body1',
          url: 'img1.jpg',
        },
        {
          userId: 2,
          id: 2,
          title: 'title2',
          body: 'body2',
          url: 'img2.jpg',
        },
        {
          userId: 3,
          id: 3,
          title: 'title3',
          body: 'body3',
          url: 'img3.jpg',
        },
        {
          userId: 4,
          id: 4,
          title: 'title4',
          body: 'body4',
          url: 'img4.jpg',
        },
        {
          userId: 5,
          id: 5,
          title: 'title5',
          body: 'body5',
          url: 'img5.jpg',
        },
        {
          userId: 6,
          id: 6,
          title: 'title6',
          body: 'body6',
          url: 'img6.jpg',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => {
    server.close();
  });

  it('should render search, posts and load more', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts =(');

    expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/Pesquisar/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img', { name: /title/i });
    expect(images).toHaveLength(3);

    const button = screen.getByRole('button', { name: /Carregar mais posts/i });
    expect(button).toBeInTheDocument();
  });

  it('should search for posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts =(');

    expect.assertions(13);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/Pesquisar/i);

    expect(screen.getByRole('heading', { name: 'title1 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2 2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title3 3' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title4 4' })).not.toBeInTheDocument();

    userEvent.type(search, 'title1');
    expect(screen.getByRole('heading', { name: 'title1 1' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title2 2' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title3 3' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title4 4' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Valor de pesquisa: title1' })).toBeInTheDocument();

    userEvent.clear(search);
    expect(screen.getByRole('heading', { name: 'title1 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2 2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title3 3' })).toBeInTheDocument();

    userEvent.type(search, 'post does not exist');
    expect(screen.getByText('Não existem posts =(')).toBeInTheDocument();
  });

  it('should load more posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts =(');

    // expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);

    const button = screen.getByRole('button', { name: /Carregar mais posts/i });

    userEvent.click(button);
    expect(screen.getByRole('heading', { name: 'title4 4' })).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
