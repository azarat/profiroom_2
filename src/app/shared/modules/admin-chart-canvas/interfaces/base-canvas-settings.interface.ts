export interface BaseCanvasSettingsInterface {
  xLabel: string;
  yLabel: string;
  labelFont: string;
  dataPointFont: string;
  rendetTypes: any[];
  dataPoints: {
    x: string;
    y: string;
  }[];
}
