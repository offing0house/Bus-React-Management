import React from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField  from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});

class CustomerAdd extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            image: '',
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            open: false
        }
    }

    addCustomer = () => {
        const url ='/api/customers';
        const formData = new FormData();
        formData.append('image',this.state.image)
        formData.append('name',this.state.userName)
        formData.append('birthday',this.state.birthday)
        formData.append('gender',this.state.gender)
        formData.append('job',this.state.job)
        const config = {
            headers:{
                'content-type' : 'multipart/form-data'  
            }
        }
        return post(url,formData,config);
    }

    handleFormSubmit = (e)  => {
        e.preventDefault()
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            })
        this.setState({
            image: '',
            userName: '',
            birthday: '',
            gender: '',
            job: '',  
            open: false
        })
        
    }

  

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleClickOpen = () =>{
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            image: '',
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            open: false
        });
    }


    render() {
        const { classes } = this.props;
        
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    ????????????
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>
                        ??????
                    </DialogTitle>
                    <DialogContent>
                        <TextField label="?????????" type="text" name="image" value={this.state.image} onChange={this.handleValueChange}/><br/>
                        <TextField label="??????" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                        <TextField label="????????????" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                        <TextField label="??????" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                        <TextField label="??????" type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>??????</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>??????</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(CustomerAdd);