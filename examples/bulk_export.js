const fs = require('fs');
const path = require('path');
// require fusionexport
const FusionExport = require('../');
const ExportConfig = require('../src/ExportConfig');
const chartConfig = [
  {
	  type: 'column2d',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Monthly revenue for last year',
		  subCaption: "Harry's SuperMart",
		  xAxisName: 'Month',
		  yAxisName: 'Revenues (In USD)',
		  numberPrefix: '$',
		  theme: 'fint',
      },
      data: [
		  {
          label: 'Jan',
          value: '420000',
		  },
		  {
          label: 'Feb',
          value: '810000',
		  },
		  {
          label: 'Mar',
          value: '720000',
		  },
		  {
          label: 'Apr',
          value: '550000',
		  },
		  {
          label: 'May',
          value: '910000',
		  },
		  {
          label: 'Jun',
          value: '510000',
		  },
		  {
          label: 'Jul',
          value: '680000',
		  },
		  {
          label: 'Aug',
          value: '620000',
		  },
		  {
          label: 'Sep',
          value: '610000',
		  },
		  {
          label: 'Oct',
          value: '490000',
		  },
		  {
          label: 'Nov',
          value: '900000',
		  },
		  {
          label: 'Dec',
          value: '730000',
		  },
      ],
	  },
	  renderAt: 'chart-container0',
  },
  {
	  type: 'bar2d',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Top 5 Stores by Sales',
		  subCaption: 'Last month',
		  yAxisName: 'Sales (In USD)',
		  numberPrefix: '$',
		  paletteColors: '#0075c2',
		  bgColor: '#ffffff',
		  showBorder: '0',
		  showCanvasBorder: '0',
		  usePlotGradientColor: '0',
		  plotBorderAlpha: '10',
		  placeValuesInside: '1',
		  valueFontColor: '#ffffff',
		  showAxisLines: '1',
		  axisLineAlpha: '25',
		  divLineAlpha: '10',
		  alignCaptionWithCanvas: '0',
		  showAlternateVGridColor: '0',
		  captionFontSize: '14',
		  subcaptionFontSize: '14',
		  subcaptionFontBold: '0',
		  toolTipColor: '#ffffff',
		  toolTipBorderThickness: '0',
		  toolTipBgColor: '#000000',
		  toolTipBgAlpha: '80',
		  toolTipBorderRadius: '2',
		  toolTipPadding: '5',
      },
      data: [
		  {
          label: 'Bakersfield Central',
          value: '880000',
		  },
		  {
          label: 'Garden Groove harbour',
          value: '730000',
		  },
		  {
          label: 'Los Angeles Topanga',
          value: '590000',
		  },
		  {
          label: 'Compton-Rancho Dom',
          value: '520000',
		  },
		  {
          label: 'Daly City Serramonte',
          value: '330000',
		  },
      ],
	  },
	  renderAt: 'chart-container1',
  },
  {
	  type: 'line',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Total footfall in Bakersfield Central',
		  subCaption: 'Last week',
		  xAxisName: 'Day',
		  yAxisName: 'No. of Visitors',
		  lineThickness: '2',
		  paletteColors: '#0075c2',
		  baseFontColor: '#333333',
		  baseFont: 'Helvetica Neue,Arial',
		  captionFontSize: '14',
		  subcaptionFontSize: '14',
		  subcaptionFontBold: '0',
		  showBorder: '0',
		  bgColor: '#ffffff',
		  showShadow: '0',
		  canvasBgColor: '#ffffff',
		  canvasBorderAlpha: '0',
		  divlineAlpha: '100',
		  divlineColor: '#999999',
		  divlineThickness: '1',
		  divLineIsDashed: '1',
		  divLineDashLen: '1',
		  divLineGapLen: '1',
		  showXAxisLine: '1',
		  xAxisLineThickness: '1',
		  xAxisLineColor: '#999999',
		  showAlternateHGridColor: '0',
      },
      data: [
		  {
          label: 'Mon',
          value: '15123',
		  },
		  {
          label: 'Tue',
          value: '14233',
		  },
		  {
          label: 'Wed',
          value: '23507',
		  },
		  {
          label: 'Thu',
          value: '9110',
		  },
		  {
          label: 'Fri',
          value: '15529',
		  },
		  {
          label: 'Sat',
          value: '20803',
		  },
		  {
          label: 'Sun',
          value: '19202',
		  },
      ],
      trendlines: [
		  {
          line: [
			  {
              startvalue: '18500',
              color: '#1aaf5d',
              displayvalue: 'Average{br}weekly{br}footfall',
              valueOnRight: '1',
              thickness: '2',
			  },
          ],
		  },
      ],
	  },
	  renderAt: 'chart-container2',
  },
  {
	  type: 'area2d',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Sales of Liquor',
		  subCaption: 'Last week',
		  xAxisName: 'Day',
		  yAxisName: 'Sales (In USD)',
		  numberPrefix: '$',
		  paletteColors: '#0075c2',
		  bgColor: '#ffffff',
		  showBorder: '0',
		  showCanvasBorder: '0',
		  plotBorderAlpha: '10',
		  usePlotGradientColor: '0',
		  plotFillAlpha: '50',
		  showXAxisLine: '1',
		  axisLineAlpha: '25',
		  divLineAlpha: '10',
		  showValues: '1',
		  showAlternateHGridColor: '0',
		  captionFontSize: '14',
		  subcaptionFontSize: '14',
		  subcaptionFontBold: '0',
		  toolTipColor: '#ffffff',
		  toolTipBorderThickness: '0',
		  toolTipBgColor: '#000000',
		  toolTipBgAlpha: '80',
		  toolTipBorderRadius: '2',
		  toolTipPadding: '5',
      },
      data: [
		  {
          label: 'Mon',
          value: '4123',
		  },
		  {
          label: 'Tue',
          value: '4633',
		  },
		  {
          label: 'Wed',
          value: '5507',
		  },
		  {
          label: 'Thu',
          value: '4910',
		  },
		  {
          label: 'Fri',
          value: '5529',
		  },
		  {
          label: 'Sat',
          value: '5803',
		  },
		  {
          label: 'Sun',
          value: '6202',
		  },
      ],
	  },
	  renderAt: 'chart-container3',
  },
  {
	  type: 'area2d',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Sales of Liquor',
		  subCaption: 'Last week',
		  xAxisName: 'Day',
		  yAxisName: 'Sales (In USD)',
		  numberPrefix: '$',
		  paletteColors: '#0075c2',
		  bgColor: '#ffffff',
		  showBorder: '0',
		  showCanvasBorder: '0',
		  plotBorderAlpha: '10',
		  usePlotGradientColor: '0',
		  plotFillAlpha: '50',
		  showXAxisLine: '1',
		  axisLineAlpha: '25',
		  divLineAlpha: '10',
		  showValues: '1',
		  showAlternateHGridColor: '0',
		  captionFontSize: '14',
		  subcaptionFontSize: '14',
		  subcaptionFontBold: '0',
		  toolTipColor: '#ffffff',
		  toolTipBorderThickness: '0',
		  toolTipBgColor: '#000000',
		  toolTipBgAlpha: '80',
		  toolTipBorderRadius: '2',
		  toolTipPadding: '5',
      },
      data: [
		  {
          label: 'Mon',
          value: '4123',
		  },
		  {
          label: 'Tue',
          value: '4633',
		  },
		  {
          label: 'Wed',
          value: '5507',
		  },
		  {
          label: 'Thu',
          value: '4910',
		  },
		  {
          label: 'Fri',
          value: '5529',
		  },
		  {
          label: 'Sat',
          value: '5803',
		  },
		  {
          label: 'Sun',
          value: '6202',
		  },
      ],
	  },
	  renderAt: 'chart-container4',
  },
  {
	  type: 'pie2d',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Split of revenue by product categories',
		  subCaption: 'Last year',
		  numberPrefix: '$',
		  showPercentInTooltip: '0',
		  decimals: '1',
		  useDataPlotColorForLabels: '1',
		  theme: 'fint',
      },
      data: [
		  {
          label: 'Food',
          value: '285040',
		  },
		  {
          label: 'Apparels',
          value: '146330',
		  },
		  {
          label: 'Electronics',
          value: '105070',
		  },
		  {
          label: 'Household',
          value: '49100',
		  },
      ],
	  },
	  renderAt: 'chart-container5',
  },
  {
	  type: 'doughnut2d',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Split of Revenue by Product Categories',
		  subCaption: 'Last year',
		  numberPrefix: '$',
		  showBorder: '0',
		  use3DLighting: '0',
		  enableSmartLabels: '0',
		  startingAngle: '310',
		  showLabels: '0',
		  showPercentValues: '1',
		  showLegend: '1',
		  defaultCenterLabel: 'Total revenue: $64.08K',
		  centerLabel: 'Revenue from $label: $value',
		  centerLabelBold: '1',
		  showTooltip: '0',
		  decimals: '0',
		  useDataPlotColorForLabels: '1',
		  theme: 'fint',
      },
      data: [
		  {
          label: 'Food',
          value: '28504',
		  },
		  {
          label: 'Apparels',
          value: '14633',
		  },
		  {
          label: 'Electronics',
          value: '10507',
		  },
		  {
          label: 'Household',
          value: '4910',
		  },
      ],
	  },
	  renderAt: 'chart-container6',
  },
  {
	  type: 'mscolumn2d',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Comparison of Quarterly Revenue',
		  xAxisname: 'Quarter',
		  yAxisName: 'Revenues (In USD)',
		  numberPrefix: '$',
		  plotFillAlpha: '80',
		  paletteColors: '#0075c2,#1aaf5d',
		  baseFontColor: '#333333',
		  baseFont: 'Helvetica Neue,Arial',
		  captionFontSize: '14',
		  subcaptionFontSize: '14',
		  subcaptionFontBold: '0',
		  showBorder: '0',
		  bgColor: '#ffffff',
		  showShadow: '0',
		  canvasBgColor: '#ffffff',
		  canvasBorderAlpha: '0',
		  divlineAlpha: '100',
		  divlineColor: '#999999',
		  divlineThickness: '1',
		  divLineIsDashed: '1',
		  divLineDashLen: '1',
		  divLineGapLen: '1',
		  usePlotGradientColor: '0',
		  showplotborder: '0',
		  valueFontColor: '#ffffff',
		  placeValuesInside: '1',
		  showHoverEffect: '1',
		  rotateValues: '1',
		  showXAxisLine: '1',
		  xAxisLineThickness: '1',
		  xAxisLineColor: '#999999',
		  showAlternateHGridColor: '0',
		  legendBgAlpha: '0',
		  legendBorderAlpha: '0',
		  legendShadow: '0',
		  legendItemFontSize: '10',
		  legendItemFontColor: '#666666',
      },
      categories: [
		  {
          category: [
			  {
              label: 'Q1',
			  },
			  {
              label: 'Q2',
			  },
			  {
              label: 'Q3',
			  },
			  {
              label: 'Q4',
			  },
          ],
		  },
      ],
      dataset: [
		  {
          seriesname: 'Previous Year',
          data: [
			  {
              value: '10000',
			  },
			  {
              value: '11500',
			  },
			  {
              value: '12500',
			  },
			  {
              value: '15000',
			  },
          ],
		  },
		  {
          seriesname: 'Current Year',
          data: [
			  {
              value: '25400',
			  },
			  {
              value: '29800',
			  },
			  {
              value: '21800',
			  },
			  {
              value: '26800',
			  },
          ],
		  },
      ],
      trendlines: [
		  {
          line: [
			  {
              startvalue: '12250',
              color: '#0075c2',
              displayvalue: 'Previous{br}Average',
              valueOnRight: '1',
              thickness: '1',
              showBelow: '1',
              tooltext: 'Previous year quarterly target  : $13.5K',
			  },
			  {
              startvalue: '25950',
              color: '#1aaf5d',
              displayvalue: 'Current{br}Average',
              valueOnRight: '1',
              thickness: '1',
              showBelow: '1',
              tooltext: 'Current year quarterly target  : $23K',
			  },
          ],
		  },
      ],
	  },
	  renderAt: 'chart-container7',
  },
  {
	  type: 'msline',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Number of visitors last week',
		  subCaption: 'Bakersfield Central vs Los Angeles Topanga',
		  captionFontSize: '14',
		  subcaptionFontSize: '14',
		  subcaptionFontBold: '0',
		  paletteColors: '#0075c2,#1aaf5d',
		  bgcolor: '#ffffff',
		  showBorder: '0',
		  showShadow: '0',
		  showCanvasBorder: '0',
		  usePlotGradientColor: '0',
		  legendBorderAlpha: '0',
		  legendShadow: '0',
		  showAxisLines: '0',
		  showAlternateHGridColor: '0',
		  divlineThickness: '1',
		  divLineIsDashed: '1',
		  divLineDashLen: '1',
		  divLineGapLen: '1',
		  xAxisName: 'Day',
		  showValues: '0',
      },
      categories: [
		  {
          category: [
			  {
              label: 'Mon',
			  },
			  {
              label: 'Tue',
			  },
			  {
              label: 'Wed',
			  },
			  {
              vline: 'true',
              lineposition: '0',
              color: '#6baa01',
              labelHAlign: 'center',
              labelPosition: '0',
              label: 'National holiday',
              dashed: '1',
			  },
			  {
              label: 'Thu',
			  },
			  {
              label: 'Fri',
			  },
			  {
              label: 'Sat',
			  },
			  {
              label: 'Sun',
			  },
          ],
		  },
      ],
      dataset: [
		  {
          seriesname: 'Bakersfield Central',
          data: [
			  {
              value: '15123',
			  },
			  {
              value: '14233',
			  },
			  {
              value: '25507',
			  },
			  {
              value: '9110',
			  },
			  {
              value: '15529',
			  },
			  {
              value: '20803',
			  },
			  {
              value: '19202',
			  },
          ],
		  },
		  {
          seriesname: 'Los Angeles Topanga',
          data: [
			  {
              value: '13400',
			  },
			  {
              value: '12800',
			  },
			  {
              value: '22800',
			  },
			  {
              value: '12400',
			  },
			  {
              value: '15800',
			  },
			  {
              value: '19800',
			  },
			  {
              value: '21800',
			  },
          ],
		  },
      ],
      trendlines: [
		  {
          line: [
			  {
              startvalue: '17022',
              color: '#6baa01',
              valueOnRight: '1',
              displayvalue: 'Average',
			  },
          ],
		  },
      ],
	  },
	  renderAt: 'chart-container8',
  },
  {
	  type: 'mscombi2d',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Actual Revenues, Targeted Revenues & Profits',
		  subCaption: 'Last year',
		  xAxisname: 'Month',
		  yAxisName: 'Amount (In USD)',
		  numberPrefix: '$',
		  theme: 'fint',
      },
      categories: [
		  {
          category: [
			  {
              label: 'Jan',
			  },
			  {
              label: 'Feb',
			  },
			  {
              label: 'Mar',
			  },
			  {
              label: 'Apr',
			  },
			  {
              label: 'May',
			  },
			  {
              label: 'Jun',
			  },
			  {
              label: 'Jul',
			  },
			  {
              label: 'Aug',
			  },
			  {
              label: 'Sep',
			  },
			  {
              label: 'Oct',
			  },
			  {
              label: 'Nov',
			  },
			  {
              label: 'Dec',
			  },
          ],
		  },
      ],
      dataset: [
		  {
          seriesName: 'Actual Revenue',
          data: [
			  {
              value: '16000',
			  },
			  {
              value: '20000',
			  },
			  {
              value: '18000',
			  },
			  {
              value: '19000',
			  },
			  {
              value: '15000',
			  },
			  {
              value: '21000',
			  },
			  {
              value: '16000',
			  },
			  {
              value: '20000',
			  },
			  {
              value: '17000',
			  },
			  {
              value: '25000',
			  },
			  {
              value: '19000',
			  },
			  {
              value: '23000',
			  },
          ],
		  },
		  {
          seriesName: 'Projected Revenue',
          renderAs: 'line',
          showValues: '0',
          data: [
			  {
              value: '15000',
			  },
			  {
              value: '16000',
			  },
			  {
              value: '17000',
			  },
			  {
              value: '18000',
			  },
			  {
              value: '19000',
			  },
			  {
              value: '19000',
			  },
			  {
              value: '19000',
			  },
			  {
              value: '19000',
			  },
			  {
              value: '20000',
			  },
			  {
              value: '21000',
			  },
			  {
              value: '22000',
			  },
			  {
              value: '23000',
			  },
          ],
		  },
		  {
          seriesName: 'Profit',
          renderAs: 'area',
          showValues: '0',
          data: [
			  {
              value: '4000',
			  },
			  {
              value: '5000',
			  },
			  {
              value: '3000',
			  },
			  {
              value: '4000',
			  },
			  {
              value: '1000',
			  },
			  {
              value: '7000',
			  },
			  {
              value: '1000',
			  },
			  {
              value: '4000',
			  },
			  {
              value: '1000',
			  },
			  {
              value: '8000',
			  },
			  {
              value: '2000',
			  },
			  {
              value: '7000',
			  },
          ],
		  },
      ],
	  },
	  renderAt: 'chart-container9',
  },
  {
	  type: 'mscombidy2d',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Revenues and Profits',
		  subCaption: 'For last year',
		  xAxisname: 'Month',
		  pYAxisName: 'Amount (In USD)',
		  sYAxisName: 'Profit %',
		  numberPrefix: '$',
		  sNumberSuffix: '%',
		  sYAxisMaxValue: '50',
		  theme: 'fint',
      },
      categories: [
		  {
          category: [
			  {
              label: 'Jan',
			  },
			  {
              label: 'Feb',
			  },
			  {
              label: 'Mar',
			  },
			  {
              label: 'Apr',
			  },
			  {
              label: 'May',
			  },
			  {
              label: 'Jun',
			  },
			  {
              label: 'Jul',
			  },
			  {
              label: 'Aug',
			  },
			  {
              label: 'Sep',
			  },
			  {
              label: 'Oct',
			  },
			  {
              label: 'Nov',
			  },
			  {
              label: 'Dec',
			  },
          ],
		  },
      ],
      dataset: [
		  {
          seriesName: 'Revenues',
          data: [
			  {
              value: '16000',
			  },
			  {
              value: '20000',
			  },
			  {
              value: '18000',
			  },
			  {
              value: '19000',
			  },
			  {
              value: '15000',
			  },
			  {
              value: '21000',
			  },
			  {
              value: '16000',
			  },
			  {
              value: '20000',
			  },
			  {
              value: '17000',
			  },
			  {
              value: '22000',
			  },
			  {
              value: '19000',
			  },
			  {
              value: '23000',
			  },
          ],
		  },
		  {
          seriesName: 'Profits',
          renderAs: 'area',
          showValues: '0',
          data: [
			  {
              value: '4000',
			  },
			  {
              value: '5000',
			  },
			  {
              value: '3000',
			  },
			  {
              value: '4000',
			  },
			  {
              value: '1000',
			  },
			  {
              value: '7000',
			  },
			  {
              value: '1000',
			  },
			  {
              value: '4000',
			  },
			  {
              value: '1000',
			  },
			  {
              value: '8000',
			  },
			  {
              value: '2000',
			  },
			  {
              value: '7000',
			  },
          ],
		  },
		  {
          seriesName: 'Profit %',
          parentYAxis: 'S',
          renderAs: 'line',
          showValues: '0',
          data: [
			  {
              value: '25',
			  },
			  {
              value: '25',
			  },
			  {
              value: '16.66',
			  },
			  {
              value: '21.05',
			  },
			  {
              value: '6.66',
			  },
			  {
              value: '33.33',
			  },
			  {
              value: '6.25',
			  },
			  {
              value: '25',
			  },
			  {
              value: '5.88',
			  },
			  {
              value: '36.36',
			  },
			  {
              value: '10.52',
			  },
			  {
              value: '30.43',
			  },
          ],
		  },
      ],
	  },
	  renderAt: 'chart-container10',
  },
  {
	  type: 'stackedcolumn2d',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Revenue split by product category',
		  subCaption: 'For current year',
		  xAxisname: 'Quarter',
		  yAxisName: 'Revenues (In USD)',
		  showSum: '1',
		  numberPrefix: '$',
		  theme: 'fint',
      },
      categories: [
		  {
          category: [
			  {
              label: 'Q1',
			  },
			  {
              label: 'Q2',
			  },
			  {
              label: 'Q3',
			  },
			  {
              label: 'Q4',
			  },
          ],
		  },
      ],
      dataset: [
		  {
          seriesname: 'Food Products',
          data: [
			  {
              value: '11000',
			  },
			  {
              value: '15000',
			  },
			  {
              value: '13500',
			  },
			  {
              value: '15000',
			  },
          ],
		  },
		  {
          seriesname: 'Non-Food Products',
          data: [
			  {
              value: '11400',
			  },
			  {
              value: '14800',
			  },
			  {
              value: '8300',
			  },
			  {
              value: '11800',
			  },
          ],
		  },
      ],
	  },
	  renderAt: 'chart-container11',
  },
  {
	  type: 'scrollColumn2d',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Sales Trends',
		  subcaption: 'FY 2012 - FY 2013',
		  xaxisname: 'Month',
		  yaxisname: 'Revenue',
		  showvalues: '1',
		  placeValuesInside: '1',
		  rotateValues: '1',
		  valueFontColor: '#ffffff',
		  numberprefix: '$',
		  baseFontColor: '#333333',
		  baseFont: 'Helvetica Neue,Arial',
		  captionFontSize: '14',
		  subcaptionFontSize: '14',
		  subcaptionFontBold: '0',
		  showborder: '0',
		  paletteColors: '#0075c2',
		  bgcolor: '#FFFFFF',
		  showalternatehgridcolor: '0',
		  showplotborder: '0',
		  labeldisplay: 'WRAP',
		  divlinecolor: '#CCCCCC',
		  showcanvasborder: '0',
		  linethickness: '3',
		  plotfillalpha: '100',
		  plotgradientcolor: '',
		  numVisiblePlot: '12',
		  divlineAlpha: '100',
		  divlineColor: '#999999',
		  divlineThickness: '1',
		  divLineIsDashed: '1',
		  divLineDashLen: '1',
		  divLineGapLen: '1',
		  scrollheight: '10',
		  flatScrollBars: '1',
		  scrollShowButtons: '0',
		  scrollColor: '#cccccc',
		  showHoverEffect: '1',
      },
      categories: [
		  {
          category: [
			  {
              label: 'Jan 2012',
			  },
			  {
              label: 'Feb 2012',
			  },
			  {
              label: 'Mar 2012',
			  },
			  {
              label: 'Apr 2012',
			  },
			  {
              label: 'May 2012',
			  },
			  {
              label: 'Jun 2012',
			  },
			  {
              label: 'Jul 2012',
			  },
			  {
              label: 'Aug 2012',
			  },
			  {
              label: 'Sep 2012',
			  },
			  {
              label: 'Oct 2012',
			  },
			  {
              label: 'Nov 2012',
			  },
			  {
              label: 'Dec 2012',
			  },
			  {
              label: 'Jan 2013',
			  },
			  {
              label: 'Feb 2013',
			  },
			  {
              label: 'Mar 2013',
			  },
			  {
              label: 'Apr 2013',
			  },
			  {
              label: 'May 2013',
			  },
			  {
              label: 'Jun 2013',
			  },
			  {
              label: 'Jul 2013',
			  },
			  {
              label: 'Aug 2013',
			  },
			  {
              label: 'Sep 2013',
			  },
			  {
              label: 'Oct 2013',
			  },
			  {
              label: 'Nov 2013',
			  },
			  {
              label: 'Dec 2013',
			  },
          ],
		  },
      ],
      dataset: [
		  {
          data: [
			  {
              value: '27400',
			  },
			  {
              value: '29800',
			  },
			  {
              value: '25800',
			  },
			  {
              value: '26800',
			  },
			  {
              value: '29600',
			  },
			  {
              value: '32600',
			  },
			  {
              value: '31800',
			  },
			  {
              value: '36700',
			  },
			  {
              value: '29700',
			  },
			  {
              value: '31900',
			  },
			  {
              value: '34800',
			  },
			  {
              value: '24800',
			  },
			  {
              value: '26300',
			  },
			  {
              value: '31800',
			  },
			  {
              value: '30900',
			  },
			  {
              value: '33000',
			  },
			  {
              value: '36200',
			  },
			  {
              value: '32100',
			  },
			  {
              value: '37500',
			  },
			  {
              value: '38500',
			  },
			  {
              value: '35400',
			  },
			  {
              value: '38200',
			  },
			  {
              value: '33300',
			  },
			  {
              value: '38300',
			  },
          ],
		  },
      ],
	  },
	  renderAt: 'chart-container12',
  },
  {
	  type: 'scrollstackedcolumn2d',
	  dataFormat: 'json',
	  width: 1000,
	  height: 500,
	  dataSource: {
      chart: {
		  caption: 'Sales Comparison',
		  subCaption: '(FY 2012 to FY 2013)',
		  captionFontSize: '14',
		  subcaptionFontSize: '14',
		  subcaptionFontBold: '0',
		  xaxisname: 'Month',
		  yaxisname: 'Revenue',
		  showvalues: '0',
		  numberprefix: '$',
		  legendBgAlpha: '0',
		  legendBorderAlpha: '0',
		  legendShadow: '0',
		  showborder: '0',
		  bgcolor: '#ffffff',
		  showalternatehgridcolor: '0',
		  showplotborder: '0',
		  showcanvasborder: '0',
		  legendshadow: '0',
		  plotgradientcolor: '',
		  showCanvasBorder: '0',
		  showAxisLines: '0',
		  showAlternateHGridColor: '0',
		  divlineAlpha: '100',
		  divlineThickness: '1',
		  divLineIsDashed: '1',
		  divLineDashLen: '1',
		  divLineGapLen: '1',
		  lineThickness: '3',
		  flatScrollBars: '1',
		  scrollheight: '10',
		  numVisiblePlot: '12',
		  showHoverEffect: '1',
      },
      categories: [
		  {
          category: [
			  {
              label: 'Jan 2012',
			  },
			  {
              label: 'Feb 2012',
			  },
			  {
              label: 'Mar 2012',
			  },
			  {
              label: 'Apr 2012',
			  },
			  {
              label: 'May 2012',
			  },
			  {
              label: 'Jun 2012',
			  },
			  {
              label: 'Jul 2012',
			  },
			  {
              label: 'Aug 2012',
			  },
			  {
              label: 'Sep 2012',
			  },
			  {
              label: 'Oct 2012',
			  },
			  {
              label: 'Nov 2012',
			  },
			  {
              label: 'Dec 2012',
			  },
			  {
              label: 'Jan 2013',
			  },
			  {
              label: 'Feb 2013',
			  },
			  {
              label: 'Mar 2013',
			  },
			  {
              label: 'Apr 2013',
			  },
			  {
              label: 'May 2013',
			  },
			  {
              label: 'Jun 2013',
			  },
			  {
              label: 'Jul 2013',
			  },
			  {
              label: 'Aug 2013',
			  },
			  {
              label: 'Sep 2013',
			  },
			  {
              label: 'Oct 2013',
			  },
			  {
              label: 'Nov 2013',
			  },
			  {
              label: 'Dec 2013',
			  },
          ],
		  },
      ],
      dataset: [
		  {
          seriesname: 'Products',
          color: '008ee4',
          data: [
			  {
              value: '27400',
			  },
			  {
              value: '29800',
			  },
			  {
              value: '25800',
			  },
			  {
              value: '26800',
			  },
			  {
              value: '29600',
			  },
			  {
              value: '32600',
			  },
			  {
              value: '31800',
			  },
			  {
              value: '36700',
			  },
			  {
              value: '29700',
			  },
			  {
              value: '31900',
			  },
			  {
              value: '34800',
			  },
			  {
              value: '24800',
			  },
			  {
              value: '25400',
			  },
			  {
              value: '27800',
			  },
			  {
              value: '23800',
			  },
			  {
              value: '23800',
			  },
			  {
              value: '21600',
			  },
			  {
              value: '30600',
			  },
			  {
              value: '24800',
			  },
			  {
              value: '30700',
			  },
			  {
              value: '27400',
			  },
			  {
              value: '28200',
			  },
			  {
              value: '31500',
			  },
			  {
              value: '24300',
			  },
          ],
		  },
		  {
          seriesname: 'Services',
          color: 'f8bd19',
          data: [
			  {
              value: '10000',
			  },
			  {
              value: '11500',
			  },
			  {
              value: '12500',
			  },
			  {
              value: '15000',
			  },
			  {
              value: '11000',
			  },
			  {
              value: '9800',
			  },
			  {
              value: '11800',
			  },
			  {
              value: '19700',
			  },
			  {
              value: '21700',
			  },
			  {
              value: '21900',
			  },
			  {
              value: '22900',
			  },
			  {
              value: '20800',
			  },
			  {
              value: '12000',
			  },
			  {
              value: '10300',
			  },
			  {
              value: '11200',
			  },
			  {
              value: '13000',
			  },
			  {
              value: '15000',
			  },
			  {
              value: '11800',
			  },
			  {
              value: '9800',
			  },
			  {
              value: '14600',
			  },
			  {
              value: '19200',
			  },
			  {
              value: '20100',
			  },
			  {
              value: '21200',
			  },
			  {
              value: '19500',
			  },
          ],
		  },
      ],
	  },
	  renderAt: 'chart-container13',
  },
  {
	  type: 'scrollcombidy2d',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Revenues and Profits',
		  subCaption: '(FY 2012 to FY 2013)',
		  captionFontSize: '14',
		  subcaptionFontSize: '14',
		  subcaptionFontBold: '0',
		  xAxisname: 'Month',
		  pYAxisName: 'Amount (In USD)',
		  sYAxisName: 'Profit %',
		  numberPrefix: '$',
		  sNumberSuffix: '%',
		  sYAxisMaxValue: '50',
		  paletteColors: '#0075c2,#1aaf5d,#f2c500',
		  showAlternateHGridColor: '0',
		  showPlotBorder: '0',
		  usePlotGradientColor: '0',
		  baseFontColor: '#333333',
		  baseFont: 'Helvetica Neue,Arial',
		  showBorder: '0',
		  bgColor: '#ffffff',
		  showShadow: '0',
		  canvasBgColor: '#ffffff',
		  showCanvasBorder: '0',
		  legendBorderAlpha: '0',
		  legendShadow: '0',
		  showValues: '1',
		  divlineAlpha: '100',
		  divlineColor: '#999999',
		  divlineThickness: '1',
		  divLineIsDashed: '1',
		  divLineDashLen: '1',
		  divLineGapLen: '1',
		  numVisiblePlot: '12',
		  flatScrollBars: '1',
		  scrollheight: '10',
      },
      categories: [
		  {
          category: [
			  {
              label: 'Jan 2012',
			  },
			  {
              label: 'Feb 2012',
			  },
			  {
              label: 'Mar 2012',
			  },
			  {
              label: 'Apr 2012',
			  },
			  {
              label: 'May 2012',
			  },
			  {
              label: 'Jun 2012',
			  },
			  {
              label: 'Jul 2012',
			  },
			  {
              label: 'Aug 2012',
			  },
			  {
              label: 'Sep 2012',
			  },
			  {
              label: 'Oct 2012',
			  },
			  {
              label: 'Nov 2012',
			  },
			  {
              label: 'Dec 2012',
			  },
			  {
              label: 'Jan 2013',
			  },
			  {
              label: 'Feb 2013',
			  },
			  {
              label: 'Mar 2013',
			  },
			  {
              label: 'Apr 2013',
			  },
			  {
              label: 'May 2013',
			  },
			  {
              label: 'Jun 2013',
			  },
			  {
              label: 'Jul 2013',
			  },
			  {
              label: 'Aug 2013',
			  },
			  {
              label: 'Sep 2013',
			  },
			  {
              label: 'Oct 2013',
			  },
			  {
              label: 'Nov 2013',
			  },
			  {
              label: 'Dec 2013',
			  },
          ],
		  },
      ],
      dataset: [
		  {
          seriesName: 'Revenues',
          data: [
			  {
              value: '16000',
			  },
			  {
              value: '20000',
			  },
			  {
              value: '18000',
			  },
			  {
              value: '19000',
			  },
			  {
              value: '15000',
			  },
			  {
              value: '21000',
			  },
			  {
              value: '16000',
			  },
			  {
              value: '20000',
			  },
			  {
              value: '17000',
			  },
			  {
              value: '22000',
			  },
			  {
              value: '19000',
			  },
			  {
              value: '23000',
			  },
			  {
              value: '24000',
			  },
			  {
              value: '25000',
			  },
			  {
              value: '26000',
			  },
			  {
              value: '24000',
			  },
			  {
              value: '19000',
			  },
			  {
              value: '22000',
			  },
			  {
              value: '18000',
			  },
			  {
              value: '19000',
			  },
			  {
              value: '22000',
			  },
			  {
              value: '21000',
			  },
			  {
              value: '23000',
			  },
			  {
              value: '24000',
			  },
          ],
		  },
		  {
          seriesName: 'Profits',
          renderAs: 'area',
          showValues: '0',
          data: [
			  {
              value: '4000',
			  },
			  {
              value: '5000',
			  },
			  {
              value: '3000',
			  },
			  {
              value: '4000',
			  },
			  {
              value: '1000',
			  },
			  {
              value: '7000',
			  },
			  {
              value: '1000',
			  },
			  {
              value: '4000',
			  },
			  {
              value: '1000',
			  },
			  {
              value: '8000',
			  },
			  {
              value: '2000',
			  },
			  {
              value: '7000',
			  },
			  {
              value: '6000',
			  },
			  {
              value: '7000',
			  },
			  {
              value: '4000',
			  },
			  {
              value: '5000',
			  },
			  {
              value: '3000',
			  },
			  {
              value: '9000',
			  },
			  {
              value: '2000',
			  },
			  {
              value: '6000',
			  },
			  {
              value: '2000',
			  },
			  {
              value: '7000',
			  },
			  {
              value: '4000',
			  },
			  {
              value: '6000',
			  },
          ],
		  },
		  {
          seriesName: 'Profit %',
          parentYAxis: 'S',
          renderAs: 'line',
          showValues: '0',
          data: [
			  {
              value: '25',
			  },
			  {
              value: '25',
			  },
			  {
              value: '16.66',
			  },
			  {
              value: '21.05',
			  },
			  {
              value: '6.66',
			  },
			  {
              value: '33.33',
			  },
			  {
              value: '6.25',
			  },
			  {
              value: '25',
			  },
			  {
              value: '5.88',
			  },
			  {
              value: '36.36',
			  },
			  {
              value: '10.52',
			  },
			  {
              value: '30.43',
			  },
			  {
              value: '25',
			  },
			  {
              value: '28',
			  },
			  {
              value: '15.38',
			  },
			  {
              value: '20.83',
			  },
			  {
              value: '15.79',
			  },
			  {
              value: '40.91',
			  },
			  {
              value: '11.11',
			  },
			  {
              value: '31.58',
			  },
			  {
              value: '9.09',
			  },
			  {
              value: '33.33',
			  },
			  {
              value: '17.39',
			  },
			  {
              value: '25',
			  },
          ],
		  },
      ],
	  },
	  renderAt: 'chart-container14',
  },
  {
	  type: 'scatter',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Sales of Beer & Ice-cream vs Temperature',
		  subCaption: 'Los Angeles Topanga',
		  xAxisName: 'Average Day Temperature',
		  yAxisName: 'Sales (In USD)',
		  xAxisMinValue: '23',
		  xAxisMaxValue: '95',
		  yNumberPrefix: '$',
		  xNumberSuffix: '&deg; F',
		  showYAxisLine: '1',
		  theme: 'fint',
      },
      categories: [
		  {
          verticalLineDashed: '1',
          verticalLineDashLen: '1',
          verticalLineDashGap: '1',
          verticalLineThickness: '1',
          verticalLineColor: '#000000',
          category: [
			  {
              x: '23',
              label: '23° F',
              showverticalline: '0',
			  },
			  {
              x: '32',
              label: '32° F',
              showverticalline: '1',
			  },
			  {
              x: '50',
              label: '50° F',
              showverticalline: '1',
			  },
			  {
              x: '68',
              label: '68° F',
              showverticalline: '1',
			  },
			  {
              x: '80',
              label: '80° F',
              showverticalline: '1',
			  },
			  {
              x: '95',
              label: '95° F',
              showverticalline: '1',
			  },
          ],
		  },
      ],
      dataset: [
		  {
          seriesname: 'Ice Cream',
          showregressionline: '1',
          data: [
			  {
              x: '23',
              y: '1560',
			  },
			  {
              x: '24',
              y: '1500',
			  },
			  {
              x: '24',
              y: '1680',
			  },
			  {
              x: '25',
              y: '1780',
			  },
			  {
              x: '25',
              y: '1620',
			  },
			  {
              x: '26',
              y: '1810',
			  },
			  {
              x: '27',
              y: '2310',
			  },
			  {
              x: '29',
              y: '2620',
			  },
			  {
              x: '31',
              y: '2500',
			  },
			  {
              x: '32',
              y: '2410',
			  },
			  {
              x: '35',
              y: '2880',
			  },
			  {
              x: '36',
              y: '3910',
			  },
			  {
              x: '34',
              y: '3960',
			  },
			  {
              x: '38',
              y: '4080',
			  },
			  {
              x: '40',
              y: '4190',
			  },
			  {
              x: '41',
              y: '4170',
			  },
			  {
              x: '42',
              y: '4280',
			  },
			  {
              x: '54',
              y: '5180',
			  },
			  {
              x: '53',
              y: '5770',
			  },
			  {
              x: '55',
              y: '5900',
			  },
			  {
              x: '56',
              y: '5940',
			  },
			  {
              x: '58',
              y: '6090',
			  },
			  {
              x: '61',
              y: '6086',
			  },
			  {
              x: '67',
              y: '6100',
			  },
			  {
              x: '68',
              y: '6200',
			  },
			  {
              x: '70',
              y: '6360',
			  },
			  {
              x: '75',
              y: '6450',
			  },
			  {
              x: '79',
              y: '6650',
			  },
			  {
              x: '80',
              y: '6710',
			  },
			  {
              x: '79',
              y: '6975',
			  },
			  {
              x: '82',
              y: '7000',
			  },
			  {
              x: '85',
              y: '7150',
			  },
			  {
              x: '86',
              y: '7160',
			  },
			  {
              x: '86',
              y: '7200',
			  },
			  {
              x: '88',
              y: '7230',
			  },
			  {
              x: '87',
              y: '7210',
			  },
			  {
              x: '86',
              y: '7480',
			  },
			  {
              x: '89',
              y: '7540',
			  },
			  {
              x: '89',
              y: '7400',
			  },
			  {
              x: '90',
              y: '7500',
			  },
			  {
              x: '92',
              y: '7640',
			  },
          ],
		  },
		  {
          seriesname: 'Beer',
          showregressionline: '1',
          data: [
			  {
              x: '23',
              y: '3160',
			  },
			  {
              x: '24',
              y: '3000',
			  },
			  {
              x: '24',
              y: '3080',
			  },
			  {
              x: '25',
              y: '3680',
			  },
			  {
              x: '25',
              y: '3320',
			  },
			  {
              x: '26',
              y: '3810',
			  },
			  {
              x: '27',
              y: '5310',
			  },
			  {
              x: '29',
              y: '3620',
			  },
			  {
              x: '31',
              y: '4100',
			  },
			  {
              x: '32',
              y: '3910',
			  },
			  {
              x: '35',
              y: '4280',
			  },
			  {
              x: '36',
              y: '4210',
			  },
			  {
              x: '34',
              y: '4160',
			  },
			  {
              x: '38',
              y: '4480',
			  },
			  {
              x: '40',
              y: '4890',
			  },
			  {
              x: '41',
              y: '4770',
			  },
			  {
              x: '42',
              y: '4880',
			  },
			  {
              x: '54',
              y: '4980',
			  },
			  {
              x: '53',
              y: '4770',
			  },
			  {
              x: '55',
              y: '4900',
			  },
			  {
              x: '56',
              y: '4940',
			  },
			  {
              x: '58',
              y: '4990',
			  },
			  {
              x: '61',
              y: '5086',
			  },
			  {
              x: '67',
              y: '5100',
			  },
			  {
              x: '68',
              y: '4700',
			  },
			  {
              x: '70',
              y: '5360',
			  },
			  {
              x: '75',
              y: '5150',
			  },
			  {
              x: '79',
              y: '5450',
			  },
			  {
              x: '80',
              y: '5010',
			  },
			  {
              x: '79',
              y: '4975',
			  },
			  {
              x: '82',
              y: '5400',
			  },
			  {
              x: '85',
              y: '5150',
			  },
			  {
              x: '86',
              y: '5460',
			  },
			  {
              x: '86',
              y: '5000',
			  },
			  {
              x: '88',
              y: '5200',
			  },
			  {
              x: '87',
              y: '5410',
			  },
			  {
              x: '86',
              y: '5480',
			  },
			  {
              x: '89',
              y: '5440',
			  },
			  {
              x: '89',
              y: '5300',
			  },
			  {
              x: '90',
              y: '5500',
			  },
			  {
              x: '92',
              y: '5240',
			  },
          ],
		  },
      ],
      vtrendlines: [
		  {
          line: [
			  {
              startvalue: '23',
              endvalue: '32',
              istrendzone: '1',
              displayvalue: ' ',
              color: '#adebff',
              alpha: '25',
			  },
			  {
              startvalue: '23',
              endvalue: '32',
              istrendzone: '1',
              alpha: '0',
              displayvalue: 'Very cold',
			  },
			  {
              startvalue: '32',
              endvalue: '50',
              istrendzone: '1',
              displayvalue: ' ',
              color: '#adebff',
              alpha: '15',
			  },
			  {
              startvalue: '32',
              endvalue: '50',
              istrendzone: '1',
              alpha: '0',
              displayvalue: 'Cold',
			  },
			  {
              startvalue: '50',
              endvalue: '68',
              istrendzone: '1',
              alpha: '0',
              displayvalue: 'Moderate',
			  },
			  {
              startvalue: '68',
              endvalue: '80',
              istrendzone: '1',
              alpha: '0',
              displayvalue: 'Hot',
			  },
			  {
              startvalue: '68',
              endvalue: '80',
              istrendzone: '1',
              displayvalue: ' ',
              color: '#f2a485',
              alpha: '15',
			  },
			  {
              startvalue: '80',
              endvalue: '95',
              istrendzone: '1',
              alpha: '0',
              displayvalue: 'Very hot',
			  },
			  {
              startvalue: '80',
              endvalue: '95',
              istrendzone: '1',
              displayvalue: ' ',
              color: '#f2a485',
              alpha: '25',
			  },
          ],
		  },
      ],
	  },
	  renderAt: 'chart-container15',
  },
  {
	  type: 'bubble',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Sales Analysis of Shoe Brands',
		  subcaption: 'Last Quarter',
		  xAxisMinValue: '0',
		  xAxisMaxValue: '100',
		  yAxisMinValue: '0',
		  yAxisMaxValue: '30000',
		  plotFillAlpha: '70',
		  plotFillHoverColor: '#6baa01',
		  showPlotBorder: '0',
		  xAxisName: 'Average Price',
		  yAxisName: 'Units Sold',
		  numDivlines: '2',
		  showValues: '1',
		  showTrendlineLabels: '0',
		  plotTooltext: '$name : Profit Contribution - $zvalue%',
		  drawQuadrant: '1',
		  quadrantLineAlpha: '80',
		  quadrantLineThickness: '3',
		  quadrantXVal: '50',
		  quadrantYVal: '15000',
		  quadrantLabelTL: 'Low Price / High Sale',
		  quadrantLabelTR: 'High Price / High Sale',
		  quadrantLabelBL: 'Low Price / Low Sale',
		  quadrantLabelBR: 'High Price / Low Sale',
		  theme: 'fint',
      },
      categories: [
		  {
          category: [
			  {
              label: '$0',
              x: '0',
			  },
			  {
              label: '$20',
              x: '20',
              showverticalline: '1',
			  },
			  {
              label: '$40',
              x: '40',
              showverticalline: '1',
			  },
			  {
              label: '$60',
              x: '60',
              showverticalline: '1',
			  },
			  {
              label: '$80',
              x: '80',
              showverticalline: '1',
			  },
			  {
              label: '$100',
              x: '100',
              showverticalline: '1',
			  },
          ],
		  },
      ],
      dataset: [
		  {
          color: '#00aee4',
          data: [
			  {
              x: '80',
              y: '15000',
              z: '24',
              name: 'Nike',
			  },
			  {
              x: '60',
              y: '18500',
              z: '26',
              name: 'Adidas',
			  },
			  {
              x: '50',
              y: '19450',
              z: '19',
              name: 'Puma',
			  },
			  {
              x: '65',
              y: '10500',
              z: '8',
              name: 'Fila',
			  },
			  {
              x: '43',
              y: '8750',
              z: '5',
              name: 'Lotto',
			  },
			  {
              x: '32',
              y: '22000',
              z: '10',
              name: 'Reebok',
			  },
			  {
              x: '44',
              y: '13000',
              z: '9',
              name: 'Woodland',
			  },
          ],
		  },
      ],
      trendlines: [
		  {
          line: [
			  {
              startValue: '20000',
              endValue: '30000',
              isTrendZone: '1',
              color: '#aaaaaa',
              alpha: '14',
			  },
			  {
              startValue: '10000',
              endValue: '20000',
              isTrendZone: '1',
              color: '#aaaaaa',
              alpha: '7',
			  },
          ],
		  },
      ],
      vTrendlines: [
		  {
          line: [
			  {
              startValue: '44',
              isTrendZone: '0',
              color: '#0066cc',
              thickness: '1',
              dashed: '1',
              displayValue: 'Gross Avg.',
			  },
          ],
		  },
      ],
	  },
	  renderAt: 'chart-container16',
  },
  {
	  type: 'pareto2d',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Employee late arrivals by reported cause',
		  subCaption: 'Last month',
		  xAxisName: 'Reported Cause',
		  pYAxisName: 'No. of Occurrence',
		  sYAxisname: 'Cumulative Percentage',
		  showHoverEffect: '1',
		  theme: 'fint',
      },
      data: [
		  {
          label: 'Traffic',
          value: '5680',
		  },
		  {
          label: 'Family Engagement',
          value: '1036',
		  },
		  {
          label: 'Public Transport',
          value: '950',
		  },
		  {
          label: 'Weather',
          value: '500',
		  },
		  {
          label: 'Emergency',
          value: '140',
		  },
		  {
          label: 'Others',
          value: '68',
		  },
      ],
	  },
	  renderAt: 'chart-container17',
  },
  {
	  type: 'pareto3d',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Employee late arrivals by reported cause',
		  subCaption: 'Last month',
		  xAxisName: 'Reported Cause',
		  pYAxisName: 'No. of Occurrence',
		  sYAxisname: 'Cumulative Percentage',
		  showHoverEffect: '1',
		  theme: 'fint',
      },
      data: [
		  {
          label: 'Traffic',
          value: '5680',
		  },
		  {
          label: 'Family Engagement',
          value: '1036',
		  },
		  {
          label: 'Public Transport',
          value: '950',
		  },
		  {
          label: 'Weather',
          value: '500',
		  },
		  {
          label: 'Emergency',
          value: '140',
		  },
		  {
          label: 'Others',
          value: '68',
		  },
      ],
	  },
	  renderAt: 'chart-container18',
  },
  {
	  type: 'marimekko',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Top 3 Electronic Brands in Top 3 Stores',
		  subcaption: 'Last month',
		  aligncaptiontocanvas: '0',
		  yaxisname: 'Statewise Sales (in %)',
		  xaxisname: 'Brand',
		  numberprefix: '$',
		  showPlotBorder: '1',
		  plotBorderThickness: '0.25',
		  theme: 'fint',
      },
      categories: [
		  {
          category: [
			  {
              label: 'Bose',
			  },
			  {
              label: 'Dell',
			  },
			  {
              label: 'Apple',
			  },
          ],
		  },
      ],
      dataset: [
		  {
          seriesname: 'California',
          data: [
			  {
              value: '335000',
			  },
			  {
              value: '225100',
			  },
			  {
              value: '164200',
			  },
          ],
		  },
		  {
          seriesname: 'Washington',
          data: [
			  {
              value: '215000',
			  },
			  {
              value: '198000',
			  },
			  {
              value: '120000',
			  },
          ],
		  },
		  {
          seriesname: 'Nevada',
          data: [
			  {
              value: '298000',
			  },
			  {
              value: '109300',
			  },
			  {
              value: '153600',
			  },
          ],
		  },
      ],
	  },
	  renderAt: 'chart-container19',
  },
  {
	  type: 'zoomline',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Unique Website Visitors',
		  subcaption: 'Last year',
		  yaxisname: 'Unique Visitors',
		  xaxisname: 'Date',
		  yaxisminValue: '800',
		  yaxismaxValue: '1400',
		  pixelsPerPoint: '0',
		  pixelsPerLabel: '30',
		  lineThickness: '1',
		  compactdatamode: '1',
		  dataseparator: '|',
		  labelHeight: '30',
		  theme: 'fint',
      },
      categories: [
		  {
          category: 'Jan 01|Jan 02|Jan 03|Jan 04|Jan 05|Jan 06|Jan 07|Jan 08|Jan 09|Jan 10|Jan 11|Jan 12|Jan 13|Jan 14|Jan 15|Jan 16|Jan 17|Jan 18|Jan 19|Jan 20|Jan 21|Jan 22|Jan 23|Jan 24|Jan 25|Jan 26|Jan 27|Jan 28|Jan 29|Jan 30|Jan 31|Feb 01|Feb 02|Feb 03|Feb 04|Feb 05|Feb 06|Feb 07|Feb 08|Feb 09|Feb 10|Feb 11|Feb 12|Feb 13|Feb 14|Feb 15|Feb 16|Feb 17|Feb 18|Feb 19|Feb 20|Feb 21|Feb 22|Feb 23|Feb 24|Feb 25|Feb 26|Feb 27|Feb 28|Mar 01|Mar 02|Mar 03|Mar 04|Mar 05|Mar 06|Mar 07|Mar 08|Mar 09|Mar 10|Mar 11|Mar 12|Mar 13|Mar 14|Mar 15|Mar 16|Mar 17|Mar 18|Mar 19|Mar 20|Mar 21|Mar 22|Mar 23|Mar 24|Mar 25|Mar 26|Mar 27|Mar 28|Mar 29|Mar 30|Mar 31|Apr 01|Apr 02|Apr 03|Apr 04|Apr 05|Apr 06|Apr 07|Apr 08|Apr 09|Apr 10|Apr 11|Apr 12|Apr 13|Apr 14|Apr 15|Apr 16|Apr 17|Apr 18|Apr 19|Apr 20|Apr 21|Apr 22|Apr 23|Apr 24|Apr 25|Apr 26|Apr 27|Apr 28|Apr 29|Apr 30|May 01|May 02|May 03|May 04|May 05|May 06|May 07|May 08|May 09|May 10|May 11|May 12|May 13|May 14|May 15|May 16|May 17|May 18|May 19|May 20|May 21|May 22|May 23|May 24|May 25|May 26|May 27|May 28|May 29|May 30|May 31|Jun 01|Jun 02|Jun 03|Jun 04|Jun 05|Jun 06|Jun 07|Jun 08|Jun 09|Jun 10|Jun 11|Jun 12|Jun 13|Jun 14|Jun 15|Jun 16|Jun 17|Jun 18|Jun 19|Jun 20|Jun 21|Jun 22|Jun 23|Jun 24|Jun 25|Jun 26|Jun 27|Jun 28|Jun 29|Jun 30|Jul 01|Jul 02|Jul 03|Jul 04|Jul 05|Jul 06|Jul 07|Jul 08|Jul 09|Jul 10|Jul 11|Jul 12|Jul 13|Jul 14|Jul 15|Jul 16|Jul 17|Jul 18|Jul 19|Jul 20|Jul 21|Jul 22|Jul 23|Jul 24|Jul 25|Jul 26|Jul 27|Jul 28|Jul 29|Jul 30|Jul 31|Aug 01|Aug 02|Aug 03|Aug 04|Aug 05|Aug 06|Aug 07|Aug 08|Aug 09|Aug 10|Aug 11|Aug 12|Aug 13|Aug 14|Aug 15|Aug 16|Aug 17|Aug 18|Aug 19|Aug 20|Aug 21|Aug 22|Aug 23|Aug 24|Aug 25|Aug 26|Aug 27|Aug 28|Aug 29|Aug 30|Aug 31|Sep 01|Sep 02|Sep 03|Sep 04|Sep 05|Sep 06|Sep 07|Sep 08|Sep 09|Sep 10|Sep 11|Sep 12|Sep 13|Sep 14|Sep 15|Sep 16|Sep 17|Sep 18|Sep 19|Sep 20|Sep 21|Sep 22|Sep 23|Sep 24|Sep 25|Sep 26|Sep 27|Sep 28|Sep 29|Sep 30|Oct 01|Oct 02|Oct 03|Oct 04|Oct 05|Oct 06|Oct 07|Oct 08|Oct 09|Oct 10|Oct 11|Oct 12|Oct 13|Oct 14|Oct 15|Oct 16|Oct 17|Oct 18|Oct 19|Oct 20|Oct 21|Oct 22|Oct 23|Oct 24|Oct 25|Oct 26|Oct 27|Oct 28|Oct 29|Oct 30|Oct 31|Nov 01|Nov 02|Nov 03|Nov 04|Nov 05|Nov 06|Nov 07|Nov 08|Nov 09|Nov 10|Nov 11|Nov 12|Nov 13|Nov 14|Nov 15|Nov 16|Nov 17|Nov 18|Nov 19|Nov 20|Nov 21|Nov 22|Nov 23|Nov 24|Nov 25|Nov 26|Nov 27|Nov 28|Nov 29|Nov 30|Dec 01|Dec 02|Dec 03|Dec 04|Dec 05|Dec 06|Dec 07|Dec 08|Dec 09|Dec 10|Dec 11|Dec 12|Dec 13|Dec 14|Dec 15|Dec 16|Dec 17|Dec 18|Dec 19|Dec 20|Dec 21|Dec 22|Dec 23|Dec 24|Dec 25|Dec 26|Dec 27|Dec 28|Dec 29|Dec 30|Dec 31',
		  },
      ],
      dataset: [
		  {
          seriesname: 'harrysfoodmart.com',
          data: '978|976|955|981|992|964|973|949|985|962|977|955|988|959|985|965|991|985|966|989|960|944|976|980|940|941|945|952|973|946|951|983|942|964|937|942|963|971|969|967|934|935|956|974|930|936|935|973|979|990|994|992|994|984|991|986|963|985|1006|965|958|976|993|974|995|989|966|965|1011|995|1007|978|985|1012|997|985|1004|987|986|981|991|982|992|983|1018|994|976|989|1022|989|1002|983|1015|1006|1005|1003|1017|1014|995|1007|1001|1019|1012|1005|1027|1011|1013|1035|1010|1011|1011|1036|1041|1005|1005|997|1012|1032|1025|1020|998|1018|1000|1009|1005|1004|1042|1047|1021|1032|1019|1038|1050|1037|1019|1018|1035|1055|1028|1049|1013|1028|1023|1054|1041|1051|1069|1051|1072|1049|1054|1035|1072|1042|1048|1083|1054|1048|1065|1046|1055|1056|1085|1046|1048|1048|1068|1089|1074|1078|1046|1052|1082|1052|1067|1058|1051|1052|1082|1060|1076|1077|1059|1070|1082|1093|1100|1089|1079|1075|1087|1089|1088|1106|1107|1067|1076|1101|1094|1078|1097|1094|1083|1066|1079|1111|1100|1085|1091|1095|1081|1091|1077|1095|1107|1083|1116|1118|1101|1111|1096|1077|1086|1117|1087|1105|1107|1094|1112|1101|1084|1094|1125|1099|1108|1084|1099|1120|1122|1092|1120|1121|1094|1114|1099|1129|1095|1125|1127|1121|1129|1110|1097|1136|1110|1098|1131|1125|1144|1104|1117|1105|1105|1145|1102|1143|1115|1147|1149|1129|1108|1109|1130|1153|1121|1127|1133|1120|1155|1120|1147|1118|1117|1145|1152|1145|1130|1157|1135|1115|1156|1163|1131|1123|1137|1151|1160|1152|1166|1144|1137|1124|1151|1129|1133|1143|1139|1171|1135|1132|1174|1170|1163|1175|1152|1142|1160|1148|1173|1158|1160|1151|1142|1168|1153|1143|1157|1142|1172|1186|1176|1185|1175|1178|1184|1166|1148|1166|1186|1187|1180|1179|1161|1174|1155|1172|1173|1179|1149|1170|1175|1162|1151|1152|1163|1155|1197|1174|1199|1180|1160|1174|1159|1168|1160',
		  },
		  {
          seriesname: 'harrysfashion.com',
          data: '1053|1057|1084|1082|1098|1055|1068|1067|1074|1056|1067|1078|1079|1084|1041|1052|1066|1080|1049|1051|1049|1044|1083|1053|1038|1077|1046|1067|1053|1033|1047|1055|1031|1074|1031|1041|1071|1057|1035|1070|1050|1069|1054|1049|1022|1044|1049|1058|1064|1088|1093|1103|1085|1072|1104|1106|1078|1061|1078|1105|1105|1062|1076|1074|1114|1069|1091|1086|1094|1072|1079|1088|1082|1075|1110|1120|1108|1102|1090|1088|1092|1102|1110|1111|1085|1113|1110|1116|1095|1105|1105|1122|1133|1132|1093|1097|1120|1105|1135|1106|1108|1135|1098|1136|1122|1113|1113|1145|1103|1127|1104|1126|1147|1120|1119|1120|1132|1107|1149|1147|1149|1141|1145|1152|1117|1144|1157|1134|1157|1120|1125|1153|1141|1132|1158|1134|1166|1167|1170|1163|1139|1171|1145|1156|1158|1154|1196|1196|1169|1174|1174|1195|1161|1201|1208|1188|1182|1188|1162|1174|1174|1211|1189|1211|1172|1211|1179|1199|1216|1184|1209|1181|1186|1174|1185|1220|1206|1190|1206|1201|1190|1209|1208|1189|1195|1188|1193|1206|1214|1205|1215|1200|1194|1210|1205|1236|1226|1208|1228|1235|1197|1197|1198|1224|1220|1210|1226|1244|1228|1241|1237|1201|1208|1238|1213|1222|1213|1249|1222|1221|1230|1223|1214|1251|1234|1220|1240|1213|1252|1224|1222|1234|1262|1255|1225|1226|1242|1240|1250|1265|1235|1228|1261|1221|1230|1235|1260|1273|1253|1268|1258|1233|1258|1248|1230|1270|1246|1242|1246|1253|1253|1257|1253|1266|1248|1247|1257|1245|1281|1271|1272|1248|1292|1251|1253|1257|1259|1288|1252|1297|1290|1268|1291|1258|1263|1254|1302|1279|1272|1271|1281|1261|1263|1289|1294|1272|1296|1264|1282|1268|1296|1280|1281|1277|1277|1292|1266|1310|1288|1312|1308|1300|1289|1273|1282|1300|1322|1301|1314|1296|1305|1305|1327|1323|1295|1314|1298|1312|1330|1293|1309|1286|1309|1332|1300|1295|1325|1322|1305|1323|1300|1308|1299|1324|1338|1313|1329|1331|1299|1329|1344|1335|1342|1307|1314|1326|1331|1328|1328|1311|1352|1328|1309|1311|1312',
		  },
      ],
	  },
	  renderAt: 'chart-container20',
  },
  {
	  type: 'zoomlinedy',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: "Harry's Supermart - Sales Analysis",
		  subcaption: 'Previous calendar year',
		  pYAxisName: 'Unique footfall',
		  sYAxisName: 'Sales',
		  compactDataMode: '1',
		  pixelsPerPoint: '0',
		  lineThickness: '1',
		  dataSeparator: '|',
		  snumberPrefix: '$',
		  pYAxisMaxValue: '1500',
		  pYAxisMinValue: '900',
		  sYAxisMaxValue: '23000',
		  sYAxisMinValue: '15000',
		  theme: 'fint',
      },
      categories: [
		  {
          category: 'Jan 01|Jan 02|Jan 03|Jan 04|Jan 05|Jan 06|Jan 07|Jan 08|Jan 09|Jan 10|Jan 11|Jan 12|Jan 13|Jan 14|Jan 15|Jan 16|Jan 17|Jan 18|Jan 19|Jan 20|Jan 21|Jan 22|Jan 23|Jan 24|Jan 25|Jan 26|Jan 27|Jan 28|Jan 29|Jan 30|Jan 31|Feb 01|Feb 02|Feb 03|Feb 04|Feb 05|Feb 06|Feb 07|Feb 08|Feb 09|Feb 10|Feb 11|Feb 12|Feb 13|Feb 14|Feb 15|Feb 16|Feb 17|Feb 18|Feb 19|Feb 20|Feb 21|Feb 22|Feb 23|Feb 24|Feb 25|Feb 26|Feb 27|Feb 28|Mar 01|Mar 02|Mar 03|Mar 04|Mar 05|Mar 06|Mar 07|Mar 08|Mar 09|Mar 10|Mar 11|Mar 12|Mar 13|Mar 14|Mar 15|Mar 16|Mar 17|Mar 18|Mar 19|Mar 20|Mar 21|Mar 22|Mar 23|Mar 24|Mar 25|Mar 26|Mar 27|Mar 28|Mar 29|Mar 30|Mar 31|Apr 01|Apr 02|Apr 03|Apr 04|Apr 05|Apr 06|Apr 07|Apr 08|Apr 09|Apr 10|Apr 11|Apr 12|Apr 13|Apr 14|Apr 15|Apr 16|Apr 17|Apr 18|Apr 19|Apr 20|Apr 21|Apr 22|Apr 23|Apr 24|Apr 25|Apr 26|Apr 27|Apr 28|Apr 29|Apr 30|May 01|May 02|May 03|May 04|May 05|May 06|May 07|May 08|May 09|May 10|May 11|May 12|May 13|May 14|May 15|May 16|May 17|May 18|May 19|May 20|May 21|May 22|May 23|May 24|May 25|May 26|May 27|May 28|May 29|May 30|May 31|Jun 01|Jun 02|Jun 03|Jun 04|Jun 05|Jun 06|Jun 07|Jun 08|Jun 09|Jun 10|Jun 11|Jun 12|Jun 13|Jun 14|Jun 15|Jun 16|Jun 17|Jun 18|Jun 19|Jun 20|Jun 21|Jun 22|Jun 23|Jun 24|Jun 25|Jun 26|Jun 27|Jun 28|Jun 29|Jun 30|Jul 01|Jul 02|Jul 03|Jul 04|Jul 05|Jul 06|Jul 07|Jul 08|Jul 09|Jul 10|Jul 11|Jul 12|Jul 13|Jul 14|Jul 15|Jul 16|Jul 17|Jul 18|Jul 19|Jul 20|Jul 21|Jul 22|Jul 23|Jul 24|Jul 25|Jul 26|Jul 27|Jul 28|Jul 29|Jul 30|Jul 31|Aug 01|Aug 02|Aug 03|Aug 04|Aug 05|Aug 06|Aug 07|Aug 08|Aug 09|Aug 10|Aug 11|Aug 12|Aug 13|Aug 14|Aug 15|Aug 16|Aug 17|Aug 18|Aug 19|Aug 20|Aug 21|Aug 22|Aug 23|Aug 24|Aug 25|Aug 26|Aug 27|Aug 28|Aug 29|Aug 30|Aug 31|Sep 01|Sep 02|Sep 03|Sep 04|Sep 05|Sep 06|Sep 07|Sep 08|Sep 09|Sep 10|Sep 11|Sep 12|Sep 13|Sep 14|Sep 15|Sep 16|Sep 17|Sep 18|Sep 19|Sep 20|Sep 21|Sep 22|Sep 23|Sep 24|Sep 25|Sep 26|Sep 27|Sep 28|Sep 29|Sep 30|Oct 01|Oct 02|Oct 03|Oct 04|Oct 05|Oct 06|Oct 07|Oct 08|Oct 09|Oct 10|Oct 11|Oct 12|Oct 13|Oct 14|Oct 15|Oct 16|Oct 17|Oct 18|Oct 19|Oct 20|Oct 21|Oct 22|Oct 23|Oct 24|Oct 25|Oct 26|Oct 27|Oct 28|Oct 29|Oct 30|Oct 31|Nov 01|Nov 02|Nov 03|Nov 04|Nov 05|Nov 06|Nov 07|Nov 08|Nov 09|Nov 10|Nov 11|Nov 12|Nov 13|Nov 14|Nov 15|Nov 16|Nov 17|Nov 18|Nov 19|Nov 20|Nov 21|Nov 22|Nov 23|Nov 24|Nov 25|Nov 26|Nov 27|Nov 28|Nov 29|Nov 30|Dec 01|Dec 02|Dec 03|Dec 04|Dec 05|Dec 06|Dec 07|Dec 08|Dec 09|Dec 10|Dec 11|Dec 12|Dec 13|Dec 14|Dec 15|Dec 16|Dec 17|Dec 18|Dec 19|Dec 20|Dec 21|Dec 22|Dec 23|Dec 24|Dec 25|Dec 26|Dec 27|Dec 28|Dec 29|Dec 30|Dec 31',
		  },
      ],
      dataset: [
		  {
          seriesname: 'Unique Footfall',
          color: '0075c2',
          data: '1140|1160|1167|1145|1140|1132|1127|1137|1172|1181|1142|1134|1117|1147|1141|1149|1150|1113|1119|1110|1092|1102|1128|1131|1083|1081|1087|1088|1092|1109|1112|1065|1063|1057|1045|1043|1078|1083|1043|1039|1036|1031|1048|1056|1074|1045|1037|1034|1039|1031|1045|1048|1031|1019|1026|1017|1011|1022|1027|1022|1017|1019|1010|1015|1023|1029|1020|1009|1012|1008|1015|1027|1033|1008|1007|1009|1010|1013|1017|1024|1012|1009|1007|1009|1011|1015|1020|1004|1009|1011|1028|1037|1049|1057|1045|1047|1056|1068|1077|1089|1100|1090|1086|1094|1098|1101|1125|1131|1111|1102|1109|1099|1094|1112|1121|1102|1094|1087|1089|1097|1139|1148|1131|1127|1129|1122|1137|1158|1174|1145|1143|1137|1139|1147|1156|1162|1134|1127|1130|1123|1117|1137|1138|1117|1109|1107|1100|1107|1120|1122|1120|1112|1100|1094|1090|1100|1102|1052|1054|1044|1047|1063|1077|1080|1050|1047|1030|1022|1021|1022|1025|1015|1009|1010|1007|1002|1010|1020|1000|994|990|987|990|1001|999|982|977|967|966|974|990|987|974|977|969|962|967|972|977|961|957|959|960|958|967|970|959|954|962|961|957|980|987|977|976|979|982|983|1000|1009|994|999|1002|1009|1015|1024|1029|1020|1011|1009|1015|1010|1025|1031|1019|1018|1022|1014|1018|1022|1025|1010|1022|1017|1019|1010|1015|1023|1029|1020|1009|1012|1008|1015|1027|1033|1008|1007|1009|1010|1013|1017|1024|1012|1009|1007|1009|1011|1015|1020|1004|1009|1045|1043|1078|1083|1043|1039|1036|1031|1048|1056|1074|1045|1037|1034|1039|1031|1045|1048|1031|1019|1026|1017|1011|1022|1027|1022|1020|1023|1024|1025|1040|1057|1035|1033|1037|1047|1049|1068|1074|1052|1059|1064|1060|1064|1080|1089|1080|1081|1079|1086|1084|1090|1099|1090|1091|1088|1084|1082|1089|1100|1094|1127|1129|1122|1137|1158|1174|1145|1143|1137|1139|1147|1156|1162|1134|1127|1130|1123|1117|1137|1138|1117|1109|1107|1100|1107|1137|1140|1120|1127|1130|1131',
		  },
		  {
          seriesname: 'Sales',
          color: '1aaf5d',
          parentYAxis: 'S',
          data: '21270|21290|21220|21370|21580|21740|21450|21430|21370|21390|21470|21560|21620|21340|21270|21300|21230|21170|21370|21380|22170|21090|21070|21000|21070|21370|21400|21200|21270|21300|21310|21400|21600|21670|21450|21400|21320|21270|21370|21720|21810|21420|21340|21170|21470|21410|21490|21500|21130|21190|21100|20920|21020|21280|21310|20830|20810|20870|20880|20450|20430|20780|20830|20430|20390|20360|20310|20480|20560|20740|20450|20370|20340|20390|20310|20450|20480|20310|20190|20260|20170|20110|20220|20270|20220|20200|20230|20240|20250|20400|20720|20670|20690|20600|20650|20730|20790|20700|20590|20620|20580|20650|20770|20830|20580|20570|20590|20600|20630|20670|20740|20620|20590|20570|20590|20610|20650|20700|20540|20590|21150|20530|21070|20950|20930|20980|21330|20930|20890|20860|20810|20790|21060|21240|20950|20870|20840|20890|20810|20950|20980|20810|20690|20760|20670|20610|20720|20770|20700|20720|20800|20400|20370|20400|20510|20490|20320|20270|20170|20160|20240|19900|19870|19740|19770|19690|19620|19670|19720|19770|19610|19570|19590|19600|19580|19670|19700|19590|19540|19620|19610|19570|19800|19870|19770|19760|19790|19820|19830|20000|20090|19940|19990|20020|20090|20150|20240|20290|20200|20110|20090|20150|20100|20250|20310|20190|20180|20220|20140|20180|20220|20250|20100|21120|21000|20940|20900|21000|21020|20520|20540|20440|20470|20630|20770|20800|20500|20470|20300|20220|20210|20220|20250|20150|20090|20100|20070|20020|20100|20200|20000|19940|20220|20170|20190|20100|20150|20230|20290|20200|20090|20120|20080|20150|20270|20330|20080|20070|20090|20100|20130|20170|20240|20120|20090|20070|20090|20110|20150|20200|20040|20090|20110|20280|20370|20490|20570|20450|20470|20560|20680|20770|20890|21000|20900|20860|20940|20980|21010|21250|21310|21110|21020|21090|20990|20940|21120|21210|21020|20940|20870|20890|20970|20570|20350|20330|20370|20470|20490|20680|20740|20520|20590|20640|20600|20640|20800|20890|20800|20810|20790|20860|20840|20900|20990|20900|20910|20880|20840|20820|20890|21000|20940|21390|21480|21310|21270|21290|21220|21370|21580|21740|21450|21430|21370|21390|21470|21560|21620|21340|21270|21300|21230|21170|21370|21380|21170|21090|21070|21000|21070|21200|21220|21200',
		  },
      ],
	  },
	  renderAt: 'chart-container21',
  },
  {
	  type: 'heatmap',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Top Smartphone Ratings',
		  subcaption: 'By Features',
		  xAxisName: 'Features',
		  yAxisName: 'Model',
		  showplotborder: '1',
		  xAxisLabelsOnTop: '1',
		  plottooltext: "<div id='nameDiv' style='font-size: 12px; border-bottom: 1px dashed #666666; font-weight:bold; padding-bottom: 3px; margin-bottom: 5px; display: inline-block; color: #888888;' >$rowLabel :</div>{br}Rating : <b>$dataValue</b>{br}$columnLabel : <b>$tlLabel</b>{br}<b>$trLabel</b>",
		  baseFontColor: '#333333',
		  baseFont: 'Helvetica Neue,Arial',
		  toolTipBorderRadius: '2',
		  toolTipPadding: '5',
		  theme: 'fint',
      },
      dataset: [
		  {
          data: [
			  {
              rowid: 'Samsung Galaxy S5',
              columnid: 'Processor',
              value: '8.7',
              tllabel: 'Quad Core 2.5 GHz',
              trlabel: 'OS : Android 4.4 Kitkat',
			  },
			  {
              rowid: 'Samsung Galaxy S5',
              columnid: 'Screen Size',
              value: '8.5',
              tllabel: '5.1 inch',
              trlabel: 'AMOLED screen',
			  },
			  {
              rowid: 'Samsung Galaxy S5',
              columnid: 'Price',
              value: '9.3',
              tllabel: '$600',
			  },
			  {
              rowid: 'Samsung Galaxy S5',
              columnid: 'Battery Backup',
              value: '9.7',
              tllabel: '29 Hrs',
              trlabel: 'Battery : 2800 MAH',
			  },
			  {
              rowid: 'Samsung Galaxy S5',
              columnid: 'Camera',
              value: '8',
              tllabel: '16 MP',
              trlabel: 'Front Camera : 2.1 MP',
			  },
			  {
              rowid: 'HTC One (M8)',
              columnid: 'Processor',
              value: '9.2',
              tllabel: 'Quad Core 2.3 GHz',
              trlabel: 'OS : Android 4.4 Kitkat',
			  },
			  {
              rowid: 'HTC One (M8)',
              columnid: 'Screen Size',
              value: '8.3',
              tllabel: '5 inch',
              trlabel: 'LCD screen',
			  },
			  {
              rowid: 'HTC One (M8)',
              columnid: 'Price',
              value: '7.3',
              tllabel: '$600',
			  },
			  {
              rowid: 'HTC One (M8)',
              columnid: 'Battery Backup',
              value: '8.8',
              tllabel: '20 Hrs',
              trlabel: 'Battery : 2600 MAH',
			  },
			  {
              rowid: 'HTC One (M8)',
              columnid: 'Camera',
              value: '8.7',
              tllabel: '4 MP',
              trlabel: 'Front Camera : 5 MP',
			  },
			  {
              rowid: 'Apple iPhone 5S',
              columnid: 'Processor',
              value: '9.1',
              tllabel: 'Dual Core',
              trlabel: 'OS : iOS 7',
			  },
			  {
              rowid: 'Apple iPhone 5S',
              columnid: 'Screen Size',
              value: '8.6',
              tllabel: '4 inch',
              trlabel: 'Retina LCD screen',
			  },
			  {
              rowid: 'Apple iPhone 5S',
              columnid: 'Price',
              value: '7.2',
              tllabel: '$649',
			  },
			  {
              rowid: 'Apple iPhone 5S',
              columnid: 'Battery Backup',
              value: '8.4',
              tllabel: '10 Hrs',
              trlabel: 'Battery : 1560 MAH',
			  },
			  {
              rowid: 'Apple iPhone 5S',
              columnid: 'Camera',
              value: '9.5',
              tllabel: '8 MP',
              trlabel: 'Front Camera : 1.2 MP',
			  },
			  {
              rowid: 'Nokia Lumia 1520',
              columnid: 'Processor',
              value: '8.8',
              tllabel: 'Quad Core 2.2 GHz',
              trlabel: 'OS: Windows Phone 8',
			  },
			  {
              rowid: 'Nokia Lumia 1520',
              columnid: 'Screen Size',
              value: '9.1',
              tllabel: '6 inch',
              trlabel: 'LCD screen',
			  },
			  {
              rowid: 'Nokia Lumia 1520',
              columnid: 'Price',
              value: '9.7',
              tllabel: '$470',
			  },
			  {
              rowid: 'Nokia Lumia 1520',
              columnid: 'Battery Backup',
              value: '9.2',
              tllabel: '27 Hrs',
              trlabel: 'Battery : 3400 MAH',
			  },
			  {
              rowid: 'Nokia Lumia 1520',
              columnid: 'Camera',
              value: '8.1',
              tllabel: '20MP',
              trlabel: 'Front Camera : 1.2 MP',
			  },
          ],
		  },
      ],
      colorrange: {
		  gradient: '0',
		  minvalue: '0',
		  code: 'E24B1A',
		  startlabel: 'Poor',
		  endlabel: 'Good',
		  color: [
          {
			  code: 'E24B1A',
			  minvalue: '1',
			  maxvalue: '5',
			  label: 'Bad',
          },
          {
			  code: 'F6BC33',
			  minvalue: '5',
			  maxvalue: '8.5',
			  label: 'Average',
          },
          {
			  code: '6DA81E',
			  minvalue: '8.5',
			  maxvalue: '10',
			  label: 'Good',
          },
		  ],
      },
	  },
	  renderAt: 'chart-container22',
  },
  {
	  type: 'dragnode',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'US Subway Map',
		  xaxisminvalue: '0',
		  xaxismaxvalue: '100',
		  yaxisminvalue: '0',
		  yaxismaxvalue: '100',
		  is3d: '0',
		  showformbtn: '1',
		  formaction: 'resources/php/chart-guide-drag-node-chart-introduction-update.php',
		  formtarget: '_blank',
		  formmethod: 'POST',
		  formbtntitle: 'Save',
		  viewmode: '0',
		  showplotborder: '1',
		  plotborderthickness: '4',
		  theme: 'fint',
		  showcanvasborder: '1',
		  canvasborderalpha: '20',
		  animation: '0',
      },
      dataset: [
		  {
          data: [
			  {
              id: '01',
              label: 'Santa Monica',
              color: '#ffffff',
              x: '16',
              y: '54',
              radius: '30',
              shape: 'circle',
			  },
			  {
              id: '02',
              label: 'Los Angeles',
              color: '#ffffff',
              x: '27',
              y: '54',
              radius: '30',
              shape: 'circle',
			  },
			  {
              id: '03',
              label: 'Ontario',
              color: '#ffffff',
              x: '48',
              y: '54',
              radius: '30',
              shape: 'circle',
			  },
			  {
              id: '04',
              label: 'Phoenix',
              color: '#ffffff',
              x: '85',
              y: '54',
              radius: '30',
              shape: 'circle',
			  },
			  {
              id: '05',
              label: 'Flagstaff',
              color: '#ffffff',
              x: '85',
              y: '80',
              radius: '30',
              shape: 'circle',
			  },
			  {
              id: '06',
              label: 'Barstow',
              color: '#ffffff',
              x: '62',
              y: '80',
              radius: '30',
              shape: 'circle',
			  },
			  {
              id: '07',
              label: 'San Diego',
              color: '#ffffff',
              x: '35',
              y: '30',
              radius: '30',
              shape: 'circle',
			  },
			  {
              id: '08',
              label: 'San Ysidro',
              color: '#ffffff',
              x: '40',
              y: '12',
              radius: '30',
              shape: 'circle',
			  },
			  {
              id: '09',
              label: 'Las Vegas',
              color: '#ffffff',
              x: '68',
              y: '93',
              radius: '30',
              shape: 'circle',
			  },
			  {
              id: '10',
              label: '',
              color: '#ffffff',
              x: '12',
              y: '98',
              radius: '0',
              shape: 'circle',
			  },
			  {
              id: '11',
              label: '',
              color: '#ffffff',
              x: '100',
              y: '80',
              radius: '0',
              shape: 'circle',
			  },
			  {
              id: '12',
              label: '',
              color: '#ffffff',
              x: '99',
              y: '40',
              radius: '0',
              shape: 'circle',
			  },
			  {
              id: '13',
              label: 'Yuma',
              color: '#ffffff',
              x: '70',
              y: '30',
              radius: '30',
              shape: 'circle',
			  },
			  {
              id: '14',
              label: '',
              color: '#ffffff',
              x: '100',
              y: '30',
              radius: '0',
              shape: 'circle',
			  },
          ],
		  },
      ],
      connectors: [
		  {
          color: '#ffffff',
          stdthickness: '10',
          connector: [
			  {
              strength: '2',
              from: '01',
              to: '02',
              color: '#fec110',
              arrowatstart: '0',
              arrowatend: '0',
			  },
			  {
              strength: '2',
              from: '02',
              to: '03',
              color: '#fec110',
              arrowatstart: '0',
              arrowatend: '0',
			  },
			  {
              strength: '2',
              from: '03',
              to: '04',
              color: '#fec110',
              arrowatstart: '0',
              arrowatend: '0',
			  },
			  {
              strength: '2',
              from: '04',
              to: '12',
              color: '#fec110',
              arrowatstart: '0',
              arrowatend: '0',
			  },
			  {
              strength: '2',
              from: '04',
              to: '05',
              color: '#a6aaad',
              arrowatstart: '0',
              arrowatend: '0',
			  },
			  {
              strength: '2',
              from: '09',
              to: '06',
              color: '#0178bc',
              arrowatstart: '0',
              arrowatend: '0',
			  },
			  {
              strength: '2',
              from: '06',
              to: '03',
              color: '#0178bc',
              arrowatstart: '0',
              arrowatend: '0',
			  },
			  {
              strength: '2',
              from: '03',
              to: '07',
              color: '#0178bc',
              arrowatstart: '0',
              arrowatend: '0',
			  },
			  {
              strength: '2',
              from: '05',
              to: '06',
              color: '#f1277d',
              arrowatstart: '0',
              arrowatend: '0',
			  },
			  {
              strength: '2',
              from: '06',
              to: '11',
              color: '#f1277d',
              arrowatstart: '0',
              arrowatend: '0',
			  },
			  {
              strength: '2',
              from: '02',
              to: '07',
              color: '#c1c733',
              arrowatstart: '0',
              arrowatend: '0',
			  },
			  {
              strength: '2',
              from: '07',
              to: '08',
              color: '#c1c733',
              arrowatstart: '0',
              arrowatend: '0',
			  },
			  {
              strength: '2',
              from: '02',
              to: '10',
              color: '#c1c733',
              arrowatstart: '0',
              arrowatend: '0',
			  },
			  {
              strength: '2',
              from: '07',
              to: '13',
              color: '#6d6e70',
              arrowatstart: '0',
              arrowatend: '0',
			  },
			  {
              strength: '2',
              from: '13',
              to: '14',
              color: '#6d6e70',
              arrowatstart: '0',
              arrowatend: '0',
			  },
          ],
		  },
      ],
	  },
	  renderAt: 'chart-container23',
  },
  {
	  type: 'radar',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Store rating across parameters',
		  subCaption: 'Based on customer feedback survey',
		  numberPreffix: '$',
		  theme: 'fint',
		  radarfillcolor: '#ffffff',
      },
      categories: [
		  {
          category: [
			  {
              label: 'Ambience',
			  },
			  {
              label: 'Product Assortment',
			  },
			  {
              label: 'Price Competitiveness',
			  },
			  {
              label: 'Service',
			  },
			  {
              label: 'Recommend to others',
			  },
          ],
		  },
      ],
      dataset: [
		  {
          seriesname: 'User Ratings',
          data: [
			  {
              value: '3.5',
			  },
			  {
              value: '4.8',
			  },
			  {
              value: '3.1',
			  },
			  {
              value: '4.0',
			  },
			  {
              value: '3.6',
			  },
          ],
		  },
      ],
	  },
	  renderAt: 'chart-container24',
  },
  {
	  type: 'multiaxisline',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Revenue Analysis',
		  subcaption: 'Last 12 weeks',
		  xAxisName: 'Week of Year',
		  showValues: '0',
		  theme: 'fint',
      },
      categories: [
		  {
          category: [
			  {
              label: '1',
			  },
			  {
              label: '2',
			  },
			  {
              label: '3',
			  },
			  {
              label: '4',
			  },
			  {
              label: '5',
			  },
			  {
              label: '6',
			  },
			  {
              label: '7',
			  },
			  {
              label: '8',
			  },
			  {
              label: '9',
			  },
			  {
              label: '10',
			  },
			  {
              label: '11',
			  },
			  {
              label: '12',
			  },
          ],
		  },
      ],
      axis: [
		  {
          title: 'Revenue',
          tickWidth: '10',
          numberPrefix: '$',
          divlineDashed: '1',
          dataset: [
			  {
              seriesname: 'Revenue',
              lineThickness: '3',
              data: [
				  {
                  value: '137500',
				  },
				  {
                  value: '124350',
				  },
				  {
                  value: '156700',
				  },
				  {
                  value: '131450',
				  },
				  {
                  value: '208300',
				  },
				  {
                  value: '219900',
				  },
				  {
                  value: '227500',
				  },
				  {
                  value: '254300',
				  },
				  {
                  value: '155900',
				  },
				  {
                  value: '105650',
				  },
				  {
                  value: '120950',
				  },
				  {
                  value: '127500',
				  },
              ],
			  },
          ],
		  },
		  {
          title: 'Orders',
          axisOnLeft: '0',
          numDivlines: '8',
          tickWidth: '10',
          divlineDashed: '1',
          dataset: [
			  {
              seriesname: 'Orders',
              data: [
				  {
                  value: '22567',
				  },
				  {
                  value: '21348',
				  },
				  {
                  value: '24846',
				  },
				  {
                  value: '19237',
				  },
				  {
                  value: '20672',
				  },
				  {
                  value: '23403',
				  },
				  {
                  value: '30278',
				  },
				  {
                  value: '26719',
				  },
				  {
                  value: '21940',
				  },
				  {
                  value: '24396',
				  },
				  {
                  value: '22340',
				  },
				  {
                  value: '25439',
				  },
              ],
			  },
          ],
		  },
		  {
          title: 'Footfalls',
          axisOnLeft: '0',
          numDivlines: '5',
          tickWidth: '10',
          numberSuffix: '',
          divlineDashed: '1',
          dataset: [
			  {
              seriesname: 'Footfalls',
              data: [
				  {
                  value: '68473',
				  },
				  {
                  value: '57934',
				  },
				  {
                  value: '78925',
				  },
				  {
                  value: '69213',
				  },
				  {
                  value: '74892',
				  },
				  {
                  value: '81123',
				  },
				  {
                  value: '90086',
				  },
				  {
                  value: '91174',
				  },
				  {
                  value: '68934',
				  },
				  {
                  value: '80934',
				  },
				  {
                  value: '73634',
				  },
				  {
                  value: '84453',
				  },
              ],
			  },
          ],
		  },
      ],
	  },
	  renderAt: 'chart-container25',
  },
  {
	  type: 'multilevelpie',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Sales Breakup - Top Product Categories',
		  subcaption: 'Last Quarter',
		  showPlotBorder: '1',
		  piefillalpha: '60',
		  pieborderthickness: '2',
		  hoverfillcolor: '#CCCCCC',
		  piebordercolor: '#FFFFFF',
		  numberprefix: '$',
		  plottooltext: '$label, $$valueK, $percentValue',
		  theme: 'fint',
      },
      category: [
		  {
          label: 'Products',
          color: '#ffffff',
          value: '150',
          category: [
			  {
              label: 'Food & {br}Beverages',
              color: '#f8bd19',
              value: '55.5',
              tooltext: 'Food & Beverages, $$valueK, $percentValue',
              category: [
				  {
                  label: 'Breads',
                  color: '#f8bd19',
                  value: '11.1',
				  },
				  {
                  label: 'Juice',
                  color: '#f8bd19',
                  value: '27.75',
				  },
				  {
                  label: 'Noodles',
                  color: '#f8bd19',
                  value: '9.99',
				  },
				  {
                  label: 'Seafood',
                  color: '#f8bd19',
                  value: '6.66',
				  },
              ],
			  },
			  {
              label: 'Apparel &{br}Accessories',
              color: '#33ccff',
              value: '42',
              tooltext: 'Apparel & Accessories, $$valueK, $percentValue',
              category: [
				  {
                  label: 'Sun Glasses',
                  color: '#33ccff',
                  value: '10.08',
				  },
				  {
                  label: 'Clothing',
                  color: '#33ccff',
                  value: '18.9',
				  },
				  {
                  label: 'Handbags',
                  color: '#33ccff',
                  value: '6.3',
				  },
				  {
                  label: 'Shoes',
                  color: '#33ccff',
                  value: '6.72',
				  },
              ],
			  },
			  {
              label: 'Baby {br}Products',
              color: '#ffcccc',
              value: '22.5',
              tooltext: 'Baby Products, $$valueK, $percentValue',
              category: [
				  {
                  label: 'Bath &{br}Grooming',
                  color: '#ffcccc',
                  value: '9.45',
                  tooltext: 'Bath & Grooming, $$valueK, $percentValue',
				  },
				  {
                  label: 'Food',
                  color: '#ffcccc',
                  value: '6.3',
				  },
				  {
                  label: 'Diapers',
                  color: '#ffcccc',
                  value: '6.75',
				  },
              ],
			  },
			  {
              label: 'Electronics',
              color: '#ccff66',
              value: '30',
              category: [
				  {
                  label: 'Laptops',
                  color: '#ccff66',
                  value: '8.1',
				  },
				  {
                  label: 'Televisions',
                  color: '#ccff66',
                  value: '10.5',
				  },
				  {
                  label: 'SmartPhones',
                  color: '#ccff66',
                  value: '11.4',
				  },
              ],
			  },
          ],
		  },
      ],
	  },
	  renderAt: 'chart-container26',
  },
  {
	  type: 'candlestick',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Daily Stock Price HRYS',
		  subCaption: 'Last 2 months',
		  numberPrefix: '$',
		  vNumberPrefix: ' ',
		  pYAxisName: 'Price',
		  vYAxisName: 'Volume (In Millions)',
		  bgColor: '#ffffff',
		  showBorder: '0',
		  canvasBgColor: '#ffffff',
		  showCanvasBorder: '0',
		  showAlternateHGridColor: '0',
		  baseFontColor: '#333333',
		  baseFont: 'Helvetica Neue,Arial',
		  captionFontSize: '14',
		  subcaptionFontSize: '14',
		  subcaptionFontBold: '0',
		  toolTipColor: '#ffffff',
		  toolTipBorderThickness: '0',
		  toolTipBgColor: '#000000',
		  toolTipBgAlpha: '80',
		  toolTipBorderRadius: '2',
		  toolTipPadding: '5',
		  divlineAlpha: '100',
		  divlineColor: '#999999',
		  divlineThickness: '1',
		  divLineDashed: '1',
		  divLineDashLen: '1',
		  divLineGapLen: '1',
      },
      categories: [
		  {
          category: [
			  {
              label: '2 month ago',
              x: '1',
			  },
			  {
              label: '1 month ago',
              x: '31',
			  },
			  {
              label: 'Today',
              x: '60',
			  },
          ],
		  },
      ],
      dataset: [
		  {
          data: [
			  {
              open: '18.74',
              high: '19.16',
              low: '18.67 ',
              close: '18.99',
              x: '1',
              volume: '4991285',
			  },
			  {
              open: '18.74',
              high: '19.06',
              low: '18.54',
              close: '18.82',
              x: '2',
              volume: '3615889',
			  },
			  {
              open: '19.21',
              high: '19.3',
              low: '18.59 ',
              close: '18.65',
              x: '3',
              volume: '4749586',
			  },
			  {
              open: '19.85',
              high: '19.86',
              low: '19.12',
              close: '19.4',
              x: '4',
              volume: '4366740',
			  },
			  {
              open: '20.19',
              high: '20.21',
              low: '19.57',
              close: '19.92',
              x: '5',
              volume: '3982709',
			  },
			  {
              open: '20.47',
              high: '20.64',
              low: '20.15',
              close: '20.16',
              x: '6',
              volume: '2289403',
			  },
			  {
              open: '20.36',
              high: '20.52',
              low: '20.29',
              close: '20.48',
              x: '7',
              volume: '1950919',
			  },
			  {
              open: '20.21',
              high: '20.25',
              low: '19.91',
              close: '20.15',
              x: '8',
              volume: '2391070',
			  },
			  {
              open: '19.46',
              high: '20.54',
              low: '19.46',
              close: '20.22',
              x: '9',
              volume: '4548422',
			  },
			  {
              open: '19.24',
              high: '19.5',
              low: '19.13',
              close: '19.44',
              x: '10',
              volume: '1889811',
			  },
			  {
              open: '19.25',
              high: '19.41',
              low: '18.99',
              close: '19.22',
              x: '11',
              volume: '2543355',
			  },
			  {
              open: '18.85',
              high: '19.45',
              low: '18.8',
              close: '19.24',
              x: '12',
              volume: '2134393',
			  },
			  {
              open: '18.97',
              high: '19.01',
              low: '18.68',
              close: '18.95',
              x: '13',
              volume: '1740852',
			  },
			  {
              open: '18.69',
              high: '19',
              low: '18.35',
              close: '18.97',
              x: '14',
              volume: '2701392',
			  },
			  {
              open: '19.02',
              high: '19.1',
              low: '18.68',
              close: '18.7',
              x: '15',
              volume: '2198755',
			  },
			  {
              open: '19.29',
              high: '19.38',
              low: '18.88',
              close: '19.05',
              x: '16',
              volume: '2464958',
			  },
			  {
              open: '18.64',
              high: '19.35',
              low: '18.53',
              close: '19.33',
              x: '17',
              volume: '2962994',
			  },
			  {
              open: '18.14',
              high: '18.58',
              low: '18.08',
              close: '18.52',
              x: '18',
              volume: '1964932',
			  },
			  {
              open: '18.49',
              high: '18.92',
              low: '18.19',
              close: '18.26',
              x: '19',
              volume: '3013102',
			  },
			  {
              open: '18.71',
              high: '18.84',
              low: '18',
              close: '18.51',
              x: '20',
              volume: '4435894',
			  },
			  {
              open: '19.17',
              high: '19.35',
              low: '18.61',
              close: '18.66',
              x: '21',
              volume: '3245851',
			  },
			  {
              open: '19.12',
              high: '19.41',
              low: '18.92',
              close: '19.2',
              x: '22',
              volume: '2259792',
			  },
			  {
              open: '19.43',
              high: '19.58',
              low: '19.16',
              close: '19.33',
              x: '23',
              volume: '3531327',
			  },
			  {
              open: '19.72',
              high: '19.81',
              low: '19.04',
              close: '19.27',
              x: '24',
              volume: '5834733',
			  },
			  {
              open: '19.7',
              high: '19.94',
              low: '19.49',
              close: '19.77',
              x: '25',
              volume: '2009987',
			  },
			  {
              open: '19.84',
              high: '19.98',
              low: '19.39',
              close: '19.88',
              x: '26',
              volume: '2767592',
			  },
			  {
              open: '20.71',
              high: '20.73',
              low: '19.16',
              close: '19.63',
              x: '27',
              volume: '673358',
			  },
			  {
              open: '21.14',
              high: '21.14',
              low: '20.55',
              close: '20.65',
              x: '28',
              volume: '3164006',
			  },
			  {
              open: '21.5',
              high: '21.86',
              low: '21.2',
              close: '21.33',
              x: '29',
              volume: '7986466',
			  },
			  {
              open: '20.45',
              high: '21.08',
              low: '20.1',
              close: '20.56',
              x: '30',
              volume: '5813040',
			  },
			  {
              open: '20.07',
              high: '20.69',
              low: '20.04',
              close: '20.36',
              x: '31',
              volume: '3440002',
			  },
			  {
              open: '19.88',
              high: '20.11',
              low: '19.51',
              close: '20.03',
              x: '32',
              volume: '2779171',
			  },
			  {
              open: '19.76',
              high: '20.13',
              low: '19.65',
              close: '19.88',
              x: '33',
              volume: '2918115',
			  },
			  {
              open: '19.77',
              high: '19.97',
              low: '19.27',
              close: '19.9',
              x: '34',
              volume: '3850357',
			  },
			  {
              open: '19.43',
              high: '19.72',
              low: '18.88',
              close: '19.5',
              x: '35',
              volume: '5047378',
			  },
			  {
              open: '19.69',
              high: '19.84',
              low: '19.17',
              close: '19.43',
              x: '36',
              volume: '3479017',
			  },
			  {
              open: '19.59',
              high: '20.02',
              low: '19.02',
              close: '19.41',
              x: '37',
              volume: '5749874',
			  },
			  {
              open: '20.95',
              high: '21.09',
              low: '19.64',
              close: '19.83',
              x: '38',
              volume: '6319111',
			  },
			  {
              open: '20.52',
              high: '21.03',
              low: '20.45',
              close: '21',
              x: '39',
              volume: '4412413',
			  },
			  {
              open: '20.36',
              high: '20.96',
              low: '20.2',
              close: '20.44',
              x: '40',
              volume: '5948318',
			  },
			  {
              open: '21.45',
              high: '21.48',
              low: '19.63',
              close: '20.3',
              x: '41',
              volume: '11935440',
			  },
			  {
              open: '23.49',
              high: '23.57',
              low: '21.12',
              close: '21.63',
              x: '42',
              volume: '10523910',
			  },
			  {
              open: '24.04',
              high: '24.21',
              low: '23.04',
              close: '23.28',
              x: '43',
              volume: '3843797',
			  },
			  {
              open: '23.6',
              high: '24.065',
              low: '23.51',
              close: '23.94',
              x: '44',
              volume: '3691404',
			  },
			  {
              open: '22.87',
              high: '23.49',
              low: '22.86',
              close: '23.48',
              x: '45',
              volume: '3387393',
			  },
			  {
              open: '22.35',
              high: '22.89',
              low: '22.35',
              close: '22.74',
              x: '46',
              volume: '3737330',
			  },
			  {
              open: '22.11',
              high: '22.5',
              low: '21.9',
              close: '22.24',
              x: '47',
              volume: '4630397',
			  },
			  {
              open: '22.58',
              high: '22.80',
              low: '22.25',
              close: '22.42',
              x: '48',
              volume: '3024711',
			  },
			  {
              open: '23.54',
              high: '23.76',
              low: '22.6',
              close: '22.68',
              x: '49',
              volume: '3984508',
			  },
			  {
              open: '23.66',
              high: '24.09',
              low: '23.09',
              close: '23.46',
              x: '50',
              volume: '3420204',
			  },
			  {
              open: '24.36',
              high: '24.42',
              low: '22.90',
              close: '23.6',
              x: '51',
              volume: '5151096',
			  },
			  {
              open: '24.34',
              high: '24.6',
              low: '23.73',
              close: '24.15',
              x: '52',
              volume: '5999654',
			  },
			  {
              open: '23.38',
              high: '24.8',
              low: '23.36',
              close: '24.1',
              x: '53',
              volume: '5382049',
			  },
			  {
              open: '23.76',
              high: '23.84',
              low: '23.23',
              close: '23.47',
              x: '54',
              volume: '3508510',
			  },
			  {
              open: '23.64',
              high: '23.94',
              low: '23.48',
              close: '23.76',
              x: '55',
              volume: '2718428',
			  },
			  {
              open: '23.99',
              high: '24.18',
              low: '23.59',
              close: '23.66',
              x: '56',
              volume: '2859391',
			  },
			  {
              open: '23.32',
              high: '24.26',
              low: '23.32',
              close: '23.79',
              x: '57',
              volume: '4138618',
			  },
			  {
              open: '24.08',
              high: '24.4',
              low: '23.26',
              close: '23.39',
              x: '58',
              volume: '4477478',
			  },
			  {
              open: '22.84',
              high: '23.96',
              low: '22.83',
              close: '23.88',
              x: '59',
              volume: '4822378',
			  },
			  {
              open: '23.38',
              high: '23.78',
              low: '22.94',
              close: '23.01',
              x: '60',
              volume: '4037312',
			  },
			  {
              open: '23.97',
              high: '23.99',
              low: '23.14',
              close: '23.32',
              x: '61',
              volume: '4879546',
			  },
          ],
		  },
      ],
	  },
	  renderAt: 'chart-container27',
  },
  {
	  type: 'waterfall2d',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Total Profit Calculation',
		  subcaption: 'Last month',
		  yAxisname: 'Amount (In USD)',
		  numberprefix: '$',
		  connectordashed: '1',
		  sumlabel: 'Total {br} Profit',
		  positiveColor: '#6baa01',
		  negativeColor: '#e44a00',
		  paletteColors: '#0075c2,#1aaf5d,#f2c500',
		  baseFontColor: '#333333',
		  baseFont: 'Helvetica Neue,Arial',
		  captionFontSize: '14',
		  subcaptionFontSize: '14',
		  subcaptionFontBold: '0',
		  showBorder: '0',
		  bgColor: '#ffffff',
		  showShadow: '0',
		  canvasBgColor: '#ffffff',
		  canvasBorderAlpha: '0',
		  divlineAlpha: '100',
		  divlineColor: '#999999',
		  divlineThickness: '1',
		  divLineIsDashed: '1',
		  divLineDashLen: '1',
		  divLineGapLen: '1',
		  usePlotGradientColor: '0',
		  showplotborder: '0',
		  showXAxisLine: '1',
		  xAxisLineThickness: '1',
		  xAxisLineColor: '#999999',
		  showAlternateHGridColor: '0',
      },
      data: [
		  {
          label: 'Online sales',
          value: '420000',
		  },
		  {
          label: 'Store Sales',
          value: '710000',
		  },
		  {
          label: 'Total Sales',
          issum: '1',
		  },
		  {
          label: 'Fixed Costs',
          value: '-250000',
		  },
		  {
          label: 'Variable Costs',
          value: '-156000',
		  },
		  {
          label: 'COGS',
          value: '-310000',
		  },
		  {
          label: 'Promotion Costs',
          value: '-86000',
		  },
		  {
          label: 'Total Costs',
          issum: '1',
          cumulative: '0',
		  },
      ],
	  },
	  renderAt: 'chart-container28',
  },
  {
	  type: 'boxandwhisker2d',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Distribution of annual salaries',
		  subCaption: 'By Gender',
		  xAxisName: 'Pay Grades',
		  YAxisName: 'Salaries (In USD)',
		  numberPrefix: '$',
		  paletteColors: '#0075c2,#1aaf5d,#f2c500,#f45b00',
		  bgColor: '#ffffff',
		  captionFontSize: '14',
		  subcaptionFontSize: '14',
		  subcaptionFontBold: '0',
		  showBorder: '0',
		  showCanvasBorder: '0',
		  showAlternateHGridColor: '0',
		  legendBorderAlpha: '0',
		  legendShadow: '0',
		  legendPosition: 'right',
		  showValues: '0',
		  toolTipColor: '#ffffff',
		  toolTipBorderThickness: '0',
		  toolTipBgColor: '#000000',
		  toolTipBgAlpha: '80',
		  toolTipBorderRadius: '2',
		  toolTipPadding: '5',
      },
      categories: [
		  {
          category: [
			  {
              label: 'Grade 1',
			  },
			  {
              label: 'Grade 2',
			  },
			  {
              label: 'Grade 3',
			  },
          ],
		  },
      ],
      dataset: [
		  {
          seriesname: 'Male',
          lowerBoxColor: '#0075c2',
          upperBoxColor: '#1aaf5d',
          data: [
			  {
              value: '2400,2000,2500,2800,3500,4000, 3700, 3750, 3880, 5000,5500,7500,8000,8200, 8400, 8500, 8550, 8800, 8700, 9000, 14000',
			  },
			  {
              value: '7500,9000,12000,13000,14000,16500,17000, 18000, 19000, 19500',
			  },
			  {
              value: '15000,19000,25000,32000,50000,65000',
			  },
          ],
		  },
		  {
          seriesname: 'Female',
          lowerBoxColor: '#f45b00',
          upperBoxColor: '#f2c500',
          data: [
			  {
              value: '1900,2100,2300,2350,2400,2550,3000,3500,4000, 6000, 6500, 9000',
			  },
			  {
              value: '7000,8000,8300,8700,9500,11000,15000, 17000, 21000',
			  },
			  {
              value: '24000,32000,35000,37000,39000, 58000',
			  },
          ],
		  },
      ],
	  },
	  renderAt: 'chart-container29',
  },
  {
	  type: 'errorbar2d',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Machinery lifespan range',
		  subcaption: 'Means & standard deviations',
		  xAxisName: 'Systems',
		  yAxisName: 'Life Span',
		  numberSuffix: ' Years',
		  halfErrorBar: '0',
		  paletteColors: '#0075c2,#1aaf5d,#f2c500',
		  showValues: '0',
		  errorBarColor: '666666',
		  bgColor: '#ffffff',
		  showBorder: '0',
		  showCanvasBorder: '0',
		  usePlotGradientColor: '0',
		  showXAxisLine: '1',
		  axisLineAlpha: '25',
		  legendBorderAlpha: '0',
		  legendShadow: '0',
		  legendBgAlpha: '0',
		  showShadow: '0',
		  showAlternateHgridColor: '0',
		  showHoverEffect: '1',
      },
      categories: [
		  {
          category: [
			  {
              label: 'Central AC',
			  },
			  {
              label: 'Computers',
			  },
			  {
              label: 'Bar-code Scanners',
			  },
			  {
              label: 'Packaging Machines',
			  },
			  {
              label: 'Chilling Compartments',
			  },
          ],
		  },
      ],
      dataset: [
		  {
          seriesname: 'Daly City Serramonte',
          data: [
			  {
              value: '8',
              errorvalue: '2',
			  },
			  {
              value: '3',
              errorvalue: '0.5',
			  },
			  {
              value: '2',
              errorvalue: '1',
			  },
			  {
              value: '6',
              errorvalue: '1.8',
			  },
			  {
              value: '8',
              errorvalue: '1.2',
			  },
          ],
		  },
		  {
          seriesname: 'Bakersfield Central',
          data: [
			  {
              value: '7',
              errorvalue: '1',
			  },
			  {
              value: '4',
              errorvalue: '0.5',
			  },
			  {
              value: '2',
              errorvalue: '1',
			  },
			  {
              value: '4',
              errorvalue: '0.8',
			  },
			  {
              value: '7',
              errorvalue: '1',
			  },
          ],
		  },
		  {
          seriesname: 'Garden Groove harbour',
          data: [
			  {
              value: '9',
              errorvalue: '2',
			  },
			  {
              value: '3',
              errorvalue: '0.7',
			  },
			  {
              value: '3',
              errorvalue: '1',
			  },
			  {
              value: '6',
              errorvalue: '1.8',
			  },
			  {
              value: '7',
              errorvalue: '1.2',
			  },
          ],
		  },
      ],
	  },
	  renderAt: 'chart-container30',
  },
  {
	  type: 'spline',
	  dataFormat: 'json',
	  width: 1000,
	  height: 500,
	  dataSource: {
      chart: {
		  caption: 'Total footfall in Bakersfield Central',
		  subCaption: 'Last week',
		  xAxisName: 'Day',
		  yAxisName: 'No. of Footfalls',
		  lineThickness: '2',
		  paletteColors: '#008ee4,#6baa01',
		  baseFontColor: '#333333',
		  baseFont: 'Helvetica Neue,Arial',
		  captionFontSize: '14',
		  subcaptionFontSize: '14',
		  subcaptionFontBold: '0',
		  showBorder: '0',
		  showValues: '0',
		  bgColor: '#ffffff',
		  showShadow: '0',
		  canvasBgColor: '#ffffff',
		  canvasBorderAlpha: '0',
		  divlineAlpha: '100',
		  divlineColor: '#999999',
		  divlineThickness: '1',
		  divLineIsDashed: '1',
		  divLineDashLen: '1',
		  divLineGapLen: '1',
		  showXAxisLine: '1',
		  xAxisLineThickness: '1',
		  xAxisLineColor: '#999999',
		  showAlternateHGridColor: '0',
      },
      data: [
		  {
          label: 'Mon',
          value: '15123',
		  },
		  {
          label: 'Tue',
          value: '14233',
		  },
		  {
          label: 'Wed',
          value: '25507',
		  },
		  {
          vline: 'true',
          lineposition: '0',
          color: '#6baa01',
          labelHAlign: 'left',
          label: 'National holiday',
		  },
		  {
          label: 'Thu',
          value: '9110',
		  },
		  {
          label: 'Fri',
          value: '15529',
		  },
		  {
          label: 'Sat',
          value: '20803',
		  },
		  {
          label: 'Sun',
          value: '19202',
		  },
      ],
	  },
	  renderAt: 'chart-container31',
  },
  {
	  type: 'msspline',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Number of visitors last week',
		  subCaption: 'Bakersfield Central vs Los Angeles Topanga',
		  captionFontSize: '14',
		  subcaptionFontSize: '14',
		  baseFontColor: '#333333',
		  baseFont: 'Helvetica Neue,Arial',
		  subcaptionFontBold: '0',
		  xAxisName: 'Day',
		  yAxisName: 'No. of Visitor',
		  showValues: '0',
		  paletteColors: '#0075c2,#1aaf5d',
		  bgColor: '#ffffff',
		  showBorder: '0',
		  showShadow: '0',
		  showAlternateHGridColor: '0',
		  showCanvasBorder: '0',
		  showXAxisLine: '1',
		  xAxisLineThickness: '1',
		  xAxisLineColor: '#999999',
		  canvasBgColor: '#ffffff',
		  legendBorderAlpha: '0',
		  legendShadow: '0',
		  divlineAlpha: '100',
		  divlineColor: '#999999',
		  divlineThickness: '1',
		  divLineIsDashed: '1',
		  divLineDashLen: '1',
		  divLineGapLen: '1',
      },
      categories: [
		  {
          category: [
			  {
              label: 'Mon',
			  },
			  {
              label: 'Tue',
			  },
			  {
              label: 'Wed',
			  },
			  {
              vline: 'true',
              lineposition: '0',
              color: '#6baa01',
              labelHAlign: 'right',
              labelPosition: '0',
              label: 'National holiday',
			  },
			  {
              label: 'Thu',
			  },
			  {
              label: 'Fri',
			  },
			  {
              label: 'Sat',
			  },
			  {
              label: 'Sun',
			  },
          ],
		  },
      ],
      dataset: [
		  {
          seriesname: 'Bakersfield Central',
          data: [
			  {
              value: '15123',
			  },
			  {
              value: '14233',
			  },
			  {
              value: '25507',
			  },
			  {
              value: '9110',
			  },
			  {
              value: '15529',
			  },
			  {
              value: '20803',
			  },
			  {
              value: '19202',
			  },
          ],
		  },
		  {
          seriesname: 'Los Angeles Topanga',
          data: [
			  {
              value: '13400',
			  },
			  {
              value: '12800',
			  },
			  {
              value: '22800',
			  },
			  {
              value: '12400',
			  },
			  {
              value: '15800',
			  },
			  {
              value: '19800',
			  },
			  {
              value: '21800',
			  },
          ],
		  },
      ],
	  },
	  renderAt: 'chart-container32',
  },
  {
	  type: 'mssplinearea',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Number of Footfalls Last Week',
		  subCaption: 'Garden Groove harbour vs Crompton-Rancho Dom',
		  xAxisName: 'Day',
		  yAxisName: 'No. of Footfalls',
		  captionFontSize: '14',
		  subcaptionFontSize: '14',
		  baseFontColor: '#333333',
		  baseFont: 'Helvetica Neue,Arial',
		  subcaptionFontBold: '0',
		  paletteColors: '#6baa01,#008ee4',
		  usePlotGradientColor: '0',
		  bgColor: '#ffffff',
		  showBorder: '0',
		  showPlotBorder: '0',
		  showValues: '0',
		  showShadow: '0',
		  showAlternateHGridColor: '0',
		  showCanvasBorder: '0',
		  showXAxisLine: '1',
		  xAxisLineThickness: '1',
		  xAxisLineColor: '#999999',
		  canvasBgColor: '#ffffff',
		  divlineAlpha: '100',
		  divlineColor: '#999999',
		  divlineThickness: '1',
		  divLineIsDashed: '1',
		  divLineDashLen: '1',
		  divLineGapLen: '1',
		  legendBorderAlpha: '0',
		  legendShadow: '0',
		  toolTipColor: '#ffffff',
		  toolTipBorderThickness: '0',
		  toolTipBgColor: '#000000',
		  toolTipBgAlpha: '80',
		  toolTipBorderRadius: '2',
		  toolTipPadding: '5',
      },
      categories: [
		  {
          category: [
			  {
              label: 'Mon',
			  },
			  {
              label: 'Tue',
			  },
			  {
              label: 'Wed',
			  },
			  {
              vline: 'true',
              lineposition: '0',
              color: '#6baa01',
              labelHAlign: 'right',
              labelPosition: '0',
              label: 'National holiday',
			  },
			  {
              label: 'Thu',
			  },
			  {
              label: 'Fri',
			  },
			  {
              label: 'Sat',
			  },
			  {
              label: 'Sun',
			  },
          ],
		  },
      ],
      dataset: [
		  {
          seriesname: 'Garden Groove harbour',
          data: [
			  {
              value: '15123',
			  },
			  {
              value: '14233',
			  },
			  {
              value: '21507',
			  },
			  {
              value: '9110',
			  },
			  {
              value: '14829',
			  },
			  {
              value: '17503',
			  },
			  {
              value: '20202',
			  },
          ],
		  },
		  {
          seriesname: 'Crompton-Rancho Dom',
          data: [
			  {
              value: '11400',
			  },
			  {
              value: '12800',
			  },
			  {
              value: '17800',
			  },
			  {
              value: '10400',
			  },
			  {
              value: '11800',
			  },
			  {
              value: '13100',
			  },
			  {
              value: '20800',
			  },
          ],
		  },
      ],
	  },
	  renderAt: 'chart-container33',
  },
  {
	  type: 'splinearea',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Total sales of iPhone',
		  subCaption: 'Last month',
		  xAxisName: 'Week',
		  yAxisName: 'Units sold',
		  captionFontSize: '14',
		  subcaptionFontSize: '14',
		  baseFontColor: '#333333',
		  baseFont: 'Helvetica Neue,Arial',
		  subcaptionFontBold: '0',
		  paletteColors: '#0075c2',
		  usePlotGradientColor: '0',
		  bgColor: '#ffffff',
		  showBorder: '0',
		  showValues: '0',
		  showShadow: '0',
		  showAlternateHGridColor: '0',
		  showCanvasBorder: '0',
		  showXAxisLine: '1',
		  xAxisLineThickness: '1',
		  xAxisLineColor: '#999999',
		  canvasBgColor: '#ffffff',
		  divlineAlpha: '100',
		  divlineColor: '#999999',
		  divlineThickness: '1',
		  divLineIsDashed: '1',
		  divLineDashLen: '1',
		  divLineGapLen: '1',
      },
      data: [
		  {
          label: 'Week 1',
          value: '530',
		  },
		  {
          label: 'Week 2',
          value: '660',
		  },
		  {
          label: 'Week 3',
          value: '420',
		  },
		  {
          label: 'Week 4',
          value: '580',
		  },
		  {
          label: 'Week 5',
          value: '560',
		  },
      ],
	  },
	  renderAt: 'chart-container34',
  },
  {
	  type: 'InverseMSColumn2D',
	  dataFormat: 'json',
	  width: 1000,
	  height: 500,
	  dataSource: {
      chart: {
		  caption: 'Average Page Load Time (hsm.com)',
		  subCaption: 'Last Week',
		  showBorder: '0',
		  xAxisName: 'Day',
		  yAxisName: 'Time (In Sec)',
		  numberSuffix: 's',
		  placeValuesInside: '0',
		  valueFontColor: '#333333',
		  rotateValues: '0',
		  theme: 'fint',
      },
      categories: [
		  {
          category: [
			  {
              label: 'Mon',
			  },
			  {
              label: 'Tue',
			  },
			  {
              label: 'Wed',
			  },
			  {
              label: 'Thu',
			  },
			  {
              label: 'Fri',
			  },
			  {
              label: 'Sat',
			  },
			  {
              label: 'Sun',
			  },
          ],
		  },
      ],
      dataset: [
		  {
          seriesname: 'Loading Time',
          allowDrag: '0',
          data: [
			  {
              value: '6',
			  },
			  {
              value: '5.8',
			  },
			  {
              value: '5',
			  },
			  {
              value: '4.3',
			  },
			  {
              value: '4.1',
			  },
			  {
              value: '3.8',
			  },
			  {
              value: '3.2',
			  },
          ],
		  },
      ],
	  },
	  renderAt: 'chart-container35',
  },
  {
	  type: 'inversemsarea',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Daily bounce rate',
		  subCaption: 'Last week',
		  xAxisName: 'Day',
		  yAxisName: 'Percentage',
		  numberSuffix: '%',
		  showBorder: '0',
		  paletteColors: '#0075c2,#1aaf5d',
		  bgColor: '#ffffff',
		  usePlotGradientColor: '0',
		  plotFillAlpha: '50',
		  showCanvasBorder: '0',
		  LegendShadow: '0',
		  legendBorderAlpha: '0',
		  showXAxisLine: '1',
		  axisLineAlpha: '40',
		  divlineColor: '#999999',
		  divlineThickness: '1',
		  divLineIsDashed: '1',
		  divLineDashLen: '1',
		  divLineGapLen: '1',
		  showAlternateHgridColor: '0',
		  showValues: '0',
		  baseFontColor: '#333333',
		  baseFont: 'Helvetica Neue,Arial',
		  captionFontSize: '14',
		  subcaptionFontSize: '14',
		  subcaptionFontBold: '0',
		  toolTipColor: '#ffffff',
		  toolTipBorderThickness: '0',
		  toolTipBgColor: '#000000',
		  toolTipBgAlpha: '80',
		  toolTipBorderRadius: '2',
		  toolTipPadding: '5',
      },
      categories: [
		  {
          category: [
			  {
              label: 'Mon',
			  },
			  {
              label: 'Tue',
			  },
			  {
              label: 'Wed',
			  },
			  {
              label: 'Thu',
			  },
			  {
              label: 'Fri',
			  },
			  {
              label: 'Sat',
			  },
			  {
              label: 'Sun',
			  },
          ],
		  },
      ],
      dataset: [
		  {
          seriesname: 'food.hsm.com',
          data: [
			  {
              value: '27',
			  },
			  {
              value: '22',
			  },
			  {
              value: '25',
			  },
			  {
              value: '27',
			  },
			  {
              value: '21',
			  },
			  {
              value: '29',
			  },
			  {
              value: '22',
			  },
          ],
		  },
		  {
          seriesname: 'cloth.hsm.com',
          data: [
			  {
              value: '42',
			  },
			  {
              value: '38',
			  },
			  {
              value: '39',
			  },
			  {
              value: '36',
			  },
			  {
              value: '43',
			  },
			  {
              value: '44',
			  },
			  {
              value: '35',
			  },
          ],
		  },
      ],
	  },
	  renderAt: 'chart-container36',
  },
  {
	  type: 'inversemsline',
	  dataFormat: 'json',
	  width: 1000,
	  height: 500,
	  dataSource: {
      chart: {
		  caption: 'Average Page Load Time (hsm.com)',
		  subCaption: 'Last Week',
		  showBorder: '0',
		  xAxisName: 'Day',
		  yAxisName: 'Time (In Sec)',
		  numberSuffix: 's',
		  lineThickness: '2',
		  paletteColors: '#008ee4,#6baa01',
		  baseFontColor: '#333333',
		  baseFont: 'Helvetica Neue,Arial',
		  captionFontSize: '14',
		  subcaptionFontSize: '14',
		  subcaptionFontBold: '0',
		  bgColor: '#ffffff',
		  showShadow: '0',
		  showLegend: '0',
		  canvasBgColor: '#ffffff',
		  canvasBorderAlpha: '0',
		  divlineAlpha: '100',
		  divlineColor: '#999999',
		  divlineThickness: '1',
		  divLineIsDashed: '1',
		  divLineDashLen: '1',
		  divLineGapLen: '1',
		  showXAxisLine: '1',
		  xAxisLineThickness: '1',
		  xAxisLineColor: '#999999',
		  showAlternateHGridColor: '0',
		  toolTipColor: '#ffffff',
		  toolTipBorderThickness: '0',
		  toolTipBgColor: '#000000',
		  toolTipBgAlpha: '80',
		  toolTipBorderRadius: '2',
		  toolTipPadding: '5',
      },
      categories: [
		  {
          category: [
			  {
              label: 'Mon',
			  },
			  {
              label: 'Tue',
			  },
			  {
              label: 'Wed',
			  },
			  {
              label: 'Thu',
			  },
			  {
              label: 'Fri',
			  },
			  {
              label: 'Sat',
			  },
			  {
              label: 'Sun',
			  },
          ],
		  },
      ],
      dataset: [
		  {
          seriesname: 'Loading Time',
          allowDrag: '0',
          data: [
			  {
              value: '6',
			  },
			  {
              value: '5.8',
			  },
			  {
              value: '5',
			  },
			  {
              value: '4.3',
			  },
			  {
              value: '4.1',
			  },
			  {
              value: '3.8',
			  },
			  {
              value: '3.2',
			  },
          ],
		  },
      ],
	  },
	  renderAt: 'chart-container37',
  },
  {
	  type: 'logmscolumn2d',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Store footfall vs Online visitors ',
		  subCaption: 'Last Year',
		  captionFontSize: '14',
		  subcaptionFontSize: '14',
		  subcaptionFontBold: '0',
		  baseFontColor: '#333333',
		  baseFont: 'Helvetica Neue,Arial',
		  xAxisName: 'Quarter',
		  yAxisName: 'No of visitors',
		  paletteColors: '#0075c2,#1aaf5d',
		  bgColor: '#ffffff',
		  showBorder: '0',
		  showCanvasBorder: '0',
		  showPlotBorder: '0',
		  showAlternateHgridColor: '0',
		  showXAxisLine: '1',
		  usePlotGradientcolor: '0',
		  valueFontColor: '#ffffff',
		  placeValuesInside: '1',
		  rotateValues: '1',
		  LegendShadow: '0',
		  legendBorderAlpha: '0',
		  base: '10',
		  axisLineAlpha: '10',
		  toolTipColor: '#ffffff',
		  toolTipBorderThickness: '0',
		  toolTipBgColor: '#000000',
		  toolTipBgAlpha: '80',
		  toolTipBorderRadius: '2',
		  toolTipPadding: '5',
		  divlineAlpha: '100',
		  divlineColor: '#999999',
		  divlineThickness: '1',
		  divLineIsDashed: '1',
		  divLineDashLen: '1',
		  divLineGapLen: '1',
      },
      categories: [
		  {
          category: [
			  {
              label: 'Q1',
			  },
			  {
              label: 'Q2',
			  },
			  {
              label: 'Q3',
			  },
			  {
              label: 'Q4',
			  },
          ],
		  },
      ],
      dataset: [
		  {
          seriesname: 'Total footfalls',
          data: [
			  {
              value: '126734',
			  },
			  {
              value: '159851',
			  },
			  {
              value: '197393',
			  },
			  {
              value: '168560',
			  },
			  {
              value: '199428',
			  },
          ],
		  },
		  {
          seriesname: 'Online Visits',
          data: [
			  {
              value: '1126059',
			  },
			  {
              value: '1292145',
			  },
			  {
              value: '1496849',
			  },
			  {
              value: '1460249',
			  },
			  {
              value: '1083962',
			  },
          ],
		  },
      ],
	  },
	  renderAt: 'chart-container38',
  },
  {
	  type: 'logmsline',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Store footfall vs Online visitors ',
		  subCaption: 'Last Year',
		  xAxisName: 'Quarter',
		  yAxisName: 'USD',
		  paletteColors: '#008ee4,#6baa01,#e44a00',
		  bgAlpha: '0',
		  borderAlpha: '20',
		  canvasBorderAlpha: '0',
		  LegendShadow: '0',
		  legendBorderAlpha: '0',
		  showXAxisLine: '1',
		  showValues: '0',
		  showBorder: '0',
		  showAlternateHgridColor: '0',
		  base: '10',
		  numberprefix: '$',
		  axisLineAlpha: '10',
		  divLineAlpha: '10',
		  toolTipColor: '#ffffff',
		  toolTipBorderThickness: '0',
		  toolTipBgColor: '#000000',
		  toolTipBgAlpha: '80',
		  toolTipBorderRadius: '2',
		  toolTipPadding: '5',
      },
      categories: [
		  {
          category: [
			  {
              label: 'Q1',
			  },
			  {
              label: 'Q2',
			  },
			  {
              label: 'Q3',
			  },
			  {
              label: 'Q4',
			  },
          ],
		  },
      ],
      dataset: [
		  {
          seriesname: 'Total footfalls',
          data: [
			  {
              value: '126734',
			  },
			  {
              value: '159851',
			  },
			  {
              value: '197393',
			  },
			  {
              value: '168560',
			  },
			  {
              value: '199428',
			  },
          ],
		  },
		  {
          seriesname: 'Online Visits',
          data: [
			  {
              value: '1126059',
			  },
			  {
              value: '1292145',
			  },
			  {
              value: '1496849',
			  },
			  {
              value: '1460249',
			  },
			  {
              value: '1083962',
			  },
          ],
		  },
      ],
	  },
	  renderAt: 'chart-container39',
  },
  {
	  type: 'msstepline',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Revenue Vs Expense',
		  subCaption: 'Last year',
		  captionFontSize: '14',
		  subcaptionFontSize: '14',
		  subcaptionFontBold: '0',
		  baseFontColor: '#333333',
		  baseFont: 'Helvetica Neue,Arial',
		  xaxisname: 'Month',
		  yaxisname: 'Amount (In USD)',
		  usePlotGradientColor: '0',
		  bgColor: '#ffffff',
		  palettecolors: '#6baa01, #d35400',
		  showBorder: '0',
		  showPlotBorder: '0',
		  showValues: '0',
		  showShadow: '0',
		  showAlternateHGridColor: '0',
		  showCanvasBorder: '0',
		  showXAxisLine: '1',
		  numberprefix: '$',
		  xAxisLineThickness: '1',
		  xAxisLineColor: '#999999',
		  canvasBgColor: '#ffffff',
		  divlineAlpha: '100',
		  divlineColor: '#999999',
		  divlineThickness: '1',
		  divLineIsDashed: '1',
		  divLineDashLen: '1',
		  legendBorderAlpha: '0',
		  legendShadow: '0',
		  toolTipColor: '#ffffff',
		  toolTipBorderThickness: '0',
		  toolTipBgColor: '#000000',
		  toolTipBgAlpha: '80',
		  toolTipBorderRadius: '2',
		  toolTipPadding: '5',
      },
      categories: [
		  {
          category: [
			  {
              label: 'Jan',
			  },
			  {
              label: 'Feb',
			  },
			  {
              label: 'Mar',
			  },
			  {
              label: 'Apr',
			  },
			  {
              label: 'May',
			  },
			  {
              label: 'Jun',
			  },
			  {
              label: 'Jul',
			  },
			  {
              label: 'Aug',
			  },
			  {
              label: 'Sep',
			  },
			  {
              label: 'Oct',
			  },
			  {
              label: 'Nov',
			  },
			  {
              label: 'Dec',
			  },
          ],
		  },
      ],
      dataset: [
		  {
          seriesname: 'Revenue',
          linethickness: '3',
          anchorradius: '3',
          data: [
			  {
              value: '374000',
			  },
			  {
              value: '350000',
			  },
			  {
              value: '380000',
			  },
			  {
              value: '340000',
			  },
			  {
              value: '398000',
			  },
			  {
              value: '326000',
			  },
			  {
              value: '448000',
			  },
			  {
              value: '379000',
			  },
			  {
              value: '355000',
			  },
			  {
              value: '374000',
			  },
			  {
              value: '348000',
			  },
			  {
              value: '402000',
			  },
          ],
		  },
		  {
          seriesname: 'Expense',
          linethickness: '3',
          anchorradius: '3',
          data: [
			  {
              value: '100000',
			  },
			  {
              value: '115000',
			  },
			  {
              value: '135000',
			  },
			  {
              value: '150000',
			  },
			  {
              value: '110000',
			  },
			  {
              value: '98000',
			  },
			  {
              value: '118000',
			  },
			  {
              value: '197000',
			  },
			  {
              value: '228000',
			  },
			  {
              value: '249000',
			  },
			  {
              value: '229000',
			  },
			  {
              value: '208000',
			  },
          ],
		  },
      ],
	  },
	  renderAt: 'chart-container40',
  },
  {
	  type: 'kagi',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Stock Price HRYS',
		  subCaption: 'Last 2 months',
		  numberPrefix: '$',
		  xAxisName: 'Day',
		  yAxisName: 'Amount (In USD)',
		  showValues: '0',
		  drawAnchors: '0',
		  labelDisplay: 'Rotate',
		  reversalPercentage: '5',
		  showBorder: '0',
		  bgColor: '#ffffff',
		  showCanvasBorder: '0',
		  showXAxisLine: '1',
		  axisLineAlpha: '40',
		  divlineColor: '#999999',
		  divlineThickness: '1',
		  divLineIsDashed: '1',
		  divLineDashLen: '1',
		  divLineGapLen: '1',
		  rallycolor: '#0075c2',
		  declinecolor: '#8e0000',
		  rallythickness: '3',
		  declinethickness: '3',
		  baseFontColor: '#333333',
		  baseFont: 'Helvetica Neue,Arial',
		  captionFontSize: '14',
		  subcaptionFontSize: '14',
		  subcaptionFontBold: '0',
		  showAlternateHGridColor: '0',
		  toolTipColor: '#ffffff',
		  toolTipBorderThickness: '0',
		  toolTipBgColor: '#000000',
		  toolTipBgAlpha: '80',
		  toolTipBorderRadius: '2',
		  toolTipPadding: '5',
      },
      data: [
		  {
          label: 'Day 60',
          value: '18.99',
		  },
		  {
          label: 'Day 59',
          value: '18.82',
		  },
		  {
          label: 'Day 58',
          value: '18.65',
		  },
		  {
          label: 'Day 57',
          value: '19.4',
		  },
		  {
          label: 'Day 56',
          value: '19.92',
		  },
		  {
          label: 'Day 55',
          value: '20.16',
		  },
		  {
          label: 'Day 54',
          value: '20.48',
		  },
		  {
          label: 'Day 53',
          value: '20.15',
		  },
		  {
          label: 'Day 52',
          value: '20.22',
		  },
		  {
          label: 'Day 51',
          value: '19.44',
		  },
		  {
          label: 'Day 50',
          value: '19.22',
		  },
		  {
          label: 'Day 49',
          value: '19.24',
		  },
		  {
          label: 'Day 48',
          value: '18.95',
		  },
		  {
          label: 'Day 47',
          value: '18.97',
		  },
		  {
          label: 'Day 46',
          value: '18.7',
		  },
		  {
          label: 'Day 45',
          value: '19.05',
		  },
		  {
          label: 'Day 44',
          value: '19.33',
		  },
		  {
          label: 'Day 43',
          value: '18.52',
		  },
		  {
          label: 'Day 42',
          value: '18.26',
		  },
		  {
          label: 'Day 41',
          value: '18.51',
		  },
		  {
          label: 'Day 40',
          value: '18.66',
		  },
		  {
          label: 'Day 39',
          value: '19.2',
		  },
		  {
          label: 'Day 38',
          value: '19.33',
		  },
		  {
          label: 'Day 37',
          value: '19.27',
		  },
		  {
          label: 'Day 36',
          value: '19.77',
		  },
		  {
          label: 'Day 35',
          value: '19.88',
		  },
		  {
          label: 'Day 34',
          close: '19.63',
		  },
		  {
          label: 'Day 33',
          value: '20.65',
		  },
		  {
          label: 'Day 32',
          value: '21.33',
		  },
		  {
          label: 'Day 31',
          value: '20.56',
		  },
		  {
          label: 'Day 30',
          value: '20.36',
		  },
		  {
          label: 'Day 29',
          value: '20.03',
		  },
		  {
          label: 'Day 28',
          value: '19.88',
		  },
		  {
          label: 'Day 27',
          value: '19.9',
		  },
		  {
          label: 'Day 26',
          value: '19.5',
		  },
		  {
          label: 'Day 25',
          value: '19.43',
		  },
		  {
          label: 'Day 24',
          value: '19.41',
		  },
		  {
          label: 'Day 23',
          value: '19.83',
		  },
		  {
          label: 'Day 22',
          value: '21',
		  },
		  {
          label: 'Day 21',
          value: '20.44',
		  },
		  {
          label: 'Day 20',
          value: '20.3',
		  },
		  {
          label: 'Day 19',
          value: '21.63',
		  },
		  {
          label: 'Day 18',
          value: '23.28',
		  },
		  {
          label: 'Day 17',
          value: '23.94',
		  },
		  {
          label: 'Day 16',
          value: '23.48',
		  },
		  {
          label: 'Day 15',
          value: '22.74',
		  },
		  {
          label: 'Day 14',
          value: '22.24',
		  },
		  {
          label: 'Day 13',
          value: '22.42',
		  },
		  {
          label: 'Day 12',
          value: '22.68',
		  },
		  {
          label: 'Day 11',
          value: '23.46',
		  },
		  {
          label: 'Day 10',
          value: '23.6',
		  },
		  {
          label: 'Day 9',
          value: '24.15',
		  },
		  {
          label: 'Day 8',
          value: '24.1',
		  },
		  {
          label: 'Day 7',
          value: '23.47',
		  },
		  {
          label: 'Day 6',
          value: '23.76',
		  },
		  {
          label: 'Day 55',
          value: '23.66',
		  },
		  {
          label: 'Day 5',
          value: '23.79',
		  },
		  {
          label: 'Day 4',
          value: '23.39',
		  },
		  {
          label: 'Day 3',
          value: '23.88',
		  },
		  {
          label: 'Day 2',
          value: '23.01',
		  },
		  {
          label: 'Yesterday',
          value: '23.32',
		  },
      ],
	  },
	  renderAt: 'chart-container41',
  },
  {
	  type: 'angulargauge',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Customer Satisfaction Score',
		  subcaption: 'Last week',
		  lowerLimit: '0',
		  upperLimit: '100',
		  lowerLimitDisplay: 'Bad',
		  upperLimitDisplay: 'Good',
		  showValue: '1',
		  valueBelowPivot: '1',
		  theme: 'fint',
      },
      colorRange: {
		  color: [
          {
			  minValue: '0',
			  maxValue: '50',
			  code: '#e44a00',
          },
          {
			  minValue: '50',
			  maxValue: '75',
			  code: '#f8bd19',
          },
          {
			  minValue: '75',
			  maxValue: '100',
			  code: '#6baa01',
          },
		  ],
      },
      dials: {
		  dial: [
          {
			  value: '67',
          },
		  ],
      },
	  },
	  renderAt: 'chart-container42',
  },
  {
	  type: 'hlineargauge',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  theme: 'fint',
		  caption: 'Server CPU Utilization',
		  subcaption: 'food.hsm.com',
		  lowerLimit: '0',
		  upperLimit: '100',
		  numberSuffix: '%',
		  chartBottomMargin: '40',
		  valueFontSize: '11',
		  valueFontBold: '0',
      },
      colorRange: {
		  color: [
          {
			  minValue: '0',
			  maxValue: '35',
			  label: 'Low',
          },
          {
			  minValue: '35',
			  maxValue: '70',
			  label: 'Moderate',
          },
          {
			  minValue: '70',
			  maxValue: '100',
			  label: 'High',
          },
		  ],
      },
      pointers: {
		  pointer: [
          {
			  value: '75',
          },
		  ],
      },
      trendPoints: {
		  point: [
          {
			  startValue: '70',
			  displayValue: ' ',
			  dashed: '1',
			  showValues: '0',
          },
          {
			  startValue: '85',
			  displayValue: ' ',
			  dashed: '1',
			  showValues: '0',
          },
          {
			  startValue: '70',
			  endValue: '85',
			  displayValue: ' ',
			  alpha: '40',
          },
		  ],
      },
      annotations: {
		  origw: '400',
		  origh: '190',
		  autoscale: '1',
		  groups: [
          {
			  id: 'range',
			  items: [
              {
				  id: 'rangeBg',
				  type: 'rectangle',
				  x: '$chartCenterX-115',
				  y: '$chartEndY-35',
				  tox: '$chartCenterX +115',
				  toy: '$chartEndY-15',
				  fillcolor: '#0075c2',
              },
              {
				  id: 'rangeText',
				  type: 'Text',
				  fontSize: '11',
				  fillcolor: '#ffffff',
				  text: 'Recommended Utilization Range : 70% - 85%',
				  x: '$chartCenterX',
				  y: '$chartEndY-25',
              },
			  ],
          },
		  ],
      },
	  },
	  renderAt: 'chart-container43',
  },
  {
	  type: 'hled',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Fuel Level Indicator',
		  lowerLimit: '0',
		  upperLimit: '100',
		  lowerLimitDisplay: 'Empty',
		  upperLimitDisplay: 'Full',
		  numberSuffix: '%',
		  valueFontSize: '12',
		  showhovereffect: '1',
		  origW: '400',
		  origH: '150',
		  ledSize: '3',
		  ledGap: '2',
		  manageResize: '1',
		  theme: 'fint',
      },
      annotations: {
		  showbelow: '1',
		  groups: [
          {
			  id: 'indicator',
			  items: [
              {
				  id: 'bgRectAngle',
				  type: 'rectangle',
				  alpha: '90',
				  radius: '1',
				  fillColor: '#6baa01',
				  x: '$gaugeCenterX - 20',
				  tox: '$gaugeCenterX + 20',
				  y: '$gaugeEndY + 25',
				  toy: '$gaugeEndY + 45',
              },
			  ],
          },
		  ],
      },
      colorRange: {
		  color: [
          {
			  minValue: '0',
			  maxValue: '45',
			  code: '#e44a00',
          },
          {
			  minValue: '45',
			  maxValue: '75',
			  code: '#f8bd19',
          },
          {
			  minValue: '75',
			  maxValue: '100',
			  code: '#6baa01',
          },
		  ],
      },
      value: '92',
	  },
	  renderAt: 'chart-container44',
  },
  {
	  type: 'thermometer',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Temperature Monitor',
		  subcaption: ' Central cold store',
		  lowerLimit: '-10',
		  upperLimit: '0',
		  decimals: '1',
		  numberSuffix: '°C',
		  showhovereffect: '1',
		  thmFillColor: '#008ee4',
		  showGaugeBorder: '1',
		  gaugeBorderColor: '#008ee4',
		  gaugeBorderThickness: '2',
		  gaugeBorderAlpha: '30',
		  thmOriginX: '100',
		  chartBottomMargin: '20',
		  valueFontColor: '#000000',
		  theme: 'fint',
      },
      value: '-6',
      annotations: {
		  showbelow: '0',
		  groups: [
          {
			  id: 'indicator',
			  items: [
              {
				  id: 'background',
				  type: 'rectangle',
				  alpha: '50',
				  fillColor: '#AABBCC',
				  x: '$gaugeEndX-40',
				  tox: '$gaugeEndX',
				  y: '$gaugeEndY+54',
				  toy: '$gaugeEndY+72',
              },
			  ],
          },
		  ],
      },
	  },
	  renderAt: 'chart-container45',
  },
  {
	  type: 'cylinder',
	  dataFormat: 'json',
	  width: 1000,
	  height: 500,
	  dataSource: {
      chart: {
		  theme: 'fint',
		  caption: 'Diesel Level in Generator',
		  subcaption: 'Bakersfield Central',
		  lowerLimit: '0',
		  upperLimit: '120',
		  lowerLimitDisplay: 'Empty',
		  upperLimitDisplay: 'Full',
		  numberSuffix: ' ltrs',
		  showValue: '0',
		  chartBottomMargin: '45',
      },
      value: '110',
      annotations: {
		  origw: '400',
		  origh: '190',
		  autoscale: '1',
		  groups: [
          {
			  id: 'range',
			  items: [
              {
				  id: 'rangeBg',
				  type: 'rectangle',
				  x: '$canvasCenterX-45',
				  y: '$chartEndY-30',
				  tox: '$canvasCenterX +45',
				  toy: '$chartEndY-75',
				  fillcolor: '#6caa03',
              },
              {
				  id: 'rangeText',
				  type: 'Text',
				  fontSize: '11',
				  fillcolor: '#333333',
				  text: '80 ltrs',
				  x: '$chartCenterX-45',
				  y: '$chartEndY-50',
              },
			  ],
          },
		  ],
      },
	  },
	  renderAt: 'chart-container46',
  },
  {
	  type: 'bulb',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Temperature status of deep freezers',
		  upperlimit: '-5',
		  lowerlimit: '-60',
		  captionPadding: '30',
		  showshadow: '0',
		  showvalue: '1',
		  useColorNameAsValue: '1',
		  placeValuesInside: '1',
		  valueFontSize: '16',
		  plottooltext: 'Current Temperature:{br}$value°C',
		  theme: 'fint',
      },
      colorrange: {
		  color: [
          {
			  minvalue: '-60',
			  maxvalue: '-35',
			  label: 'Mission control,{br}we have a situation!',
			  code: '#ff0000',
          },
          {
			  minvalue: '-35',
			  maxvalue: '-25',
			  label: 'Something is just  not right!',
			  code: '#ff9900',
          },
          {
			  minvalue: '-25',
			  maxvalue: '-5',
			  label: 'All well ahoy!',
			  code: '#00ff00',
          },
		  ],
      },
      value: '-5',
	  },
	  renderAt: 'chart-container47',
  },
  {
	  type: 'funnel',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: "Website - Harry's SuperMart",
		  subcaption: 'Visit to purchase - Conversion analysis for last year',
		  decimals: '1',
		  is2D: '1',
		  plotTooltext: 'Success : $percentOfPrevValue',
		  showPercentValues: '1',
		  theme: 'fint',
      },
      data: [
		  {
          label: 'Unique Website Visits',
          value: '1460000',
		  },
		  {
          label: 'Programme Details Section Visits',
          value: '930000',
		  },
		  {
          label: 'Attempts to Register',
          value: '540000',
		  },
		  {
          label: 'Successful Registrations',
          value: '210000',
		  },
		  {
          label: 'Logged In',
          value: '190000',
		  },
		  {
          label: 'Purchased on Introductory Offers',
          value: '120000',
		  },
      ],
	  },
	  renderAt: 'chart-container48',
  },
  {
	  type: 'pyramid',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  theme: 'fint',
		  caption: 'The Global Wealth Pyramid',
		  captionOnTop: '0',
		  captionPadding: '25',
		  alignCaptionWithCanvas: '1',
		  subcaption: 'Credit Suisse 2013',
		  subCaptionFontSize: '12',
		  borderAlpha: '20',
		  is2D: '1',
		  bgColor: '#ffffff',
		  showValues: '1',
		  numberPrefix: '$',
		  numberSuffix: 'M',
		  plotTooltext: '$label of world population is worth USD $value tn ',
		  showPercentValues: '1',
		  chartLeftMargin: '40',
      },
      data: [
		  {
          label: 'Top 32 mn (0.7%)',
          value: '98.7',
		  },
		  {
          label: 'Next 361 mn (7.7%)',
          value: '101.8',
		  },
		  {
          label: 'Next 1.1 bn (22.9%)',
          value: '33',
		  },
		  {
          label: 'Last 3.2 bn (68.7%)',
          value: '7.3',
		  },
      ],
	  },
	  renderAt: 'chart-container49',
  },
  {
	  type: 'sparkline',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  caption: 'Stock Price',
		  subcaption: 'Last month',
		  canvasleftmargin: '145',
		  showBorder: '0',
		  bgColor: '#ffffff',
		  captionPadding: '7',
		  valuePadding: '7',
		  numberPrefix: '$',
      },
      dataset: [
		  {
          data: [
			  {
              value: '38.42',
			  },
			  {
              value: '41.43',
			  },
			  {
              value: '34.78',
			  },
			  {
              value: '40.67',
			  },
			  {
              value: '44.12',
			  },
			  {
              value: '38.45',
			  },
			  {
              value: '40.71',
			  },
			  {
              value: '49.90',
			  },
			  {
              value: '40.12',
			  },
			  {
              value: '34.91',
			  },
			  {
              value: '42.02',
			  },
			  {
              value: '35.21',
			  },
			  {
              value: '43.31',
			  },
			  {
              value: '40.21',
			  },
			  {
              value: '40.54',
			  },
			  {
              value: '40.90',
			  },
			  {
              value: '54.21',
			  },
			  {
              value: '41.90',
			  },
			  {
              value: '33.43',
			  },
			  {
              value: '46.73',
			  },
			  {
              value: '50.42',
			  },
			  {
              value: '40.74',
			  },
			  {
              value: '42.31',
			  },
			  {
              value: '50.39',
			  },
			  {
              value: '51.10',
			  },
			  {
              value: '44.84',
			  },
			  {
              value: '51.64',
			  },
			  {
              value: '47.62',
			  },
			  {
              value: '39.61',
			  },
			  {
              value: '35.13',
			  },
          ],
		  },
      ],
	  },
	  renderAt: 'chart-container50',
  },
  {
	  type: 'hbullet',
	  width: 1000,
	  height: 500,
	  dataFormat: 'json',
	  dataSource: {
      chart: {
		  theme: 'fint',
		  lowerLimit: '0',
		  subCaptionFontSize: '11',
		  upperLimit: '120',
		  caption: 'Last Month Revenue',
		  subcaption: 'Actual vs Target (Bakersfield Central)',
		  numberPrefix: '$',
		  numberSuffix: 'K',
		  chartBottomMargin: '25',
      },
      colorRange: {
		  color: [
          {
			  minValue: '0',
			  maxValue: '50',
			  code: '#e44a00',
			  alpha: '25',
          },
          {
			  minValue: '50',
			  maxValue: '75',
			  code: '#f8bd19',
			  alpha: '25',
          },
          {
			  minValue: '75',
			  maxValue: '120',
			  code: '#6baa01',
			  alpha: '25',
          },
		  ],
      },
      value: '82',
      target: '90',
	  },
	  renderAt: 'chart-container51',
  },
];

const host = '127.0.0.1';
const port = 1337;

// instantiate FusionExport
const fusion = new FusionExport({ host, port });

const exportConfig = new ExportConfig();

exportConfig.set('chartConfig', chartConfig);
// provide the export config
fusion.export(exportConfig);

fusion.on('exportDone', (files) => {
	// files can be read from files array
	// e.g. [{tmpPath:"", realName: ""}]

	files.data.forEach((item) => {
		const filePath = path.join(__dirname, 'bulk', item.realName);
		console.log(filePath);
    const data = Buffer.from(item.fileContent, 'base64');
		fs.writeFileSync(filePath, data);
	});
	
});

fusion.on('exportStateChange', (state) => {
	// called for export progress state change
	console.log(`state: ${JSON.stringify(state)}`);
});

fusion.on('error', (err) => {
	// catch error here
	console.log(`error: ${JSON.stringify(err)}`);
});
