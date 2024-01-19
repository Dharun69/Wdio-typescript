export class SwitchContextUtils {
    async switchContext(contextName: string, timeout?: number): Promise<void> {
        const actualTimeout = timeout ?? 60000;

        try {
            const currentContext = await driver.getContext();
            if (currentContext.toString().includes(contextName)) {
                console.log(`Already in ${contextName} View.`);
                return;
            }

            await driver.waitUntil(
                async () => {
                    const contexts = await driver.getContexts();
                    return contexts.some(context => context.toString().includes(contextName));
                },
                { timeout: actualTimeout }
            );

            const contexts = await driver.getContexts();
            const context = contexts.find(c => c.toString().includes(contextName));

            if (!context) {
                console.error(`Context ${contextName} not found.`);
                return;
            }

            await driver.switchContext(context.toString());
        } catch (err) {
            console.error(`Error during switching to ${contextName} view: \n${(err as Error).stack}`);
            throw err;
        }
    }

    async switchToNativeContext(timeout?: number): Promise<void> {
        await this.switchContext('NATIVE_APP', timeout);
    }

    async switchToWebContext(timeout?: number): Promise<void> {
        await this.switchContext('WEBVIEW', timeout);
    }
}
