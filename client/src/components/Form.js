import { Component } from "react";
import React from 'react';
import { Link } from "react-router-dom";
class Form extends Component{
    state = {
        email:'',
        password:'',
    }
    render(){
        const {name, error, userDetails, reset} = this.props;
        const error_class = (error !=null ? 'border-[#B31212]' : 'border-black');
        const classes = `w-fit  flex-col items-center text-start flex border-2 rounded-3xl pt-10 pb-2 px-16 ${error_class}`
        return(
            <div data-testid="form" className="flex items-center flex-col">
                <div  className={classes}>
                    <div data-testid="username-label" className="w-full justify-self-start">Username</div>
                    <input
                    data-testid="email"
                        type='email'
                        className="w-64 text-xs my-3 h-[45px] p-2 bg-[#F8F8F8]"
                        onChange={(event) => this.setState({email:event.target.value})}
                        value={this.state.email}></input>
                    <div className="w-full justify-self-start">Password</div>
                    <input
                        type='password'
                        className="w-64 text-xs my-3 h-[45px] p-2 bg-[#F8F8F8]"
                        onChange={(event) => this.setState({password:event.target.value})}
                        value={this.state.password}>
                    </input>
                    <div
                        className="bg-[#C4C4C4] my-3 w-28 cursor-pointer  h-8  flex justify-center items-center"
                        onClick={() => userDetails(this.state.email,this.state.password)}>
                            {name}
                    </div>
                    
                </div>
                {error != null && <div  className="bg-[#B312120D] my-10 border-[#B31212] border h-10 flex justify-center items-center p-5  text-center flex-row">
                                        <div data-testid="error" className="text-[#B31212]">{error}</div>
                                        <div 
                                        onClick={() => reset()}
                                            className="mx-5 cursor-pointer">
                                            <div  className="text-[#B31212]">x</div>
                                        </div>
                                    </div>}
            </div>
            
        )
    }
}


export default Form;