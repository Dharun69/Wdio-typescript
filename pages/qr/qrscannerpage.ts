

export class QrScannerPage {

    private selectors = {
        qrheader : "~container header",
    }

    public async getQrHeader() {
        return await $(this.selectors.qrheader);
    }
    
}