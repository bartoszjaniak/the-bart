
export { };

declare global {
    interface Window {
        dataLayer: any[];
        gtag: (command: string, targetId?: string | Date, config?: any) => void;
    }
    
    // Global gtag function
    function gtag(command: string, targetId?: string | Date, config?: any): void;
}