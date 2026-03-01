"use strict";

describe('@ui-kitten/eva: exports', () => {
    const eva = require('./index');

    describe('synchronous exports (backward compatible)', () => {
        it('should export mapping', () => {
            expect(eva.mapping).toBeDefined();
            expect(typeof eva.mapping).toBe('object');
        });

        it('should export light theme', () => {
            expect(eva.light).toBeDefined();
            expect(typeof eva.light).toBe('object');
        });

        it('should export dark theme', () => {
            expect(eva.dark).toBeDefined();
            expect(typeof eva.dark).toBe('object');
        });

        it('mapping should have components', () => {
            expect(eva.mapping.components).toBeDefined();
            expect(eva.mapping.components.Button).toBeDefined();
        });

        it('light theme should have color tokens', () => {
            expect(eva.light['color-primary-default']).toBeDefined();
        });

        it('dark theme should have color tokens', () => {
            expect(eva.dark['color-primary-default']).toBeDefined();
        });
    });

});
