export const isMockup = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const mockup = urlParams.get('mockup');
    return (mockup === 'true');
}
