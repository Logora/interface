import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useFormValidation } from './useFormValidation';

jest.mock('react-intl', () => ({ useIntl: () => ({formatMessage: jest.fn(),}) }));

describe('useFormValidation', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should validate correct form values and return empty errors object', () => {
        const formData = { title: "My title", content: "My content"}
        const { result } = renderHook(() =>
            useFormValidation()
        );

        act(() => {
            result.current.validate(formData, [{ title: ["required", null] }, { content: ["length", 1] }]);
        });
        expect(Object.keys(result.current.errors).length).toBe(0);
    });

    it('Should not validate incorrect form values and return errors object with errors', () => {
        const formData = { title: "", content: "My content"}
        const { result } = renderHook(() =>
            useFormValidation()
        );

        act(() => {
            result.current.validate(formData, [{ title: ["required", null] }, { content: ["length", 3] }]);
        });
        
        expect(Object.keys(result.current.errors).length).toBe(2);
        expect(result.current.errors.hasOwnProperty("title")).toBe(true);
        expect(result.current.errors.hasOwnProperty("content")).toBe(true);
    });

    it('Should not validate if required func does not pass', () => {
        const formData = { title: "", content: "My cool content"}
        const { result } = renderHook(() =>
            useFormValidation()
        );

        act(() => {
            result.current.validate(formData, [{ title: ["required", null] }, { content: ["length", 3] }]);
        });
        expect(Object.keys(result.current.errors).length).toBe(1);
        expect(result.current.errors.hasOwnProperty("title")).toBe(true);
    });

    it('Should not validate if length func does not pass', () => {
        const formData = { title: "", content: "My content"}
        const { result } = renderHook(() =>
            useFormValidation()
        );

        act(() => {
            result.current.validate(formData, [{ title: ["length", 5] }, { content: ["length", 3] }]);
        });
        expect(Object.keys(result.current.errors).length).toBe(2);
        expect(result.current.errors.hasOwnProperty("title")).toBe(true);
        expect(result.current.errors.hasOwnProperty("content")).toBe(true);
    });

    it('Should not validate if maxLength func does not pass', () => {
        const formData = { title: "My title", content: "My super long content"}
        const { result } = renderHook(() =>
            useFormValidation()
        );

        act(() => {
            result.current.validate(formData, [{ title: ["length", 2] }, { content: ["maxLength", 3] }]);
        });
        expect(Object.keys(result.current.errors).length).toBe(1);
        expect(result.current.errors.hasOwnProperty("content")).toBe(true);
    });

    it('Should not validate if question func does not pass', () => {
        const formData = { title: "My title", content: "My super long content"}
        const { result } = renderHook(() =>
            useFormValidation()
        );

        act(() => {
            result.current.validate(formData, [{ title: ["length", 2] }, { content: ["question", null] }]);
        });
        expect(Object.keys(result.current.errors).length).toBe(1);
        expect(result.current.errors.hasOwnProperty("content")).toBe(true);
    });
});
