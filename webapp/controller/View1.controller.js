
sap.ui.define(
        ["sap/ui/core/mvc/Controller", "sap/m/MessageBox",
         "sap/base/Log", 
         "sap/ui/model/json/JSONModel", 
         "sap/base/security/URLWhitelist",
         "sap/m/PDFViewer",],
        /**
         * @param {typeof sap.ui.core.mvc.Controller} Controller
         */
        function (Controller, MessageBox, Log, JSONModel, URLWhitelist,PDFViewer) {
            "use strict";
    
            return Controller.extend("adobe02.controller.View1", {
                onInit: function () {},
                  pressRenderSign: function () {
                      const printd = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><form1><LabelForm><DeliveryId>Mirum est</DeliveryId><Position>Ego ille</Position><MaterialNo>Si manu</MaterialNo><Quantity>11111</Quantity><Package>Mirum est</Package><QRCode>111111</QRCode></LabelForm><LabelForm><DeliveryId>Ad retia</DeliveryId><Position>Licebit </Position><MaterialNo>Proinde</MaterialNo><Quantity>Am undique</Quantity><Package>Ad retia</Package><QRCode>22222</QRCode></LabelForm><LabelForm><DeliveryId>meditabar aliquid </DeliveryId><Position>Vale</Position><MaterialNo>Ego ille</MaterialNo><Quantity>Si manu vacuas</Quantity><Package>Apros t</Package><QRCode>33333</QRCode></LabelForm></form1>";
                      const printdb64 = btoa(printd);
                     const pdfcontent = JSON.stringify( {
                          embedFont: 0,
                          formLocale: "en_US",
                          formType: "print",
                          taggedPdf: 1,
                          xdpTemplate: "labelprint/PrintLabel",
                          xmlData: printdb64
                       });
                       const myHeaders = new Headers();
                       myHeaders.append("Content-Type", "application/json");
                       let requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: pdfcontent,
                        redirect: 'follow'
                      };
                      fetch("/adobeforms_dest/v1/adsRender/pdf?templateSource=storageName", requestOptions).then(response => response.json() ).then( jbody => {
                        const signBody = {
                          "credentialAlias": "jackysignature",
                          "signatureFieldName": "signature",
                           "reasonInfo": "approval",
                           "locationInfo": "Shanghai",
                           "contactInfo": "<youremail>",
                           "pdf":  jbody.fileContent
                        };
                        requestOptions = {
                          method: 'POST',
                          headers: myHeaders,
                          body: JSON.stringify(signBody),
                          redirect: 'follow'
                        };
                        fetch("/adobeforms_dest/v1/pdf/adsSet/signature",requestOptions).then(response1 => response1.json() ).then( jbody1 => {
                          const deccont = atob(jbody1.fileContent) ;
                          const byteNumbers = new Array(deccont.length);
                          for (let i = 0; i < deccont.length; i++) {
                              byteNumbers[i] = deccont.charCodeAt(i);
                          }
                          const byteArray = new Uint8Array(byteNumbers);
                          const blob = new Blob([byteArray], {type: "application/pdf"});
                          const pdfDocumentURL = URL.createObjectURL(blob);
                          this._pdfModel = new JSONModel({
                            Source: pdfDocumentURL,
                            Title: "pdf document",
                            Height: "600px"
                          });
                          URLWhitelist.add("blob");
                          this.byId("pdfview").setModel(this._pdfModel);
                         }).catch( error => {
                           console.log('error', error);
                        });
                        })
                    },

                  pressRender: function () {
                    //const printd = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><form1><LabelForm><DeliveryId>Mirum est ut animus agitatione motuque corporis excitetut.</DeliveryId><Position>Ego ille</Position><MaterialNo>Si manu vacuas</MaterialNo><Quantity>Apros tres et quidem</Quantity><Package>Mirum est</Package><QRCode>01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789</QRCode></LabelForm><LabelForm><DeliveryId>Ad retia sedebam: erat in proximo non venabulum aut lancea, sed stilus et pugilares:</DeliveryId><Position>Licebit auctore</Position><MaterialNo>Proinde</MaterialNo><Quantity>Am undique</Quantity><Package>Ad retia sedebam</Package><QRCode>01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789</QRCode></LabelForm><LabelForm><DeliveryId>meditabar aliquid enotabamque, ut, si manus vacuas, plenas tamen ceras reportarem.</DeliveryId><Position>Vale</Position><MaterialNo>Ego ille</MaterialNo><Quantity>Si manu vacuas</Quantity><Package>Apros tres et quidem</Package><QRCode>01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789</QRCode></LabelForm></form1>";
                    const printd = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><form1><LabelForm><DeliveryId>Mirum est</DeliveryId><Position>Ego ille</Position><MaterialNo>Si manu</MaterialNo><Quantity>11111</Quantity><Package>Mirum est</Package><QRCode>111111</QRCode></LabelForm><LabelForm><DeliveryId>Ad retia</DeliveryId><Position>Licebit </Position><MaterialNo>Proinde</MaterialNo><Quantity>Am undique</Quantity><Package>Ad retia</Package><QRCode>22222</QRCode></LabelForm><LabelForm><DeliveryId>meditabar aliquid </DeliveryId><Position>Vale</Position><MaterialNo>Ego ille</MaterialNo><Quantity>Si manu vacuas</Quantity><Package>Apros t</Package><QRCode>33333</QRCode></LabelForm></form1>";

                    const printdb64 = btoa(printd);
    
                   const pdfcontent = JSON.stringify( {
                        embedFont: 0,
                        formLocale: "en_US",
                        formType: "print",
                        taggedPdf: 1,
                        xdpTemplate: "labelprint/PrintLabel",
                        xmlData: printdb64
                     });
    
                     const myHeaders = new Headers();
                     myHeaders.append("Content-Type", "application/json");
    
                     const requestOptions = {
                      method: 'POST',
                      headers: myHeaders,
                      body: pdfcontent,
                      redirect: 'follow'
                    };
    
                    fetch("/adobeforms_dest/v1/adsRender/pdf?templateSource=storageName", requestOptions).then(response => response.json() ).then( jbody => {
                      const deccont = atob(jbody.fileContent) ;
                      const byteNumbers = new Array(deccont.length);
    
                      for (let i = 0; i < deccont.length; i++) {
                          byteNumbers[i] = deccont.charCodeAt(i);
                      }
    
                      const byteArray = new Uint8Array(byteNumbers);
                      const blob = new Blob([byteArray], {type: "application/pdf"});
                      const pdfDocumentURL = URL.createObjectURL(blob);
                      this._pdfModel = new JSONModel({
                        Source: pdfDocumentURL,
                        Title: "pdf document",
                        Height: "600px"
                      });
                      URLWhitelist.add("blob");
                      this.byId("pdfview").setModel(this._pdfModel);
                     }).catch( error => {
                       console.log('error', error);
                    });
                  },

                  pressMyPDF: function () {
                    let printd =
                    "<?xml version='1.0' encoding='UTF-8'?>" +
                    "<form1>" +
                    "<Name>Jungwoo</Name>" +
                    "<Addr>An YANG </Addr>" +
                    "<Phone>010-2234-5566</Phone></form1>";     
                    var encoder = new TextEncoder();
                    var data = encoder.encode(printd);
                    var printdb64 = this.base64FromArrayBuffer(data);
    
                    var pdfcontent = {
                        embedFont: 0,
                        formLocale: "en_US",
                        formType: "print",
                        taggedPdf: 1,
                        xdpTemplate: "Jwtest/Jwtest",
                        xmlData: printdb64
                    };
                    $.ajax({
                       // url: jQuery.sap.getModulePath( "/adobeforms_dest/v1/adsRender/pdf?templateSource=storageName&TraceLevel=0"),
                        url: "/adobeforms_dest/v1/adsRender/pdf?templateSource=storageName",
                      //url: "https://adsrestapi-formsprocessing.cfapps.jp10.hana.ondemand.com/v1/adsRender/pdf?templateSource=storageName",
                        type: "POST",
                        //"headers": {
                        //  "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vcG90YWxkZW1vc3ZjLXk1NnZ3cmk5LmF1dGhlbnRpY2F0aW9uLmpwMTAuaGFuYS5vbmRlbWFuZC5jb20vdG9rZW5fa2V5cyIsImtpZCI6ImRlZmF1bHQtand0LWtleS0xMTUwNzEwMTAyIiwidHlwIjoiSldUIiwiamlkIjogIkV2OTFZRnhxUktPMTBXYWdoZEQyVWl2UkNKRy8rY0VxSG84ZDI1a3QxSUk9In0.eyJqdGkiOiJmYmYyYjk2N2MyNDU0NDJhODEyY2IzMjliZTQxNGJlMCIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiJmZWMxNjRhMS01MzZlLTQyYTktYWUzOS0zZmM0OWQ1YTdhNGUiLCJ6ZG4iOiJwb3RhbGRlbW9zdmMteTU2dndyaTkiLCJzZXJ2aWNlaW5zdGFuY2VpZCI6IjU1YjMwOWJmLTllMjItNDk5MC1hZmE3LTA4NzkxMGQ2MDMxZCJ9LCJzdWIiOiJzYi01NWIzMDliZi05ZTIyLTQ5OTAtYWZhNy0wODc5MTBkNjAzMWQhYjQ4NzB8YWRzLXhzYXBwbmFtZSFiMzQ0NiIsImF1dGhvcml0aWVzIjpbImFkcy14c2FwcG5hbWUhYjM0NDYuQURTQ2FsbGVyIiwidWFhLnJlc291cmNlIiwiYWRzLXhzYXBwbmFtZSFiMzQ0Ni5UZW1wbGF0ZVN0b3JlQ2FsbGVyIl0sInNjb3BlIjpbImFkcy14c2FwcG5hbWUhYjM0NDYuQURTQ2FsbGVyIiwidWFhLnJlc291cmNlIiwiYWRzLXhzYXBwbmFtZSFiMzQ0Ni5UZW1wbGF0ZVN0b3JlQ2FsbGVyIl0sImNsaWVudF9pZCI6InNiLTU1YjMwOWJmLTllMjItNDk5MC1hZmE3LTA4NzkxMGQ2MDMxZCFiNDg3MHxhZHMteHNhcHBuYW1lIWIzNDQ2IiwiY2lkIjoic2ItNTViMzA5YmYtOWUyMi00OTkwLWFmYTctMDg3OTEwZDYwMzFkIWI0ODcwfGFkcy14c2FwcG5hbWUhYjM0NDYiLCJhenAiOiJzYi01NWIzMDliZi05ZTIyLTQ5OTAtYWZhNy0wODc5MTBkNjAzMWQhYjQ4NzB8YWRzLXhzYXBwbmFtZSFiMzQ0NiIsImdyYW50X3R5cGUiOiJjbGllbnRfY3JlZGVudGlhbHMiLCJyZXZfc2lnIjoiM2I3MmJhMDciLCJpYXQiOjE3MTA2NTYxNzMsImV4cCI6MTcxMDY1OTc3MywiaXNzIjoiaHR0cHM6Ly9wb3RhbGRlbW9zdmMteTU2dndyaTkuYXV0aGVudGljYXRpb24uanAxMC5oYW5hLm9uZGVtYW5kLmNvbS9vYXV0aC90b2tlbiIsInppZCI6ImZlYzE2NGExLTUzNmUtNDJhOS1hZTM5LTNmYzQ5ZDVhN2E0ZSIsImF1ZCI6WyJzYi01NWIzMDliZi05ZTIyLTQ5OTAtYWZhNy0wODc5MTBkNjAzMWQhYjQ4NzB8YWRzLXhzYXBwbmFtZSFiMzQ0NiIsInVhYSIsImFkcy14c2FwcG5hbWUhYjM0NDYiXX0.A6t0gwHTvTYsxKGfzrSpbufAogaEn2DZQLb3j-5Lk_sDUlexHXffD4xxvIoe81TR1VDzEqok9nnpVi5kqsTunmkEpeNdZWj1yYPywdshcMWrLlyaHnoeUIZ2X8N9zgtqgsD3KbgQTUaTVVaxZdh0pcyTX71v5LtaQV2bMb0a7hRj3vA34jnePFEd0XQRjCVajgQIbkS0M4uuaHq3ehwtHjKwekYCCSZc4qd6RIY0jLnGzsnm8mVeifLAzKzqZ4TKCe-Gd1er2lmp5mZVmrLfy761BrpAFWCE16PIdCV6mrskp7Mhq0tI7Qw_GD5yEd-GwkqV4Jo8XebERjgE96cczQ" 
                        //},
                        data: JSON.stringify(pdfcontent),
                        contentType: "application/json",
                        async: false,
                        //beforeSend: function (xhr) {
                        //},
                        success: function (data) {
                            const deccont = atob(data.fileContent);
                            const byteNumbers = new Array(deccont.length);
    
                            for (let i = 0; i < deccont.length; i++) {
                                byteNumbers[i] = deccont.charCodeAt(i);
                            }
    
                            const byteArray = new Uint8Array(byteNumbers);
                            console.log(byteArray)
                            const blob = new Blob([byteArray], { type: "application/pdf" });
                            console.log(blob)
                            var pdfDocumentURL = URL.createObjectURL(blob);
                            if (!this._pdfViewer) {
                                this._pdfViewer = new PDFViewer();
                                this._pdfViewer.attachError(event => ErrorHandlerSingleton.getInstance().onError(event));
                                URLWhitelist.add("blob");
                            }
                            this._pdfViewer.setSource(pdfDocumentURL);
                            this._pdfViewer.open();
                        },
                        error: function (err) {
                            console.log(err);
                            MessageBox.information(JSON.stringify(err));
    
                        }
                    });                               
                  },
                  base64FromArrayBuffer: function (arrayBuffer) {
                    let binary = '';
                    let bytes = new Uint8Array(arrayBuffer);
                    let len = bytes.byteLength;
                    for (let i = 0; i < len; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    return btoa(binary);
                },
            });
            
        },
        
    );        