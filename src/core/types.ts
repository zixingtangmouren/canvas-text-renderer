export interface CreateCancvasTextRendererOptions {
  width: number;
  height: number;
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  textColor: string;
  backgroundColor: string;
  // textAlign: CanvasTextAlign;
  // textBaseline: CanvasTextBaseline;
  padding: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  newlineRegExp?: RegExp;
}
