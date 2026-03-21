export type ElementType = 'text' | 'image' | 'shape';

export interface BaseElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  zIndex: number;
}

export interface TextElement extends BaseElement {
  type: 'text';
  text: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
  color: string;
  textAlign: 'left' | 'center' | 'right';
  lineHeight: number;
  letterSpacing: number;
  textShadow?: string;
}

export interface ImageElement extends BaseElement {
  type: 'image';
  src: string;
  objectFit: 'cover' | 'contain' | 'fill';
  borderRadius?: number;
}

export interface ShapeElement extends BaseElement {
  type: 'shape';
  shapeType: 'rectangle' | 'circle';
  backgroundColor: string;
  borderRadius?: number;
}

export type CanvasElement = TextElement | ImageElement | ShapeElement;

export interface CanvasBackground {
  type: 'color' | 'gradient' | 'image';
  value: string;
}

export interface CanvasState {
  width: number;
  height: number;
  background: CanvasBackground;
  elements: CanvasElement[];
}

export interface Template {
  id: string;
  name: string;
  category: 'xhs' | 'wechat';
  thumbnail: string;
  state: CanvasState;
}
