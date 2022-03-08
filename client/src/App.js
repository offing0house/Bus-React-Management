
import './App.css';
import React,{Component} from 'react';
import Customer from './component/Customer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomerAdd from './component/CustomerAdd';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';





const styles = theme => ({
  root:{
    width: '100%',
    minWidth: 1080
    
  },
  paper:{
    marginTop:50,
    marginLeft:18,
    marginRight:18
  },
  tableHead:{
    fontSize:'1.0rem'
  },
  progress: {
    margin: theme.spacing(2)
  },grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  menu:{
    marginTop:15,
    marginBottom:15,
    display:'flex',
    justifyContent:'center'
  },
  inputInput: {
    paddingTop: theme.spacing(),
    paddingRight: theme.spacing(),
    paddingBottom: theme.spacing(),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      completed: 0,
      searchKeyword: '',
      data2:''
    }
  }

  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0,
      searchKeyword: '',
      data2:''
    });
    this.callApi()
    .then(res => this.setState({customers: res}))
    .catch(err => console.log(err));
    this.callApi2()
    .then(res => this.setState({data2: res}))
    .catch(err => console.log(err));
  }


  componentDidMount(){
    this.timer = setInterval(this.progress,30);
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log('여기1'));
    this.callApi2()
      .then(res => this.setState({data2: res}))
      .catch(err => console.log('여기2'));
  }



  callApi2 = async () => {
    const pathname = window.location.pathname;
    let endpoint = 'http://ec2-35-78-68-96.ap-northeast-1.compute.amazonaws.com';
    const search = window.location.search;
    if(pathname === '/getLowArrInfoByStId/'){
      const response = await fetch(endpoint+pathname+search);
      const body = await response.json();
      // console.log(body)
      return body;
      
    }
    
  }
  
  callApi = async () => {
      const response = await fetch('/api/customers');
      const body = await response.json();
      return body;
    
  }


  progress = () => {
    const { completed } = this.state;
    this.setState({completed: completed+1});
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }




  render(){
    
    const filteredComponents2 = (data) => {
      var i = 0;
      data = data.filter((c)=>{
        if(Number(c.elements[71].elements[0].text) <10){
           return c.elements[70].elements[0].text.indexOf(this.state.searchKeyword) > -1;
        }
        else{
          return c.elements[71].elements[0].text.indexOf(this.state.searchKeyword) > -1;
        }
      });
      
      return data.map((c)=>{
        console.log(c)
        var num = '';
        var name = '';
        var birthday = '';
        var gender = '';
        var job = '';
        i = i+1;
        if(Number(c.elements[71].elements[0].text) <10){
          num = c.elements[70].elements[0].text;
          name = c.elements[74].elements[0].text;
          birthday = c.elements[0].elements[0].text;
          gender = c.elements[65].elements[0].text;
          
        }else{
          num = c.elements[71].elements[0].text
          name = c.elements[75].elements[0].text
          birthday = c.elements[0].elements[0].text;
          gender = c.elements[66].elements[0].text;
        }
        if(birthday.slice(-1)===']'){
          birthday = birthday.substring(0,3)
          if(birthday.slice(-1)!='분'){
            birthday = birthday.substring(0,2)
          }
        }
        {gender === '0' ? gender = '여유': gender === '3' ? gender = '여유' : gender === '4' ? gender = '보통' : gender = '혼잡'}
        {c.elements[63].elements ? job = c.elements[63].elements[0].text : job = '없음'}
        
        return <Customer stateRefresh={this.stateRefresh} key={i} id={i} image={num} name={name} birthday={birthday} gender={gender} job={job} />
      });
    }
    
    // const filteredComponents = (data) => {
      
    //   data = data.filter((c)=>{
    //     return c.name.indexOf(this.state.searchKeyword) > -1;
    //   });
    //   return data.map((c)=>{
    //     return <Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />
    //   });
    // }
    const cellList = ["번호","버스 번호","정류소명","남은 시간","혼잡도","차량 번호","탑승"];
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" color="inherit" noWrap>
            버스 알리미 
          </Typography>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              name="searchKeyword"
              value={this.state.searchKeyword}
              onChange={this.handleValueChange}
            />
          </div>
        </Toolbar>
      </AppBar>
      
        {/* <div className={classes.menu}>
           <CustomerAdd stateRefresh={this.stateRefresh} />
        </div> */}
        
        {/* this.state.data2[0].elements[71].elements[0].text */}
        
        


        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {cellList.map(c => {
                  return <TableCell className={classes.tableHead} key={c}>{c}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
            {this.state.data2 ? 
                filteredComponents2(this.state.data2) : 
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                </TableCell>
                
              </TableRow>
              }
              {/* {this.state.customers ? 
                filteredComponents(this.state.customers) : 
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                </TableCell>
                
              </TableRow>
              } */}

              
             
            </TableBody>
          </Table>
        </Paper>
       
      </div>
    );
  }
  
}

export default withStyles(styles)(App);
