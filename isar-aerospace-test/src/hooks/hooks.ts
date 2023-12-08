import React, { useEffect, useRef, useState } from 'react';

const useOutsideClick = (callback: () => void) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (event: { target: any }) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };
        document.addEventListener('click', handleClick, true);

        return () => {
            document.removeEventListener('click', handleClick, true);
        };
    }, [ref]);
    return ref;
};

function useOutsideAlerter(ref: any, ref2:any, onOutSideClick: () => void) {
    useEffect(() => {
      function handleClickOutside(event: { target: any; }) {
        if (ref.current && !ref.current.contains(event.target) && !ref2.current.contains(event.target)) {
          onOutSideClick()
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [onOutSideClick, ref]);
};

function useWs(url: string) {
  const [isReady, setIsReady] = useState<boolean>(false)
  const [val, setVal] = useState(null)

  const ws = useRef<any>(null)

  useEffect(() => {
    const socket = new WebSocket(url)
    socket.onopen = () => setIsReady(true)
    socket.onclose = () => setIsReady(false)
    socket.onmessage = (event) => setVal(event.data)

    ws.current = socket

    return () => {
      socket.close();
    }
  })

  return [isReady, val, ws.current?.send.bind(ws.current)]
}

export { useOutsideClick, useOutsideAlerter, useWs };