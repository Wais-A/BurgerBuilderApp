import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
// import Axios from 'axios'



const withErrorHandler = (WrappedComponent, axios) => {

    return class extends React.Component {
        state = {
            error : null
        }
            componentDidMount(){
                axios.interceptors.request.use( req => {
                    this.setState({error: null})
                    return req

                });
                axios.interceptors.response.use(res => res, err => {
                   this.setState({error: err})
                   
                })
            }

            errorConfirmedHandler= () => {
                    this.setState({error: null})
            }
        render(){
             return (
            <div className="Aux">
                <Modal show={this.state.error}
                modalClosed={this.errorConfirmedHandler}
                >
                    {this.state.error ? this.state.error.message: null}
                </Modal>
                <WrappedComponent {...this.props}/>
            </div>
        )
        }
       
    }
}

export default withErrorHandler