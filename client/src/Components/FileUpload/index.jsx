import React from 'react'
import axios from 'axios';

/**
 * ReactJS implementation of http://jsfiddle.net/LvsYc/
 * @uses Foundation 6
 * @see http://stackoverflow.com/questions/4459379/preview-an-image-before-it-is-uploaded
 */
class FileUpload extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        id : "fileUpload", // I would use this.props.id for a real world implementation
        fileURI : null
      }
    }
    
    buildFileTag(){
        //console.log (this.state.fileURI)
      let fileTag = null;
      if (this.state.fileURI !== null)
        fileTag = this.state.fileURI
                   
      return fileTag;
    }
    
    readURI(e){
      if(e.target.files && e.target.files[0]){
        let reader = new FileReader();
        reader.onload = function(ev){
          this.setState({fileURI:ev.target.result});
        }.bind(this);
        reader.readAsDataURL(e.target.files[0]);
      }
    }
    
    handleChange(e){
      this.readURI(e); // maybe call this with webworker or async library?
      if (this.props.onChange !== undefined)
        this.props.onChange(e); // propagate to parent component
            }
  
    render() {
      const fileTag = this.buildFileTag();
  
      return <div>
              <label
                htmlFor={this.state.id}
                className="button">
                Upload an image
              </label>
              <input
                id={this.state.id}
                type="file"
                onChange={this.handleChange.bind(this)}
                className="show-for-sr" />

                <p>{fileTag}</p>
              
            </div>;
    }
  }
export default FileUpload