import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions';
import reducers from '../reducers';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';
import  '../index.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ReactPhoneInput from 'react-phone-input'


class Medecin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            telephone: '',
            adresse: '',
            specialite: '',
            medecins: [],
            rows: '0',
            key: '',

            dataval:'',
            error: {
                message: ''
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.userRef = firebase.database().ref('medecin');
        // this.updateInputValue = this.updateInputValue.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.select = this.select.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleInputChange(event) {
        this.setState({ Medecin: event.target.value });
    }
    handleSubmit(e) {

        e.preventDefault(); 
        let name = document.getElementById('nom').value;
        let email = document.getElementById('email').value;
        let telephone =this.state.telephone;
        let adresse = document.getElementById('adresse').value;
        let specialite = document.getElementById('Specialite').value;
         const newmedecin = {
            name: name,
            email:email,
            telephone: telephone,
            adresse: adresse,
            Specialite: specialite,
            rows: this.state.rows,

        };
        alert(JSON.stringify(newmedecin, null, 2));
        this.userRef.push({
            name: name,
            email: email,
            telephone: telephone,
            adresse: adresse,
            Specialite: specialite,
            rows: this.state.rows,

        });

    }
    select() {
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
    }
    gotData = (data) => {
        let newMedecins = []
        //console.log(data.val());
        var userdata = data.val();
        if (userdata === null) {
            this.setState({ medecins: [] });
            return alert('Base vide ')
        }
        else {
        const keys = Object.keys(userdata);
        root.count1 = (keys.length).toString();
        this.setState({ rows: root.count1 })
        //console.log(keys)
        //console.log(root.count1);
        for (let i = 0; i < keys.length; i++) {
            var k = keys[i];
            
            // console.log(titre,description) 
            newMedecins.push({
                name: userdata[k].name, email: userdata[k].email, Specialite: userdata[k].Specialite, telephone: userdata[k].telephone, adresse: userdata[k].adresse, rows: userdata[k].rows, key: k,
            });
            //console.log(newProducts);
        }
        this.setState({ medecins: newMedecins });
    }
    }
    errData = (err) => {
        console.log(err);
    }

    handleClick = (rowKey) => {
        alert(this.refs.table.getPageByRowKey(rowKey));
    }
    removeItem(id) {
        const MyRowkey = this.state.medecins[id].key;
        var p2 = new Promise(function (resolve, reject) {
            firebase.database().ref('medecin/' + MyRowkey).remove()


            resolve(console.log("Item deleted successfully"));
        });

        p2.then(function () {
            console.log("row number " + id + " removed from my table"); // Succès !
        }, function () {
            console.log("Failed"); // Erreur !
        });


    }

    updateItem(id) {


        let name = document.getElementById('nom').value;
        let telephone =this.state.telephone;
        let email = document.getElementById('email').value;
        let adresse = document.getElementById('adresse').value;
        let specialite = document.getElementById('Specialite').value;
        const MyRowkey = this.state.medecins[id].key;

        var p1 = new Promise(function (resolve, reject) {

            firebase.database().ref('medecin/' + MyRowkey).update({
                name: name,
                email: email,
                telephone: telephone,
                adresse: adresse,
                Specialite: specialite,
                rows: id
            })
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

                onClick={this.removeItem.bind(this, rowIndex)}
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
    handleOnChange(value) {
        this.setState({
            telephone: value
        });
        };
    

    render() {

        return (
           
            <div>

                <section className="content-header">
                </section>
                <div id="main" className="container" >

                    <form onSubmit={e => this.handleSubmit(e)}className="form-horizontale">
                        <div className="form-group">
                            <label >Nom</label>
                            <input pattern="[A-Za-z]{3,}" title="Au moins 4 lettres"
                                type="text" className="form-control"
                                id="nom" placeholder="Nom..." required />
                                 
                        </div>
                        <div className="form-group">
                            <label >email</label>
                            <input type="mail" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" className="form-control" id="email" placeholder="email" required/>
                        </div>
                        <div className="form-group">
                            <label >Telephone</label>
                            <ReactPhoneInput type="text" className="form-control" id="telephone" placeholder="telephone" required defaultCountry={'tn'} onChange={this.handleOnChange}/>                            
                                              </div>

                        <div className="form-group">
                            <label >Adresse</label>
                            <input type="text" className="form-control" id="adresse" placeholder="Adresse" required/>
                        </div>


                        <div className="form-group">
                            <label >Specialites</label>
                            <select className="form-control" id="Specialite" required>
                               
                            </select>
                        </div>

                        <button id='btn' type="submit" className="btn btn-labeled btn-success">
                            <span className="btn-label"><i className="glyphicon glyphicon-ok"></i></span>Add</button>
                    </form>
                </div>
                <section className="content-header">
                    <h2>Liste des medecins </h2>
                </section>
                <BootstrapTable
                    ref='table'
                    remote={true}
                    data={this.state.medecins}
                    striped={true}
                    hover={true}>
                    
                    
                    <TableHeaderColumn dataField='name' >Nom</TableHeaderColumn>
                    <TableHeaderColumn dataField='email' isKey={true}>Email</TableHeaderColumn>
                    <TableHeaderColumn dataField='telephone'>Telephone</TableHeaderColumn>
                    <TableHeaderColumn dataField='adresse' >Adresse</TableHeaderColumn>
                    <TableHeaderColumn dataField='Specialite' dataSort={true}>Specialite</TableHeaderColumn>
                    <TableHeaderColumn dataField='button' dataFormat={this.cellButton.bind(this)}>Supprimer</TableHeaderColumn>
                    <TableHeaderColumn dataField='button' dataFormat={this.cellsButton.bind(this)}>Modifier</TableHeaderColumn>

                </BootstrapTable>

             </div>

           
        )

    }
}


function mapStateToProps(state) {
    return { Medecin: state.Medecin };
}

export default connect(mapStateToProps, actions)(Medecin);