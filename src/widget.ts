import { Widget } from '@lumino/widgets';
import {
  MainAreaWidget,
  ToolbarButton,
} from '@jupyterlab/apputils';
import {
  imageIcon,
  refreshIcon,
} from '@jupyterlab/ui-components';

import { requestAPI } from './request';

class ImageCaptionWidget extends Widget {
  // Initialization
  constructor() {
    super();

    // Add main CSS class
    this.addClass('jp-image-caption-widget');

    // Create and append an HTML <p> (paragraph) tag to our widget's node in
    // the HTML document
    const hello = document.createElement('p');
    hello.innerHTML = "Hello, world!";
    this.node.appendChild(hello);

    // Create controls container
    const controls = document.createElement('div');
    controls.className = 'jp-image-controls';
    this.node.appendChild(controls);

    // Size control
    const sizeControl = document.createElement('div');
    sizeControl.className = 'jp-control-group';
    const sizeLabel = document.createElement('label');
    sizeLabel.innerHTML = 'Image Size: ';
    this.sizeSlider = document.createElement('input');
    this.sizeSlider.type = 'range';
    this.sizeSlider.min = '50';
    this.sizeSlider.max = '100';
    this.sizeSlider.value = '100';
    this.sizeSlider.className = 'jp-slider';
    this.sizeValue = document.createElement('span');
    this.sizeValue.innerHTML = '100%';
    this.sizeValue.className = 'jp-slider-value';
    sizeControl.appendChild(sizeLabel);
    sizeControl.appendChild(this.sizeSlider);
    sizeControl.appendChild(this.sizeValue);
    controls.appendChild(sizeControl);

    // Hue control
    const hueControl = document.createElement('div');
    hueControl.className = 'jp-control-group';
    const hueLabel = document.createElement('label');
    hueLabel.innerHTML = 'Hue: ';
    this.hueSlider = document.createElement('input');
    this.hueSlider.type = 'range';
    this.hueSlider.min = '0';
    this.hueSlider.max = '360';
    this.hueSlider.value = '0';
    this.hueSlider.className = 'jp-slider';
    this.hueValue = document.createElement('span');
    this.hueValue.innerHTML = '0°';
    this.hueValue.className = 'jp-slider-value';
    hueControl.appendChild(hueLabel);
    hueControl.appendChild(this.hueSlider);
    hueControl.appendChild(this.hueValue);
    controls.appendChild(hueControl);

    // Saturation control
    const satControl = document.createElement('div');
    satControl.className = 'jp-control-group';
    const satLabel = document.createElement('label');
    satLabel.innerHTML = 'Saturation: ';
    this.satSlider = document.createElement('input');
    this.satSlider.type = 'range';
    this.satSlider.min = '0';
    this.satSlider.max = '200';
    this.satSlider.value = '100';
    this.satSlider.className = 'jp-slider';
    this.satValue = document.createElement('span');
    this.satValue.innerHTML = '100%';
    this.satValue.className = 'jp-slider-value';
    satControl.appendChild(satLabel);
    satControl.appendChild(this.satSlider);
    satControl.appendChild(this.satValue);
    controls.appendChild(satControl);

    // Brightness control
    const brightControl = document.createElement('div');
    brightControl.className = 'jp-control-group';
    const brightLabel = document.createElement('label');
    brightLabel.innerHTML = 'Brightness: ';
    this.brightSlider = document.createElement('input');
    this.brightSlider.type = 'range';
    this.brightSlider.min = '0';
    this.brightSlider.max = '200';
    this.brightSlider.value = '100';
    this.brightSlider.className = 'jp-slider';
    this.brightValue = document.createElement('span');
    this.brightValue.innerHTML = '100%';
    this.brightValue.className = 'jp-slider-value';
    brightControl.appendChild(brightLabel);
    brightControl.appendChild(this.brightSlider);
    brightControl.appendChild(this.brightValue);
    controls.appendChild(brightControl);

    // Reset button
    const resetButton = document.createElement('button');
    resetButton.innerHTML = 'Reset Filters';
    resetButton.className = 'jp-reset-button';
    resetButton.onclick = () => this.resetFilters();
    controls.appendChild(resetButton);

    const center = document.createElement('center');
    this.node.appendChild(center);

    // Put an <img> tag into the <center> tag, and also save it as a class
    // attribute so we can update it later.
    this.img = document.createElement('img');
    this.img.className = 'jp-image-display';
    center.appendChild(this.img);

    // Do the same for a caption!
    this.caption = document.createElement('p');
    this.caption.className = 'jp-image-caption';
    center.appendChild(this.caption);

    // Add event listeners for sliders
    this.sizeSlider.oninput = () => this.updateImageStyle();
    this.hueSlider.oninput = () => this.updateImageStyle();
    this.satSlider.oninput = () => this.updateImageStyle();
    this.brightSlider.oninput = () => this.updateImageStyle();

    // Initialize the image from the server extension
    this.load_image();
  }

  // Update image style based on slider values
  updateImageStyle(): void {
    const size = this.sizeSlider.value;
    const hue = this.hueSlider.value;
    const sat = this.satSlider.value;
    const bright = this.brightSlider.value;

    this.img.style.width = `${size}%`;
    this.img.style.filter = `hue-rotate(${hue}deg) saturate(${sat}%) brightness(${bright}%)`;

    this.sizeValue.innerHTML = `${size}%`;
    this.hueValue.innerHTML = `${hue}°`;
    this.satValue.innerHTML = `${sat}%`;
    this.brightValue.innerHTML = `${bright}%`;
  }

  // Reset all filters to default values
  resetFilters(): void {
    this.sizeSlider.value = '100';
    this.hueSlider.value = '0';
    this.satSlider.value = '100';
    this.brightSlider.value = '100';
    this.updateImageStyle();
  }

  // Fetch data from the server extension and save the results to img and
  // caption class attributes
  load_image(): void {
    requestAPI<any>('random-image-caption')
      .then(data => {
        console.log(data);
        this.img.src = `data:image/jpeg;base64, ${data.b64_bytes}`;
        this.caption.innerHTML = data.caption;
      })
      .catch(reason => {
        console.error(`Error fetching image data.\n${reason}`);
      });
  }

  // Information about class attributes for the type checker
  img: HTMLImageElement;
  caption: HTMLParagraphElement;
  sizeSlider: HTMLInputElement;
  sizeValue: HTMLSpanElement;
  hueSlider: HTMLInputElement;
  hueValue: HTMLSpanElement;
  satSlider: HTMLInputElement;
  satValue: HTMLSpanElement;
  brightSlider: HTMLInputElement;
  brightValue: HTMLSpanElement;
}

export class ImageCaptionMainAreaWidget extends MainAreaWidget<ImageCaptionWidget> {
  constructor() {
    const widget = new ImageCaptionWidget();
    super({ content: widget });

    this.title.label = 'Random image with caption';
    this.title.caption = this.title.label;
    this.title.icon = imageIcon;

    // Add a refresh button to the toolbar
    const refreshButton = new ToolbarButton({
      icon: refreshIcon,
      tooltip: 'Refresh image',
      onClick: () => {
        widget.load_image();
      }
    });
    this.toolbar.addItem('refresh', refreshButton);
  }
}
