import React from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography  from '@material-ui/core/Typography';

class CustomerDelete extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            open: false,
            isToggle: false
            
        }
        
    }
    

    handleClickOpen = () =>{
        this.setState({
            open:true,
            isToggle:this.state.isToggle
        });
    }

    handleClose = () => {
        this.setState({
            open:false,
            isToggle:this.state.isToggle
        });
    }

   

    addCustomer = () =>{
        

        this.setState({
            isToggle:!this.state.isToggle,
            open:false
        });



        const url ='/api/customers';
        const formData = new FormData();
        
        formData.append('image',this.props.image);
        formData.append('name',this.props.name);
        formData.append('birthday',this.props.birthday);
        formData.append('gender',this.props.gender);
        formData.append('job',this.props.job);
        const config = {
            headers:{
                'content-type' : 'multipart/form-data'  
            }
        }
        formData.append('isDeleted',1);
        post(url,formData,config);
    }

    deleteCustomer(id){
        
        const url ='/api/customers/' + id;
        this.setState({
            isToggle:!this.state.isToggle,
            open:false
        });
        fetch(url,{
            method:'DELETE'
        });
        
    }

    
    

    render() {
        //secondary
        
        return (
           
            <div>
                <Button variant="contained" color={!this.state.isToggle ? "default":"secondary"} onClick={this.handleClickOpen}>??????</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle onClose={this.handleClose}>
                        ?????? ??????
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            {!this.state.isToggle ? (this.props.image+'??? ????????? ?????????????????????????'):this.props.image+'??? ?????? ????????? ?????????????????????????'}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button varinat="contained" color="primary" onClick={this.state.isToggle?((e)=>{this.deleteCustomer(this.props.id)}):this.addCustomer}>??????</Button>
                        <Button varinat="outlined" color="primary" onClick={this.handleClose}>??????</Button>
                    </DialogActions>
                </Dialog>     
            </div>
           
        )
    }
}

export default CustomerDelete;  