export const createDialog = (url: string, config: any): Promise<Window> => {
  return new Promise((resolve, reject) => {
    const windowProxy = window.open(url, '_blank', JSON.stringify(config));
    const readyHandler = (e: any) => {
      let msg = e.data;
      if (msg['msgName'] === '__dialogReady') {
        window.removeEventListener('message', readyHandler);
        resolve(windowProxy as Window);
      }
    };
    window.addEventListener('message', readyHandler);
  })
};

export const dialogReady = (): void => {
  const msg = { msgName:  '__dialogReady' };
  window.opener.postMessage(msg);
};
