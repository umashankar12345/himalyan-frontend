import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React, { Component } from "react";
import { convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

class EditorConvertToJSON extends Component {
  constructor(props) {
    super(props);
    const content = {
      entityMap: {},
      blocks: [
        {
          key: "637gr",
          text: "this is initial state",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
    };

    const contentState = convertFromRaw(content);
    this.state = {
      contentState,
    };
  }

  onContentStateChange = (contentState) => {
    this.setState({
      contentState,
    });
    this.props.setFormFields((prev) => ({
      ...prev,
      comment: contentState.blocks[0].text,
    }));
    console.log(contentState.blocks[0].text);
  };

  render() {
    return (
      <div>
        <Editor
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onContentStateChange={this.onContentStateChange}
        />
        {/* <textarea disabled value={JSON.stringify(contentState, null, 4)} /> */}
      </div>
    );
  }
}

export default EditorConvertToJSON;
