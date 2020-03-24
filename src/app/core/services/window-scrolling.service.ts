
export class WindowScrollBlockService {
    private styleTag: HTMLStyleElement;

    constructor() {
        this.styleTag = this.buildStyleElement();
    }

    public disable(): void {
        document.body.appendChild(this.styleTag);
    }

    public enable(): void {
        document.body.removeChild(this.styleTag);
    }

    private buildStyleElement(): HTMLStyleElement {

        var style = document.createElement('style');

        style.type = "text/css";
        style.setAttribute('data-debug', "injected by WindowScrollingService.");
        style.textContent = `
        body {
            overflow: hidden!important;
        }
        `;

        return ( style );
    }
}