import React from 'react';
import { render } from '@testing-library/react-native';
import { EvaIcon, createEvaIcon } from './evaIcon.component';
import { IconData } from './iconData';
import { evaIcons } from './icons/all';
import cornerDownLeft from './icons/corner-down-left';
import home from './icons/home';
import star from './icons/star';

interface HostNode {
  type: string;
  props: Record<string, unknown>;
  children?: HostNode[] | null;
}

const renderIcon = (element: React.ReactElement): HostNode => {
  return render(element).toJSON() as unknown as HostNode;
};

const shapes = (node: HostNode, out: HostNode[] = []): HostNode[] => {
  if (/^RNSVG(Path|Rect|Circle|Ellipse|Line|Polygon|Polyline)$/.test(node.type)) {
    out.push(node);
  }
  for (const child of node.children ?? []) {
    if (typeof child === 'object') {
      shapes(child, out);
    }
  }
  return out;
};

describe('EvaIcon', () => {

  it('renders every shape of the icon inside one Svg', () => {
    const tree = renderIcon(<EvaIcon icon={home} />);

    expect(tree.type).toBe('RNSVGSvgView');
    expect(shapes(tree).map((shape) => shape.type)).toEqual(['RNSVGRect', 'RNSVGPath']);
  });

  it('uses the default viewBox unless the icon provides one', () => {
    const defaultTree = renderIcon(<EvaIcon icon={star} />);
    const customTree = renderIcon(<EvaIcon icon={cornerDownLeft} />);

    expect([defaultTree.props.vbWidth, defaultTree.props.vbHeight]).toEqual([24, 24]);
    expect([customTree.props.vbWidth, customTree.props.vbHeight]).toEqual([24.1, 24.1]);
  });

  it('turns style.tintColor into the root fill and color', () => {
    const tree = renderIcon(<EvaIcon icon={star} style={{ tintColor: '#123456' }} />);

    expect(tree.props.fill).toBe('#123456');
    expect(tree.props.color).toBe('#123456');
  });

  it('reads tintColor from a style array', () => {
    const tree = renderIcon(<EvaIcon icon={star} style={[{ width: 16 }, { tintColor: '#123456' }]} />);

    expect(tree.props.fill).toBe('#123456');
  });

  it('lets an explicit fill win over tintColor', () => {
    const tree = renderIcon(<EvaIcon icon={star} style={{ tintColor: '#123456' }} fill='#ABCDEF' />);

    expect(tree.props.fill).toBe('#ABCDEF');
  });

  it('passes svg props through to the root', () => {
    const tree = renderIcon(<EvaIcon icon={star} width={32} height={32} testID='icon' />);

    expect(tree.props.width).toBe(32);
    expect(tree.props.height).toBe(32);
    expect(tree.props.testID).toBe('icon');
  });

  it('forwards the ref to the Svg', () => {
    const ref = React.createRef<never>();
    render(<EvaIcon ref={ref} icon={star} />);

    expect(ref.current).not.toBeNull();
  });

  it('renders custom icon data with every supported tag', () => {
    const icon: IconData = {
      name: 'custom',
      node: [
        ['path', { d: 'M0 0h1v1z' }],
        ['rect', { x: 1, y: 1, width: 2, height: 2 }],
        ['circle', { cx: 3, cy: 3, r: 1 }],
        ['ellipse', { cx: 3, cy: 3, rx: 1, ry: 2 }],
        ['line', { x1: 0, y1: 0, x2: 1, y2: 1 }],
        ['polygon', { points: '0 0 1 0 1 1' }],
        ['polyline', { points: '0 0 1 0 1 1' }],
      ],
    };

    // react-native-svg renders Polygon and Polyline as paths.
    expect(shapes(renderIcon(<EvaIcon icon={icon} />)).map((shape) => shape.type)).toEqual([
      'RNSVGPath',
      'RNSVGRect',
      'RNSVGCircle',
      'RNSVGEllipse',
      'RNSVGLine',
      'RNSVGPath',
      'RNSVGPath',
    ]);
  });
});

describe('createEvaIcon', () => {

  it('creates a named component rendering the icon', () => {
    const ArrowBackOutline = createEvaIcon(evaIcons['arrow-back-outline']);
    const tree = renderIcon(<ArrowBackOutline fill='#123456' />);

    expect(ArrowBackOutline.displayName).toBe('ArrowBackOutline');
    expect(tree.type).toBe('RNSVGSvgView');
    expect(tree.props.fill).toBe('#123456');
    expect(shapes(tree)).toHaveLength(evaIcons['arrow-back-outline'].node.length);
  });
});

describe('generated icons', () => {

  const entries = Object.entries(evaIcons);

  it('ship the whole Eva set', () => {
    expect(entries).toHaveLength(490);
  });

  it('are keyed by their own name', () => {
    for (const [name, icon] of entries) {
      expect(icon.name).toBe(name);
    }
  });

  it('carry a viewBox only for the four icons drawn on a larger canvas', () => {
    const custom = entries.filter(([, icon]) => icon.viewBox).map(([name, icon]) => [name, icon.viewBox]);

    expect(custom).toEqual([
      ['corner-down-left', '0 0 24.1 24.1'],
      ['corner-down-left-outline', '0 0 24.1 24.1'],
      ['droplet', '0 0 24.2 24.2'],
      ['droplet-outline', '0 0 24.2 24.2'],
    ]);
  });

  it('contain no invisible bounding-box shims', () => {
    for (const [, icon] of entries) {
      expect(icon.node.length).toBeGreaterThan(0);
      for (const [, attributes] of icon.node) {
        expect(attributes.opacity).toBeUndefined();
      }
    }
  });

  it.each(entries.map(([name]) => name))('%s renders', (name) => {
    const tree = renderIcon(<EvaIcon icon={evaIcons[name as keyof typeof evaIcons]} />);

    expect(shapes(tree).length).toBe(evaIcons[name as keyof typeof evaIcons].node.length);
  });
});
