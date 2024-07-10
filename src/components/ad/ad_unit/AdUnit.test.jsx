import React from 'react';
import { render } from '@testing-library/react';
import { AdUnit } from './AdUnit';

describe('AdUnit', () => {
    it('should render nothing if id is empty', () => {
        const { container } = render(
            <AdUnit
                id={""}
                adPath={"/path"}
                sizes={[[300, 250]]}
            />
        );

        expect(container).toBeEmptyDOMElement()
    });

    it('should render nothing if adPath is empty', () => {
        const { container } = render(
            <AdUnit
                id={"div-id"}
                adPath={""}
                sizes={[[300, 250]]}
            />
        );

        expect(container).toBeEmptyDOMElement()
    });

    it('should render div if correct props are passed', () => {
        const adPath = "/path";
        const id = "slot-id";

        const { container } = render(
            <AdUnit
                id={id}
                adPath={adPath}
                sizes={[[300, 250]]}
            />
        );

        expect(container.firstChild?.firstChild.id).toBe(`div-gpt-ad-${id}`);
    });

    it('should set didomi script if consent is true', () => {
        const adPath = "/path";
        const id = "slot-id";

        const { container } = render(
            <AdUnit
                id={id}
                adPath={adPath}
                sizes={[[300, 250]]}
                enableDidomi
            />
        );

        expect(container.firstChild.tagName).toBe("SCRIPT");
        expect(container.firstChild.type).toBe("didomi/html");
        expect(container.firstChild.getAttribute("data-vendor")).toBe("didomi:google");
        expect(container.firstChild?.firstChild?.firstChild.id).toBe(`div-gpt-ad-${id}`);
    });
});