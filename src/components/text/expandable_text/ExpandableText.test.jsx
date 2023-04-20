import React from 'react';
import { ExpandableText } from './ExpandableText';
import { render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';

let text = faker.lorem.paragraph(35);

it('should render correctly with children', () => {
    render(
        <ExpandableText 
            expandable
            expandText={"Read more"}
            collapseText={"Read less"}
            maxHeight='100'
        >
            <div>
                {text}
            </div>
        </ExpandableText>
    );
    expect(screen.getByText(text)).toBeTruthy();
  });

