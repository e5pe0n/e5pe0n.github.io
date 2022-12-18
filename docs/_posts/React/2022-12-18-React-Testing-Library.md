---
title: "Note: React-Testing-Library"
categories:
  - React
tags:
  - React
  - TypeScript
last_modified_at: 2022-12-18
---

tools to test react components basically at point of view of UX, not implementation details

# Testing Forms


- `getByRole()` can pass a label to *name* option to get the labeled element
- wait for value being set to input when testing the screen after user interaction

```tsx
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

/**
 * Form to create user.
 * Here is no implementation but supporse that popup dialog with `Created!` message appears after submitted.
 */
const CreateUserForm: FC<Props> = ({onSubmit}) => (
  <form onSubmit={onSubmit}>
    <label htmlFor="input-username">Username</label>
    <input id="input-username" type="text" />
    <button type="submit">Submit</button>
  </form>
)

describe("CreateUserForm", () => {
  const getUsernameInput = () => screen.getByRole("textbox", { name: "User Name" })
  const getSubmitButton = () => screen.getByRole("button", { name: "Submit" })

  it("should submit form", async () => {
    const onSubmitMock = jest.fn();

    render(<CreateUserForm onSubmit={onSubmitMock} />)

    await userEvent.type(getUsernameInput(), "hoge");
    await waitFor(() => { 
      // wait for value the user inputted being set
      expect(getUsernameInput()).toHaveValue("hoge");
    });

    await userEvent.click(getSubmitButton());
    await waitFor(() => {
      // wait for submiting form
      exect(onSubmitMock).toBeCalled();
    })

    expect(await screen.findByText(/Created!/)).toBeInTheDocument();
  })
});

```
