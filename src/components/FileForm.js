import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import * as firebase from 'firebase';
import { BootstrapTable, TableHeaderColumn  } from 'react-bootstrap-table';
class FileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Titre: '',
            date: '',
            Description: '',
            Classification: '',
            Specialite: '',
            Fiche: '',
            products: [],
            rows:'0',
            key:'',

            error: {
                message: ''
            }
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.userRef = firebase.database().ref('fiches');
       // this.updateInputValue = this.updateInputValue.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.select=this.select.bind(this);
        this.select2 = this.select2.bind(this);
       this.removeItem = this.removeItem.bind(this);
      // this.handleForm = this.handleForm.bind(this);
       
    }
    handleInputChange(event) {
        this.setState({ FileForm: event.target.value });
    }

   // handleForm(e){
    //e.preventDefault()
      //    return this.handleSubmit(e)
   /// }


    handleSubmit(e) {
      
        e.preventDefault();      
        var dateFormat = require('dateformat');
        let titre = document.getElementById('Titre').value;
        let description = document.getElementById('Description').value;
        let classification = document.getElementById('Classification').value;
        let specialite = document.getElementById('Specialite').value;
        let fiches = document.getElementById('Fiches').value;
        

        const CurrentDate = dateFormat("dd/mm/yyyy");
        const newfile = {
            Titre: titre,
            date: CurrentDate,
            Description: description,
            Classification: classification,
            Specialite: specialite,
            Fiche: fiches,
            rows: this.state.rows,
            
        };
        alert(JSON.stringify(newfile, null, 2));
        this.userRef.push({
            Titre: titre,
            date: CurrentDate,
            Description: description,
            Classification: classification,
            Specialite: specialite,
            Fiche: fiches,
            rows: this.state.rows,
            
            
        });
        const UploadPromise = new Promise((resolve, reject) => { 
            var uploader = document.getElementById('uploader');
         const file = this.fileUpload.files[0];
        var reader = new FileReader();
        reader.onloadend = function (evt) {
            var blob = new Blob([evt.target.result], { type: "file/rar" });
            resolve(blob);

            var storageUrl = 'files/';
            var storageRef = firebase.storage().ref(storageUrl + file.name);
            console.warn(file); // Watch Screenshot
            var uploadTask = storageRef.put(blob);
            

            uploadTask.on('state_changed', function progress(snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(percentage)
                uploader.value = percentage;
                
           }, function error(err) {


            }, function complete() {  console.log("upload DONE!!!!!")
                     
            });

           }
        
        reader.onerror = function (e) {
            return reject(this)
        //    console.log("Failed file read: " + e.toString());
        }   ;
            if (file!=null){      reader.readAsArrayBuffer(file);
            }
            else{
                console.log("no file uploaded")
            }  
      })
    }

    select() {
        firebase.database().ref('Classification').once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var x = document.createElement("option")
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
               // console.log(childKey, childData)
                var t = document.createTextNode(childData);
                x.innerHTML = childData;
                document.getElementById("Classification").appendChild(x);

            }
            )
        }
        )

    }
    select2() {
        firebase.database().ref('Specialite').once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var x = document.createElement("option")
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
               // console.log(childKey, childData)
                var t = document.createTextNode(childData);
                x.innerHTML = childData;
                document.getElementById("Specialite").appendChild(x);

            }
            )
        }
        )

    }
    



     componentDidMount() {
        
        this.userRef.on('value', this.gotData, this.errData);
        this.select(); 
        this.select2(); 
       
     }
  gotData = (data) => {
    
      //console.log(data.val());
        let newProducts = []
        const userdata = data.val();
        
        if (userdata === null) { 
            this.setState({ products: [] });   
            return alert('Base vide ') }
        else{
         const keys = Object.keys(userdata)
          root.count1 = (keys.length).toString();
          this.setState({ rows: root.count1 })
       //console.log(keys)
        //console.log(root.count1);
        for (let i = 0; i < keys.length; i++) {
            var k = keys[i];
           // var titre = userdata[k].Titre;
           // console.log(k);
           // var description = userdata[k].Description;
           // console.log(titre,description)
           newProducts.push({
                Classification: userdata[k].Classification, Description: userdata[k].Description, Specialite: userdata[k].Specialite, Titre: userdata[k].Titre, date: userdata[k].date, rows: userdata[k].rows, key:k,
            });
            //console.log(newProducts);
        }
        this.setState({ products: newProducts });
    console.log(JSON.stringify (newProducts));
        }
    }
    errData = (err) => {
        console.log(err)
    }
          
    handleClick = (rowKey) => {
        alert(this.refs.table.getPageByRowKey(rowKey));

    }
    removeItem(id) {
        //console.log(this.state.search)
      //  alert(this.state.search)

      //  var p1 = new Promise(
        //    function (resolve, reject) { 

        



        //console.log(this.state.products[id].key)    
        const MyRowkey = this.state.products[id].key;
        var p2 = new Promise(function (resolve, reject) {
        firebase.database().ref('fiches/' + MyRowkey).remove()

       
        resolve(console.log("Item deleted successfully"));
        });

        p2.then(function () {
            console.log("row number " +id+" removed from my table"); // Succès !
        }, function () {
            console.log("Failed"); // Erreur !
        });
    

     //   p1.then(
      //      this.state.products.splice(id)
     //   ).catch(
            // Promesse rejetée
        //    function () {
      //          return reject(this)
    //        });
    
  //  }




 //   )
        //console.log("value of input field : " + this.state.inputfield);
            
       // firebase.database().ref('fiches').orderByChild('rows').equalTo(id).on("value", function (snapshot) {

         //   console.log(firebase.database().ref('fiches').child('Titre'));
            //console.log(newPostKey)
          
          //  snapshot.ref().remove();
            //snapshot.ref.remove();
            
     
     // console.log(newPostKey)
     // firebase.database().ref().child(newPostKey).orderByChild('rows').equalTo(id.toString()).on("child_added", function (snapshot) {
       //   snapshot.ref.remove();
      //return firebase.database().ref('fiches').child(newPostKey).remove()
        
        
     //})
        
    }
    updateItem(id){

  

        var dateFormat = require('dateformat');
        let titre = document.getElementById('Titre').value;
        let description = document.getElementById('Description').value;
        let classification = document.getElementById('Classification').value;
        let specialite = document.getElementById('Specialite').value;
        let fiches = document.getElementById('Fiches').value;


        const CurrentDate = dateFormat("dd/mm/yyyy");
        const MyRowkey = this.state.products[id].key;

        var p1 = new Promise(function (resolve, reject) {
       
            firebase.database().ref('fiches/' + MyRowkey).update({
                Titre: titre,
                date: CurrentDate,
                Description: description,
                Classification: classification,
                Specialite: specialite,
                Fiche: fiches,
            rows: id })
            resolve(console.log("Item updated successfully"));
        });

        p1.then(function () {
            console.log("update my table"); // Succès !
          
        }, function () {
            console.log("Failed"); // Erreur !
        });
    }
 
 
 
 
 
    cellButton(cell, row, enumObject, rowIndex) {
        return (
            <button
                type="button"
                className="btn btn-labeled btn-danger"
                
                onClick={this.removeItem.bind(this,rowIndex)}
            >
                
                supprimer 
            </button>
        )
    } 
    cellsButton(cell, row, enumObject, rowIndex) {
        return (
            <button
                type="button"
                className="btn btn-labeled btn-warning"
                onClick={this.updateItem.bind(this, rowIndex)}
            >
               
            
                Modifier 
            </button>
        )
    }    
   



   // firebase.database().ref('fiches').orderByChild('rows').equalTo(id).on("value", function (snapshot) {

         //   console.log(firebase.database().ref('fiches').child('Titre'));
            //console.log(newPostKey)

          //  snapshot.ref().remove();


    
    render() {
        return (
      
            <div>

                <section className="content-header">
                </section>
                <div id="main" className="container" >
                    
                    <form onSubmit={e => this.handleSubmit(e)} className="form-horizontale">
                        <div className="form-group">
                            <label >Titre</label>
                            
                            <input 
                                type="text" className="form-control"  
                                id="Titre" placeholder="Titre..." 
                                pattern="[A-Za-z].{3,}" title="Au moins 4 lettres"
                                required/>
                            </div>
                        <div className="form-group">
                            <label >Description</label>
                            <textarea id="Description" 
                                pattern="[A-Za-z]" title="aucune description"
                                 type="text" 
                                 rows="4"
                                 cols="255"
                                 className="form-control"
                            placeholder="Description..." 
                             required/>
                        </div>
                        <div className="form-group">
                            <label >Classification</label>
                            <select id="Classification" className="form-control"required> </select>
                        </div>
                        <div className="form-group">
                            <label >Specialites</label>
                            <select id='Specialite' className="form-control" required ></select>
                        </div>
                        <div className="form-group">
                            <label>Fiche</label>
                            <input id='Fiches' type='file' label='Upload' accept='.txt'
                                
                                ref={function (ref) { this.fileUpload = ref }.bind(this)}
                            />
                            <progress id="uploader" value={this.progress} max="100"></progress>
                              </div>
                        <button id='btn'
                     type="submit" className="btn btn-labeled btn-success">
                    <span className="btn-label"><i className="glyphicon glyphicon-ok"></i></span>Add</button>
                    </form>
                </div>
                <section className="content-header">
            <h2>Liste des fichiers </h2>
                </section>
                <BootstrapTable
                    ref='table'
                remote={true} 
                data={this.state.products}        
                striped={true}
                 hover={true}
                    >
                    <TableHeaderColumn dataField='Titre' >Titre</TableHeaderColumn>
                    <TableHeaderColumn dataField='date' isKey={true}>Date</TableHeaderColumn>
                    <TableHeaderColumn dataField='Description'>Description</TableHeaderColumn>
                    <TableHeaderColumn dataField='Classification' >Classification</TableHeaderColumn>
                    <TableHeaderColumn dataField='Specialite' dataSort={true}>Specialite</TableHeaderColumn>
                    <TableHeaderColumn dataField='button' dataFormat={this.cellButton.bind(this)}>Supprimer</TableHeaderColumn>
                    <TableHeaderColumn dataField='button' dataFormat={this.cellsButton.bind(this)}>Modifier</TableHeaderColumn>
                </BootstrapTable>   
             </div>
                )
    
    }
}


function mapStateToProps(state) {
    return { FileForm: state.FileForm };
}

export default connect(mapStateToProps, actions)(FileForm);