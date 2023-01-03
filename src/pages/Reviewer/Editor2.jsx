import React, { Component } from "react";
import { convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToMarkdown from "draftjs-to-markdown";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

class EditorConvertToMarkdown extends Component {
  state = {
    editorState: this.props.formFields.comment,
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    console.log(editorState);
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
        {/* <textarea
          disabled
          value={
            editorState &&
            draftToMarkdown(convertToRaw(editorState.getCurrentContent()))
          }
        /> */}
      </div>
    );
  }
}
export default EditorConvertToMarkdown;
