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
            toggle: false
        }
    }

    handleClickOpen = () =>{
        this.setState({
            open:true
        });
    }

    handleClose = () => {
        this.setState({
            open:false
        });
    }

   

    addCustomer = () =>{
        
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
        if(this.state.toggle === true){
            formData.append('isDeleted',0);
            post(url,formData,config);
        }
           
        else{
            formData.append('isDeleted',1);
            post(url,formData,config);
        }
        this.props.stateRefresh();
  
    }

    // deleteCustomer(id){
    //     const url ='/api/customers/' + id;
        
    //     fetch(url,{
    //         method:'DELETE'
    //     });
    //     this.props.stateRefresh();
    // }

    
    

    render() {
        //secondary
        
       
        return (
           
            <div>
                <Button variant="contained" color="default" onClick={this.handleClickOpen}>선택</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle onClose={this.handleClose}>
                        버스 알림
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            {!this.state.toggle ? (this.props.image+'번 버스를 탑승하시겠습니까?'):this.props.image+'번 버스 탑승을 취소하시겠습니까?'}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button varinat="contained" color="primary" onClick={(e)=>{this.addCustomer();}}>선택</Button>
                        <Button varinat="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>     
            </div>
           
        )
    }
}

export default CustomerDelete;  