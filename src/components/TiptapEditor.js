'use client';

import React, { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function TiptapEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    return () => editor?.destroy(); // clean up on unmount
  }, [editor]);

  return (
    <div className="border p-4 rounded">
      <EditorContent editor={editor} />
    </div>
  );
}
