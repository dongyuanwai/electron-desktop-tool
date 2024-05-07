export const getDesktopCapturerSource = async () => {
    return await (window as any).ipcRenderer.invoke("ev:send-desktop-capturer_source", []);
  };
  
  
    // 获取指定id设备的视频流
  export const  getInitStream = async (
      source: { id: string },
      audio?: boolean
    ): Promise<MediaStream | null> =>{
      return new Promise((resolve, _reject) => {
        // 获取指定窗口的媒体流
        // 此处遵循的是webRTC的接口类型  暂时TS类型没有支持  只能断言成any
        (navigator.mediaDevices as any)
          .getUserMedia({
            audio: audio
              ? {
                  mandatory: {
                    chromeMediaSource: "desktop",
                  },
                }
              : false,
            video: {
              mandatory: {
                chromeMediaSource: "desktop",
                chromeMediaSourceId: source.id,
              },
            },
          })
          .then((stream: MediaStream) => {
            resolve(stream);
          })
          .catch((error: any) => {
            console.log(error);
            resolve(null);
          });
      });
    }
  
    