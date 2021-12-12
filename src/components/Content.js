import React from 'react'
import EditorJS from '@editorjs/editorjs';
import Signup from './Signup';

export default function Content() {

    const editor = new EditorJS();

    return (
        <Signup/>
    )
}
