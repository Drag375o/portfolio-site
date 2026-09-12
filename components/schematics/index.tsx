import type { ComponentType } from 'react';
import type { SchematicId } from '@/content/types';
import BengaliLora from './BengaliLora';
import FrameScheduling from './FrameScheduling';
import PhishingPipeline from './PhishingPipeline';
import TemperatureResponse from './TemperatureResponse';

/**
 * SchematicId → component. Projects reference a schematic by id in their data,
 * so adding one is: write the SVG, add it to the union in types.ts, register
 * it here. A project with no schematic renders a quiet placeholder rather than
 * an empty panel, and once real screenshots exist they take precedence.
 */
const registry: Partial<Record<SchematicId, ComponentType>> = {
  'phishing-pipeline': PhishingPipeline,
  'bengali-lora': BengaliLora,
  'frame-scheduling': FrameScheduling,
  'temperature-response': TemperatureResponse,
};

export default function Schematic({ id }: { id?: SchematicId }) {
  const Component = id ? registry[id] : undefined;

  if (!Component) {
    return (
      <span className="meta text-center leading-loose">
        schematic pending
        <br />
        or drop a screenshot in
        <br />
        public/projects/
      </span>
    );
  }

  return <Component />;
}
