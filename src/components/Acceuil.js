import React, { Component } from 'react';

import './sign.css';


class Acceuil extends Component {



    render() {
        return (
            <div>
                <div id="main" className="form-inline container jumbotron" >
                    <h2>Connectez Vous </h2>
                    <div className="box info-box">
                        <span className="bg-red info-box-icon "><i className="fa fa-star-o"></i></span>
                        <div className="info-box-content">
                            <span className="info-box-text">Likes</span>
                            <span className="info-box-number">93,139</span>
                        </div>
                    </div>

                </div>
            </div>

        )
    }
}

export default Acceuil;