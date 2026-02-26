declare module 'react-quill' {
    import React from 'react';

    type QuillDelta = { ops: unknown[] };
    type QuillModules = Record<string, unknown>;

    export interface ReactQuillProps {
        bounds?: string | HTMLElement;
        children?: React.ReactElement;
        className?: string;
        defaultValue?: string | QuillDelta;
        formats?: string[];
        id?: string;
        modules?: QuillModules;
        onChange?: (content: string, delta: unknown, source: string, editor: unknown) => void;
        placeholder?: string;
        readOnly?: boolean;
        theme?: string;
        value?: string | QuillDelta;
    }
    export default class ReactQuill extends React.Component<ReactQuillProps> {}
}
