"use strict";

describe('@ui-kitten/material: exports', () => {
    const material = require('./index');

    describe('synchronous exports (backward compatible)', () => {
        it('should export mapping', () => {
            expect(material.mapping).toBeDefined();
            expect(typeof material.mapping).toBe('object');
        });

        it('should export light theme', () => {
            expect(material.light).toBeDefined();
            expect(typeof material.light).toBe('object');
        });

        it('should export dark theme', () => {
            expect(material.dark).toBeDefined();
            expect(typeof material.dark).toBe('object');
        });

        it('mapping should have components', () => {
            expect(material.mapping.components).toBeDefined();
            expect(material.mapping.components.Button).toBeDefined();
        });

        it('light theme should have color tokens', () => {
            expect(material.light['color-primary-default']).toBeDefined();
        });

        it('dark theme should have color tokens', () => {
            expect(material.dark['color-primary-default']).toBeDefined();
        });
    });

});
