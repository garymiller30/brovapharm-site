import React from 'react'
import { createBoard } from '@wixc3/react-board';

export default createBoard({
    name: 'New Board',
    Board: () => <div></div>,
    isSnippet: true,
    environmentProps: {
        windowWidth: 1024,
        windowHeight: 768
    }
});
