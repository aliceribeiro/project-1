import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '.';

describe('<Button />', () => {
  it("should render the button with the text 'Carregar mais posts'", () => {
    const fn = jest.fn();
    render(<Button text="Carregar mais posts" handleClick={fn} />);

    const button = screen.getByRole('button', { name: /carregar mais posts/i });
    expect(button).toBeInTheDocument();
  });

  it('should call function on button click', () => {
    const fn = jest.fn();
    render(<Button text="Carregar mais posts" handleClick={fn} />);

    const button = screen.getByRole('button', { name: /carregar mais posts/i });

    userEvent.click(button);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should be disable when disabled is true', () => {
    const fn = jest.fn();
    render(<Button text="Carregar mais posts" disabled={true} handleClick={fn} />);

    const button = screen.getByRole('button', { name: /carregar mais posts/i });
    expect(button).toBeDisabled();
  });

  it('should be enabled when disabled is false', () => {
    const fn = jest.fn();

    render(<Button text="Carregar mais posts" disabled={false} handleClick={fn} />);

    const button = screen.getByRole('button', { name: /carregar mais posts/i });
    expect(button).toBeEnabled();
  });

  it('should match snapshot', () => {
    const fn = jest.fn();
    const { container } = render(<Button text="Carregar mais posts" disabled={false} handleClick={fn} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
