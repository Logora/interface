import React from "react";
import { HashScroll } from "./HashScroll";
import { render } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";

const hash = "my-element";

let scrollIntoViewMock = jest.fn();

describe('HashScroll', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
  });

  it("should return children and call scrollIntoView", async () => {
    const dom = render(
      <MemoryRouter initialEntries={[`/#${hash}`]}>
        <HashScroll elementId={hash}><div id={hash}>Hello World!</div></HashScroll>
      </MemoryRouter>
    );

    const el = dom.baseElement.firstChild?.firstChild;

    expect(el).toHaveTextContent("Hello World!");
    expect(el).toHaveAttribute("id", hash);

    expect(scrollIntoViewMock).toHaveBeenCalled();
    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);
  });

  it("should not call scrollIntoView if element not present", async () => {
    const dom = render(
      <MemoryRouter initialEntries={[`/#${hash}`]}>
        <HashScroll elementId={hash}><div id="random-id">Hello World!</div></HashScroll>
      </MemoryRouter>
    );

    const el = dom.baseElement.firstChild?.firstChild;

    expect(el).toHaveTextContent("Hello World!");

    expect(scrollIntoViewMock).not.toHaveBeenCalled();
  });
  
  it("should call onScroll when passed", async () => {
    const onScroll = jest.fn();
    
    const dom = render(
      <MemoryRouter initialEntries={[`/#${hash}`]}>
        <HashScroll elementId={hash} onScroll={onScroll}><div id={hash}>Hello World!</div></HashScroll>
      </MemoryRouter>
    );

    const el = dom.baseElement.firstChild?.firstChild;

    expect(el).toHaveTextContent("Hello World!");
    expect(el).toHaveAttribute("id", hash);

    expect(scrollIntoViewMock).toHaveBeenCalled();
    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);

    expect(onScroll).toHaveBeenCalled();
    expect(onScroll).toHaveBeenCalledTimes(1);
  });
});