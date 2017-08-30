import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions';
import reducers from '../reducers';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';
import '../index.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ReactPhoneInput from 'react-phone-input'





class history extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
            alert:'',

            error: {
                message: ''
            }
        };
    

this.userRef = firebase.database().ref('alerte');
      

 }
    componentDidMount() {
        this.userRef.on('value', this.gotData, this.errData);
    }
    gotData = (data) => {
        let newalert = []
        //console.log(data.val());
        var userdata = data.val();
        if (userdata === null) {
            this.setState({ alert: [] });
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
                newalert.push({
                    name: userdata[k].name, email: userdata[k].email, Specialite: userdata[k].Specialite, telephone: userdata[k].telephone, adresse: userdata[k].adresse, rows: userdata[k].rows, key: k,
                });
                //console.log(newProducts);
            }
            this.setState({ alert: newalert });
            localStorage.setItem('myData', this.state.alert);
        }
    }
    errData = (err) => {
        console.log(err);
    }
render() {
    const options = {
        page: 1,  // which page you want to show as default
        sizePerPage: 5,  // which size per page you want to locate as default
        pageStartIndex: 1, // where to start counting the pages
        paginationSize: 7,  // the pagination bar size.
        prePage: 'Prev', // Previous page button text
        nextPage: 'Next', // Next page button text
        firstPage: 'First', // First page button text
        lastPage: 'Last', // Last page button text
        prePageTitle: 'Go to previous', // Previous page button title
        nextPageTitle: 'Go to next', // Next page button title
        firstPageTitle: 'Go to first', // First page button title
        lastPageTitle: 'Go to Last', // Last page button title
        paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
        paginationPosition: 'top',  // default is bottom, top and both is all available
        // keepSizePerPageState: true //default is false, enable will keep sizePerPage dropdown state(open/clode) when external rerender happened
        hideSizePerPage: true // You can hide the dropdown for sizePerPage
        // alwaysShowAllBtns: true // Always show next and previous button
        // withFirstAndLast: false > Hide the going to First and Last page button
        // hidePageListOnlyOnePage: true > Hide the page list if only one page.
    };
    

return (

<form>
    <div>
    <section className="content-header">
        <h2>Liste des alertes </h2>
    </section>
    </div>
<div>
        <BootstrapTable
            ref='table'
            data={this.state.alert}
            striped={true}
            hover={true}
            pagination={true}
            options={options}>


            <TableHeaderColumn dataField='name' >Nom</TableHeaderColumn>
            <TableHeaderColumn dataField='email' isKey={true}>Email</TableHeaderColumn>
            <TableHeaderColumn dataField='telephone'>Telephone</TableHeaderColumn>
            <TableHeaderColumn dataField='adresse' >Adresse</TableHeaderColumn>
            <TableHeaderColumn dataField='Specialite' dataSort={true}>Specialite</TableHeaderColumn>
           
        </BootstrapTable>

    </div>

        </form>
)

    }
}
function mapStateToProps(state) {
    return { history: state.history };
}

export default connect(mapStateToProps, actions)(history);