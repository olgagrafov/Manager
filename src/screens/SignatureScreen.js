import React, { Component } from 'react';
import Signature from "react-native-signature-canvas";

class SignatureScreen extends Component {
    
    handleEmpty = () => {
        alert("It's sign is empty");
    };
    
    handleSave = (signature) => {
        this.props.navigation.navigate('Edit Receipt', signature);
    }

    signatureStyle = `
      .m-signature-pad {
          position: absolute;
          font-size: 10px;
          width: 100%;
          height:100%;
          margin: 5px;
          border: 1px solid #e8e8e8;
          background-color: #fff;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.08) inset;
        }
      .m-signature-pad--body {
          position: absolute;
          margin: 5px;
          left: 10px;
          right: 80px;
          top: 10px;
          bottom: 60px;
          width: 100%;
          height:85%;
          border: 1px solid #f4f4f4;
        }
      .m-signature-pad--footer {
          position: absolute;
          left: 20px;
          right: 20px;
          bottom: 20px;
          height: 40px;
          width: 90%;
        }
      .m-signature-pad--footer
        .description {
          color: #3F52CD;
        }  
      .m-signature-pad--footer
        .button {
          background-color: #3F52CD;
          width: 90px;
          height: 30px;   
          padding-bottom: 40px;
    }`;
   
render() {
    return (
         <Signature
                onOK={this.handleSave}
                onEmpty={this.handleEmpty}
                descriptionText="Sign the Reseipt"
                clearText="Clear"
                confirmText="Save"
                autoClear={true}
                webStyle={this.signatureStyle}
            />           
    );}

}
export default SignatureScreen;