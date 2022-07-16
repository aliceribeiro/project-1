import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextInput } from ".";

describe("<TextInput  />", () => {
  it("should have a value of searchValue", () => {
    const fn = jest.fn();

    render(<TextInput handleChange={fn} searchValue={"Testando"} />);

    const input = screen.getByPlaceholderText(/Pesquisar/i);
    expect(input.value).toBe("Testando");
  });

  it("should call handleChange function on each key pressed", () => {
    const fn = jest.fn();

    render(<TextInput handleChange={fn} />);

    const input = screen.getByPlaceholderText(/Pesquisar/i);
    const value = "o valor";

    userEvent.type(input, value);
    expect(input.value).toBe(value);
    expect(fn).toHaveBeenCalledTimes(value.length);
  });

  it("should match snapshot", () => {
    const fn = jest.fn();

    const { container } = render(<TextInput handleChange={fn} />);

    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toMatchSnapshot();
  });
});
